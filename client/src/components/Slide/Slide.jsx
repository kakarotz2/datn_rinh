import React from "react";
import Slider from "infinite-react-carousel";
import slide1 from "../../img/slide1.png";
import slide2 from "../../img/slide2.png";
import slide3 from "../../img/slide3.png";
import slide4 from "../../img/slide4.png";
import imgef1 from "../../img/img_effect1.png";
import imgef2 from "../../img/img_effect2.png";
import imgef31 from "../../img/img_effect31.png";
import imgef32 from "../../img/img_effect32.png";
import "./slide.css";
import { Link } from "react-router-dom";
function Slide() {
  const settings = {
    arrows: false,
    autoplay: true,
    dots: true,
    duration: 300,
  };
  return (
    <React.Fragment>
      <section className="awe-section1">
        <div className="home-slider">
          <Slider {...settings}>
            <div className="slider">
              <img src={slide1} alt="" />
            </div>
            <div className="slider">
              <img src={slide2} alt="" />
            </div>
            <div className="slider">
              <img src={slide3} alt="" />
            </div>
            <div className="slider">
              <img src={slide4} alt="" />
            </div>
          </Slider>
        </div>
      </section>
      <section className="awe-section-2">
        <div className="container">
          <div className="img-effective">
            <div className="img-effect-1 img_ef">
              <Link to="/">
                <img src={imgef1} alt="" />
              </Link>
            </div>
            <div className="img-effect-2 img_ef">
              <Link to="/">
                <img src={imgef2} alt="" />
              </Link>
            </div>
            <div className="img-effect-3">
              <Link className="one_two" to="/">
                <div className="img_one">
                  <img className="one" src={imgef31} alt="" />
                </div>
                <div className="img_two">
                  <img className="two" src={imgef32} alt="" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Slide;
