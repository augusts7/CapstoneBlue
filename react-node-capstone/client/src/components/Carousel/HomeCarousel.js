import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
 
class HomeCarousel extends React.Component{
  
  

  render() {

    return (
      <Carousel infiniteLoop autoPlay interval={6500} swipeable={false} width="700px" showThumbs={false}>
        <div>
          <img src="https://www.visittheusa.com/sites/default/files/styles/hero_m_1300x700/public/images/hero_media_image/2016-10/Yosemite_CROPPED_Web72DPI.jpg?itok=uvDdtCkC" />
          <p className="legend">
            Legend 
          </p>
        </div>
        <div>
          <img src="http://lorempixel.com/output/cats-q-c-640-480-2.jpg" />
          <p className="legend">
            Legend 
          </p>
        </div>
        <div>
        <img src="http://lorempixel.com/output/cats-q-c-640-480-1.jpg" />
        <p className="legend">
        Legend 

        </p>
        </div>
        <div>
        <img src="http://lorempixel.com/output/cats-q-c-640-480-2.jpg" />
        <p className="legend">
        Legend 

        </p>
        </div>
        <div>
        <img src="http://lorempixel.com/output/cats-q-c-640-480-1.jpg" />
        <p className="legend">
        Legend 

    </p>
    </div>
    </Carousel>
    )
  }
}
export default HomeCarousel;