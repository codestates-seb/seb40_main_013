import React, { useState, useEffect } from "react";
import * as Stryle from "../../styles/Calousel";
import { ImgSlider } from "./ImgSlider";
import { Link } from "react-router-dom";

const len = ImgSlider.length - 1;

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(activeIndex === len ? 0 : activeIndex + 1);
    }, 7000);
    return () => {
      clearInterval(interval);
    };
  }, [activeIndex]);

  return (
    <Stryle.Container>
      {ImgSlider.map((slide, index) => (
        <Stryle.Slides key={index} className={index === activeIndex ? "slides active" : "inactive"}>
          <Stryle.Imgbox>
            <Link to={slide.link} rel="preload">
              {/* <Img className="slide-image" src={slide.urls} alt="" /> */}
              <Stryle.Img style={{ backgroundImage: `url(${slide.urls})` }} className="slide-image" src={slide.urls} alt="" />
            </Link>
          </Stryle.Imgbox>
          <Stryle.SlideTitle>{slide.title}</Stryle.SlideTitle>
          <Stryle.SlideText>{slide.description}</Stryle.SlideText>
        </Stryle.Slides>
      ))}
      <div className="Arrows">
        <Stryle.Prev
          className="prev"
          onClick={() => {
            setActiveIndex(activeIndex < 1 ? len : activeIndex - 1);
          }}
        >
          &#10094;
        </Stryle.Prev>
        <Stryle.Next
          className="next"
          onClick={() => {
            setActiveIndex(activeIndex === len ? 0 : activeIndex + 1);
          }}
        >
          &#10095;
        </Stryle.Next>
      </div>
    </Stryle.Container>
  );
};

export default Carousel;
