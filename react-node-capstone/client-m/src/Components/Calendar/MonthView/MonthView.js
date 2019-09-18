
import React from 'react';
import CalendarDate from "../CalendarDate"; 


class MonthView extends React.Component {

    constructor(props) {
        super(props);

        this.GetDate = this.GetDate.bind(this);
    }

    GetDate(date, events, startDay) {
        let styles = {};
        let classes = "";
        if (date == 1 || date == "1") {
            var start = "" + startDay;
            styles = { "grid-column-start": start };
            classes += "isToday";
        }
        if (events != null && events.length > 0) {
            classes += "hasEvents";
        } 
        return <CalendarDate onClick={this.props.onDateClick} date={date} events={events} classes={classes} styles={styles} />;
    }

    render() {
        let dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        return (
            <div>
                <div className="day-names-wrapper">
                    {dayNames.map(name => {
                        return <div className="day-name">{name}</div>
                    })}
                </div>
                <div className="date-wrapper">
                    {this.props.dates.map(date => { 
                        return this.GetDate(date, this.props.events[date], this.props.startDay);  
                    })}
                </div>
            </div>
        );
    }
}


export default MonthView;








