import { HttpClient } from '../infra/http-client';
import type { Person, SearchResponse } from '../types';

export class PeopleService extends HttpClient {
  endpoint = 'people';
  
  fetchPersonById(id: number): Promise<Person> {
    return this.get<Person>(`/${this.endpoint}/details/${id}`);
  }
  
  fetchAllPeople(searchTerm: string): Promise<SearchResponse<Person>> {
    return this.get<SearchResponse<Person>>(`/${this.endpoint}`, {
      params: { search: searchTerm },
    });
  }
}

export const peopleService = new PeopleService();