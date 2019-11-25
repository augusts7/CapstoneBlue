import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {Typography} from "@material-ui/core";
import "./ListItemWithCheckbox.css";


export default function ListItemWithCheckbox(props) {

    const [checked, setChecked] = React.useState(props.checked || false);

    const handleToggle = () => {
        props.onCheckBoxClick(!checked);
        setChecked(!checked);
    };

    return (
        <ListItem className="list-item-with-hover" onClick={handleToggle}>
            <ListItemIcon>
                <Checkbox
                    color="primary"
                    edge="end"
                    checked={checked}
                />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subtitle2">{props.children}</Typography>}/>

        </ListItem>
    );
}