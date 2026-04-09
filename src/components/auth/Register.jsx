import { ModalWithForm } from "../ModalWithForm";

export const Register = ({
  isOpen,
  onClose,
  onSubmit,
  onSwitchToLogin,
  data,
  handleChange,
  errors,
  isValid,
  serverError,
}) => {
  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      title="Registrarse"
    >
      <label className="popup_text" htmlFor="register-email">
        Correo Electrónico
      </label>

      <input
        name="email"
        placeholder="Email"
        type="email"
        value={data.email}
        onChange={handleChange}
        className="popup__input"
        id="register-email"
        required
      />

      <span className="popup__error">{errors?.email}</span>

      <label className="popup_text" htmlFor="register-password">
        Contraseña
      </label>

      <input
        name="password"
        placeholder="Contraseña"
        type="password"
        className="popup__input"
        id="register-password"
        value={data.password}
        onChange={handleChange}
        minLength="6"
        required
      />

      <span className="popup__error">{errors?.password}</span>

      <label className="popup_text" htmlFor="register-username">
        Nombre de usuario
      </label>

      <input
        name="username"
        placeholder="Introduce tu nombre de usuario"
        type="text"
        className="popup__input"
        id="register-username"
        value={data.username}
        onChange={handleChange}
        minLength="2"
        maxLength="30"
        required
      />

      <span className="popup__error">{errors?.username}</span>

      {serverError && <p className="popup__server-error">{serverError}</p>}

      <button
        type="submit"
        className={`button popup__button ${
          !isValid ? "popup__button_disabled" : ""
        }`}
        disabled={!isValid}
      >
        Inscribirse
      </button>

      <p style={{ textAlign: "center" }}>
        o{" "}
        <button type="button" className="link-button" onClick={onSwitchToLogin}>
          Inicia sesión
        </button>
      </p>
    </ModalWithForm>
  );
};
