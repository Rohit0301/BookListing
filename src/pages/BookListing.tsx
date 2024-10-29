import { Books } from "../features/BookListing";
import { BookListingProvider } from "../context/bookListing";

const BookListing = () => {
  return (
    <BookListingProvider>
      <Books />
    </BookListingProvider>
  );
};

export default BookListing;
