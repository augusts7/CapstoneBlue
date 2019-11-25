import React from "react";
import EventLayout from "../base-layout/EventLayout";
import EventLayoutButton from "../base-layout/EventLayoutButton";
import CalendarEventsListContext from "../../calendar-popup-context/CalendarEventsListContext";


export default function AdvisingSignUpItem(props) {

    const calendarPopupContext = React.useContext(CalendarEventsListContext);

    const onDeleteButtonClick = (onFinishCallback) => {
        alert("delete slot");
        onFinishCallback();
    };

    // eslint-disable-next-line
    const deleteSlot = () => {
        calendarPopupContext.showDeleteDialog("Delete Advising Slot", "Are you sure you want to delete your advising slot?", onDeleteButtonClick);
    };

    const addSlot = () => {
        props.onSelect(props.event);
    };

    let buttons = [];

    buttons.push(<EventLayoutButton icon="add" onClick={addSlot}>Add to Calendar</EventLayoutButton>);

    return (<EventLayout {...props} buttons={buttons} />);

}
