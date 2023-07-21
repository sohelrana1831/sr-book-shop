export interface IBook {
  id: number | string;
  author: string;
  title: string;
  genre: string;
  publication_date: string;
  image_link: string;
  reviews: string[];
}
