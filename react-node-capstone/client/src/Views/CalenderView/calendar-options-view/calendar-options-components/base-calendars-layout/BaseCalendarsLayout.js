import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '../../../generic-components/IconButton';
import Icon from '@material-ui/core/Icon';
import Menu from "../../../generic-components/Menu";
import Progress from "../../../../../components/Container/Progress/Progress";
import {Tooltip} from "@material-ui/core";


const expandIcons = {"show": "keyboard_arrow_up", "hide": "keyboard_arrow_down"};


export default function BaseCalendarsLayout(props) {

    const [showContents, setShowContents] = React.useState(true);

    let body = null;
    if (showContents) {
        body = <Body {...props} />;
    }

    return (
        <div className="filterItemContainer">
            <Header show={showContents} setShow={setShowContents} {...props} />
            <Progress show={props.isLoading}/>
            {body}
        </div>
    );
}

function Header(props) {

    let expandIcon = props.show === true ? "keyboard_arrow_up" : "keyboard_arrow_down";

    const toggleShow = () => {
        props.setShow(!props.show);
    };

    return (

        <div className="filterItemTitleContainer">

            <div className="filterItemTitleText">Calendars</div>

            <div className="filterItemTitleActionsContainer">
                {props.headerIcon}
                <div><IconButton onClick={toggleShow}><Icon>{expandIcon}</Icon></IconButton></div>
            </div>

        </div>
    );
}


function Body(props) {

    let items = [];

    props.cals.forEach(item => {
        items.push(<ListItem {...props} cal={item}/>);
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
        props.onMenuClick(key, cal.calendarId);
    };

    const handleChange = (event) => {
        setChecked(!checked);
        props.handleCalsChange(cal.calendarId, event);
    };

    return (
        <Tooltip title={cal.calendarName} placement="top-end" enterDelay={500} leaveDelay={200}>
            <div className="filterItemOptionContainer" key={cal.calendarId}>
                <div className="mainItem">
                    <Checkbox
                        style={{color: "#1976D2"}}
                        onChange={handleChange}
                        color="primary"
                        checked={checked}
                        inputProps={{
                            'aria-label': 'secondary checkbox',
                        }}/>
                    {cal.calendarName}
                </div>
                <div className="actionItem">
                    <ListItemMenu menuOptions={props.menuOptions} onOptionClick={onMenuOptionClick}/>
                </div>
            </div>
        </Tooltip>
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

    return (
        <div>
            <IconButton onClose={handleClose} onClick={handleClick}>
                <Icon>more_vert</Icon>
            </IconButton>

            <Menu onClose={handleClose} onClick={props.onOptionClick} anchor={anchorEl}
                  menuOptions={props.menuOptions}/>

        </div>
    );
};
