import { Button } from '@/components/ui/button';
import hero from '@/assets/images/hero.png';
import Footer from '@/layouts/Footer';
import { IBook } from '@/types/globalTypes';
import BookCard from '@/components/BookCard';
import { useGetBooksQuery } from '@/redux/features/book/bookApi';

export default function Home() {
  const { data } = useGetBooksQuery(undefined);

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
          <Button
            variant={'outline'}
            className="cursor-pointer float-left my-2 bg-cyan-500 shadow-lg shadow-cyan-500/50 focus:ring-zinc-200 focus:ring-white-500 focus:bg-white"
          >
            Learn more
          </Button>
        </div>
        <div className="relative -right-14">
          <img src={hero} alt="" />
        </div>
      </div>
      <div className="text-center my-8">
        <h1 className="text-5xl font-thin">
          Multi pure <span className="bg-blend-color-dodge">Books</span>
        </h1>
      </div>
      <div className="col-span-9 grid grid-cols-3 gap-10 pb-20 w-full md:max-w-7xl h-full mx-auto ">
        {data !== undefined ? (
          data.data.slice(0, 10).map((book: IBook) => <BookCard book={book} />)
        ) : (
          <div className="flex items-center justify-center mx-auto">
            <div className="w-40 h-40 border-t-4 border-b-4 border-green-900 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
