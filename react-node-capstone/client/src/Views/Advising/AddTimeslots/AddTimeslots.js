
import React from 'react';
import "./AddTimeslots.css";
import Form from "../../../Components/Form/Form"


class AddTimeslots extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "isLoading": false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(target) {
        var startTime = target.startTime.value;
        var endTime = target.endTime.value;

        alert(startTime + "mmmm" + endTime);

        if (startTime >= endTime) {

        }
    }

    render() {

        let fields = [
            { "label": "Date", "type": "date", "id": "date", "name": "date" },
            { "label": "Start Time", "type": "time", "id": "startTime", "name": "startTime" },
            { "label": "End Time", "type": "time", "id": "endTime", "name": "endTime" },
            { "label": "Number of Slots", "type": "number", "id": "numOfSlots", "name": "numOfSlots" }
        ];
        let actionLinks = [
            { "link": "calendar", "title": "Calendar", "icon": "today" },
            { "link": "register", "title": "Register", "icon": "today" }
        ];
        let title = "Add Timeslots";
        let icon = "account_box";

        return (
            <Form isLoading={this.state.isLoading} onSubmit={this.handleSubmit} icon={icon} title={title} actionLinks={actionLinks} fields={fields} />
        );
    }
}


export default AddTimeslots;