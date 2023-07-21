import { IBook } from '@/types/globalTypes';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { MdDeleteForever } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';

const MyBookList = () => {
  const [data, setData] = useState<IBook[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch('./data.json')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const handleDeleteTour = (id: number | string) => {
    const proceed = window.confirm('Are you sure, You went to delete');
    console.log(id);
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
                    data &&
                    data.map((book) => (
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
                              src={book.image_link}
                            />
                          </div>
                        </td>

                        <td className="px-2 py-2 text-center">
                          <p className="w-32 overflow-hidden overflow-ellipsis">
                            {book.author}
                          </p>
                        </td>

                        <td className="px-2 py-2 text-center">
                          <Button className="text-red-500 hover:underline px-2 py-0">
                            <Link
                              to={`/update-tour/${book.id}`}
                              className="text-primary hover:underline"
                            >
                              <FiEdit />
                            </Link>
                          </Button>
                          <span className="px-2">|</span>
                          <Button
                            onClick={() => handleDeleteTour(book?.id)}
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