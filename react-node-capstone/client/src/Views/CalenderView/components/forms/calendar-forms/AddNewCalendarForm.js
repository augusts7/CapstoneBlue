import React from 'react';
import TextField from '@material-ui/core/TextField';
import {post} from "../../../../../ApiHelper/ApiHelper"
import DialogForm from "../dialog-form/DialogForm";


export default function AddNewCalendarForm(props) {

    const [calName, setCalName] = React.useState('');
    const [progress, setProgress] = React.useState(false);

    const handleChange = (event) => {
        setCalName(event.target.value);
    };

    const handleClose = () => {
        props.onClose();
    };

    const handleSave = () => {
        if (calName.length > 0) {

            let data = {"calendarName": calName};

            post("/calendar", data, (res) => {

                if (res.success) {

                    handleClose();

                } else {
                    alert("Couldn't add");
                }
            });
        }
    };

    const buttons = [
        {name: "Cancel", onClick: handleClose},
        {name: "Submit", onClick: handleSave}
    ];

    return (
        <DialogForm open={props.open} buttons={buttons} onClose={handleClose} progress={progress}
                                title="Add New Calendar"
                                text="To add a new calendar, enter the name for the new calendar."
        >

            <TextField
                autoFocus
                fullWidth
                type="text"
                onChange={handleChange}
                value={calName}
                label={"Name"}
                margin="normal"/>
        </DialogForm>
    );
}