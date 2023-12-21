import React from 'react';
import '../Hero/Hero.css';
import hand_icon from '../Assets/hand_icon.png';
import arrow_icon from '../Assets/arrow.png';
// import Carousel from '../Carousel/Carousel'


// import ImageSlider from '../ImageSlider/ImageSlide';
// import slide_1 from '../Assets/slide_1.jpg';
// import slide_2 from '../Assets/slide_2.jpg';
// import slide_3 from '../Assets/slide_3.jpg';
// import slide_4 from '../Assets/slide_4.jpg';

const Hero = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const SliderData = useMemo(() => [slide_1, slide_2, slide_3, slide_4], []); // Use useMemo to memoize the array

//   const nextSlide = useCallback(() => {
//     setCurrentSlide((prevSlide) => (prevSlide + 1) % SliderData.length);
//   }, [SliderData, setCurrentSlide]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       nextSlide();
//       console.log('Auto-slide triggered');
//     }, 3000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, [nextSlide]);

//   const currentImage = SliderData[currentSlide];

  return (
    <div className="hero">
      <div className="hero-left">
        <h2>New Arrivals Only</h2>
        <div>
          <div className="hero-hand-icon">
            <p>new</p>
            <img src={hand_icon} alt="" />
          </div>
          <p>collections</p>
          <p>for everyone</p>
        </div>
        <div className="hero-latest-btn">
          <div>Latest Collection</div>
          <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="hero-right">
      </div>
    </div>
  );
};

export default Hero;
