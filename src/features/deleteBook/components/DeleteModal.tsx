import { FC, ReactElement } from "react";
import CustomModal from "../../../components/ui/CustomModal";
import { useBookContext } from "../../../context/bookListing";

interface Props {
  bookId: string;
  renderButtonComponent?: ReactElement;
}

const DeleteModal: FC<Props> = ({ bookId, renderButtonComponent }) => {
  const { removeBookFromList } = useBookContext() || {};
  return (
    <CustomModal
      title="Are you sure you want to delete this book?"
      showFooter
      okText="Delete"
      buttonText="open-delete-modal-btn"
      buttonComponent={renderButtonComponent}
      okButtonProps={{ color: "error" }}
      onOk={() => removeBookFromList && removeBookFromList(bookId)}
    />
  );
};
export default DeleteModal;
