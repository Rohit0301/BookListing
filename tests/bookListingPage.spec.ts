import { mockBookData } from "./mockData";
import { test, expect, type Page } from "@playwright/test";

test.beforeEach(async ({ page }: { page: Page }) => {
  await page.goto("http://localhost:3000");
  // Adding inital books data into localstorage
  await page.evaluate((data) => {
    localStorage.setItem("book-list", JSON.stringify(data));
  }, mockBookData);
});

test.describe("Book listing page", () => {
  test("Render page title, navbar and no-books-found text correctly", async ({
    page,
  }: {
    page: Page;
  }) => {
    await expect(page).toHaveTitle("Book Listing");
    await expect(
      page.getByRole("heading", { name: "Books List" })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Add New Book" })
    ).toBeVisible();
    await expect(page.getByText("No Books Found")).toBeVisible();
  });

  test("Render Book cards correctly with initial data", async ({ page }: { page: Page }) => {
    await page.reload();
    mockBookData.forEach(async (book) => {
      await expect(page.getByText(book.name)).toBeVisible();
    });
  });

  test("Render Add/edit book modal correctly", async ({
    page,
  }: {
    page: Page;
  }) => {
    await page.getByRole("button", { name: "Add New Book" }).click();
    await expect(
      page.getByRole("heading", { name: "Add New Book" })
    ).toBeVisible();
    // Checking if all labels, buttons and fields are rendered correctly or not
    await expect(page.getByText("Book Name")).toBeVisible();
    await expect(page.getByText("Author Name")).toBeVisible();
    await expect(page.getByText("Book Description")).toBeVisible();
    await expect(page.getByPlaceholder("Book Name")).toBeVisible();
    await expect(page.getByPlaceholder("Author Name")).toBeVisible();
    await expect(page.getByPlaceholder("Book Description")).toBeVisible();
    await expect(page.getByRole("button", { name: "Cancel" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Add Book" })).toBeVisible();
  });

  test("Render form validation errors correctly", async ({
    page,
  }: {
    page: Page;
  }) => {
    await page.getByRole("button", { name: "Add New Book" }).click();
    // Filling book details form with incorrect values to check validations
    await page.getByLabel("Book Name").fill("Harry Potter");
    await page.getByLabel("Author Name").fill("Author123");
    await page.getByRole("button", { name: "Add Book" }).click();
    await expect(
      page.getByText(
        "Author name must contain letters, spaces, and periods only"
      )
    ).toBeVisible();
    expect(page.getByText("Please enter a valid description")).toBeVisible();
  });

  test("Add new book and render new book card correctly", async ({
    page,
  }: {
    page: Page;
  }) => {
    await page.reload();
    // Filling book details form with correct values
    await page.getByRole("button", { name: "Add New Book" }).click();
    await page.getByLabel("Book Name").fill("Test Book Name");
    await page.getByLabel("Author Name").fill("Test Author Name");
    await page.getByLabel("Description").fill("Test Description");
    await page.getByRole("button", { name: "Add Book" }).click();

    // Checking if book details updated successfully on card or not
    await expect(page.getByText("Test Book Name")).toBeVisible();
    await expect(page.getByText("Test Author Name")).toBeVisible();
    await expect(page.getByText("Test Description")).toBeVisible();
  });

  test("Edit previously added book and render updated book card correctly", async ({
    page,
  }: {
    page: Page;
  }) => {
    await page.reload();
    await page.getByLabel("Edit Book").first().click();
    // Checking if the fields are already filled with correct values
    await expect(page.getByLabel("Book Name")).toHaveValue(
      mockBookData[0].name
    );
    await expect(page.getByLabel("Author Name")).toHaveValue(
      mockBookData[0].author
    );
    await expect(page.getByLabel("Description")).toHaveValue(
      mockBookData[0].description
    );

    // Entering new field values and save it
    await page.getByLabel("Book Name").clear();
    await page.getByLabel("Book Name").fill("Updated Test Book Name");
    await page.getByLabel("Author Name").clear();
    await page.getByLabel("Author Name").fill("Updated Test Author Name");
    await page.getByRole("button", { name: "Edit Book" }).click();

    // Checking if book details updated successfully on card or not
    await expect(page.getByText("Updated Test Book Name")).toBeVisible();
    await expect(page.getByText("Updated Test Author Name")).toBeVisible();
    await expect(page.getByText(mockBookData[0].description)).toBeVisible();
  });

  test("Render delete modal correctly and delete book and remove book card from UI", async ({
    page,
  }: {
    page: Page;
  }) => {
    page.reload();
    // Checking if delete modal is rendered correctly or not.
    await page.getByLabel("open-delete-modal-btn").first().click();
    expect(
      page.getByRole("heading", {
        name: "Are you sure you want to delete this book?",
      })
    );
    await expect(page.getByRole("button", { name: "Cancel" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Delete" })).toBeVisible();

    // Deleting the book and remove its card from UI
    page.getByRole("button", { name: "Delete" }).click();
    await expect(page.getByText(mockBookData[0].name)).toBeHidden();
    await expect(page.getByText(mockBookData[0].author)).toBeHidden();
    await expect(page.getByText(mockBookData[0].description)).toBeHidden();
  });
});
