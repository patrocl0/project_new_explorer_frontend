import "../../blocks/Preloader.css";

export const Preloader = () => {
  return (
    <div className="preloader-overlay" role="status" aria-live="polite">
      <i className="circle-preloader" />
    </div>
  );
};
