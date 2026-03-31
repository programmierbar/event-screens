import rawData from './../../data.json'

export interface Connection {
  departing: string;
  arriving: string;
}

export interface Transit {
  to: string;
  connections: Connection[];
}

export interface Data {
  transit: Transit[];
}


export default {
    getData(): Data {
        return rawData as Data;
    }
}