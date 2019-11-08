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

export default function GroupedSelect() {
    const classes = useStyles();

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="grouped-select">Grouping</InputLabel>
                <Select fullWidth defaultValue="" input={<Input id="grouped-select"/>}>
                    <MenuItem value="">Default</MenuItem>
                    <ListSubheader>Category 1</ListSubheader>
                    <MenuItem value={1}>Option 1</MenuItem>
                    <MenuItem value={2}>Option 2</MenuItem>
                    <ListSubheader>Category 2</ListSubheader>
                    <MenuItem value={3}>Option 3</MenuItem>
                    <MenuItem value={4}>Option 4</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
