import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import LengthValidator from "../../../utils/length-utils/LengthValidator";

let containerStyles = {width: "100%"};

export default function ProgressBar(props) {


    const progress = [];

    if (props.show === true) {
        progress.push(<LinearProgress variant="query"/>);
    }

    return (
        <div style={containerStyles}>
            {progress}
        </div>
    );
}
