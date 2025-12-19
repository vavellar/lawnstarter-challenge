export interface Movie {
  title: string;
  url: string;
  opening_crawl?: string;
  characters_details?: Array<{ id: number; name: string }>;
}

export interface MovieDetails extends Movie {
  director: string;
  release_date: string;
}
