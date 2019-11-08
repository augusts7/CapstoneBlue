import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '../../../../generic-components/IconButton';
import Icon from '@material-ui/core/Icon';
import Menu from "../../../../generic-components/Menu";
import Progress from "../../../../generic-components/Progress";
import {Tooltip} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import BaseLayout from "../../base-layout/BaseLayout";

import "./BaseCalendarsLayout.css";


export default function BaseCalendarsLayout(props) {

    let items = [];

    props.cals.forEach(item => {
        items.push(<ListItem {...props} cal={item}/>);
    });

    return (
        <BaseLayout {...props}>
            {items}
        </BaseLayout>
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
                    <Typography variant="subtitle2">
                        <Checkbox
                            onChange={handleChange}
                            color="secondary"
                            checked={checked}
                            inputProps={{
                                'aria-label': 'secondary checkbox',
                            }}/>
                        {cal.calendarName}</Typography>
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
