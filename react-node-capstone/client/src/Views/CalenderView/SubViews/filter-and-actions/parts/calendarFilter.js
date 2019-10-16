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

export default class CalendarFilter extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "cals": [],
        };

        this.onDisplayCalsChange = this.onDisplayCalsChange.bind(this);
        this.handleCalsChange = this.handleCalsChange.bind(this);
    }


    onDisplayCalsChange(calId, show) {

        this.props.onChangeCalendarData("cal", { "id": calId, "show": show });

    }
      

    handleCalsChange(id, event) {

        const checked = event.target.checked;

        const name = "id-" + id;

        this.setState({ [name]: checked }, () => this.onDisplayCalsChange(id, checked));
    }

    componentDidMount() {

        get("calendar/", (res) => {

            var cals = [];
            cals.push({ "calendarName": "Default", "calendarId": "main" });
            console.log(cals);
            if (res.success) {
                console.log(res.results);
                cals = cals.concat(res.results);
            }
            var cState = { "cals": cals };
            cals.forEach(cal => {
                if (cal.calendarId === "main") {
                    cState[("id-" + cal.calendarId)] = true;
                } else {
                    cState[("id-" + cal.calendarId)] = false;
                }
            });
            this.setState(cState);
        });

    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    addNewCalendar = () => {

        if (!this.state.newCalName) {
            return;
        }

        let data = { "calendarName": this.state.newCalName };

        post("/calendar", data, (res) => {

            if (res.success) {
                alert("added");
            } else {
                alert("Couldn't add");
            }
        });
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

        console.log(this.state.cals);

        let classes = makeStyles(theme => ({
            root: {
                width: '100%',
            },
            heading: {
                fontSize: theme.typography.pxToRem(15),
                fontWeight: theme.typography.fontWeightRegular,
            }
        }));

        var calHtml = [];

        if (this.state.cals != null && this.state.cals.length > 0) {
            this.state.cals.forEach((cal) => {
                const name = "id-" + cal.calendarId;
                calHtml.push(
                    <div key={cal.calendarId}><Checkbox
                        onChange={(event) => this.handleCalsChange(cal.calendarId, event)}
                        color="primary"
                        checked={this.state[name]}
                        inputProps={{
                            'aria-label': 'secondary checkbox',
                        }} />
                        {cal.calendarName + "  " + cal.calendarId}
                    </div>
                );
            });
        }

        console.log(this.state);
         
        return (

            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">

                    <Typography className={classes.heading}>Select Calendars to display</Typography>

                </ExpansionPanelSummary>

                <ExpansionPanelDetails>

                    <div style={{ width: "100%" }}>

                        {calHtml}

                    </div>

                </ExpansionPanelDetails>
            </ExpansionPanel>

        );
    }

}
