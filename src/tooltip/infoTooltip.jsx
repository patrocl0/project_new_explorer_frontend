import { Popup } from "../components/popup/Popup";

export const InfoTooltip = ({ isOpen, onClose, success }) => {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <h2 className="popup__title-info">
        {success
          ? "¡El registro se ah completado con exito!"
          : "Credenciales incorrectas"}
      </h2>
    </Popup>
  );
};
