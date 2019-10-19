

import React from "react";


function Welcome(props) {


    const classes = useStyles();

    const [anchor, setAnchor] = React.useState(null);

    const handleClick = (event) => {
        if (!anchor) {
            setAnchor(event.currentTarget);
        } else {
            setAnchor(null);
        }
    };

    const handleClose = () => {
        setAnchor(null);
    };

    const handleOptionClick = (key) => {
        props.onMenuOptionClick(key);
    };

    let style = props.style;

    return <h1>Hello, {props.name}</h1>;
}