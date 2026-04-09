import { Popup } from "../components/popup/Popup";

export const InfoTooltip = ({ isOpen, onClose, success, text }) => {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <h2 className="popup__title-info">
        {success ? text : "Credenciales incorrectas"}
      </h2>
    </Popup>
  );
};
// ""
