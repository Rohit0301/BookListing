import moment from "moment";
import { IBook } from "../types";

/**
 * Returns the first character of the given name, capitalized.
 * @param name - The name string.
 * @returns The first character in uppercase or an empty string if the name is falsy.
 */
export const getNameFirstCharacter = (name: string): string => {
  if (!name) return "";
  return name.charAt(0).toUpperCase();
};

/**
 * Checks if the provided input is empty.
 * It considers strings, arrays, objects, null, and undefined as valid inputs.
 * @param input - The value to check for emptiness.
 * @returns True if input is empty, otherwise false.
 */
export const isEmpty = (
  input: string | any[] | object | null | undefined
): boolean => {
  if (input == null) {
    return true;
  }

  if (typeof input === "string") {
    return input.trim().length === 0;
  }

  if (Array.isArray(input)) {
    return input.length === 0;
  }

  if (typeof input === "object") {
    return Object.keys(input).length === 0;
  }

  return false;
};

/**
 * Formats a Date object into a specified string format using moment.js.
 * @param date - The Date object to format.
 * @param format - The format string.
 * @returns The formatted date string or an empty string for invalid dates.
 */
export const dateFormatter = (date: Date, format: string): string => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return "";
  }

  return moment(date).format(format);
};

/**
 * Converts a name string into a color string based on its hash.
 * @param name - The name to convert into a color.
 * @returns A hexadecimal color string.
 */
export const stringToColor = (name: string): string => {
  let hash: number = 0;
  for (let i: number = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color: string = "#";
  for (let i = 0; i < 3; i++) {
    const value: number = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).slice(-2);
  }

  return color;
};

export const parseDataWithDate = (bookList: IBook[] | null): IBook[] | null => {
  if (Array.isArray(bookList)) {
    return bookList.map(
      (book: IBook): IBook =>
        book?.createdAt
          ? {
              ...book,
              createdAt: new Date(book?.createdAt),
            }
          : book
    );
  }
  return bookList;
};