export interface MovieRapidDBMoviesResponse {
    imdbID:           string;
    tmdbID:           string;
    imdbRating:       number;
    imdbVoteCount:    number;
    tmdbRating:       number;
    backdropPath:     string;
    backdropURLs:     BackdropURLs;
    originalTitle:    string;
    genres:           number[];
    countries:        string[];
    year:             number;
    runtime:          number;
    cast:             string[];
    significants:     string[];
    title:            string;
    overview:         string;
    tagline:          string;
    video:            string;
    posterPath:       string;
    posterURLs:       PosterURLs;
    age:              number;
    streamingInfo:    StreamingInfo;
    originalLanguage: string;
}

export interface BackdropURLs {
    "300":    string;
    "780":    string;
    "1280":   string;
    original: string;
}

export interface PosterURLs {
    "92":     string;
    "154":    string;
    "185":    string;
    "342":    string;
    "500":    string;
    "780":    string;
    original: string;
}

export interface StreamingInfo {
    prime?: Streamer;
    disney?: Streamer;
    hbo?: Streamer;
    netflix?: Streamer;
    hulu?: Streamer;
}

export interface Streamer {
    ar: Ar;
}

export interface Ar {
    link:    string;
    added:   number;
    leaving: number;
}