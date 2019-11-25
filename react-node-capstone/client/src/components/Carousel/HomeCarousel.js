import React, { Fragment } from "react";
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
    this.getCarouselEvents = this.getCarouselEvents.bind(this);
  }

  componentDidMount() {
    this.getUser();
    this.getMyGroups();
    this.getCarouselEvents();
  }

  getMonth(month, type) {
    var monthName = "";
    var monthAbrv = "";
    switch (month) {
      case 1:
        monthName = "January";
        monthAbrv = "Jan";
        break;
      case 2:
        monthName = "Febuary";
        monthAbrv = "Feb";
        break;
      case 3:
        monthName = "March";
        monthAbrv = "Mar";
        break;
      case 4:
        monthName = "April";
        monthAbrv = "Apr";
        break;
      case 5:
        monthName = "May";
        monthAbrv = "May";
        break;
      case 6:
        monthName = "June";
        monthAbrv = "Jun";
        break;
      case 7:
        monthName = "July";
        monthAbrv = "Jul";
        break;
      case 8:
        monthName = "August";
        monthAbrv = "Aug";
        break;
      case 9:
        monthName = "September";
        monthAbrv = "Sept";
        break;
      case 10:
        monthName = "October";
        monthAbrv = "Oct";
        break;
      case 11:
        monthName = "November";
        monthAbrv = "Nov";
        break;
      case 12:
        monthName = "December";
        monthAbrv = "Dec";
        break;
      default:
        monthName = "Error: Not a valid month.";
        monthAbrv = "Error: Not a valid month.";
    }
    if (type === "name") {
      return monthName;
    } else if (type === "abrv") {
      return monthAbrv;
    }
  }

  getCarouselEvents() {
    fetch("/events/carouselEvents")
      .then(res => res.json())
      .then(carouselEs => {
        if (carouselEs === isNullOrUndefined || carouselEs <= 0) {
        } else {
          try {
            console.log(carouselEs);
            this.setState({ carouselEvents: JSON.parse(carouselEs) });
          } catch (e) {}
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
     const carouselItems = this.state.carouselEvents.map(
        event => (
          <div class="container" key={event.eventID}>
          <img src="https://www.ulm.edu/omc/home-rotators/schedule_a_tour2019.jpg" class="responsive" alt="background"/>
          <div class="text-block">
          <div className="date">
              <div className="date-number">
                {new Date(event.start).getDate()}
              </div>
              <div className="date-name">
                {this.getMonth(new Date(event.start).getMonth() + 1, "name")}{" "}
              </div>
            </div>
            <div className="description">
              <div className="event-title">{event.title}</div>
              <div className="time">
                {new Date(event.start).toLocaleTimeString("en-US")} -{" "}
                {new Date(event.end).toLocaleTimeString("en-US")}
              </div>
              {event.description}
            </div>
            </div>
            {/* <div>{event.creator_id}</div> */}
          </div>
        )
      );
      console.log(carouselItems);
    
    return ( 
        <Fragment>
         <Carousel
        infiniteLoop
        autoPlay
        interval={6500}
        swipeable={false}
        width="1650px"
        showThumbs={false}
        showStatus = {false}
      >
          {carouselItems}
          </Carousel>
        </Fragment>
        
      );
    }
  }
  render() {
    console.log(this.state.carouselEvents);
    return (
      <Fragment>
      {this.fillCarousel()}
      </Fragment>
    );
  }
}
export default HomeCarousel;
