import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import Select from "../../../components/Select/Select";



const selectStyle = { "margin": "8px", "padding": "4px", "width": "47%" };
const calendarContainerStyle = {  };

const calendarAppStyle = {"padding": "16px 8px"};

let years = [];
for (let i = 2017; i < 2025; i++) {
    years.push({"value": i, "name": i});
}

let months = [
    {"value": 0, "name": "January"},
    {"value": 1, "name": "February"},
    {"value": 2, "name": "March"},
    {"value": 3, "name": "April"},
    {"value": 4, "name": "May"},
    {"value": 5, "name": "June"},
    {"value": 6, "name": "July"},
    {"value": 7, "name": "August"},
    {"value": 8, "name": "September"},
    {"value": 9, "name": "October"},
    {"value": 10, "name": "November"},
    {"value": 11, "name": "December"},
];

export default class Calendar extends React.Component {

    selectedMonth = new Date().getMonth();
    selectedYear = new Date().getFullYear();

    constructor(props) {
        super(props);

        this.state = {
            "showWeekends": true,
        };

        this.handleDateClick = this.handleDateClick.bind(this);
        this.handleEventClick = this.handleEventClick.bind(this);

    }

    render() {

        console.log("Calendar");
        console.log(this.props.events);

        return (
            <div style={calendarContainerStyle} className='center full'>

                <div style={calendarAppStyle} className="mdl-color--white">
                    <FullCalendar
                        defaultView="dayGridMonth"
                        header={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                        }}
                        displayEventTime={false}
                        displayEventEnd={false}
                        eventOrder="start"
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        contentHeight={window.innerHeight * 0.77}
                        weekends={this.state.showWeekends}
                        events={this.props.events}
                        dateClick={this.handleDateClick}
                        eventClick={this.handleEventClick}
                    />
                </div>

                
            </div>
        )
    }

    //changeDate = (mode, value) => {
    //    let calendarApi = this.calendarComponentRef.current.getApi();

    //    let date = new Date();

    //    if (mode == "year") {

    //        this.selectedYear = value;
            
    //    } else if (mode == "month") {

    //        this.selectedMonth = value;
    //    }
    //    date.setMonth(this.selectedMonth);
    //    date.setFullYear(this.selectedYear);

    //    calendarApi.gotoDate(date);
    //}

    toggleWeekends = () => {
        this.setState({
            showWeekends: !this.state.showWeekends
        })
    }

    getToDate = (date) => {
        // call a method on the calendar object
    }

    handleDateClick = (args) => {
        console.log(args);
        if (this.props.onDateClick) {
            this.props.onDateClick(args.date);
        }   
    }

    handleEventClick(args) {
        console.log(args);
        if (this.props.onEventClick) {
            this.props.onEventClick(args.event);
        }
    }

}
