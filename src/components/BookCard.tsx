import { IBook } from '@/types/globalTypes';
import { toast } from './ui/use-toast';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

interface IProps {
  book: IBook;
}

export default function BookCard({ book: book }: IProps) {
  const handleAddProduct = (book: IBook) => {
    toast({
      description: 'Product Added',
    });
  };
  return (
    <div>
      <div className="rounded-2xl h-[480px] flex flex-col items-start justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
        <div>
          <Link to={`/product-details/${book.id}`} className="w-full">
            <img src={book?.image_link} alt="book" />
            <p className="text-lg">{book?.title}</p>
          </Link>
        </div>
        <div className="flex flex-col font-sans text-sm">
          <div>Author: {book?.author}</div>
          <div>Genre: {book?.genre}</div>
          <div>Publication: {book?.publication_date}</div>
        </div>
      </div>
    </div>
  );
}
