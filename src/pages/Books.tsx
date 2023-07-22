import BookCard from '@/components/BookCard';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useGetBooksQuery } from '@/redux/features/book/bookApi';
import { IBook } from '@/types/globalTypes';
import { ReactNode } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function Books() {
  const { data } = useGetBooksQuery(undefined);

  // Create a Set to store unique genres
  const uniqueGenres = new Set();
  // Create a Set to store unique year
  const uniqueYear = new Set();

  // Loop through the data array to extract unique genres
  data !== undefined &&
    data.data.forEach((book: IBook) => {
      uniqueGenres.add(book.genre);
      uniqueYear.add(book.publicationYear);
    });

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
              {Array.from(uniqueGenres).map((genre, key) => (
                <Button key={key} variant="link" asChild>
                  <Link to={`/${genre as string}`}>
                    <Label htmlFor="in-stock">{genre as string}</Label>
                  </Link>
                </Button>
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-xl my-4 uppercase">Publication Year</h1>
            <div className="grid grid-cols-4 gap-4 ">
              {Array.from(uniqueYear).map((publicationYear, key) => (
                <Button
                  className="bg-cyan-500 shadow-lg shadow-cyan-500/50 gap-4"
                  key={key}
                  variant="link"
                  asChild
                >
                  <Link to={`/${publicationYear}`}>
                    <Label htmlFor="in-stock">
                      {publicationYear as string}
                    </Label>
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
          {data !== undefined &&
            data?.data.map((book: IBook) => <BookCard book={book} />)}
        </div>
      </div>
    </>
  );
}
