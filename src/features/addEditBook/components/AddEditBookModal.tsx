import { FC, ReactElement, useRef, useState } from "react";
import AddEditBookForm from "../forms/AddEditBookForm";
import CustomModal from "../../../components/ui/CustomModal";

interface Props {
  title: string;
  okText: string;
  renderButtonComponent?: ReactElement;
}

const AddEditBookModal: FC<Props> = ({
  title,
  okText,
  renderButtonComponent,
}) => {
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const formRef = useRef<{ submitForm: Function }>(null);

  const handleOk = () => {
    formRef.current?.submitForm();
  };
  return (
    <CustomModal
      showFooter
      title={title}
      okText={okText}
      buttonText={okText}
      onOk={handleOk}
      modalBody={
        <AddEditBookForm ref={formRef} setDisabledButton={setDisabledButton} />
      }
      buttonComponent={renderButtonComponent}
      okButtonProps={{ disabled: disabledButton }}
    />
  );
};

export default AddEditBookModal;
