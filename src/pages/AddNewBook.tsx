import BookForm from '@/components/BookForm';
import MyBookList from '@/components/MyBookList';

export default function AddNewBook() {
  return (
    <>
      <div className="flex justify-center items-center h-[calc(100vh-80px)] gap-10 text-primary">
        <BookForm mode={'create'} />
        <MyBookList />
      </div>
    </>
  );
}
