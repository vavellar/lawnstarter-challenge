import type { Movie } from './movie';
import type { Person } from './person';

export type SearchResult = Movie | Person;
export type SearchType = 'people' | 'movies';

export interface SearchResponse<T> {
  count: number;
  results: T[];
}
