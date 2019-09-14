import React, { Component } from "react";

class EventListElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventID: "",
      eventDescription: "",
      eventDate: ""
    };
  }

  render() {
    return (
      <div className="container p-5">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-10">
                {this.props.eventDescription}
              </div>
              <div class="col-2">
                <div className="btn-group" >
                <div class="btn-group" role="group">
                  <button id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Options
                  </button>
                  <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    <button type="button" class="dropdown-item" onClick={this.onModifyEvent}>Edit</button>
                    <button type="button" class="dropdown-item" onClick={this.onModifyEvent}>Delete</button>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EventListElement;
