import React from "react";
import EventLayout from "../base-layout/EventLayout";
import EventLayoutButton from "../base-layout/EventLayoutButton";
import CalendarEventsListContext from "../../calendar-popup-context/CalendarEventsListContext";


export default function AdvisingItem(props) {

    const calendarPopupContext = React.useContext(CalendarEventsListContext);

    const onDeleteButtonClick = (onFinishCallback) => {
        alert("delete slot");
        onFinishCallback();
    };

    const deleteSlot = () => {
        calendarPopupContext.showDeleteDialog("Delete Advising Slot", "Are you sure you want to delete your advising slot?", onDeleteButtonClick);
    };


    let buttons = [];

    buttons.push(<EventLayoutButton icon="delete" onClick={deleteSlot}/>);

    return (<EventLayout {...props} buttons={buttons} />);
}
