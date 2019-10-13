import React from "react";
import MaterialButton from "@material-ui/core/Button"

const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const timeOptions = { minute: '2-digit', hour: "2-digit" }


export default function Event(props) {

    let data = props.event;

    const start = new Date(data.start);
    const end = new Date(data.end);

    const date = start.toLocaleDateString("en-US", dateOptions);
    const startTime = start.toLocaleTimeString("en-US", timeOptions);
    const endTime = end.toLocaleTimeString("en-US", timeOptions);

    const dateString = date + " from " + startTime + " to " + endTime;

    let buttons = [];

    buttons.push(<div style={{ "display": "inline-block" }}><MaterialButton key="1" style={{ "padding": "2px", "backgroundColor": "#455A64", "color": "white" }} onClick={props.onAddToCalendar}>Delete</MaterialButton></div>);

    if (data.created) {
        buttons.push(<div style={{ "display": "inline-block", "marginLeft": "4px" }}><MaterialButton key="2" style={{ "padding": "2px", "backgroundColor": "#455A64", "color": "white" }} onClick={props.onAddToCalendar}>Modify</MaterialButton></div>);
    }

    return (
        <div className="slotRoot mdl-color--white" style={{marginTop: "4px", marginBottom: "4px"}} key={data.key}>

            <div className="mdl-grid">
                <div className="mdl-cell--2-col">
                    <i className="material-icons mdl-color-text--blue-900">today</i>
                </div>
                <div className="mdl-cell--10-col">
                    <div className="mdl-color-text--blue-900">
                        {date}
                    </div>
                    <div style={{ "fontWeight": "600" }}>
                        {data.title}
                    </div>

                    <div className="cols-2">
                        <div>
                            {startTime}
                        </div>
                        <div>
                            {endTime}
                        </div>
                    </div>
                    <div>
                        {data.description}
                    </div>
                    <div style={{ "paddingTop": "8px" }}>
                        {buttons}
                    </div>
                </div>
            </div>

        </div>
    );

}

