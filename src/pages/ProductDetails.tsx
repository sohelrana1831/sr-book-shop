import ProductReview from '@/components/ProductReview';
import { Button } from '@/components/ui/button';
import { useGetBooksQuery } from '@/redux/features/book/bookApi';
import { IBook } from '@/types/globalTypes';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {
  const [singleBook, setSingleBook] = useState<IBook>();
  const { id } = useParams();

  const { data } = useGetBooksQuery(undefined);

  useEffect(() => {
    if (data !== undefined) {
      setSingleBook(
        data.data.find((item: { id: string | undefined }) => item.id === id)
      );
    }
  }, [data, id]);

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
          <Button>Download</Button>
        </div>
      </div>
      {singleBook?.reviews && <ProductReview review={singleBook?.reviews} />}
    </>
  );
}
