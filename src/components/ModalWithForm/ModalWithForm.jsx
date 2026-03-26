import { useState } from "react";
import { Popup } from "../popup/Popup";

export const ModalWithForm = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
  error,
  isLoading,
}) => {
  const [formData, setFormData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e, formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose} title={title}>
      <form className="popup__form" onSubmit={handleSubmit}>
        {error && (
          <div
            style={{
              backgroundColor: "#f8d7da",
              color: "#721c24",
              padding: "12px",
              borderRadius: "4px",
              marginBottom: "15px",
              border: "1px solid #f5c6cb",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}
        {children}
      </form>
    </Popup>
  );
};
