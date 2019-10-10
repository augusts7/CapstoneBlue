import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
 
class HomeCarousel extends React.Component{
  
  

  render() {

    return (
      <Carousel infiniteLoop autoPlay interval={6500} swipeable={false} width="1100px" showThumbs={false}>
        <div>
          <img src="https://live.staticflickr.com/5652/23595625072_12db0d751d_b.jpg" />
          <p className="legend">
            Legend 
          </p>
        </div>
        <div>
          <img src="https://live.staticflickr.com/5652/23595625072_12db0d751d_b.jpg" />
          <p className="legend">
            Legend 
          </p>
        </div>
        <div>
        <img src="https://live.staticflickr.com/5652/23595625072_12db0d751d_b.jpg" />
        <p className="legend">
        Legend 

        </p>
        </div>
        <div>
        <img src="https://live.staticflickr.com/5652/23595625072_12db0d751d_b.jpg" />
        <p className="legend">
        Legend 

        </p>
        </div>
        <div>
        <img src="https://live.staticflickr.com/5652/23595625072_12db0d751d_b.jpg" />
        <p className="legend">
        Legend 

    </p>
    </div>
    </Carousel>
    )
  }
}
export default HomeCarousel;