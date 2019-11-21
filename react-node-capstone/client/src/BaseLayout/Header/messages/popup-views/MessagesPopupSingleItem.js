import React from 'react';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

const containerStyle = {margin: "8px"};

export default function MessagesPopupItem(props) {

    return (
        <div style={containerStyle}>
            <div>
                <Typography color="textSecondary" gutterBottom>
                    {"Lon Smith"}
                </Typography>
                <Typography variant="h5" component="h2">
                    Demo Title
                </Typography>
                <Typography color="textSecondary">
                    Demo Message
                </Typography>
                <Typography variant="body2" component="p">
                    Demo
                </Typography>
            </div>
            <CardActions>
                <Button variant="outlined" color="primary">Delete</Button>
            </CardActions>
        </div>
    );

}
