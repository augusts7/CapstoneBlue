//Libs
import React, { Component } from "react";

//Components


class EventList extends Component {
    
    state = { eventDetails : [] }

    componentDidMount(){
        fetch('/events')
            .then(res => res.json())
            .then(eventDetails => this.setState({eventDetails}) )
    }
    
    render(){
        return(
            <div class="p-5">
                <div class="card">
                    <div class="card-header">
                        <div class="float-left h3">Events</div>
                        <button type="button" class="btn btn-primary float-right">Create Event</button>
                    </div>
                    <ul class="list-group list-group-flush">
                        {this.state.eventDetails.map(eventDetails => <li key={eventDetails.id} class="list-group-item">{eventDetails.eventDetails}</li>)}
                    </ul>
                </div>
        </div>
        );
    }
}

export default EventList;
