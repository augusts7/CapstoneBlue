import React from 'react'



import "./main.css";

export default class Calendar extends React.Component {

    constructor(props) {
        super(props);
    }

    getSingleEvent(data) {



        return (<div className="slotRoot">

            <div className="mdl-grid">
                <div className="mdl-cell--1-col">
                    <i className="material-icons">today</i>
                </div>
                <div className="mdl-cell--11-col">
                    <div className="mdl-grid">
                        <div className="mdl-cell--6-col">
                            {data.title}
                        </div>
                    </div>
                    <div className="mdl-grid">
                        <div className="mdl-cell--6-col">
                            {startTime}
                        </div>
                        <div className="mdl-cell--6-col">
                            {endTime}
                        </div>
                    </div>
                    <div className="mdl-grid">
                        <div className="mdl-cell--12-col">
                            {data.description}
                        </div>
                    </div>
                    <div className="slotButtons">
                        <button onClick={this.props.onAddToCalendar} className="mdl-button mdl-js-button mdl-button--colored"><i className="material-icons slotButtonIcon">done</i>Add to Calendar</button>
                    </div>
                </div>
            </div>

        </div>);

    }

    render() {

        return (
            <div>
            <div className="calendarView_side_card">
                <h4>All Events Today</h4>
                </div>
                </div>
            
            );

    }

}
