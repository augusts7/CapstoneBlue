import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListSubheader from "@material-ui/core/ListSubheader";
import LengthValidator from "../../../../utils/length-utils/LengthValidator";
import TextField from "@material-ui/core/TextField";



export default function GroupedSelect(props) {

    const menuOptions = [];

    props.options.forEach((option) => {
        const listName = option.name;
        const calendarOptions = option.options;

        menuOptions.push(<ListSubheader>{listName}</ListSubheader>);
        if (LengthValidator.isNotEmpty(calendarOptions)) {
            calendarOptions.forEach((calendar) => {
                menuOptions.push(<MenuItem value={calendar.value}>{calendar.name}</MenuItem>);
            });
        }
    });

    const handleChange = (event) => {
        props.onChange(event.target.value);
    };

    return (
        <TextField
            select
            style={props.style}
            name={props.name}
            fullWidth={true}
            label={props.label}
            value={props.value}
            onChange={handleChange}
            helperText={props.helperText || props.label}
            margin="normal">

            {menuOptions}
        </TextField>
    );
}
