import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Menu from "../../../generic-components/Menu";
import Progress from '../../../generic-components/progress';


const smallButton = makeStyles(theme => ({
    "root": {
        "padding": "4px"
    }
}));


const menuOptions = [
    { "name": "Share calendar", "key": "share" },
    { "name": "Delete calendar", "key": "delete" }
];

const expandIcons = { "show": "keyboard_arrow_up", "hide": "keyboard_arrow_down" };


export default function SharedCalLayout (props) {
     
    const [showContents, setShowContents] = React.useState(false);

    let body = null;
    if (showContents) {
        body = <Body {...props} />;
    }  

    return (
        <div className="filterItemContainer">
            <Header show={showContents} setShow={setShowContents} {...props} />
            <Progress show={props.isLoading} />

            {body}
        </div>
    );
}

function Header(props) {

    const classes = smallButton();

    var expandIcon = props.show === true ? "keyboard_arrow_up" : "keyboard_arrow_down";

    const toggleShow = () => {
        props.setShow(!props.show);
    };

    return (

        <div className="filterItemTitleContainer">

            <div className="filterItemTitleText">Shared Calendars</div>

            <div className="filterItemTitleActionsContainer">
                <div><IconButton onClick={toggleShow} classes={classes}><Icon>{expandIcon}</Icon></IconButton></div>
            </div>

        </div>
    );
}


function Body(props) {

    var items = [];

    const handleListMenu = (key, id) => {

        if (key === "share") {
            props.handleAction("share", { "calId": id });

        } else if (key === "delete") {
            props.handleAction("delete", { "calId": id });

        }
    }

    props.cals.forEach(item => {
        items.push(<ListItem cal={item} handleCalsChange={props.handleCalsChange} handleListMenu={handleListMenu} />);
    });

    return (
        <div>
            {items}
        </div>  
    );
}

function ListItem(props) {

    const cal = props.cal;

    const [checked, setChecked] = React.useState(false);

    const onMenuOptionClick = (key) => {

        props.handleListMenu(key, cal.calendarId);
    }

    const handleChange = (event) => {
        setChecked(!checked);
        props.handleCalsChange(cal.calendarId, event);
    };

    return (

        <div className="filterItemOptionContainer" key={cal.calendarId}>
            <div className="mainItem">
                <Checkbox
                    style={{ color: "#1976D2"}}
                    onChange={handleChange}
                    color="primary"
                    checked={checked}
                    inputProps={{
                        'aria-label': 'secondary checkbox',
                    }} />
                {cal.calendarName}
            </div>
            <div className="actionItem">
                <ListItemMenu onOptionClick={onMenuOptionClick} />
            </div>
        </div>
    );
}

const ListItemMenu = (props) => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const classes = smallButton();

    return (
        <div>
            <IconButton onClose={handleClose} onClick={handleClick} classes={classes}>
                <Icon>more_vert</Icon>
                
            </IconButton>
            <Menu onClose={handleClose} onClick={props.onOptionClick} anchor={anchorEl} menuOptions={menuOptions} />
            
        </div>
    );
}
