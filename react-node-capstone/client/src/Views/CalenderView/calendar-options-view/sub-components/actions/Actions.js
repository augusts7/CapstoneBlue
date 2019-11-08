import React from "react";
import ActionLayout from "./ActionLayout";
import CalendarActionsContext from "../../../context/CalendarActionsContext";

export default class Actions extends React.Component {

    static contextType = CalendarActionsContext;

    constructor(props) {
        super(props);

        this.state = {

        };

        this.handleAction = this.handleAction.bind(this);
    }



    handleAction(id, data) {

        const action = "" + id;

        if (action === "addAppointment") {

            this.context.showAddAppointmentForm();

        } else if (action === "shareCalendar") {

            this.context.showShareCalendarForm();

        } else if (action === "modifyAppointment") {

            this.context.showEditAppointmentForm(data);

        } else if (action === "exportCalendar") {


        } else if (action === "addAdvising") {

            this.context.showAdvisingSlotForm();

        } else if (action === "selectAdvising") {

            this.context.showAdvisingSignUpForm();

        } else if (action === "editAppointment") {

            this.context.showEditAppointmentForm(data);

        } else {

        }
    }

    render() {

        return (
            <ActionLayout handleAction={this.handleAction}/>
        );
    }

}
