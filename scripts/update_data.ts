// This script will update the `/data.json` file in this project
// For this it loads data from our CMS api which is available at `https://admin.programmier.bar`
// [The API is powered by Directus CMS](https://directus.io/docs/api).

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const CMS_BASE = "https://admin.programmier.bar";
const MEETUPS_URL = `${CMS_BASE}/items/meetups?sort=start_on&filter[start_on][_gte]=$NOW&limit=2&fields=cover_image,start_on`;

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = join(__dirname, "..", "data.json");

interface MeetupItem {
    cover_image: string | null;
    start_at: string;
}

interface DirectusResponse {
    data: MeetupItem[];
}

// Updating the poster URLs at "posters.currentUrl" and "posters.nextUrl" in the JSON file
// We can query all meetups at: https://admin.programmier.bar/items/meetups
// The meetup item has two relevant fields: `cover_image` and `start_on`
// Assets (such as images) can be accessed from the CMS via: https://admin.programmier.bar/assets/{ASSET_ID}
// The URL for the current poster is always the cover_image file of the meetup that is up next.
// The URL for the next poster is always the cover_image file of the meetup that is up after the that
// if no meetup is up next, the next poster will be null.
async function fetchUpcomingMeetups(): Promise<MeetupItem[]> {
  const response = await fetch(MEETUPS_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch meetups: ${response.status} ${response.statusText}`);
  }
  const json: DirectusResponse = await response.json();
  return json.data;
}

function assetUrl(assetId: string): string {
  return `${CMS_BASE}/assets/${assetId}`;
}

async function main() {
  const data = JSON.parse(readFileSync(dataPath, "utf-8"));

  const meetups = await fetchUpcomingMeetups();

  const current = meetups[0] ?? null;
  const next = meetups[1] ?? null;

  if (current?.cover_image) {
    data.posters.currentUrl = assetUrl(current.cover_image);
  } else {
    console.warn("No upcoming meetup found — keeping existing currentUrl.");
  }

  data.posters.nextUrl = next?.cover_image ? assetUrl(next.cover_image) : null;

  writeFileSync(dataPath, JSON.stringify(data, null, 2) + "\n");
  console.log("Updated data.json posters:");
  console.log("  currentUrl:", data.posters.currentUrl);
  console.log("  nextUrl:", data.posters.nextUrl);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});