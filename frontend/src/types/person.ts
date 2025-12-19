export interface Person {
  name: string;
  url: string;
  birth_year?: string;
  gender?: string;
  eye_color?: string;
  hair_color?: string;
  height?: string;
  mass?: string;
  films_details?: Array<{ id: number; title: string }>;
}
