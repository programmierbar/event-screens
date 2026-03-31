import rawData from './../../data.json'

export interface ScheduleItem {
  time: string;
  title: string;
  isTalks?: boolean;
}

export interface Talk {
  title: string;
  speaker: string;
}

export interface Agenda {
  schedule: ScheduleItem[];
  talks: Talk[];
}

export interface Connection {
  departing: string;
  arriving: string;
}

export interface Transit {
  to: string;
  connections: Connection[];
}

export interface Posters {
  currentUrl: string;
  nextUrl?: string;
}

export interface LastEventsItem {
  title: string;
  subtitle: string;
}

export interface Data {
  posters: Posters;
  agenda: Agenda;
  transit: Transit[];
  lastEvents: LastEventsItem[];
}

export default {
    getData(): Data {
        return rawData as Data;
    }
}