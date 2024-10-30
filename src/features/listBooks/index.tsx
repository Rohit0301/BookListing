import { IBook } from "./types";
import Grid2 from "@mui/material/Grid2";
import { isEmpty } from "../../lib/utils";
import BookCard from "./components/BookCard";
import { useBookContext } from "../../context/bookListing";
import { NoBooksFound } from "./components/NoBooksFound";

export const Books = (): JSX.Element => {
  const { booksList = [] } = useBookContext() || {};
  if (isEmpty(booksList)) return <NoBooksFound />;
  return (
    <Grid2
      container
      sx={{ p: 2 }}
      spacing={{ xs: 2 }}
      columns={{ xs: 12 }}
      aria-label="books-container"
    >
      {booksList.map((book: IBook) => (
        <Grid2 key={book.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <BookCard bookDetails={book} />
        </Grid2>
      ))}
    </Grid2>
  );
};
