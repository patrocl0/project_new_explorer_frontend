import { Link } from "react-router-dom";
import "./Footer.css";

export const Footer = () => {
  return (
    <div className="footer">
      <p className="footer__text">© 2026 Supersite, Powered by News API</p>
      <div className="footer__enlaces">
        <a href="/">Inicio</a>
        <a
          href="https://tripleten.co/?utm_source=google&utm_medium=cpc&utm_campaign=inhouse_gl_col_meetwrdprs_allprofs_ua_sem_brand&utm_content=cid--21507184962_gid--168099846409_adset--brand_tripleten_es_creative--707320410409_adname--_network--g_tid--kwd-2087159963733_tg--_placement--_dvc--c_loc--9208055&utm_term=_key--tripleten&gad_source=1&gad_campaignid=21507184962&gclid=CjwKCAjwnN3OBhA8EiwAfpTYeowhYEJfiPaBEh3m8-Wzu3zPR1Zt7KAMs_y6rxOS6ewKbH0iHgT79RoCupAQAvD_BwE"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tripleten{" "}
        </a>
        <a
          href="https://github.com/patrocl0"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-github"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/patrocl0"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-linkedin"></i>
        </a>
        <a
          href="https://patrocl0.github.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-solid fa-briefcase"></i>
        </a>
      </div>
    </div>
  );
};
