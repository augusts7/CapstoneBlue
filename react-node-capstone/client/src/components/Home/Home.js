import React, { Component } from "react";
import './Home.css'
import EventListElement from '../EvenetListElement/EventListElement.js';

class Home extends Component {
  render() {
    return (
      <EventListElement eventDescription="ULM Football Game August 30 2019" />
    );
  }
}

export default Home;
