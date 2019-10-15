import React from "react";
import Event from "./EventItem";
import Header from "../parts/Header";


const largeCardStyle = { "overflowY": "scroll", "height": window.innerHeight * 0.8 };

export default function EventsList(props) {

    const onOpenForm = () => {
        props.openPopup("eventForm", {});
    };

    let action = { name: "Add Event", "onClick": () => onOpenForm() };

    let menuOptions = [
        { key: "event", name: "Add Event" },
        { key: "appointment", name: "Add Appointment" },
        { key: "advisingSlot", name: "Add Advising Slots" },
    ];

    const onMenuOptionClick = (mode) => {
        if (mode === "advisingSlot") {
            props.openPopup("advisingSlotForm");
        } else {
            props.openPopup("eventForm", { "mode": mode });
        }  
    };


    return (
        <div>

            <div className="calendarView_side_wrapper">

                <div className="calendarView_side_card">

                    <Header title={props.title} menuOptions={menuOptions} onMenuOptionClick={onMenuOptionClick} isLoading={props.isLoading} action={action} />

                    <div style={largeCardStyle} className="styleScroll">
                        {props.events.map(data => {
                            return <Event event={data} />;
                        })}

                    </div>
                </div>
            </div>

        </div>

    );

}

