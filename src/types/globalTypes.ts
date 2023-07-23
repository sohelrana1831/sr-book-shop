export interface IBook {
  id: number | string;
  author: string;
  title: string;
  genre: string;
  userEmail: string;
  publicationDate: Date | string;
  imageLink: string;
  reviews?: IProps;
  publicationYear?: string;
}

export interface IReview {
  review: string;
  reviewBy: string;
}

interface IProps {
  review: IReview[];
}
