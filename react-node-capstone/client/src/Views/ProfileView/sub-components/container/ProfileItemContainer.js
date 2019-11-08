import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    card: {
        width: "100%"
    },
    media: {
        height: 140,
    },
});

const containerStyle = {paddingBottom: "8px"};
const titleContainerStyle = {paddingLeft: "16px", paddingTop: "16px", paddingBottom: "8px"};

export default function ProfileItemContainer(props) {
    const classes = useStyles();

    let buttons = [];
    if (props.buttons && props.buttons.length > 0) {
        props.buttons.forEach((btn) => {
            buttons.push(
                <Button onClick={btn.onClick} variant="outlined" color="primary">
                    {btn.name}
                </Button>
            );
        });
    }

    return (
        <div style={containerStyle} className={classes.card + " mdl-shadow--8dp mdl-color--grey-200"}>

            <CardContent>

                <Typography gutterBottom variant="h5" component="h2">
                    <div style={titleContainerStyle}>
                        {props.title}
                    </div>
                </Typography>
                <CardActions>
                    {buttons}
                </CardActions>
                {props.children}
            </CardContent>

        </div>
    );
}