import { Books } from "../features/listBooks";
import { BookListingProvider } from "../context/bookListing";
import AddEditBookModal from "../features/addEditBook/components/AddEditBookModal";

const BookListing = () => {
  return (
    <BookListingProvider>
      <AddEditBookModal
        title="Add New Book"
        buttonText="Add New Book"
        okText="Add Book"
      />
      <Books />
    </BookListingProvider>
  );
};

export default BookListing;
