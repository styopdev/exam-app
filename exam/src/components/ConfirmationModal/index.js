import React from "react";
import "./style.scss";
import Modal from "components/Question/Modal";

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <Modal
      message={message}
      onConfirm={onConfirm}
      onCancel={onCancel}
      confirmLabel="Yes"
      cancelLabel="No"
    />
  );
};

export default ConfirmationModal;
