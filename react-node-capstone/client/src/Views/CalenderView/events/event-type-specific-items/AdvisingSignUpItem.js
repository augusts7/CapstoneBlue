import React from "react";
import MaterialButton from "@material-ui/core/Button"
import EventLayout from "../base-layout/EventLayout";
import EventLayoutButton from "../base-layout/EventLayoutButton";


export default function AdvisingSignUpItem(props) {


    const addSlot = () => {
        props.onSelect(props.event);
    };

    let buttons = [];

    buttons.push(<EventLayoutButton icon="add" onClick={addSlot}>Add to Calendar</EventLayoutButton>);

    return (<EventLayout {...props} buttons={buttons} />);

}
