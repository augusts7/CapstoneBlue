import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';


const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})(props => (
    <Menu
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles(theme => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

export default function CustomMenu(props) {

    const onMenuOptionClick = (key) => {
        props.onClick(key);
        props.onClose();
    };

    return (
        <div>
            <StyledMenu
                key={props.key}
                anchorEl={props.anchor}
                keepMounted
                open={Boolean(props.anchor)}
                onClose={props.onClose}>

                {props.menuOptions.map((item) => {
                    return <StyledMenuItem onClick={() => onMenuOptionClick(item.key)} key={item.key}>
                        <ListItemText primary={item.name} />
                    </StyledMenuItem>
                })}
            </StyledMenu>
        </div>
    );
}
