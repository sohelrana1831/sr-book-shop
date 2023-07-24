import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  useAddBookMutation,
  useEditBookMutation,
  useGetBooksQuery,
} from '@/redux/features/book/bookApi';
import { useAppSelector } from '@/redux/hooks';
import { IBook } from '@/types/globalTypes';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from './ui/use-toast';

interface BookFormInputs {
  author: string;
  title: string;
  genre: string;
  publicationDate: Date | string;
  imageLink?: string;
}
interface IMode {
  mode: string;
}

const BookForm = ({ mode }: IMode) => {
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<BookFormInputs>();

  const { users } = useAppSelector((state) => state.users);
  const [addBook] = useAddBookMutation();
  const [editBook] = useEditBookMutation();
  useEffect(() => {
    if (mode === 'edit' && singleBook) {
      // Set the default values after singleBook is available
      setValue('title', singleBook.title);
      setValue('author', singleBook.author);
      setValue('genre', singleBook.genre);
      // Format the date before setting it as the default value
      const formattedDate = new Date(singleBook.publicationDate)
        .toISOString()
        .split('T')[0];
      setValue('publicationDate', formattedDate);

      setValue('imageLink', singleBook.imageLink);
    }
  }, [id, mode, setValue, singleBook]);

  const onSubmit = (value: BookFormInputs) => {
    const dateObject = new Date(value.publicationDate);
    const year = dateObject.getFullYear();
    const payload = {
      ...value,
      publicationYear: year,
      userEmail: users.email,
    };

    mode === 'edit' ? editBook({ _id: id, ...payload }) : addBook(payload);
    toast({
      description:
        mode === 'edit'
          ? 'Book edited successfully!'
          : 'Book added successfully!',
    });
    reset();
  };
  return (
    <>
      <div className="max-w-3xl w-full mb-16 bg-gray-100">
        <header className="px-8 py-8">
          <h1 className="text-2xl font-semibold">
            {mode === 'edit' ? 'Update Book' : 'Add New Book'}
          </h1>
        </header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="h-[60vh] border border-gray-300 rounded-md p-10 overflow-auto">
            <div className="flex gap-5">
              <div className="w-full space-y-5">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    type="text"
                    {...register('title', { required: true })}
                    id="title"
                    className="mt-2"
                  />
                  {errors.title && (
                    <span className="float-right  text-red-500">
                      This title is required
                    </span>
                  )}
                </div>
                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input
                    type="text"
                    {...register('author', { required: true })}
                    id="author"
                    className="mt-2"
                  />
                  {errors.author && (
                    <span className="float-right  text-red-500">
                      This author is required
                    </span>
                  )}
                </div>
              </div>
              <div className="w-full space-y-5">
                <div>
                  <Label htmlFor="genre">Genre</Label>
                  <Input
                    type="text"
                    {...register('genre', { required: true })}
                    id="genre"
                    className="mt-2"
                  />
                  {errors.genre && (
                    <span className="float-right  text-red-500">
                      This genre is required
                    </span>
                  )}
                </div>
                <div>
                  <Label className="mb-3" htmlFor="publicationDate">
                    Publication Date
                  </Label>

                  <Input
                    className="mt-2"
                    type="date"
                    {...register('publicationDate', { required: true })}
                  />
                  {errors.publicationDate && (
                    <span className="float-right  text-red-500">
                      This date is required
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full space-y-5">
              <div>
                <Label htmlFor="imageLink">Image link</Label>
                <Input
                  type="url"
                  placeholder="Enter book image url"
                  {...register('imageLink', { required: true })}
                  id="imageLink"
                  className="mt-2"
                />
                {errors.imageLink && <p>{errors.imageLink.message}</p>}
              </div>
            </div>
            <Button type="submit" className="w-full mt-4">
              {mode === 'edit' ? 'Update' : 'Submit'}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BookForm;
