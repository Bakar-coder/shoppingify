import React, { FC } from "react";
import Slider from "react-slick";
import { settings } from "../config/carousel";

interface indexTypes {}

const Carousel: FC<indexTypes> = ({}) => {
  const slideSetting = { ...settings, autoplay: true, arrows: true };
  return (
    <div className=" slider__section container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="row shop_wrapper">
            <div className=" col-12">
              <Slider {...slideSetting}>
                <div className="slider__item">
                  <div
                    className="single_slider"
                    data-bgimg="/assets/images/sliders/slider8.jpg"
                    style={{
                      backgroundImage:
                        "url('/assets/images/sliders/slider8.jpg')",
                    }}
                  >
                    <div className="container">
                      <div className="row align-items-center">
                        <div className="col-12">
                          <div className="slider_content">
                            <h1>PLAYSTATION</h1>
                            <h2>OVER 100 GAMES</h2>
                            <p>
                              With gamers in mind, PlayStation delivers a new
                              world of unexpected gaming experiences through
                              PlayStation VR.
                            </p>
                            <a className="button" href="#">
                              shopping now
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="slider__item">
                  <div
                    className="single_slider"
                    data-bgimg="/assets/images/sliders/slider6.jpg"
                    style={{
                      backgroundImage:
                        "url('/assets/images/sliders/slider6.jpg')",
                    }}
                  >
                    <div className="container">
                      <div className="row align-items-center">
                        <div className="col-12">
                          <div className="slider_content">
                            <h1>PLAYSTATION</h1>
                            <h2>OVER 100 GAMES</h2>
                            <p>
                              With gamers in mind, PlayStation delivers a new
                              world of unexpected gaming experiences through
                              PlayStation VR.
                            </p>
                            <a className="button" href="#">
                              shopping now
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
