import React from "react";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { post } from "../../../../../ApiHelper/ApiHelper"
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/TextField";

export default class ShareCalendarForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "shareCalEmail": "",
            "shareCalName": "",
            "shareCalId": ""
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    shareCalendar = () => {

        if (!this.state.shareCalId || !this.state.shareCalName || !this.state.sharedToEmail) {
            return;
        }


        let data = { "sharedCalendarName": this.state.shareCalName, "sharedCalendarId": this.state.shareCalId, "sharedToEmail": this.state.sharedToEmail };

        post("/calendar/share", data, (res) => {

            if (res.success) {
                alert("shared");
            } else {
                alert("Couldn't share");
            }
        });
    }


    render() {

      
        return (

            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">

                    <Typography>Share Calendar</Typography>

                </ExpansionPanelSummary>

                <ExpansionPanelDetails>

                    <div style={{ width: "100%" }}>


                        <Input fullWidth label="Shared Calendar Name" name="shareCalName" onChange={this.handleChange} value={this.state.shareCalName} />
                        <Input fullWidth label="Shared Calendar Id" name="shareCalId" onChange={this.handleChange} value={this.state.shareCalId} />
                        <Input fullWidth label="Share to Email" name="sharedToEmail" onChange={this.handleChange} value={this.state.sharedToEmail} />


                        <Button onClick={this.shareCalendar}>Share calendar</Button>

                    </div>

                </ExpansionPanelDetails>
            </ExpansionPanel>

        );
    }

}
