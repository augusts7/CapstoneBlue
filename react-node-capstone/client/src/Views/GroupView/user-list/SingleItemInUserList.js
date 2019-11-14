import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";

export default function SingleItemInUserList(props) {

    const [checked, setChecked] = React.useState(false);

    const handleToggle = () => {
        setChecked(!checked);
    };

    return (
        <ListItem key={props.user.user_id}>
            <ListItemIcon>
                <Checkbox
                    edge="end"
                    onChange={handleToggle}
                    checked={checked}
                />
            </ListItemIcon>
            <ListItemText primary={props.user.first_name + " " + props.user.last_name}/>

        </ListItem>
    );

}