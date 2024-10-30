import { Books } from "../features/listBooks";
import { BookListingProvider } from "../context/bookListing";

const BookListing = () => {
  return (
    <BookListingProvider>
      <Books />
    </BookListingProvider>
  );
};

export default BookListing;
