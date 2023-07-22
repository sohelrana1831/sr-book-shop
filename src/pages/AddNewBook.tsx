import MyBookList from '@/components/MyBookList';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppDispatch } from '@/redux/hooks';
import { useForm } from 'react-hook-form';

interface BookFormInputs {
  author: string;
  title: string;
  genre: string;
  publication_date: Date | string;
  image_link?: string;
  // selected?: Date | null | undefined;
}

export default function AddNewBook() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookFormInputs>();

  const dispatch = useAppDispatch();

  const onSubmit = (data: BookFormInputs) => {
    console.log(data);
  };

  return (
    <>
      <div className="flex justify-center items-center h-[calc(100vh-80px)] gap-10 text-primary">
        <div className="max-w-3xl w-full mb-16 bg-gray-100">
          <header className="px-8 py-8">
            <h1 className="text-2xl font-semibold">Add New Book</h1>
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
                    <Label className="mb-3" htmlFor="publication_date">
                      Publication Date
                    </Label>

                    <Input
                      className="mt-2"
                      type="date"
                      {...register('publication_date', { required: true })}
                    />
                    {errors.publication_date && (
                      <span className="float-right  text-red-500">
                        This date is required
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full space-y-5">
                <div>
                  <Label htmlFor="image_link">Image link</Label>
                  <Input
                    type="url"
                    placeholder="Enter book image url"
                    name="image_link"
                    id="image_link"
                    className="mt-2"
                  />
                  {errors.image_link && <p>{errors.image_link.message}</p>}
                </div>
              </div>
              <Button type="submit" className="w-full mt-4">
                Submit
              </Button>
            </div>
          </form>
        </div>
        <MyBookList />
      </div>
    </>
  );
}
