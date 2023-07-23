import BookCard from '@/components/BookCard';
import ProductReview from '@/components/ProductReview';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import {
  useDeleteBookMutation,
  useGetBooksQuery,
} from '@/redux/features/book/bookApi';
import { useAppSelector } from '@/redux/hooks';
import { IBook, IReview } from '@/types/globalTypes';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ProductDetails() {
  const [singleBook, setSingleBook] = useState<IBook>();
  const { id } = useParams();
  const [bookData, setBookData] = useState<IBook[]>([]);
  const { data } = useGetBooksQuery(undefined);
  const { users } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (data !== undefined) {
      setSingleBook(
        data.data.find((item: { id: string | undefined }) => item.id === id)
      );
    }
  }, [data, id]);

  useEffect(() => {
    if (data !== undefined) {
      const filterData = data?.data?.filter(
        (item: IBook) => item.userEmail === singleBook?.userEmail
      );
      setBookData(filterData);
    }
  }, [data, singleBook?.userEmail]);

  const [deleteBook] = useDeleteBookMutation();

  const handleDeleteBook = (id: string) => {
    const proceed = window.confirm('Are you sure, You went to delete');
    if (proceed) {
      deleteBook(id);
      toast({ description: 'Delete Successfully!' });
      history.back();
    }
  };

  return (
    <>
      <div className="flex my-8 max-w-7xl mx-auto items-center">
        <div className="w-[50%]">
          <img src={singleBook?.imageLink} alt="" />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{singleBook?.title}</h1>
          <div className="flex flex-col  text-lg font-serif">
            <div>Author: {singleBook?.author}</div>
            <div>Genre: {singleBook?.genre}</div>
            <div>
              Publication:{' '}
              {singleBook?.publicationDate &&
                format(new Date(singleBook?.publicationDate), 'yyyy-MM-dd')}
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant={'outline'}
              className="cursor-pointer float-left  bg-cyan-500 shadow-lg shadow-cyan-500/50 focus:ring-zinc-200 focus:ring-white-500 focus:bg-white"
            >
              Download
            </Button>
            {singleBook?.userEmail === users.email && (
              <>
                <Button variant={'secondary'}>
                  <Link to={`/edit-book/${singleBook?.id}`}>Edit</Link>
                </Button>
                <Button
                  variant={'secondary'}
                  className="text-red-600 "
                  onClick={() => handleDeleteBook(singleBook?.id as string)}
                >
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      {singleBook?.reviews && (
        <ProductReview review={singleBook?.reviews as unknown as []} />
      )}
      <hr className="max-w-7xl mx-auto mt-5" />
      <div className="text-center my-8">
        <h1 className="text-2xl font-semibold capitalize font-serif">
          Frequently bought together
        </h1>
      </div>
      <div className="col-span-9 grid grid-cols-3 gap-10 pb-20 w-full md:max-w-7xl h-full mx-auto ">
        {bookData !== undefined &&
          bookData.map((book: IBook) => <BookCard book={book} />)}
      </div>
    </>
  );
}
