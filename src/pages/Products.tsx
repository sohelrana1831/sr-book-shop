import BookCard from '@/components/BookCard';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { IBook } from '@/types/globalTypes';
import { useEffect, useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function Products() {
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
  // Create a Set to store unique genres
  const uniqueData = new Set();

  // Loop through the data array to extract unique genres
  data.forEach((book) => uniqueData.add(book.genre));

  // Step 1: Extract years from publication_date strings
  const years = data.map((book) =>
    new Date(book.publication_date).getFullYear()
  );

  // Step 2: Use a Set to get unique years
  const uniqueYearsSet = new Set(years);

  // Step 3: Convert the Set back to an array to get unique years in the same order they appear
  const uniqueYearsArray = Array.from(uniqueYearsSet);
  return (
    <>
      <div className="text-center my-8">
        <h1 className="text-5xl font-serif">
          Collection<span className="bg-blend-color-dodge"> Books</span>
        </h1>
      </div>
      <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
        <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
          <div className="">
            <div className="">
              <div className="flex justify-between gap-2 ">
                <input
                  type="text"
                  id="search-field"
                  className="px-2  py-1 border  border-gray-200/80"
                  placeholder="Search book"
                />
                <Button variant="ghost">
                  <HiOutlineSearch size="20" />
                </Button>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-xl uppercase">Availability Genre</h1>
            <div className="flex flex-col">
              {Array.from(uniqueData).map((genre, key) => (
                <Button key={key} variant="link" asChild>
                  <Link to={`/${genre}`}>
                    <Label htmlFor="in-stock">{genre}</Label>
                  </Link>
                </Button>
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-xl my-4 uppercase">Publication Year</h1>
            <div className="grid grid-cols-4 gap-4 ">
              {uniqueYearsArray.map((year, key) => (
                <Button
                  className="bg-cyan-500 shadow-lg shadow-cyan-500/50 gap-4"
                  key={key}
                  variant="link"
                  asChild
                >
                  <Link to={`/${year}`}>
                    <Label htmlFor="in-stock">{year}</Label>
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
          {data?.map((book) => (
            <BookCard book={book} />
          ))}
        </div>
      </div>
    </>
  );
}
