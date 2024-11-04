import { IBook } from "../types";
import { setDataToStorage, getDataFromStorage } from "./storage";
import { parseDataWithDate } from "./utils";

// Mocking the alert function
const mockShowFailureAlert = jest.fn();

describe("localStorage Utility Functions", () => {
  const sampleKey = "bookList";
  const sampleBookList: IBook[] = [
    {
      id: 1,
      name: "Harry potter",
      author: "J. K. Rowling",
      createdAt: new Date(),
      description:
        "Harry Potter is a series of seven fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends, Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry. ",
    },
  ];

  // Clearing storage before each test
  beforeEach(() => {
    localStorage.clear();
  });

  test("sets and get an object from localStorage", () => {
    setDataToStorage(sampleKey, sampleBookList);
    const result: IBook[] | null =
      getDataFromStorage<typeof sampleBookList>(sampleKey);
    expect(parseDataWithDate(result)).toEqual(sampleBookList);
  });

  test("returns null if the key does not exist in localStorage", () => {
    const result = getDataFromStorage<typeof sampleBookList>("invalid-key");
    expect(result).toBeNull();
  });

  test("handles invalid JSON data gracefully", () => {
    localStorage.setItem(sampleKey, "invalid-json");
    const result = getDataFromStorage<typeof sampleBookList>(sampleKey);
    expect(result).toBeNull();
  });

  test("shows alert on error while setting data", () => {
    // Override localStorage to throw an error
    const originalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = jest.fn(() => {
      throw new Error("Storage error");
    });
    setDataToStorage(sampleKey, sampleBookList, mockShowFailureAlert);
    expect(mockShowFailureAlert).toHaveBeenCalledWith("Something went wrong while storing data");

    // Restore the original implementation
    Storage.prototype.setItem = originalSetItem;
  });

  test("shows alert on error while getting data", () => {
    // Override localStorage to throw an error
    const originalGetItem = Storage.prototype.getItem;
    Storage.prototype.getItem = jest.fn(() => {
      throw new Error("Storage error");
    });

    const result = getDataFromStorage<typeof sampleBookList>(sampleKey, mockShowFailureAlert);
    expect(result).toBeNull();
    expect(mockShowFailureAlert).toHaveBeenCalledWith("Something went wrong while fetching data");

    // Restore the original implementation
    Storage.prototype.getItem = originalGetItem;
  });
});
