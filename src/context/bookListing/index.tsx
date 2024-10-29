import {
  FC,
  Context,
  useState,
  ReactNode,
  useEffect,
  createContext,
  useContext,
} from "react";
import { IBook } from "../../features/BookListing/types";
import { getDataFromStorage, setDataToStorage } from "../../lib/storage";

const BOOK_LIST_KEY = "book-list";

interface IBookListingContext {
  bookList: IBook[];
  selectedBook: IBook | null;
  addNewBook: (book: IBook) => void;
  editBookDetails: (book: IBook) => void;
  removeBookFromList: (bookId: number) => void;
  setSeletedBook: (book: IBook | null) => void;
}

export const BookListingContext: Context<IBookListingContext | null> =
  createContext<IBookListingContext | null>(null);

export const BookListingProvider: FC<{ children: ReactNode }> = ({
  children,
}): JSX.Element => {
  const [bookList, setBookList] = useState<IBook[]>([]);
  const [selectedBook, setSeletedBook] = useState<IBook | null>(null);

  useEffect(() => {
    loadBooksFromStorage();
  }, []);

  const loadBooksFromStorage = (): void => {
    setBookList(getDataFromStorage(BOOK_LIST_KEY) || []);
  };

  const storeDataToState = (bookList: IBook[]): void => {
    setBookList(bookList);
    setDataToStorage(BOOK_LIST_KEY, bookList);
  };

  const addNewBook = (book: IBook): void => {
    const updateBookList: IBook[] = [...bookList, book];
    storeDataToState(updateBookList);
  };

  const editBookDetails = (updatedBook: IBook): void => {
    const updateBookList: IBook[] = bookList.map((book: IBook) =>
      book.id === updatedBook.id ? { ...book, ...updatedBook } : book
    );
    storeDataToState(updateBookList);
  };

  const removeBookFromList = (bookId: number): void => {
    const updateBookList: IBook[] = bookList.filter(
      (book: IBook) => book.id !== bookId
    );
    storeDataToState(updateBookList);
  };

  return (
    <BookListingContext.Provider
      value={{
        bookList,
        selectedBook,
        addNewBook,
        editBookDetails,
        removeBookFromList,
        setSeletedBook,
      }}
    >
      {children}
    </BookListingContext.Provider>
  );
};

export const useBookContext = (): IBookListingContext | null => {
  const context: IBookListingContext | null = useContext(BookListingContext);
  if (context === undefined) {
    throw new Error("useBookContext must be used within a BookListingProvider");
  }
  return context;
};
