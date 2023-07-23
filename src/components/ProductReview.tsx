import { IReview } from '@/types/globalTypes';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { FiSend } from 'react-icons/fi';
interface IProps {
  review: IReview[];
}
export default function ProductReview({ review }: IProps) {
  return (
    <div className="max-w-7xl mx-auto mt-5">
      <div className=" my-8">
        <h1 className="text-2xl font-semibold capitalize font-serif">
          Add Review{' '}
        </h1>
      </div>
      <div className="flex gap-5 items-center">
        <Textarea className="min-h-[30px]" />
        <Button className="rounded-full h-10 w-10 p-2 text-[25px]">
          <FiSend />
        </Button>
      </div>
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
}
