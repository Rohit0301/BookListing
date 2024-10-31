import {
  useState,
  useEffect,
  FormEvent,
  forwardRef,
  useCallback,
  useImperativeHandle,
} from "react";
import Box from "@mui/material/Box";
import { generateUniqueId, isEmpty } from "../../../lib/utils";
import TextInput from "../../../components/ui/TextInput";
import { useBookContext } from "../../../context/bookListing";

interface Props {
  setDisabledButton: (val: boolean) => void;
}

const AddEditBookForm = forwardRef(
  ({ setDisabledButton }: Props, ref): JSX.Element => {
    const { addNewBook } = useBookContext() || {};
    const [formData, setFormData] = useState<{ [key: string]: string }>({});
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    useImperativeHandle(ref, () => ({
      submitForm: handleFormSubmit,
    }));

    const isFormValid = useCallback((): boolean => {
      if (isEmpty(formErrors)) return false;
      return (
        !Boolean(formErrors["name"] ?? 1) &&
        !Boolean(formErrors["author"] ?? 1) &&
        !Boolean(formErrors["description"] ?? 1)
      );
    }, [formErrors]);

    useEffect(() => {
      const isValid: boolean = isFormValid();
      setDisabledButton(!isValid);
    }, [formErrors, isFormValid, setDisabledButton]);

    const validateFormData = (name: string, value: string): string => {
      if (isEmpty(value)) {
        return `Please enter a valid ${name}`;
      }
      switch (name) {
        case "author":
          return /^[A-Za-z\s.]+$/.test(value)
          ? ""
          : "Author name must contain letters and periods only";
        case "description":
          return value.length <= 500
            ? ""
            : "Description must be less than 500 characters";
        default:
          return "";
      }
    };

    const handleFormChange = (value: string, name: string): void => {
      setFormErrors((prev) => ({
        ...prev,
        [name]: validateFormData(name, value),
      }));
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = () => {
      addNewBook &&
        addNewBook({
          ...formData,
          id: generateUniqueId(),
          createdAt: new Date(),
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
        onSubmit={(event: FormEvent<HTMLFormElement>) => event.preventDefault()}
      >
        <TextInput
          name="name"
          id="book-name"
          error={formErrors?.["name"]}
          label="Book Name"
          value={formData?.["name"] || ""}
          onChange={handleFormChange}
        />
        <TextInput
          name="author"
          id="author-name"
          label="Author Name"
          error={formErrors?.["author"]}
          value={formData?.["author"] || ""}
          onChange={handleFormChange}
        />
        <TextInput
          multiline
          name="description"
          id="book-description"
          label="Book Description"
          error={formErrors?.["description"]}
          value={formData?.["description"] || ""}
          onChange={handleFormChange}
        />
      </Box>
    );
  }
);

export default AddEditBookForm;