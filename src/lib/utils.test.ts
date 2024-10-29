import { IBook } from "../features/BookListing/types";
import {
  dateFormatter,
  getNameFirstCharacter,
  isEmpty,
  parseDataWithDate,
} from "./utils";

describe("getNameFirstCharacter", () => {
  test("returns first character in uppercase for a non-empty string", () => {
    expect(getNameFirstCharacter("hello")).toBe("H");
  });

  test("returns an empty string if name is empty", () => {
    expect(getNameFirstCharacter("")).toBe("");
  });

  test("handles null and undefined inputs", () => {
    expect(getNameFirstCharacter(null as any)).toBe("");
    expect(getNameFirstCharacter(undefined as any)).toBe("");
  });
});

describe("isEmpty", () => {
  test("returns true for null and undefined", () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
  });

  test("returns true for an empty string", () => {
    expect(isEmpty("")).toBe(true);
  });

  test("returns false for a non-empty string", () => {
    expect(isEmpty("hello")).toBe(false);
  });

  test("returns true for an empty array", () => {
    expect(isEmpty([])).toBe(true);
  });

  test("returns false for a non-empty array", () => {
    expect(isEmpty([1, 2, 3])).toBe(false);
  });

  test("returns true for an empty object", () => {
    expect(isEmpty({})).toBe(true);
  });

  test("returns false for a non-empty object", () => {
    expect(isEmpty({ key: "value" })).toBe(false);
  });
});

describe("dateFormatter", () => {
  test("formats date according to specified format", () => {
    const date = new Date("2023-10-01");
    expect(dateFormatter(date, "YYYY-MM-DD")).toBe("2023-10-01");
  });

  test("returns an empty string if date is not a valid Date object", () => {
    expect(dateFormatter(new Date("invalid-date"), "YYYY-MM-DD")).toBe("");
    expect(dateFormatter(null as any, "YYYY-MM-DD")).toBe("");
    expect(dateFormatter(undefined as any, "YYYY-MM-DD")).toBe("");
  });
});

describe("parseDataWithDate", () => {
  const date: Date = new Date();
  test("return date with Date type instead of string type", () => {
    expect(
      parseDataWithDate([
        { createdAt: `${date}` },
      ] as any)?.[0]?.createdAt.getDate()
    ).toEqual(date.getDate());
  });

  test("return same if createat not present in object", () => {
    expect(parseDataWithDate([{ name: "Harry Potter" }] as IBook[])).toEqual([
      { name: "Harry Potter" },
    ]);
  });
});
