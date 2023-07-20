import { Button } from '@/components/ui/button';
import hero from '@/assets/images/hero.png';
import Footer from '@/layouts/Footer';
import { IBook } from '@/types/globalTypes';
import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import BookCard from '@/components/BookCard';

export default function Home() {
  const [data, setData] = useState<IBook[]>([]);
  useEffect(() => {
    fetch('./data.json')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const { toast } = useToast();

  //! Dummy Data

  const status = true;
  const priceRange = 100;

  //! **

  const handleSlider = (value: number[]) => {
    console.log(value);
  };

  // let booksData;

  // if (status) {
  //   booksData = data.filter(
  //     (item) => item.status === true && item.price < priceRange
  //   );
  // } else if (priceRange > 0) {
  //   booksData = data.filter((item) => item.price < priceRange);
  // } else {
  //   booksData = data;
  // }

  return (
    <>
      <div className="flex justify-between items-center h-[calc(100vh-80px)] max-w-7xl mx-auto ">
        <div>
          <h1 className="text-6xl font-black text-primary mb-2">
            Target an Audience <br /> Fiction & Literature
          </h1>
          <p className="text-secondary font-semibold text-xl">
            Increased usage of E-books.
          </p>
          <div className="text-primary mt-20">
            <p className="w-80 text-justify">
              Literature is any collection of written work, but it is also used
              more narrowly for writings specifically considered to be an art
              form, especially prose fiction, drama, and poetry. In recent
              centuries, the definition has...
            </p>
          </div>
          <Button className="mt-5">Learn more</Button>
        </div>
        <div className="relative -right-14">
          <img src={hero} alt="" />
        </div>
      </div>
      <div className="text-center my-8">
        <h1 className="text-5xl">
          Multi pure <span className="bg-blend-color-dodge">Books</span>
        </h1>
      </div>
      <div className="col-span-9 grid grid-cols-4 gap-10 pb-20 w-full md:max-w-7xl h-full mx-auto ">
        {data?.map((book) => (
          <BookCard book={book} />
        ))}
      </div>
      <Footer />
    </>
  );
}
