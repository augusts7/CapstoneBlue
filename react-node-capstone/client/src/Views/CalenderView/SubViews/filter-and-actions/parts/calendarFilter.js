import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import { get, post } from "../../../../../ApiHelper/ApiHelper"
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Menu from "../../parts/Menu";
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import AddNewCalendarForm from "../forms/AddNewCalendarForm";
import ShareCalendarForm from "../forms/ShareCalendarForm";

export default class CalendarFilter extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "cals": [{ "calendarName": "Default", "calendarId": "main" }, { "calendarName": "Another one", "calendarId": "2" }],
            "menuAnchor": null,
            "openShare": false,
            "openAdd": false,
            "sharedCalId": null,
        };
    }


    onDisplayCalsChange = (calId, show) => {

        this.props.onChangeCalendarData("cal", { "id": calId, "show": show });

    }
      

    handleCalsChange = (id, event) => {

        const checked = event.target.checked;

        const name = "id-" + id;

        this.setState({ [name]: checked }, () => this.onDisplayCalsChange(id, checked));
    }

    componentDidMount() {

        this.loadCalendars();

    }

    loadCalendars = () => {
        get("calendar/", (res) => {

            var cals = [];
            cals.push({ "calendarName": "Default", "calendarId": "main" });
            cals.push({ "calendarName": "Another one", "calendarId": "2" });

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

    handleMenuClick = (event) => {
        if (!this.state.menuAnchor) {
            this.setState({ "menuAnchor": event.currentTarget });
        } else {
            this.setState({ "menuAnchor": null });
        }
    };

    handleMenuClose = () => {
        this.setState({ "menuAnchor": null });
    };

    handleMenuOptionClick = (key, calId) => {

        if (calId === null) {
            alert("Error in the front end");
            return;
        }
        if (key == "share") {
            this.setState({ "openShare": true, "sharedCalId": calId });
        } else if (key == "delete") {

        }
    };

 
    closePopup = (name) => {
        this.handlePopup(name, false);
    }

    openPopup = (name) => {
        this.handlePopup(name, true);
    }

    handlePopup = (popupName, show) => {
        switch (popupName) {
            case "addForm":
                if (show === true) {
                    this.setState({ "openAdd": true });
                } else {
                    this.setState({ "openAdd": false });
                }
                
                break;
            case "shareForm":
                if (show === true) {
                    this.setState({ "openShare": true });
                } else {
                    this.setState({ "openShare": false });
                }
                break;
        }
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

        const menuOptions = [
            { "name": "Share Calendar", "key": "share" },
            { "name": "Delete Calendar", "key": "delete" }
        ];

        var calHtml = [];

        if (this.state.cals != null && this.state.cals.length > 0) {
            this.state.cals.forEach((cal) => {
                const name = "id-" + cal.calendarId;
                calHtml.push(
                    <div className="calendarFilterOption" key={cal.calendarId}>
                        <div className="mainItem"><Checkbox
                        onChange={(event) => this.handleCalsChange(cal.calendarId, event)}
                        color="primary"
                        checked={this.state[name]}
                        inputProps={{
                            'aria-label': 'secondary checkbox',
                            }} />
                            {cal.calendarName + "  " + cal.calendarId}
                        </div>
                        <div className="actionItem">
                            <IconButton onClick={this.handleMenuClick} color="inherit" aria-label="menu">
                                <Icon>more_vert</Icon>
                                <Menu onClose={this.handleMenuClose} onClick={(clickedKey) => this.handleMenuOptionClick(clickedKey, cal.calendarId)} anchor={this.state.menuAnchor} menuOptions={menuOptions} />

                            </IconButton>
                        </div>
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

                    <Typography className={classes.heading}>Calendars</Typography>

                </ExpansionPanelSummary>

                <ExpansionPanelDetails>

                    <div style={{ width: "100%" }}>

                        {calHtml}

                    </div>
                    <AddNewCalendarForm open={this.state.openAdd} handlePopupClose={this.closePopup} />
                    <ShareCalendarForm open={this.state.openShare} sharedCalId={this.state.sharedCalId} handlePopupClose={this.closePopup} />


                </ExpansionPanelDetails>
                <Divider />
                <ExpansionPanelActions>
                    <Button size="small">Close</Button>
                    <Button size="small" onClick={() => this.loadCalendars()}>Refresh</Button>
                    <Button onClick={() => this.openPopup("addForm")} size="small" color="primary">
                        Add New
                    </Button>
                </ExpansionPanelActions>
            </ExpansionPanel>
        );
    }
}
