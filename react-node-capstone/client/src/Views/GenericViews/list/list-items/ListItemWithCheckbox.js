import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {Typography} from "@material-ui/core";

export default function ListItemWithCheckbox(props) {

    const [checked, setChecked] = React.useState(props.checked || false);

    const handleToggle = () => {
        props.onCheckBoxClick(!checked);
        setChecked(!checked);
    };

    return (
        <ListItem>
            <ListItemIcon>
                <Checkbox
                    color="primary"
                    edge="end"
                    onChange={handleToggle}
                    checked={checked}
                />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subtitle2">{props.children}</Typography>}/>

        </ListItem>
    );
}