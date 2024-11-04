import { useFormik } from "formik";
import Box from "@mui/material/Box";
import { v4 as uuidv4 } from "uuid";

import { IBook } from "../../../types";
import { isEmpty } from "../../../lib/utils";
import { addEditFormValidation } from "./validation";
import TextInput from "../../../components/ui/TextInput";
import { useBookContext } from "../../../context/bookListing";

interface Props {
  bookDetails?: IBook;
  onClose?: () => void;
}

const AddEditBookForm = ({
  onClose,
  bookDetails,
}: Props): JSX.Element => {
  const { addNewBook, editBookDetails } = useBookContext() || {};

  const formik = useFormik({
    initialValues: {
      id: bookDetails?.id || 0,
      name: bookDetails?.name || "",
      author: bookDetails?.author || "",
      createdAt: bookDetails?.createdAt || new Date(),
      description: bookDetails?.description || "",
    },
    validationSchema: addEditFormValidation,
    onSubmit: (values) => {
      handleFormSubmit(values);
      onClose && onClose();
    },
  });

  const handleFormSubmit = (formData: IBook) => {
    const submitHandler = isEmpty(bookDetails) ? addNewBook : editBookDetails;
    submitHandler &&
      submitHandler({
        ...formData,
        ...(formData?.["id"] ? {} : { id: uuidv4(), createdAt: new Date() }),
      } as any);
  };

  return (
    <Box
      noValidate
      component="form"
      id="add-edit-form"
      autoComplete="off"
      sx={{ pt: 3, pb: 4, m: "auto" }}
      className="d-flex flex-column w-75 gap-16"
      onSubmit={formik.handleSubmit}
    >
      <TextInput
        name="name"
        id="name"
        label="Book Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name ? formik.errors.name : ""}
      />
      <TextInput
        name="author"
        id="author"
        label="Author Name"
        value={formik.values.author}
        onChange={formik.handleChange}
        error={formik.touched.author ? formik.errors.author : ""}
      />
      <TextInput
        multiline
        name="description"
        id="book-description"
        label="Book Description"
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.description ? formik.errors.description : ""}
      />
    </Box>
  );
};

export default AddEditBookForm;
