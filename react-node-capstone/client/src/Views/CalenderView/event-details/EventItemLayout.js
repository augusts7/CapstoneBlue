import React from "react";

const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const timeOptions = { minute: '2-digit', hour: "2-digit" }


export default function EventItemLayout(props) {

    let data = props.event;

    const start = new Date(data.start);
    const end = new Date(data.end);

    const date = start.toLocaleDateString("en-US", dateOptions);
    const startTime = start.toLocaleTimeString("en-US", timeOptions);
    const endTime = end.toLocaleTimeString("en-US", timeOptions);

    return (
        <div className="slotRoot mdl-color--white" style={{ marginTop: "4px", marginBottom: "4px" }} key={data.key}>

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
                        {props.buttons}
                    </div>
                </div>
            </div>

        </div>
    );

}

