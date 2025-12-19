import { HttpClient } from '../infra/http-client';
import type { MovieDetails, SearchResponse } from '../types';

export class MoviesService extends HttpClient {
  endpoint = 'movies';
  
  fetchMovieById(id: number): Promise<MovieDetails> {
    return this.get<MovieDetails>(`/${this.endpoint}/details/${id}`);
  }
  
  fetchAllMovies(searchTerm: string): Promise<SearchResponse<MovieDetails>> {
    return this.get<SearchResponse<MovieDetails>>(`/${this.endpoint}`, {
      params: { search: searchTerm },
    });
  }
}

export const moviesService = new MoviesService();