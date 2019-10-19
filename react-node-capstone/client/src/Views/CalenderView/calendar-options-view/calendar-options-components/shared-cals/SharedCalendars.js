import React from "react";
import {get, post} from "../../../../../ApiHelper/ApiHelper"
import SharedCalLayout from "./SharedCalLayout";
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

        get("calendar/sharedToUser", (res) => {

            var cals = [];

            if (res.success) {

                res.results.forEach((cal) => {
                    cals.push({"calendarId": cal.id, "calendarName": cal.sharedCalendarName});
                });
            }

            this.setState({"cals": cals, "isLoading": false});
        });
    }

    handleAction = (actionType, data) => {

        let action = "" + actionType;

        if (data === null || data.calId === null) {
            alert("Error in the front end");
            return;
        }
        if (action === "share") {
            this.setState({"openShare": true, "sharedCalId": data.calId});
        } else if (action === "delete") {

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
                this.setState({"openAdd": show});

                break;
            case "shareForm":
                this.setState({"openShare": show});
                break;
        }
    };

    closeAddPopup = () => {
        this.closePopup("addForm");
    };

    closeSharePopup = () => {
        this.closePopup("shareForm");
    };

    render() {

        return (
            <div>
                <AddNewCalendarForm open={this.state.openAdd} onClose={this.closeAddPopup}/>
                <ShareCalendarForm open={this.state.openShare} sharedCalId={this.state.sharedCalId}
                                   onClose={this.closeSharePopup}/>
                <SharedCalLayout isLoading={this.state.isLoading} handleAction={this.handleAction}
                                 handleCalsChange={this.handleCalsChange} cals={this.state.cals}/>
            </div>
        );

    }
}
