import { HttpClient } from '../infra/http-client';

export interface Film {
  title: string;
  director: string;
  release_date: string;
}

export class MoviesService extends HttpClient {
  endpoint = 'movies';
  
  fetchMovieById(id: number): Promise<Film> {
    return this.get<Film>(`/${this.endpoint}/details/${id}`);
  }
  
  fetchAllMovies(searchTerm: string): Promise<Film[]> {
    return this.get<Film[]>(`/${this.endpoint}`, {
      params: { search: searchTerm },
    });
  }
}

export const moviesService = new MoviesService();