import { readdir, unlink, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const PROJECT_ROOT = resolve(__dirname, "..");
const COVERS_DIR = join(PROJECT_ROOT, "public", "covers");
const COVER_PROVIDER_PATH = join(
  PROJECT_ROOT,
  "theme",
  "util",
  "coverProvider.ts",
);

const API_BASE = "https://admin.programmier.bar";
const VALID_TYPES = ["deep_dive", "cto_special", "other"] as const;

interface Episode {
  id: number;
  type: string;
  number: string | null;
  cover_image: string | null;
  slug: string;
}

// --- CLI flags ---
const args = process.argv.slice(2);
const force = args.includes("--force");
const dryRun = args.includes("--dry-run");
const widthIdx = args.indexOf("--width");
const width = widthIdx !== -1 ? parseInt(args[widthIdx + 1], 10) : undefined;

// --- Helpers ---

function resolveFilename(ep: Episode, ext: string): string | null {
  const { type, number, slug } = ep;

  if (type === "deep_dive") {
    if (!number) return null;
    return `deep_dive_${number}.${ext}`;
  }

  if (type === "cto_special") {
    if (!number) return null;
    const num = number.replace(/^#/, "");
    return `cto_special_${num}.${ext}`;
  }

  if (type === "other") {
    if (number) {
      return `other_${number}.${ext}`;
    }
    // Derive from slug
    const name = slug.replace(/^spezialfolge-/, "");
    return `other_${name}.${ext}`;
  }

  return null;
}

function extFromContentType(ct: string): string {
  if (ct.includes("png")) return "png";
  if (ct.includes("webp")) return "webp";
  return "jpg";
}

function imageUrl(assetId: string): string {
  const params = new URLSearchParams();
  if (width) {
    params.set("width", String(width));
    params.set("quality", "80");
  }
  const qs = params.toString();
  return `${API_BASE}/assets/${assetId}${qs ? `?${qs}` : ""}`;
}

async function downloadBatch(
  items: { url: string; dest: string; label: string }[],
) {
  await Promise.all(
    items.map(async ({ url, dest, label }) => {
      const res = await fetch(url);
      if (!res.ok) {
        console.error(`  FAILED ${label}: ${res.status} ${res.statusText}`);
        return;
      }
      const buf = Buffer.from(await res.arrayBuffer());
      await writeFile(dest, buf);
      console.log(`  Downloaded ${label} (${(buf.length / 1024).toFixed(0)} KB)`);
    }),
  );
}

function generateCoverProvider(filenames: string[]): string {
  const sorted = [...filenames].sort();
  const items = sorted.map((f) => `    '${f}'`).join(",\n");
  return `let covers = [
${items}
]

class CoverProvider {

    covers: string[] = [...covers]

    constructor() {
        this.shuffle()
    }

    private shuffle() {
        for (let i = this.covers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.covers[i], this.covers[j]] = [this.covers[j], this.covers[i]];
        }
    }

    getCovers(count: number) {
        if (this.covers.length < count) {
            this.covers = [...covers]
            this.shuffle()
        }
        return this.covers.splice(0, count)
    }
}

const coverProvider = new CoverProvider();

export default coverProvider;
`;
}

// --- Main ---

async function main() {
  console.log("Fetching podcast metadata...");

  const res = await fetch(
    `${API_BASE}/items/podcasts?fields[]=id&fields[]=type&fields[]=number&fields[]=cover_image&fields[]=slug&limit=-1`,
  );
  if (!res.ok) {
    console.error(`API error: ${res.status} ${res.statusText}`);
    process.exit(1);
  }

  const { data } = (await res.json()) as { data: Episode[] };
  console.log(`Fetched ${data.length} episodes total`);

  // Filter to valid types with cover images
  const episodes = data.filter(
    (ep) =>
      VALID_TYPES.includes(ep.type as (typeof VALID_TYPES)[number]) &&
      ep.cover_image,
  );
  console.log(
    `${episodes.length} episodes with covers (types: ${VALID_TYPES.join(", ")})`,
  );

  // Resolve filenames — we need to peek at content-type for extension,
  // but for dry-run we'll assume png
  const toDownload: {
    ep: Episode;
    filename: string;
    url: string;
  }[] = [];

  for (const ep of episodes) {
    const filename = resolveFilename(ep, "png"); // placeholder ext for now
    if (!filename) {
      console.warn(
        `  Skipping episode ${ep.id} (${ep.type}): could not resolve filename`,
      );
      continue;
    }
    toDownload.push({
      ep,
      filename,
      url: imageUrl(ep.cover_image!),
    });
  }

  if (dryRun) {
    console.log(`\nDry run — would download ${toDownload.length} covers:`);
    for (const { filename } of toDownload) {
      console.log(`  ${filename}`);
    }
    return;
  }

  // Ensure covers directory exists
  if (!existsSync(COVERS_DIR)) {
    await mkdir(COVERS_DIR, { recursive: true });
  }

  // Clean existing covers
  console.log("\nCleaning existing covers...");
  const existing = await readdir(COVERS_DIR);
  const imageFiles = existing.filter((f) =>
    /\.(png|jpg|jpeg|webp)$/i.test(f),
  );
  for (const file of imageFiles) {
    await unlink(join(COVERS_DIR, file));
  }
  console.log(`Removed ${imageFiles.length} existing cover files`);

  // Download in batches of 5
  console.log(`\nDownloading ${toDownload.length} covers...`);
  const BATCH_SIZE = 5;
  const downloadedFilenames: string[] = [];

  for (let i = 0; i < toDownload.length; i += BATCH_SIZE) {
    const batch = toDownload.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(toDownload.length / BATCH_SIZE);
    console.log(`Batch ${batchNum}/${totalBatches}`);

    // First, do HEAD requests to get actual content types
    const resolved = await Promise.all(
      batch.map(async ({ ep, url }) => {
        const headRes = await fetch(url, { method: "HEAD" });
        const ct = headRes.headers.get("content-type") || "image/png";
        const ext = extFromContentType(ct);
        const filename = resolveFilename(ep, ext)!;
        const dest = join(COVERS_DIR, filename);

        if (!force && existsSync(dest)) {
          console.log(`  Skipped ${filename} (exists)`);
          downloadedFilenames.push(filename);
          return null;
        }

        return { url, dest, label: filename, filename };
      }),
    );

    const toFetch = resolved.filter(
      (r): r is NonNullable<typeof r> => r !== null,
    );

    if (toFetch.length > 0) {
      await downloadBatch(toFetch);
      for (const { filename } of toFetch) {
        downloadedFilenames.push(filename);
      }
    }
  }

  // Read actual directory contents for coverProvider generation
  const finalFiles = (await readdir(COVERS_DIR)).filter((f) =>
    /\.(png|jpg|jpeg|webp)$/i.test(f),
  );
  console.log(`\n${finalFiles.length} covers in ${COVERS_DIR}`);

  // Generate coverProvider.ts
  const providerContent = generateCoverProvider(finalFiles);
  await writeFile(COVER_PROVIDER_PATH, providerContent);
  console.log(`Updated coverProvider.ts with ${finalFiles.length} entries`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
