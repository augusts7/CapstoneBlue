import React, { Component } from "react";
import './Home.css'
class Home extends Component {

  onAddEvent(event){
    console.log("erg");
  }

  onModifyEvent(event){
    console.log("qwer");
  }

  onDeleteEvent(event){
    console.log("mnbvcg");
  }

  render() {
    return (
      <div className="container">
        <div className="AddEvent btn-group-vertical" >
            <button type="button" className="btn"
            onClick={this.onAddEvent}>Add Event</button>
            <button type="button" className="btn"
            onClick={this.onModifyEvent}>Modify Event</button>
            <button type="button" className="btn"
            onClick={this.onDeleteEvent}>Delete Event</button>
        </div>
      </div>
    );
  }
}

export default Home;
