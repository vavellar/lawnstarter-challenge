import { HttpClient } from '../infra/http-client';

export class PeopleService extends HttpClient {
  endpoint = 'people';
  
  fetchPersonById(id: number): Promise<any> {
    return this.get<any>(`/${this.endpoint}/details/${id}`);
  }
  
  fetchAllPeople(searchTerm: string): Promise<any[]> {
    return this.get<any[]>(`/${this.endpoint}`, {
      params: { search: searchTerm },
    });
  }
}

export const peopleService = new PeopleService();