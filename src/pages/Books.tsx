import BookCard from '@/components/BookCard';
import { Button } from '@/components/ui/button';
import {
  useGetBooksQuery,
  useGetSearchTermQuery,
} from '@/redux/features/book/bookApi';
import { IBook } from '@/types/globalTypes';
import { useEffect, useState } from 'react';
type ISearchType = {
  genre: string;
  publicationYear: string;
  searchTerm: string;
};
export default function Books() {
  const [queryData, setQueryData] = useState({ value: '', field: '' });
  const [searchItems, setSearchItems] = useState<ISearchType>({
    genre: '',
    publicationYear: '',
    searchTerm: '',
  });
  const [bookData, setBookData] = useState([]);
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

  useEffect(() => {
    if (searchItems.genre) {
      setQueryData({
        field: 'genre',
        value: searchItems.genre,
      });
    } else if (searchItems.publicationYear) {
      setQueryData({
        field: 'publicationYear',
        value: searchItems.publicationYear,
      });
    } else if (searchItems.searchTerm) {
      setQueryData({
        field: 'searchTerm',
        value: searchItems.searchTerm,
      });
    } else {
      setQueryData({
        field: 'searchTerm',
        value: '',
      });
    }
  }, [searchItems]);

  const { data: searchData } = useGetSearchTermQuery(queryData);

  useEffect(() => {
    if (searchData?.data?.length) {
      setBookData(searchData.data);
    }
  }, [searchData]);

  return (
    <>
      <div className="text-center my-8">
        <h1 className="text-5xl font-serif">
          Collection<span className="bg-blend-color-dodge"> Books</span>
        </h1>
      </div>
      <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
        <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16">
          <div className="flex flex-col">
            <Button
              className="cursor-pointer float-left my-2 bg-cyan-500 shadow-lg shadow-cyan-500/50 focus:ring-zinc-200 focus:ring-white-500 focus:bg-white"
              variant="outline"
              onClick={() =>
                setSearchItems({
                  searchTerm: '',
                  genre: ``,
                  publicationYear: '',
                })
              }
            >
              <h1>All Book</h1>
            </Button>
            <div className="">
              <h1 className="my-2 text-sm font-bold capitalize">
                Search By Title, author or genre
              </h1>
            </div>
            <div className="w-full gap-2 ">
              <input
                type="text"
                onChange={(e) =>
                  setSearchItems({
                    searchTerm: e.target.value,
                    genre: '',
                    publicationYear: '',
                  })
                }
                className="w-full py-2 px-2 border border-gray-200/80"
                placeholder="Search By Title, author or genre"
              />
            </div>
          </div>
          <div>
            <h1 className="my-2 text-sm font-bold capitalize">
              Availability Genre
            </h1>
            <div className="flex  flex-col">
              {Array.from(uniqueGenres).map((genre, key) => (
                <Button
                  className="cursor-pointer float-left my-2 bg-cyan-500 shadow-lg shadow-cyan-500/50 focus:ring-zinc-200 focus:ring-white-500 focus:bg-white"
                  variant="outline"
                  onClick={() =>
                    setSearchItems({
                      searchTerm: '',
                      genre: `${genre}`,
                      publicationYear: '',
                    })
                  }
                  key={key}
                >
                  <h1>{genre as string}</h1>
                </Button>
              ))}
            </div>
          </div>
          <div>
            <h1 className="my-2 text-sm font-bold capitalize">
              Publication Year
            </h1>
            <div className="grid grid-cols-4 gap-4 ">
              {Array.from(uniqueYear).map((publicationYear, key) => (
                <Button
                  className="cursor-pointer float-left my-2 bg-cyan-500 shadow-lg shadow-cyan-500/50 focus:ring-zinc-200 focus:ring-white-500 focus:bg-white"
                  key={key}
                  onClick={() =>
                    setSearchItems({
                      searchTerm: '',
                      genre: '',
                      publicationYear: `${publicationYear}`,
                    })
                  }
                  variant="outline"
                >
                  <h1>{publicationYear as string}</h1>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
          {bookData.length ? (
            bookData.map((book: IBook) => <BookCard book={book} />)
          ) : (
            <div className="flex items-center justify-center mx-auto">
              <div className="w-40 h-40 border-t-4 border-b-4 border-green-900 rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
