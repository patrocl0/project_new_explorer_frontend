import React from "react";
import stivenImg from "../../images/stiven.jpg";

export const About = () => {
  return (
    <div className="about__container">
      <img className="about-image" src={stivenImg} alt="Autor Stiven" />
      <div className="about__text">
        <h2>Acerde del autor</h2>
        <div>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis
          deserunt distinctio consequatur veritatis est omnis, unde veniam
          nostrum aliquam quas perferendis voluptate animi rerum dolores officia
          saepe ex voluptatem esse.
        </div>
      </div>
    </div>
  );
};
