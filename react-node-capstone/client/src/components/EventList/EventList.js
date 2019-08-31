//Libs
import React, { Component } from "react";

class EventList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eventDetails : [],
            events: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.createEvent = this.createEvent.bind(this);
    }

    handleChange(event) {
        this.setState({
          [event.target.id]: [event.target.value]
        });
    }

    componentDidMount(){
        fetch('/events')
            .then(res => res.json())
            .then(eventDetails => this.setState({eventDetails}) )
    }

    createEvent(){
        fetch('/events',{
            method: 'POST',
            body: JSON.stringify({
                eventDetails : this.state.events
            }),
            headers: {"Content-Type": "application/json"}
        })
        .then(function(response){
            return response.json()
        })
        .then(function(body){
            console.log(body);
        });
    } 

    render(){
        return(
            <div className="p-5">
                <div className="card">
                    <div className="card-header">
                        <div className="float-left h3">Events</div>
                        <button type="button" className="btn btn-primary float-right" data-toggle="modal" data-target="#createEventModal" >Create Event</button>
                    </div>
                    <ul className="list-group list-group-flush">
                        {this.state.eventDetails.map(eventDetails => <li key={eventDetails.id} className="list-group-item">{eventDetails.eventDetails}</li>)}
                    </ul>
                </div>
                <div className="modal fade" id="createEventModal" tabIndex="-1" role="dialog" aria-labelledby="createEventModalTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="createEventModalTitle">Create an Event:</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label id="createEventInputID">Event Description</label>
                                <input type="text" className="form-control" id="events" value={this.state.events} onChange={this.handleChange} placeholder="Ex. ULM Football game Aug 31 2019" required/>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.createEvent} >Submit Event</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default EventList;
