import { IBook } from '@/types/globalTypes';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

interface IProps {
  book: IBook;
}

export default function BookCard({ book }: IProps) {
  return (
    <>
      <div className="h-60 bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex">
          <Link to={`/product-details/${book.id}`} className="w-full">
            <img
              className="object-cover h-48 w-full"
              src={book?.imageLink}
              alt="Book Cover"
            />
            {/* <Button className="my-4 ml-4">View</Button> */}
          </Link>

          <div className="p-4 w-full">
            <h2 className="text-2xl font-semibold text-gray-800">
              {book?.title}
            </h2>
            <p className="text-sm text-gray-600 mb-4">Author: {book?.author}</p>
            <p className="text-sm text-gray-600 mb-4">Genre: {book?.genre}</p>
            <p className="text-sm text-gray-600">
              Publication:{' '}
              {format(new Date(book?.publicationDate), 'yyyy-MM-dd')}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
