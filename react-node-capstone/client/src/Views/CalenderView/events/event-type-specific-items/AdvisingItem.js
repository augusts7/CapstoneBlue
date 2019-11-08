import React from "react";
import EventLayout from "../base-layout/EventLayout";
import EventLayoutButton from "../base-layout/EventLayoutButton";


export default function AdvisingItem(props) {

    const deleteSlot = () => {
        alert("delete slot");
    };


    let buttons = [];

    buttons.push(<EventLayoutButton icon="delete" onClick={deleteSlot}/>);

    return (<EventLayout {...props} buttons={buttons} />);
}
