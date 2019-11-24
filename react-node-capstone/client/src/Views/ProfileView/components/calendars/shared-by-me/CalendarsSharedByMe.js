import React from "react";
import ProfileItemBlockContainer
    from "../../../generic/profile-view-item/profile-item-blocks/ProfileItemBlockContainer";
import {get, post} from "../../../../../ApiHelper/ApiHelper";
import LengthValidator from "../../../../../utils/length-utils/LengthValidator";
import CalendarItem from "../components/CalendarItem";
import CalendarTitleRow from "../components/CalendarTitleRow";
import EmptyListView from "../../../../GenericViews/empty-view/EmptyListView";

const calendarTitles = ["Shared Calendar Name", "Shared To", "Email of Shared to user"];

export default class CalendarsSharedByMe extends React.Component {

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

        get("/calendar/sharedByUser", (res) => {
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
        post("/calendar/sharedByUser/delete", data, (res) => {
            const calendars = this.state.calendars.filter((cal) => cal.id !== id);
            this.setState({progress: false, calendars});
        });
    };

    render () {

        let calendars = [];

        if (LengthValidator.isNotEmpty(this.state.calendars)) {
            calendars.push(<CalendarTitleRow titles={calendarTitles}/>);
            this.state.calendars.forEach((calendar) => {
                calendars.push(<CalendarItem onDelete={this.handleDelete} data={calendar}/>);
            });
        }

        return (

            <ProfileItemBlockContainer progress={this.state.progress} title="Calendars Shared By Me">
                {calendars}
            </ProfileItemBlockContainer>
        );
    }
}
