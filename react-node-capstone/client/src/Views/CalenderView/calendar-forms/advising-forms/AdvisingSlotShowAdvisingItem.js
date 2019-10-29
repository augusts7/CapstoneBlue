import React from "react"

export default function AdvisingSlotShowAdvisingItem(props) {

    let data = props.data;

    let dateOptions = {weekday: 'long', month: 'long', day: 'numeric'};
    const timeOptions = {minute: '2-digit', hour: "2-digit"};

    const start = new Date(data.start);
    const end = new Date(data.end);

    const date = start.toLocaleDateString("en-US", dateOptions);
    const startTime = start.toLocaleTimeString("en-US", timeOptions);
    const endTime = end.toLocaleTimeString("en-US", timeOptions);

    let title = "Slot # " + (data.index + 1);

    return (<div key={data.key}>


        <div style={{"display": "grid", "grid-template-columns": "6% 20% 30% 22% 22%"}}>
            <div>
                <i className="material-icons mdl-color-text--blue-900">today</i>
            </div>
            <div style={{overflowY: "hidden"}}>
                {title}
            </div>
            <div className="mdl-color-text--grey-700">
                {date}
            </div>
            <div style={{"fontWeight": "600"}}>
                {startTime}
            </div>
            <div style={{"fontWeight": "600"}}>
                {endTime}
            </div>
        </div>

    </div>);


}