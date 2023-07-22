import BookForm from '@/components/BookForm';
import MyBookList from '@/components/MyBookList';

const EditBook = () => {
  return (
    <>
      <div className="flex justify-center items-center h-[calc(100vh-80px)] gap-10 text-primary">
        <BookForm mode={'edit'} />
        <MyBookList />
      </div>
    </>
  );
};

export default EditBook;
