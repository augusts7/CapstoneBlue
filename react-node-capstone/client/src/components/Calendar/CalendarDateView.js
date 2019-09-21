
import React from 'react';
import "./CalendarDate.css";
import DayView from "../DayView/DayView"


class CalendarDateView extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {

        let data = [
            { "title": "Bryan Cranston", "description": "Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle." },
            { "title": "Aaron Paul", "description": "Aaron Paul played the role of Jesse in Breaking Bad. He also featured in the 'Need For Speed' Movie." },
            { "title": "Bob Odenkirk", "description": "Bob Odinkrik played the role of Saul in Breaking Bad. Due to public fondness for the  character, Bob stars in his own show now, called 'Better Call Saul'." }

        ];

        return (
            <DayView data={data} />
            );
        
    }
}


export default CalendarDateView;








