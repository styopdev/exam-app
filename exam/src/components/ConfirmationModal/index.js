import React from "react";
import "./style.scss";

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirmation-modal-overlay">
      <div className="confirmation-modal">
        <div className="modal-content">
          <p>{message}</p>
          <div className="button-container">
            <button className="confirm-button" onClick={onConfirm}>
              Yes
            </button>
            <button className="cancel-button" onClick={onCancel}>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
