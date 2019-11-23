import React from "react";
import ListItemWithCheckbox from "../../list/list-items/ListItemWithCheckbox";

export default function SingleItemInUserList(props) {

    const handleToggle = () => {
        props.toggleChecked(props.user.user_id);
    };

    const title = props.user.first_name + " " + props.user.last_name;

    return (
        <ListItemWithCheckbox onCheckBoxClick={handleToggle}>{title}</ListItemWithCheckbox>
    );

}