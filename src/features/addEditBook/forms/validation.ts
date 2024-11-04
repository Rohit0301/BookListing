import * as yup from "yup";

export const addEditFormValidation: yup.ObjectSchema<
  {
    name: string;
    author: string;
    description: string;
  },
  yup.AnyObject,
  {
    name: undefined;
    author: undefined;
    description: undefined;
  },
  ""
> = yup.object({
  name: yup
    .string()
    .required("Please enter a valid book name")
    .matches(/^[A-Za-z\s]+$/, "Book name must contain letters and spaces")
    .min(2, "Book name must be at least 2 characters long")
    .max(100, "Book name must not exceed 100 characters"),
  author: yup
    .string()
    .required("Please enter a valid author")
    .matches(
      /^[A-Za-z\s.]+$/,
      "Author name must contain letters, spaces, and periods only"
    )
    .min(2, "Author name must be at least 2 characters long")
    .max(100, "Author name must not exceed 100 characters"),
  description: yup
    .string()
    .required("Please enter a valid description")
    .max(500, "Description must be less than 500 characters"),
});
