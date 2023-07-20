import ProductReview from '@/components/ProductReview';
import { Button } from '@/components/ui/button';
import { IBook } from '@/types/globalTypes';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams();

  //! Temporary code, should be replaced with redux
  const [data, setData] = useState<IBook[]>([]);
  useEffect(() => {
    fetch('../../public/data.json')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const book = data?.find((item) => item.id === Number(id));

  //! Temporary code ends here

  return (
    <>
      <div className="flex my-8 max-w-7xl mx-auto items-center">
        <div className="w-[50%]">
          <img src={book?.image_link} alt="" />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{book?.title}</h1>
          <div className="flex flex-col font-sans text-sm">
            <div>Author: {book?.author}</div>
            <div>Genre: {book?.genre}</div>
            <div>Publication: {book?.publication_date}</div>
          </div>
          <Button>Download</Button>
        </div>
      </div>
      {book?.reviews && <ProductReview review={book?.reviews} />}
    </>
  );
}
