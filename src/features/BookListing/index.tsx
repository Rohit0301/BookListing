import Box from "@mui/material/Box";

import { IBook } from "./types";
import { isEmpty } from "../../lib/utils";
import BookCard from "./components/BookCard";
import { useBookContext } from "../../context/bookListing";
import { NoBooksFound } from "./components/NoBooksFound";

import styles from "./styles.module.css";

export const Books = (): JSX.Element => {
  const { booksList = [] } = useBookContext() || {};
  if (isEmpty(booksList)) return <NoBooksFound />;
  return (
    <Box className={styles.card_container} aria-label="books-container">
      {booksList.map((book: IBook) => (
        <BookCard key={book.id} bookDetails={book} />
      ))}
    </Box>
  );
};
