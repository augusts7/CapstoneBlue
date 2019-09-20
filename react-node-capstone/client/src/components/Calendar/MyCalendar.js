import React, {Component} from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import "./MyCalendar.css";

class MyCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [
                {title: 'event 1', date: '2019-09-01', timeStart: '07:30', timeEnd: '09:30'},
                {title: 'event 2', date: '2019-09-02'}
            ]
        }
    }

    handleDateClick = (arg) => {
        alert(arg.dateStr);
    }

    render() {
        let events = this.state.events;
        return (
            <div className="calendar-container">
                <FullCalendar defaultView="dayGridMonth" schedulerLicenseKey='GPL-My-Project-Is-Open-Source'
                              events={events} dateClick={this.handleDateClick}
                              plugins={[dayGridPlugin, interactionPlugin, resourceTimelinePlugin]}/>
            </div>
        )
    }
}

export default MyCalendar;
