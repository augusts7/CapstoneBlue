import React from "react";
import ProfileItemBlockContainer from "../../../generic/profile-view-item/profile-item-blocks/ProfileItemBlockContainer";
import {get} from "../../../../../ApiHelper/ApiHelper";
import LengthValidator from "../../../../../utils/length-utils/LengthValidator";
import CalendarTitleRow from "../components/CalendarTitleRow";
import CalendarItem from "../components/CalendarItem";

const calendarTitles = ["Shared Calendar Name", "Shared By", "Email of Shared by user"];


export default class CalendarsSharedWithMe extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            calendars: []
        };
    }

    componentDidMount() {
        this.loadCalendars();
    }

    loadCalendars = () => {
        this.setState({"progress": true});

        get("/calendar/sharedToUser", (res) => {
            if (res.success) {

                let calendars = [];

                if (res.results) {
                    calendars = res.results.concat();
                }

                this.setState({"progress": false, "calendars": calendars});

            } else {
                this.setState({"progress": false, message: res.message});
            }
            console.log("hi");
            console.log(res);
        });
    };

    render () {

        let calendars = [];

        if (LengthValidator.isNotEmpty(this.state.calendars)) {
            calendars.push(<CalendarTitleRow titles={calendarTitles}/>);
            this.state.calendars.forEach((calendar) => {
                calendars.push(<CalendarItem data={calendar}/>);
            });
        }


        return (

            <ProfileItemBlockContainer progress={this.state.progress} title="Calendars Shared With Me">
                {calendars}
            </ProfileItemBlockContainer>
        );
    }
}
