import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles(theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: "100%"
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

const containerStyle = {border: "1px solid #BDBDBD", borderRadius: "8px"};

export default function UserListDialogSearch(props) {
    const classes = useStyles();

    const [searchValue, setSearchValue] = React.useState("");

    const handleChange = (event) => {
        const value = event.target.value;
        setSearchValue(value);
        props.onSearch(value);
    };

    const handleClearSearchButtonClick = () => {
        props.onClearSearch();
        setSearchValue("");
    };

    return (
        <div style={containerStyle} className={classes.root}>
            <IconButton className={classes.iconButton} aria-label="menu">
                <Icon>search</Icon>
            </IconButton>
            <InputBase
                onChange={handleChange}
                className={classes.input}
                value={searchValue}
                placeholder="Search All Users"
                inputProps={{'aria-label': 'search all users'}}
            />

            <Divider className={classes.divider} orientation="vertical" />
            <IconButton onClick={handleClearSearchButtonClick} color="primary" className={classes.iconButton} aria-label="directions">
                <Icon>clear</Icon>
            </IconButton>
        </div>
    );
}
