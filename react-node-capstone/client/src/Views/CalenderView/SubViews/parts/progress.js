import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});


export default function Progress(props) {
  const classes = useStyles();

    if (props.show) {
        return (
            <div className={classes.root}>
                <LinearProgress style={{ height: "8px" }} />
            </div>
        );
    } else {
        return (<div></div>);
    }

  
}
