export const Popup = ({ isOpen, onClose, title, children }) => {
  return (
    <div
      className={`popup ${isOpen ? "popup--opened" : ""}`}
      onMouseDown={(e) => {
        if (e.target.classList.contains("popup")) {
          onClose();
        }
      }}
    >
      <div className="popup__content">
        <button
          aria-label="Close modal"
          className="popup__close"
          type="button"
          onClick={onClose}
        >
          <i className="popup__close-button fa-solid fa-x"></i>
        </button>
        {title && <h3 className="popup__title">{title}</h3>}
        {children}
      </div>
    </div>
  );
};
