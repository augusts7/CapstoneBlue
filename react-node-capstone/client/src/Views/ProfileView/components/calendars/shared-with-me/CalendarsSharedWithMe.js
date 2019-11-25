import React from "react";
import ProfileItemBlockContainer
    from "../../../generic/profile-view-item/profile-item-blocks/ProfileItemBlockContainer";
import {get, post} from "../../../../../ApiHelper/ApiHelper";
import LengthValidator from "../../../../../utils/length-utils/LengthValidator";
import ProfileItemGridTitle from "../../generic/ProfileItemGridTitle";
import CalendarItemGridRow from "../../generic/CalendarItemGridRow";

const calendarTitles = ["Shared Calendar Name", "Shared By", "Email of Shared by user"];


export default class CalendarsSharedWithMe extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            calendars: [],
            progress: false
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

    handleDelete = (id) => {
        const data = {id};
        this.setState({progress: true});
        post("/calendar/sharedToUser/delete", data, (res) => {
            const calendars = this.state.calendars.filter((cal) => cal.id !== id);
            this.setState({progress: false, calendars});
        });
    };

    render() {

        let calendars = [];

        if (LengthValidator.isNotEmpty(this.state.calendars)) {
            calendars.push(<ProfileItemGridTitle titles={calendarTitles}/>);
            this.state.calendars.forEach((calendar) => {
                calendars.push(<CalendarItemGridRow onDelete={this.handleDelete} data={calendar}/>);
            });
        }


        return (

            <ProfileItemBlockContainer progress={this.state.progress} title="Calendars Shared With Me">
                {calendars}
            </ProfileItemBlockContainer>
        );
    }
}
