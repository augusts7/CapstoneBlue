import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const progressStyle = { height: "8px" };

export default function Progress(props) {
  const classes = useStyles();

    if (props.show) {
        return (
            <div className={classes.root}>
                <LinearProgress style={progressStyle} />
            </div>
        );
    } else {
        return (<div />);
    }

  
}
