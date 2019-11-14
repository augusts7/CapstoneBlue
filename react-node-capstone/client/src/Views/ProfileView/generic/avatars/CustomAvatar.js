import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import {deepOrange, deepPurple} from '@material-ui/core/colors';
import {Typography} from "@material-ui/core";

const useStyles = makeStyles({
    avatar: {
        margin: 10,
    },
    orangeAvatar: {
        margin: 10,

        color: '#fff',
        backgroundColor: deepOrange[500],
    },
    purpleAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepPurple[500],
    },
});

export default function LetterAvatars(props) {
    const classes = useStyles();

    const style = {};
    if (props.size) {
        style["height"] = props.size;
        style["width"] = props.size;
    } else {
        style["height"] = "40px";
        style["width"] = "40px";
    }

    return (
        <span>
            <Avatar style={style} className={classes.purpleAvatar}><Typography>{props.children}</Typography></Avatar>
        </span>

    );
}
