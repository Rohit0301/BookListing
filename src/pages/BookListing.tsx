import React from "react";
import { BookListingProvider } from "../context/bookListing";

const BookListing = () => {
  return (
    <BookListingProvider>
      <div>BookListing</div>
    </BookListingProvider>
  );
};

export default BookListing;
