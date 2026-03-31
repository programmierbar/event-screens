// This script will update the `/data.json` file in this project
// For this it loads data from our CMS api which is available at `https://admin.programmier.bar`
// [The API is powered by Directus CMS](https://directus.io/docs/api).

import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const CMS_BASE = "https://admin.programmier.bar";
const MEETUPS_URL = `${CMS_BASE}/items/meetups?sort=start_on&filter[start_on][_gte]=$NOW&limit=2&fields=cover_image,start_on,title,speakers.speaker.first_name,speakers.speaker.last_name,members.member.first_name,members.member.last_name,talks.talk.title,talks.talk.speakers.speaker.*`;
const PAST_MEETUPS_URL = `${CMS_BASE}/items/meetups?sort=-start_on&filter[start_on][_lt]=$NOW&limit=9&fields=title,speakers.speaker.first_name,speakers.speaker.last_name,members.member.first_name,members.member.last_name`;

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = join(__dirname, "..", "data.json");

interface Speaker {
    first_name: string;
    last_name: string;
}

interface MeetupTalk {
    talk: {
        title: string;
        speakers: { speaker: Speaker }[];
    };
}

interface MeetupItem {
    cover_image: string | null;
    start_on: string;
    title: string;
    speakers: { speaker: Speaker }[];
    members: { member: Speaker }[];
    talks: MeetupTalk[];
}

interface PastMeetupItem {
    title: string;
    speakers: { speaker: Speaker }[];
    members: { member: Speaker }[];
}

interface DirectusResponse<T = MeetupItem> {
    data: T[];
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
  const json: DirectusResponse<MeetupItem> = await response.json();
  return json.data;
}

// Updating the list of past meetups at "lastEvents[]" in the JSON file
// Each last event has a `title` and a `subtitle` field in the JSON file
// We can query the past 10 meetups from the CMS API.
// For the `title` of the past events, we can use the `title` property of the meetups in the CMS.
// For the `subtitle` we list all speaker(s) of the meetup (when more than one, concatted with " & ")
// The speakers' detail can be found in the `speakers.speaker.first_name` and `speakers.speaker.last_name` fields
// of the meetup in the CMS.
// A meetup could also have its speakers listed in the members field at `members.member.*` with the name being in
// `members.member.first_name` and `members.member.last_name` fields of the meetup in the CMS.
// Be aware that a meetup could have multiple speakers or members
async function fetchPastMeetups(): Promise<PastMeetupItem[]> {
  const response = await fetch(PAST_MEETUPS_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch past meetups: ${response.status} ${response.statusText}`);
  }
  const json: DirectusResponse<PastMeetupItem> = await response.json();
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

  // Updating the talks at "agenda.talks[]" in the JSON file
  // Each talk has a `title` and a `speaker` field
  // The talk(s) of the current meetup can be found at the fields
  // `talks.talk.title` and
  // `talks.talk.speakers.speaker.first_name` and `talks.talk.speakers.speaker.last_name`
  // Be aware that a meetup could have multiple talks and each talk could have multiple speakers
  if (current?.talks) {
    data.agenda.talks = current.talks.map((t) => ({
      title: t.talk.title,
      speaker: t.talk.speakers
        .map((s) => `${s.speaker.first_name} ${s.speaker.last_name}`)
        .join(" & "),
    }));
  }

  // Update last events: current meetup + past meetups (10 total)
  const pastMeetups = await fetchPastMeetups();
  const formatNames = (
    speakers: { speaker: Speaker }[],
    members: { member: Speaker }[],
  ) => [
    ...speakers.map((s) => `${s.speaker.first_name} ${s.speaker.last_name}`),
    ...members.map((m) => `${m.member.first_name} ${m.member.last_name}`),
  ].join(" & ");

  const pastEvents = pastMeetups.map((m) => ({
    title: m.title,
    subtitle: formatNames(m.speakers, m.members),
  }));

  if (current) {
    data.lastEvents = [
      { title: current.title, subtitle: formatNames(current.speakers, current.members) },
      ...pastEvents,
    ];
  } else {
    data.lastEvents = pastEvents;
  }

  writeFileSync(dataPath, JSON.stringify(data, null, 2) + "\n");
  console.log("Updated data.json:");
  console.log("  currentUrl:", data.posters.currentUrl);
  console.log("  nextUrl:", data.posters.nextUrl);
  console.log("  talks:", JSON.stringify(data.agenda.talks));
  console.log("  lastEvents:", data.lastEvents, "items");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});