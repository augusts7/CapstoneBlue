import React from "react";
import Filter from "./parts/filter";


export default function FilterAndActions(props) {


    return (
        <div>
            <Filter openPopup={props.openPopup} onChangeCalendarData={props.onChangeCalendarData} />
            
        </div>

    );

}