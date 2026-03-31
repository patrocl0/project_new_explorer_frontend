import "./Preloader.css";

export const Preloader = () => {
  return (
    <div className="preloader" role="status" aria-live="polite">
      <i className="preloader__spinner" />
    </div>
  );
};
