

import React from 'react';
import "./Calendar.css";

import CalendarDate from "./CalendarDate";
import Select from "../Select/Select";
import DayView from '../DayView/DayView';
import MonthView from "./MonthView/MonthView";
import Button from "../Button/Button"


class Calendar extends React.Component {


    constructor(props) {
        super(props);

        var date = new Date();

        this.state = {
            "year": date.getFullYear(),
            "month": date.getMonth(),
            "date": date.getDate(),
            "view": "month"
        };

        this.getMonthOptions = this.MonthOptions.bind(this);
        this.getYearOptions = this.YearOptions.bind(this);
        this.DateData = this.DateData.bind(this);
        this.onYearChange = this.onYearChange.bind(this); 
        this.onMonthChange = this.onMonthChange.bind(this); 
        this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.onDayClick = this.onDayClick.bind(this); 
    }

    MonthOptions() {
        var months = [];
        this.monthNames.forEach((name, index) => {
            months.push({ "value": index, "name": name }); 
            });
        return months;
    }

    YearOptions() {
        var years = [];
        const options = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025]
        
        options.forEach(value => {
            years.push({ "value": value, "name": value })  
        });
        return years;
    }   

  
    DateData() {

        // var month = this.state.month;
        // var year = this.state.year;

        var month = this.state.month;
        var year = this.state.year;  

        var firstDay = new Date(year, month, 1).getDay();
        var lastDate = new Date(year, month + 1, 0).getDate();

        const firstItemToBePlacedIn = firstDay + 1;

        var dates = [];

        for (var i = 1; i <= lastDate; i++) {
            dates.push(i);
        }

        return { "dates": dates, "startDay": firstItemToBePlacedIn }; 
    }

    onMonthChange(newMonth) {
        this.setState({
            "view": "month",
            "month": newMonth
        });
    }

    onYearChange(newYear) {
        this.setState({
            "view": "month",
            "year": newYear
        });
    }

    onDayClick(date) {
        this.setState({
            "view": "day"
        });
    }

    getView(dates, events, startDay) {
        if (this.state.view == "month") {
            return <MonthView onDateClick={this.onDayClick} dates={dates} events={events} startDay={startDay} />;
        } else {
            let style = {
                "margin-top": "16px", "margin-left": "16px"
            }
            const onClick = () => {
                this.setState({ "view": "month" });
            };
            return ( 
                <div>
                    <Button onClick={onClick} styles={style} type="button" icon="arrow_back" name="Back to Month View" />
                    <DayView isAttachedToAnother={true} />
                </div>
            )
        }
    }

    render() {

        let months = this.MonthOptions();
        let years = this.YearOptions();
        let dateData = this.DateData(); 

        let events = {
            "10": [{ "name": "Soccer Practice", "startTime": "12pm", "endTime": "1pm" }, { "name": "Basketball Practice", "startTime": "5pm", "endTime": "6pm" }],
            "22": [{ "name": "Guitar Practice", "startTime": "2pm", "endTime": "5pm" }, { "name": "Violin Practice", "startTime": "5pm", "endTime": "6pm" }],
            "16": [{ "name": "Piano Practice", "startTime": "3pm", "endTime": "6pm" }, { "name": "Band Practice", "startTime": "5pm", "endTime": "6pm" }],

        };

        return (
            <div className="calendar-wrapper mdl-shadow--4dp">

                <div className="calendar-container">

                    <div className="calendar-header">
                        <div className="calendar-select">
                            <Select options={years} title="Year" onChange={this.onYearChange} />
                            <Select options={months} title="Month" onChange={this.onMonthChange} />
                            
                        </div>
                        <div className="calendar-title">
                            <h4>{this.monthNames[this.state.month]}, {this.state.year}</h4> 
                        </div>
                    </div> 
                  
                     
                    {this.getView(dateData["dates"], events, dateData["startDay"])}

                </div>
            </div>
        );
    }
}


export default Calendar;
