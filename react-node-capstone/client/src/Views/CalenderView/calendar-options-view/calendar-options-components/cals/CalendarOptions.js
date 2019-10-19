import React from "react";
import {get, post} from "../../../../../ApiHelper/ApiHelper"
import CalLayout from "./CalendarOptionsLayout";
import AddNewCalendarForm from "../../../calendar-forms/calendar-forms/AddNewCalendarForm";
import ShareCalendarForm from "../../../calendar-forms/calendar-forms/ShareCalendarForm";

export default class CalendarFilter extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "cals": [],
            "openShare": false,
            "openAdd": false,
            "isLoading": false,
            "sharedCalId": null,
        };
    }

    handleCalsChange = (id, event) => {

        const checked = event.target.checked;

        const name = "id-" + id;

        this.setState({[name]: checked}, () => {
            this.props.onChangeCalendarData("sharedCal", {"id": id, "show": checked});
        });
    }

    componentDidMount() {

        this.loadCalendars();

    }

    loadCalendars = () => {

        this.setState({"isLoading": true});

        get("calendar/", (res) => {

            var cals = [];

            if (res.success) {

                res.results.forEach((cal) => {
                    cals.push({"calendarId": cal.calendarId, "calendarName": cal.calendarName});
                });
            }

            this.setState({"cals": cals, "isLoading": false});
        });
    }

    handleAction = (actionType, data) => {

        var calId = -1;

        if (data !== null && data.calId !== null) {
            calId = data.calId;
        }

        if (actionType == "share") {
            if (calId !== -1) {
                this.setState({"openShare": true, "sharedCalId": data.calId});
            }
        } else if (actionType == "delete") {
            if (calId !== -1) {
                this.setState({"openShare": true, "sharedCalId": data.calId});
            }
        } else if (actionType == "add") {
            this.handlePopup("addForm", true);
        }
    };


    closePopup = (name) => {
        this.handlePopup(name, false);
    };

    openPopup = (name) => {
        this.handlePopup(name, true);
    };

    handlePopup = (popupName, show) => {

        switch (popupName) {
            case "addForm":
                if (show === true) {
                    this.setState({"openAdd": true});
                } else {
                    this.setState({"openAdd": false});
                }

                break;
            case "shareForm":
                if (show === true) {
                    this.setState({"openShare": true});
                } else {
                    this.setState({"openShare": false});
                }
                break;
        }
    };

    closeSharePopup = () => {
        this.closePopup("shareForm");
    };

    closeAddPopup = () => {
        this.closePopup("addForm");
    };

    render() {

        return (
            <div>
                <AddNewCalendarForm open={this.state.openAdd} onClose={this.closeAddPopup}/>
                <ShareCalendarForm open={this.state.openShare} sharedCalId={this.state.sharedCalId}
                                   onClose={this.closeSharePopup}/>
                <CalLayout isLoading={this.state.isLoading} handleAction={this.handleAction}
                           handleCalsChange={this.handleCalsChange} cals={this.state.cals}/>
            </div>
        );

    }
}
