import React from "react";
import "./Modal.css"; // optional for styling

interface ModalProps {
  onClose: () => void;
}

const MetrobankModal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Background image */}
        <div className="modal-background">
          <img src="/path/to/your/background.png" alt="Metrobank Background" />
        </div>

        {/* Content */}
        <div className="modal-content">
          <h2>Do more on Metrobank Online!</h2>
          <p>
            Send money, pay bills, invest, buy prepaid load, and transfer funds.
          </p>
          <p>
            We can help you whether you are a new user, signing up, or you want
            to upgrade from Metrobankdirect Personal.
          </p>

          <div className="modal-actions">
            <button className="primary-btn">Help me sign up</button>
            <button className="secondary-btn">Help me upgrade</button>
          </div>

          <div className="modal-footer">
            <label>
              <input type="checkbox" /> Do not show this next time
            </label>
          </div>

          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default MetrobankModal;
