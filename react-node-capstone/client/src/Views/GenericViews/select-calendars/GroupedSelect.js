import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListSubheader from "@material-ui/core/ListSubheader";
import LengthValidator from "../../../utils/length-utils/LengthValidator";

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

export default function GroupedSelect(props) {
    const classes = useStyles();

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

    return (
        <div>
            <FormControl fullWidth className={classes.formControl}>
                <Select onChange={props.onChange} helperText={props.helperText} defaultValue="" input={<Input id="grouped-select" />}>
                    {menuOptions}
                </Select>
            </FormControl>
        </div>
    );
}
