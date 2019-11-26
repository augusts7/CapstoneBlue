import React from "react";
import EventLayout from "../base-layout/EventLayout";
import EventLayoutButton from "../base-layout/EventLayoutButton";
import CalendarEventsListContext from "../../calendar-popup-context/CalendarEventsListContext";
import {post} from "../../../../../../ApiHelper/ApiHelper";


export default function AdvisingItem(props) {

    const calendarPopupContext = React.useContext(CalendarEventsListContext);
    const [progress, setProgress] = React.useState(false);

    const onDeleteButtonClick = (callback) => {
        setProgress(true);
        const data = {
            eventId: props.event.id
        };

        post("/advising/delete", data, (res) => {

            if (res.success) {

            } else {
                console.log(res.message);
            }
            setProgress(false);
            callback({...props.event});
        });
    };

    const deleteSlot = () => {
        calendarPopupContext.showDeleteDialog("Delete Advising Slot", "Are you sure you want to delete your advising slot?", onDeleteButtonClick);
    };


    let buttons = [];

    buttons.push(<EventLayoutButton icon="delete" onClick={deleteSlot}>Delete Advising Slot</EventLayoutButton>);

    return (<EventLayout progress={progress} {...props} buttons={buttons} />);
}
