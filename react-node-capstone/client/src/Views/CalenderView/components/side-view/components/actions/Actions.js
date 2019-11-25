import React from "react";
import ActionLayout from "./ActionLayout";
import CalendarActionsContext from "../../../../context/CalendarActionsContext";
import CalendarViewContext from "../../../../context/CalendarViewContext";

export default function Actions (props) {

    const calendarActionsContext = React.useContext(CalendarActionsContext);
    const calendarViewContext = React.useContext(CalendarViewContext);

    const handleAction = (id, data) => {

        const action = "" + id;

        if (action === "addAppointment") {

            calendarActionsContext.showAddAppointmentForm();

        } else if (action === "shareCalendar") {

            calendarActionsContext.showShareCalendarForm();

        } else if (action === "modifyAppointment") {

            calendarActionsContext.showEditAppointmentForm(data);

        } else if (action === "exportCalendar") {

            calendarViewContext.exportCalendar();

        } else if (action === "addAdvising") {

            calendarActionsContext.showAdvisingSlotForm();

        } else if (action === "selectAdvising") {

            calendarActionsContext.showAdvisingSignUpForm();

        } else if (action === "editAppointment") {

            calendarActionsContext.showEditAppointmentForm(data);

        } else {

        }
    };

    return (
        <ActionLayout handleAction={handleAction}/>
    );

}
