import ProductReview from '@/components/ProductReview';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import {
  useDeleteBookMutation,
  useGetBooksQuery,
} from '@/redux/features/book/bookApi';
import { useAppSelector } from '@/redux/hooks';
import { IBook } from '@/types/globalTypes';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ProductDetails() {
  const [singleBook, setSingleBook] = useState<IBook>();
  const { id } = useParams();

  const { data } = useGetBooksQuery(undefined);
  const { users } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (data !== undefined) {
      setSingleBook(
        data.data.find((item: { id: string | undefined }) => item.id === id)
      );
    }
  }, [data, id]);

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
          <div className="flex flex-col font-sans text-sm">
            <div>Author: {singleBook?.author}</div>
            <div>Genre: {singleBook?.genre}</div>
            <div>
              Publication:{' '}
              {singleBook?.publicationDate &&
                format(new Date(singleBook?.publicationDate), 'yyyy-MM-dd')}
            </div>
          </div>
          <div className="flex gap-2">
            <Button>Download</Button>
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
      {singleBook?.reviews && <ProductReview review={singleBook?.reviews} />}
    </>
  );
}
