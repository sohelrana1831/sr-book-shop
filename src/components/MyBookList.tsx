import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { MdDeleteForever } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import {
  useDeleteBookMutation,
  useGetBooksQuery,
} from '@/redux/features/book/bookApi';
import { IBook } from '@/types/globalTypes';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { toast } from './ui/use-toast';

const MyBookList = () => {
  const [bookData, setBookData] = useState<IBook[]>([]);
  const { data, isLoading } = useGetBooksQuery(undefined);
  const { users } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (data !== undefined) {
      const filterData = data?.data?.filter(
        (item: IBook) => item.userEmail === users?.email
      );
      setBookData(filterData);
    }
  }, [data, users?.email]);

  const [deleteBook] = useDeleteBookMutation();

  const handleDeleteBook = (id: string) => {
    const proceed = window.confirm('Are you sure, You went to delete');
    if (proceed) {
      deleteBook(id);
      toast({ description: 'Delete Successfully!' });
    }
  };

  return (
    <>
      <div className="max-w-lg w-full">
        <main className="bg-gray-100 w-full mb-16 ">
          <header className="px-8 py-8">
            <h1 className="text-2xl font-semibold">My Books List</h1>
          </header>

          <div className="h-[60vh] border border-gray-300 rounded-md p-2 overflow-auto">
            <div className="overflow-x-auto w-full">
              <table className="mx-auto  w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden">
                <thead className="bg-gray-900">
                  <tr className="text-white text-left">
                    <th className="font-semibold text-sm uppercase px-2 py-2">
                      Title
                    </th>
                    <th className="font-semibold text-sm uppercase px-2 py-2">
                      Image
                    </th>
                    <th className="font-semibold text-sm uppercase px-2 py-2">
                      Author
                    </th>
                    <th className="font-semibold text-sm uppercase px-2 py-2">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {isLoading ? (
                    <div className="flex items-center justify-center mx-auto">
                      <div className="w-40 h-40 border-t-4 border-b-4 border-green-900 rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    bookData &&
                    bookData?.map((book: IBook) => (
                      <tr key={book.id}>
                        <td className="px-2 py-2">
                          <p className="w-32 overflow-hidden overflow-ellipsis">
                            {book.title}{' '}
                          </p>
                        </td>
                        <td className="px-2 py-2">
                          <div className="inline-flex w-10">
                            <img
                              className=" rounded-md"
                              alt="avatar"
                              src={book.imageLink}
                            />
                          </div>
                        </td>

                        <td className="px-2 py-2 text-center">
                          <p className="w-32 overflow-hidden overflow-ellipsis">
                            {book.author}
                          </p>
                        </td>

                        <td className="px-2 py-2 text-center">
                          <Link
                            to={`/edit-book/${book.id}`}
                            className="text-primary hover:underline"
                          >
                            <Button className="text-white hover:underline px-2 py-0">
                              <FiEdit />
                            </Button>
                          </Link>
                          <span className="px-2">|</span>
                          <Button
                            onClick={() => handleDeleteBook(book?.id as string)}
                            className="text-red-500 hover:underline px-2 py-0"
                          >
                            {/* <i className="far fa-trash-alt text-2xl"></i> */}
                            <MdDeleteForever />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default MyBookList;
