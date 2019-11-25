import React from "react";
import DetailedListItemWithCheckbox from "../../list/list-items/DetailedListItemWithCheckbox";

export default function SingleItemInUserList(props) {

    const handleToggle = () => {
        props.toggleChecked(props.user.user_id);
    };

    const title = props.user.first_name + " " + props.user.last_name;

    return (
        <DetailedListItemWithCheckbox primary={title} secondary={props.user.campusEmail} onCheckBoxClick={handleToggle}/>
    );

}