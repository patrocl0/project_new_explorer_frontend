import "./Footer.css";

export const Footer = () => {
  return (
    <div className="footer">
      <p className="footer__text">© 2026 Supersite, Powered by News API</p>
      <div className="footer__enlaces">
        <a href="">Inicio</a>
        <a href="">Tripleten </a>
        <a href="">
          <i className="fa-brands fa-github"></i>
        </a>
        <a href="">
          <i className="fa-brands fa-linkedin"></i>
        </a>
        <a href="">
          <i className="fa-solid fa-briefcase"></i>
        </a>
      </div>
    </div>
  );
};
