
import React from 'react';
import "./CalendarDate.css";


class CalendarDate extends React.Component {

    render() {

        let events = [];
        let eventsMenu = [];
        let eventsExist = this.props.events != null && this.props.events.length > 0;

        if (eventsExist) { 
            this.props.events.map(event => {
                events.push(<div className="eventListItem">{event.name} {event.startTime} {event.endTime}</div>);
                eventsMenu.push(<li className="mdl-menu__item"><i className="material-icons">donut_large</i>{event.name} {event.startTime} {event.endTime}</li>);
            });
            eventsMenu.push(<button className="mdl-menu__item"><i className="material-icons">event</i>View All Events</button>);
        } 
     
        let className = this.props.classes + " date";

        let date = this.props.date;

        if (eventsExist) {
            return (
                <div onClick={() => this.props.onClick(date)} className={className} id={this.props.key + "" + this.props.date} style={this.props.styles}>
                    <div className="dateHolder">
                        {this.props.date}
                    </div>
                    <div className="eventListContainer">
                        <div className="eventList">
                            {events}
                        </div>
                        <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
                            htmlFor={this.props.key + "" + this.props.date}>
                            {eventsMenu}
                        </ul>
                    </div>
                </div>
            );
        } else {
            return (
                <div onClick={() => this.props.onClick(date)} className={className} id={this.props.date} style={this.props.styles}>
                    <div className="dateHolder">
                        {this.props.date}
                    </div>
                    <div className="eventList">
                        
                    </div>
                </div>
            );
        }
    }
}

export default CalendarDate;
