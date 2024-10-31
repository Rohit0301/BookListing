import { Books } from "../features/listBooks";
import AddBookHeader from "../features/addEditBook";
import { BookListingProvider } from "../context/bookListing";

const BookListing = () => {
  return (
    <BookListingProvider>
      <AddBookHeader />
      <Books />
    </BookListingProvider>
  );
};

export default BookListing;
