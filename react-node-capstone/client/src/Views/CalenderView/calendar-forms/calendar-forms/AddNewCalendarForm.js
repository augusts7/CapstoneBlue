import React from 'react';
import TextField from '@material-ui/core/TextField';
import { post } from "../../../../ApiHelper/ApiHelper"
import CalendarFormBaseLayout from "../base-layout/BaseLayout";


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

            let data = { "calendarName": calName };

            post("/calendar", data, (res) => {

                if (res.success) {

                    handleClose();

                } else {
                    alert("Couldn't add");
                }
            });
        }
    };

    const text = "To create a New Calendar, you have to enter the name for your New Calendar.";
    const buttons = [
        {name: "Cancel", onClick: handleClose},
        {name: "Add Calendar", onClick: handleSave}
    ];

    return (
        <CalendarFormBaseLayout open={props.open} buttons={buttons} onClose={handleClose} text={text} progress={progress} title="Add New Calendar">
            <TextField
                fullWidth
                type="text"
                onChange={handleChange}
                value={calName}
                label={"Enter Calendar Name"}
                margin="normal" />
        </CalendarFormBaseLayout>
    );
}
