import { IBook } from "../../../types";
import { FC, ReactElement } from "react";
import AddEditBookForm from "../forms/AddEditBookForm";
import CustomModal from "../../../components/ui/CustomModal";

interface Props {
  title: string;
  okText: string;
  bookDetails?: IBook;
  buttonText?: string;
  renderButtonComponent?: ReactElement;
}

const AddEditBookModal: FC<Props> = ({
  title,
  okText,
  buttonText,
  bookDetails,
  renderButtonComponent,
}): JSX.Element => {

  return (
    <CustomModal
      showFooter
      title={title}
      okText={okText}
      showOkButton={true}
      buttonText={buttonText || okText}
      modalBody={
        <AddEditBookForm
          bookDetails={bookDetails}
        />
      }
      buttonComponent={renderButtonComponent}
      okButtonProps={{
        otherProps: { form: "add-edit-form", type: "submit" },
      }}
    />
  );
};

export default AddEditBookModal;
