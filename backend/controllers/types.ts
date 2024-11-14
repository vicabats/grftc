export interface Song {
  name: string;
  info?: string;
  cover?: {
    mbid: string;
    name: string;
    sortName: string;
    disambiguation: string;
    url: string;
  };
}

export interface SongSet {
  song: Song[];
}

export interface Venue {
  name: string;
  city: {
    name: string;
    state: string;
    country: {
      name: string;
    };
  };
}

export interface Artist {
  name: string;
}

export interface Setlist {
  id: string;
  eventDate: string;
  artist: Artist;
  venue: Venue;
  sets: {
    set: SongSet[];
  };
}

export interface ApiResponse {
  setlist: Setlist[];
}

export interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}
