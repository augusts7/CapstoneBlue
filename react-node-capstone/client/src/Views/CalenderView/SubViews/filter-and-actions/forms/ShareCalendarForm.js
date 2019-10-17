import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { get, post } from "../../../../../ApiHelper/ApiHelper"
import Progress from "../../parts/progress";


const headerStyle = { "padding": "16px", "backgroundColor": "#01579B", "color": "white" };
const dialogTitleStyle = { "padding": "0px", "margin": "0px" };


export default function ShareCalendarForm(props) {

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [progress, setProgress] = React.useState('');


    const handleChange = (event) => {
        switch (event.target.name) {
            case "name":
                setName(event.target.value);
                break;
            case "email":
                setEmail(event.target.value);
                break;
        }
    }

    const handleClose = () => {
        props.handlePopupClose("shareForm");
    };

    const handleShare = () => {

        if (name.length > 0 && email.length > 0) {

            let data = { "sharedCalendarName": name, "sharedCalendarId": props.sharedCalId, "sharedToEmail": email };

            post("/calendar/share", data, (res) => {

                if (res.success) {
                    alert("shared");
                } else {
                    alert("Couldn't share");
                }
            });
        }
    };

    return (
        <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle style={dialogTitleStyle} id="form-dialog-title">
                <div style={headerStyle}>
                    <div><h4>Share your calendar</h4></div>
                </div>
            </DialogTitle>

            <Progress show={progress} />
            <DialogContent>
                <DialogContentText>
                    Please enter the Public Name of the Calendar that the other user will see. Like, Nick's Calendar. Then enter the email address of the other user.
                    </DialogContentText>
                <TextField
                    fullWidth
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={name}
                    label={"Public Name for Calendar"}
                    margin="normal" />

                <TextField
                    fullWidth
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={email}
                    label={"Email of user to share Calendar with"}
                    margin="normal" />

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                    </Button>
                <Button onClick={handleShare} color="primary">
                    Share Calendar
                    </Button>
            </DialogActions>
        </Dialog>
    );
}
