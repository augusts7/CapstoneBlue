import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

export default function GroupedSelect(props) {
    const classes = useStyles();

    const menuItems = [];

    props.options.forEach((option) => {
        menuItems.push(<MenuItem value={option.value}>{option.name}</MenuItem>);
    });

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="grouped-select">Grouping</InputLabel>
                <Select fullWidth defaultValue="" input={<Input id="grouped-select"/>}>
                    {menuItems}
                </Select>
            </FormControl>
        </div>
    );
}
