import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {width: "100%"};

export default function ProgressBar(props) {

    const progress = [];

    if (props.show === true) {
        progress.push(<LinearProgress variant="query"/>);
    }

    return (
        <div style={styles}>
            {progress}
        </div>
    );
}
