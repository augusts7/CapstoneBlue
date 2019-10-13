import React from "react";
import Actions from "./parts/actions";
import Filter from "./parts/filter";
import Action from "./parts/actions"


export default function FilterAndActions(props) {


    return (
        <div>
            <Filter openPopup={props.openPopup} onChangeCalendarData={props.onChangeCalendarData} />
            
        </div>

    );

}