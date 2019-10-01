import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import Button from "@material-ui/core/Button";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import Select from "../Select/Select";

import "./main.css";

export default class Calendar extends React.Component {

    calendarComponentRef = React.createRef()
    state = {
        showWeekends: true,
    }

    render() {

        let years = [];
        for (var i = 2017; i < 2025; i++) {
            years.push({ "value": i, "name": i });
        }

        let months = [
            { "value": 0, "name": "January" },
            { "value": 1, "name": "February" },
            { "value": 2, "name": "March" },
            { "value": 3, "name": "April" },
            { "value": 4, "name": "May" },
            { "value": 5, "name": "June" },
            { "value": 6, "name": "July" },
            { "value": 7, "name": "August" },
            { "value": 8, "name": "September" },
            { "value": 9, "name": "October" },
            { "value": 10, "name": "November" },
            { "value": 11, "name": "December" },
        ];

        return (
            <div className='calendar-container center mdl-color--white mdl-shadow--4dp'>
                <div className='demo-app-top'>
                    <Button onClick={this.toggleWeekends}>Toggle Weekends</Button>
                    <Button onClick={this.gotoPast}>Go to past</Button>

                </div>
                <div className='calendar-app'>
                    <FullCalendar
                        defaultView="dayGridMonth"
                        header={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                        }}
                        displayEventTime={true}
                        displayEventEnd={true}
                        eventOrder="start"
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        contentHeight={window.innerHeight * 0.9}
                        ref={this.calendarComponentRef}
                        weekends={this.state.showWeekends}
                        events={this.props.events}
                        dateClick={this.handleDateClick}
                    />
                </div>
            </div>
        )
    }

    toggleWeekends = () => {
        this.setState({
            showWeekends: !this.state.showWeekends
        })
    }

    gotoPast = () => {
        let calendarApi = this.calendarComponentRef.current.getApi()
        calendarApi.gotoDate('2000-01-01') // call a method on the Calendar object
    }

    handleDateClick = (arg) => {

    }

}
