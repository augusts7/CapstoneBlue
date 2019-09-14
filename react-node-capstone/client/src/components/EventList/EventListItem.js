

import React from 'react';
import "./EventListItem.css";
import TextButton from "../Button/TextButton"


class EventListItem extends React.Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.props.onChange(event.target.value);
    }

    render() {
        return (
            <div className="eventListItem">
                <div className="header">
                    <div><h5>{this.props.title}</h5></div>
                    <div className="times">
                        <div><i className="material-icons">date_range</i></div>
                        <div className="startTime">1pm</div>
                        <div className="endTime">12pm</div>
                    </div>
                </div>
                <div class="body">
                    
                    {this.props.description}
                </div>
                <div className="actions">
                    <TextButton type="button" icon="delete" name="Delete" />
                    <TextButton type="button" icon="share" name="Share" />
                </div>
            </div>
            );
    }
}


export default EventListItem; 










