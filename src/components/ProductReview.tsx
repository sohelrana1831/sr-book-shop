import { IReview } from '@/types/globalTypes';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { FiSend } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '@/redux/hooks';
import { useAddReviewMutation } from '@/redux/features/book/bookApi';
import { Link, useParams } from 'react-router-dom';
import { toast } from './ui/use-toast';
interface IProps {
  review: IReview[];
}
const ProductReview = ({ review }: IProps) => {
  const { id } = useParams();
  const { users } = useAppSelector((state) => state.users);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [addReview] = useAddReviewMutation();
  const onSubmit = (value: any) => {
    const payload = {
      ...value,
      _id: id,
      reviewBy: users.email,
    };
    addReview(payload);
    reset();
    toast({
      description: 'Review added successfully!',
    });
  };
  return (
    <div className="max-w-7xl mx-auto mt-5">
      <div className=" my-8">
        <h1 className="text-2xl font-semibold capitalize font-serif">
          Add Review{' '}
        </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-5 items-center">
          <Textarea
            {...register('review', { required: true })}
            className="min-h-[30px]"
          />
          {errors.review && (
            <span className="float-right  text-red-500">
              Review is required
            </span>
          )}

          {users.email ? (
            <Button
              variant={'outline'}
              className="rounded-full h-10 w-10 p-2 text-[25px]  bg-cyan-500 shadow-lg shadow-cyan-500/50 focus:ring-zinc-200 focus:ring-white-500 focus:bg-white"
            >
              <FiSend />
            </Button>
          ) : (
            <Link to="/login">
              <Button className="rounded-full h-10 w-10 p-2 text-[25px]">
                <FiSend />
              </Button>
            </Link>
          )}
        </div>
      </form>
      <div className=" my-8">
        <h1 className="text-2xl font-semibold capitalize font-serif">
          Read Reviews{' '}
        </h1>
      </div>
      <div className="mt-10 h-96 overflow-auto">
        {review?.map((comment: IReview, index: number) => (
          <div
            key={index}
            className="flex gap-3  mb-5  bg-white rounded-xl shadow-md overflow-hidden"
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="font-mono">
              {comment.review as string} <br />
              <p className="text-sm m-4 text-gray-600 capitalize font-light">
                Review by-{' '}
                {comment?.reviewBy
                  ? comment?.reviewBy.slice(0, comment?.reviewBy.indexOf('@'))
                  : 'anonymous'}
              </p>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProductReview;
