import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import { get, post } from "../../../../../ApiHelper/ApiHelper"
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/TextField";

export default function AddNewCalendar (props) {

    let [calName, setCalName] = React.useState("");

    const handleChange = (event) => {
        setCalName(event.target.value);
    };

    const addNewCalendar = () => {

        if (!calName) {
            return;
        }

        let data = { "calendarName": calName };

        post("/calendar", data, (res) => {

            if (res.success) {
                alert("added");
            } else {
                alert("Couldn't add");
            }
        });
    }

    return (

            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">

                    <Typography>Add new Calendar</Typography>

                </ExpansionPanelSummary>

                <ExpansionPanelDetails>

                    <div style={{ width: "100%" }}>

                        <Input fullWidth label="New Calendar Name" onChange={handleChange} value={calName} />

                        <Button onClick={addNewCalendar}>Add new calendar</Button>

                    </div>

                </ExpansionPanelDetails>
            </ExpansionPanel>

        );

}
