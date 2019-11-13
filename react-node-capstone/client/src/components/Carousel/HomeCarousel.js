import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

class HomeCarousel extends React.Component {
  render() {
    return (
      <Carousel
        infiniteLoop
        autoPlay
        interval={6500}
        swipeable={false}
        width="1650px"
        showThumbs={false}
        showStatus = {false}
        className="presentation-mode"
        
      >
        <div className="my-slide primary">
          <img
            src="https://www.wallpaperup.com/uploads/wallpapers/2014/11/12/514433/474ec055f0eaf86e7e91637bbaa05ce6-500.jpg"
            alt=""
          />
          <h1>
            Test
          </h1>
          <p className="legend">Legend</p>
        </div>
        <div>
          <img
            src="https://www.wallpaperup.com/uploads/wallpapers/2014/11/12/514433/474ec055f0eaf86e7e91637bbaa05ce6-500.jpg"
            alt=""
          />
          <h1>
            Test
          </h1>
          <p className="legend">Writing whatever I want</p>
        </div>
        <div>
          <img
            src="https://www.wallpaperup.com/uploads/wallpapers/2014/11/12/514433/474ec055f0eaf86e7e91637bbaa05ce6-500.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            src="https://www.wallpaperup.com/uploads/wallpapers/2014/11/12/514433/474ec055f0eaf86e7e91637bbaa05ce6-500.jpg"
            alt=""
          />
          <p className="legend">Legend</p>
        </div>
      </Carousel>
    );
  }
}
export default HomeCarousel;
