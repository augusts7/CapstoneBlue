import React from "react";
import "./EventLayout.css";


const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const timeOptions = { minute: '2-digit', hour: "2-digit" }


export default function EventLayout(props) {

    let data = props.event;

    const start = new Date(data.start);
    const end = new Date(data.end);

    const date = start.toLocaleDateString("en-US", dateOptions);
    const startTime = start.toLocaleTimeString("en-US", timeOptions);
    const endTime = end.toLocaleTimeString("en-US", timeOptions);

    return (
        <div className="slotRoot mdl-color--white" style={{marginTop: "4px", marginBottom: "4px"}} key={data.key}>

            <div className="icon">
                <i className="material-icons mdl-color-text--blue-900">today</i>
            </div>
            <div className="mainItem" style={{width: window.innerWidth * 0.5}}>
                <div className="mdl-color-text--blue-900">
                    {date}
                </div>
                <div style={{ "fontWeight": "600" }}>
                    {data.title}
                </div>

                <div className="cols-2">
                    <div style={{ "fontWeight": "500" }}>
                        {startTime}
                    </div>
                    <div style={{ "fontWeight": "500" }}>
                        {endTime}
                    </div>
                </div>
                <div>
                    {data.description}
                </div>
                <div className="buttons" style={{ "paddingTop": "8px" }}>
                    {props.buttons}
                </div>
            </div>

        </div>
    );

}

