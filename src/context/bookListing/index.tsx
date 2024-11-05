import {
  FC,
  Context,
  useState,
  ReactNode,
  useEffect,
  createContext,
  useContext,
} from "react";
import { toast } from "react-toastify";

import { IBook } from "../../types";
import { parseDataWithDate } from "../../lib/utils";
import { getDataFromStorage, setDataToStorage } from "../../lib/storage";

const BOOK_LIST_KEY = "book-list";

interface IBookListingContext {
  booksList: IBook[];
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
  const [booksList, setBooksList] = useState<IBook[]>([]);
  const [selectedBook, setSeletedBook] = useState<IBook | null>(null);

  useEffect(() => {
    loadBooksFromStorage();
  }, []);

  /**
   * Loads the list of books from local storage and updates the state.
   */
  const loadBooksFromStorage = (): void => {
    setBooksList(parseDataWithDate(getDataFromStorage(BOOK_LIST_KEY)) || []);
  };

  /**
   * Updates the state with a new book list and stores it in local storage.
   * @param bookList - The updated list of books.
   */
  const storeDataToState = (bookList: IBook[]): void => {
    setBooksList(bookList);
    setDataToStorage(BOOK_LIST_KEY, bookList);
  };

  /**
   * Adds a new book to the list and stores the updated list in local storage.
   * Displays a success alert upon successful addition.
   * @param book - The book to add.
   */
  const addNewBook = (book: IBook): void => {
    const updateBookList: IBook[] = [...booksList, book];
    storeDataToState(updateBookList);
    toast.success("New book added successfully!");
  };

  /**
   * Edits the details of an existing book and updates the state and local storage.
   * Displays a success alert upon successful edit.
   * @param updatedBook - The book with updated details.
   */
  const editBookDetails = (updatedBook: IBook): void => {
    const updateBookList: IBook[] = booksList.map((book: IBook) =>
      book.id === updatedBook.id ? { ...book, ...updatedBook } : book
    );
    storeDataToState(updateBookList);
    toast.success("Book details edited successfully!");
  };

  /**
   * Removes a book from the list based on its ID, updates the state, and local storage.
   * Displays a success alert upon successful deletion.
   * @param bookId - The ID of the book to remove.
   */
  const removeBookFromList = (bookId: number): void => {
    const updateBookList: IBook[] = booksList.filter(
      (book: IBook) => book.id !== bookId
    );
    storeDataToState(updateBookList);
    toast.success("Book deleted successfully!");
  };

  return (
    <BookListingContext.Provider
      value={{
        booksList,
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
