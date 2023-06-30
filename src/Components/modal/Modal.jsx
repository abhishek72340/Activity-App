import { createPortal } from "react-dom";
import  "./Modal.css";

const Modal = ({ onClose, children }) => {
  return createPortal(
    <>
      <div className="overlay" onClick={onClose} />
      <div className="modal">
        {children}
       

      </div>
    </>,
    document.getElementById("modal")
  );
};

export default Modal;