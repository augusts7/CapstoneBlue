import React from 'react'
import Events from "./events/Events";
import Button from "../../../components/Button/Button"
import "./main.css";

class SideView extends React.Component {

    constructor(props) {
        super(props);
    }

    singleEventHtml(data) {
        return (
                <div className="mdl-grid" key={data.key}>
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
                                {data.start}
                            </div>
                            <div className="mdl-cell--6-col">
                                {data.end}
                            </div>
                        </div>
                        <div className="mdl-grid">
                            <div className="mdl-cell--12-col">
                                {data.description}
                            </div>
                        </div>
                        <div className="slotButtons">
                            <button onClick={this.props.onAddToCalendar} className="mdl-button mdl-js-button mdl-button--colored"><i className="material-icons slotButtonIcon">done</i>Delete</button>
                        </div>
                    </div>
                </div>
            );
    }

    render() {

        let events = [
            { "key": 1, "title": "Hi1", "description": "Hi there man. How are you?", "start": "12", "end": "13" },
            { "key": 2, "title": "Hi2", "description": "Hi there man.2 My name is Sanjeeb?", "start": "129", "end": "1209" },
            { "key": 3, "title": "Hi2", "description": "Hi there man.2 My name is Sanjeeb?", "start": "129", "end": "1209" },
            { "key": 4, "title": "Hi2", "description": "Hi there man.2 My name is Sanjeeb?", "start": "129", "end": "1209" },
            { "key": 5, "title": "Hi2", "description": "Hi there man.2 My name is Sanjeeb?", "start": "129", "end": "1209" },



        ];

        let card1Style = { "overflow-y": "scroll", "height": window.innerHeight * 0.35 };
        let card2Style = { "overflow-y": "scroll", "height": window.innerHeight * 0.35 };

        return (
            <div>
                <div className="calendarView_side_wrapper">

                    <div className="calendarView_side_card">
                        <div>
                            <h4>All Events Today</h4>
                        </div>
                        <div style={card1Style} className="styleScroll">
                            {events.map(data => {
                                return this.singleEventHtml(data);
                            })}

                        </div>
                    </div>

                    <div className="calendarView_side_card" style={card2Style}>
                        <div>
                            <h4>Actions</h4>
                        </div>
                        
                    </div>

                </div>
            </div>
        );

    }

}

export default SideView;
