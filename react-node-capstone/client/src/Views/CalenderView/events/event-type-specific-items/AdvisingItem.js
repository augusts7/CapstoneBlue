import React from "react";
import EventLayout from "../base-layout/EventLayout";
import EventLayoutButton from "../base-layout/EventLayoutButton";


export default function AdvisingItem(props) {


    const addSlot = () => {
        alert("add slot");

    };

    const deleteSlot = () => {
        alert("delete slot");
    };


    let buttons = [];


    if (props.event.created) {
        buttons.push(<EventLayoutButton icon="delete" onClick={deleteSlot}/>);
    } else {
        if (props.event.accepted) {
            buttons.push(<EventLayoutButton icon="delete" onClick={deleteSlot}/>);
        } else {
            buttons.push(<EventLayoutButton icon="add" onClick={addSlot}/>);
        }

    }

    return (<EventLayout {...props} buttons={buttons} />);

}
