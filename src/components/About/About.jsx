import "./about.css";
import stivenImg from "../../images/stiven.jpg";

export const About = () => {
  return (
    <section className="about">
      <div className="about__container">
        <img className="about__image" src={stivenImg} alt="Autor Stiven" />
        <div className="about__content">
          <h2 className="about__title">Acerde del autor</h2>
          <p className="about__paragraph">
            Hola, soy <span className="about__highlight">Brayan Mora</span>,
            desarrollador Frontend enfocado en la creación de interfaces
            modernas, funcionales y responsivas. Me especializo en el desarrollo
            de aplicaciones web utilizando tecnologías como{" "}
            <span className="about__highlight">
              HTML, CSS, JavaScript, React
            </span>
            , además de herramientas y entornos como{" "}
            <span className="about__highlight">
              Node.js, Express, Git y GitHub
            </span>
            .
          </p>

          <p className="about__paragraph">
            Durante mi formación en{" "}
            <span className="about__highlight">Tripleten</span>, fortalecí mis
            habilidades creando proyectos reales basados en metodologías
            profesionales, aplicando buenas prácticas de desarrollo, estructura
            de componentes, consumo de APIs, validaciones, manejo del DOM y
            desarrollo responsive.
          </p>

          <p className="about__paragraph">
            Me gusta crear aplicaciones bien estructuradas, optimizadas y con
            una experiencia de usuario atractiva. Puedo ayudar a clientes y
            equipos de trabajo a construir sitios web y aplicaciones dinámicas,
            desde landing pages hasta proyectos completos en React.
          </p>
        </div>
      </div>
    </section>
  );
};
