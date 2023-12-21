import React from "react";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../ImageSlider/ImageSlide.css'

const ImageSlider = ({ image }) => {
  return (
    // <Carousel className="slider">
    //   {images.map((image, index) => (
    //     <div key={index}>
    //       <img src={image} alt={`Slide ${index}`} />
    //     </div>
    //   ))}
    // </Carousel>
    <div>
      <img src={image} alt="" className="hero-img"/>
    </div>
  );
};

export default ImageSlider;
