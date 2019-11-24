import React, {Component, Fragment } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./HomeCarousel.css";
import { Carousel } from "react-responsive-carousel";
import UserContext from "../../Context/UserContext";
import { isNullOrUndefined } from "util";


class HomeCarousel extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      user: 0,
      carouselEvents: [],
      my_groups: []
    };
    this.getMyGroups = this.getMyGroups.bind(this);
    //this.getCarouselEvents = this.getCarouselEvents.bind(this);
  }

  componentDidMount() {
    this.getUser();
    this.getMyGroups();
    this.getCarouselEvents();
  }

  getCarouselEvents() {
    fetch("/events/carouselEvents")
      .then(res => res.json())
      .then(carouselEs => {
        if (carouselEs === isNullOrUndefined || carouselEs <= 0) {
        } else {
          console.log(carouselEs);
          this.setState({ carouselEvents: carouselEs });
        }
      });
  }

  getMyGroups() {
    var myGroupsURL = "/my_groups";
    fetch(myGroupsURL)
      .then(res => res.json())
      .then(myGroups => {
        if (myGroups === isNullOrUndefined || myGroups.length <= 0) {
        } else {
          this.setState({ my_groups: myGroups });
        }
      });
  }
  
  getUser() {
    var getUserURL = "/user_info/user";
    fetch(getUserURL)
      .then(res => res.json())
      .then(userInfo => {
        if (userInfo === isNullOrUndefined || userInfo.length <= 0) {
        } else {
          try{
          this.setState({ user: userInfo[0].user_id });
          } catch(e) {}
        }
      });
  }

  fillCarousel() {
    if(this.state.carouselEvents !== isNullOrUndefined) {

      // return ( 
      // <React.Fragment>
      //   {this.state.carouselEvents.map(
      //     event => (
      //       <div>
      //         <p class="container">
      //           <img src="https://www.wallpaperup.com/uploads/wallpapers/2014/11/12/514433/474ec055f0eaf86e7e91637bbaa05ce6-500.jpg"
      //           alt=""/>
      //             <div class="bottom-left">{console.log(event)}</div>
      //             <div class="top-left">{console.log(event)}</div>
      //             <div class="top-right">{event.start}</div>
      //             <div class="bottom-right">{event.end}</div>
      //             <div class="centered">{event.creator_id}</div>
      //         </p>
      //       </div>
      //     )
      //   )}
      // </React.Fragment>
      // );
    }
  }

  render() {
    console.log(this.state.carouselEvents);
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
          <p class="container">
            <img src="https://www.wallpaperup.com/uploads/wallpapers/2014/11/12/514433/474ec055f0eaf86e7e91637bbaa05ce6-500.jpg"
            alt=""/>
              <div class="bottom-left">Bottom Left</div>
              <div class="top-left">Top Left</div>
              <div class="top-right">Top Right</div>
              <div class="bottom-right">Bottom Right</div>
              <div class="centered">Centered</div>
          </p>
        </div>
        {/*this.fillCarousel()*/}
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
