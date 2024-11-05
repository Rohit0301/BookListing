import { toast } from "react-toastify";

import { IBook } from "../types";
import { parseDataWithDate } from "./utils";
import { mockBooksList } from "../constants/mock";
import { setDataToStorage, getDataFromStorage } from "./storage";


describe("localStorage Utility Functions", () => {
  const sampleKey = "bookList";

  // Clearing storage before each test
  beforeEach(() => {
    localStorage.clear();
  });

  test("sets and get an object from localStorage", () => {
    setDataToStorage(sampleKey, mockBooksList);
    const result: IBook[] | null =
      getDataFromStorage<typeof mockBooksList>(sampleKey);
    expect(parseDataWithDate(result)).toEqual(mockBooksList);
  });

  test("returns null if the key does not exist in localStorage", () => {
    const result = getDataFromStorage<typeof mockBooksList>("invalid-key");
    expect(result).toBeNull();
  });

  test("handles invalid JSON data gracefully", () => {
    localStorage.setItem(sampleKey, "invalid-json");
    const result = getDataFromStorage<typeof mockBooksList>(sampleKey);
    expect(result).toBeNull();
  });

  test("shows alert on error while setting data", () => {
    // Override localStorage to throw an error
    jest.spyOn(toast, "error");
    const originalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = jest.fn(() => {
      throw new Error("Storage error");
    });
    setDataToStorage(sampleKey, mockBooksList);
    expect(toast.error).toHaveBeenCalledWith("Something went wrong while storing data");

    // Restore the original implementation
    Storage.prototype.setItem = originalSetItem;
  });

  test("shows alert on error while getting data", () => {
    // Override localStorage to throw an error
    jest.spyOn(toast, "error");
    const originalGetItem = Storage.prototype.getItem;
    Storage.prototype.getItem = jest.fn(() => {
      throw new Error("Storage error");
    });

    const result = getDataFromStorage<typeof mockBooksList>(sampleKey);
    expect(result).toBeNull();
    expect(toast.error).toHaveBeenCalledWith("Something went wrong while fetching data");

    // Restore the original implementation
    Storage.prototype.getItem = originalGetItem;
  });
});
