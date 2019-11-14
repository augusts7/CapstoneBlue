import React from "react";
import ProfileItemBlockContainer from "../../../generic/profile-view-item/profile-item-blocks/ProfileItemBlockContainer";
import {get} from "../../../../../ApiHelper/ApiHelper";


export default class CalendarsSharedWithMe extends React.Component {

    constructor (props) {
        super(props);


    }

    componentDidMount() {
        this.loadCalendars();
    }

    loadCalendars = () => {
        this.setState({"progress": true});

        get("calendar/sharedToUser", (res) => {
            if (res.success) {

                let calendarOptions = [];

                if (res.results) {
                    res.results.forEach((item) => {
                        calendarOptions.push({"name": item.calendarName, "value": item.calendarId});
                    });
                }

                this.setState({"progress": false, "calendarOptions": calendarOptions});

            } else {
                this.setState({"progress": false, message: res.message});
            }
        });
    };

    render () {

        return (

            <ProfileItemBlockContainer title="Calendars Shared With Me">
                Hello
            </ProfileItemBlockContainer>
        );
    }
}
