import React from "react";

function ConfirmationModal({
  message,
  onConfirm,
  onCancel,
  confirmLabel,
  cancelLabel,
  onFinishExam,
}) {
  const handleConfirm = () => {
    onConfirm();
    if (onFinishExam) {
      onFinishExam();
    }
  };

  return (
    <div className="confirmation-modal-overlay">
      <div className="confirmation-modal">
        <div className="modal-content">
          <p>{message}</p>
          <div className="button-container">
            <button className="confirm-button" onClick={handleConfirm}>
              {confirmLabel}
            </button>
            <button className="cancel-button" onClick={onCancel}>
              {cancelLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
