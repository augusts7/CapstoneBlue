import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';



export default function CustomMenu(props) {

    const onMenuOptionClick = (key) => {
        props.onClick(key);
        props.onClose();
    };

    return (
        <div>
            <Menu
                key={props.key}
                anchorEl={props.anchor}
                keepMounted
                open={Boolean(props.anchor)}
                onClose={props.onClose}>

                {props.menuOptions.map((item) => {
                    return <MenuItem onClick={() => onMenuOptionClick(item.key)} key={item.key}>
                        <ListItemText primary={item.name} />
                    </MenuItem>
                })}
            </Menu>
        </div>
    );
}
