import { ModalWithForm } from "../ModalWithForm";

export const Login = ({
  isOpen,
  onClose,
  onSubmit,
  onSwitchToRegister,
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
      title="Iniciar Sesión"
    >
      <label className="popup_text" htmlFor="login-email">
        Correo Electrónico
      </label>

      <input
        name="email"
        placeholder="Email"
        type="email"
        className="popup__input"
        value={data.email}
        onChange={handleChange}
        id="login-email"
        required
      />
      <span className="popup__error">{errors?.email}</span>

      <label className="popup_text" htmlFor="login-password">
        Contraseña
      </label>

      <input
        name="password"
        placeholder="Contraseña"
        type="password"
        className="popup__input"
        value={data.password}
        onChange={handleChange}
        id="login-password"
        required
      />

      <span className="popup__error">{errors?.password}</span>

      {serverError && <p className="popup__server-error">{serverError}</p>}

      <button
        type="submit"
        className={`button popup__button ${
          !isValid ? "popup__button_disabled" : ""
        }`}
        disabled={!isValid}
      >
        Iniciar Sesión
      </button>

      <p style={{ textAlign: "center" }}>
        o{" "}
        <button
          type="button"
          className="link-button"
          onClick={onSwitchToRegister}
        >
          inscribirse
        </button>
      </p>
    </ModalWithForm>
  );
};
