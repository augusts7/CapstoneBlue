import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ColorPalette from "./ColorPalette";
import {ListItemIcon} from "@material-ui/core";

const ITEM_HEIGHT = 48;

export default function ColorMenuOptions(props) {

    const options = ColorPalette.getColors();

    const handleClick = (colorId) => {

        props.onClose();
    };

    return (
        <Menu
            anchorEl={props.anchor}
            keepMounted
            open={props.anchor !== null}
            onClose={props.onClose}
            PaperProps={{
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: 200,
                },
            }}
        >
            {options.map(option => {

                const color = option.color;

                return (
                    <MenuItem onClick={() => handleClick(color.id)} key={option} selected={option === 'Pyxis'}>
                        <ListItemIcon><span style={{backgroundColor: color}}/></ListItemIcon>{option}
                    </MenuItem>
                );
            })}
        </Menu>
    );
}