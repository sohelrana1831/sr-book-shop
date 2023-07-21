export interface IBook {
  id: number | string;
  author: string;
  title: string;
  genre: string;
  userEmail: string;
  publicationDate: Date | string;
  imageLink: string;
  reviews?: string[];
  publicationYear?: string;
}
