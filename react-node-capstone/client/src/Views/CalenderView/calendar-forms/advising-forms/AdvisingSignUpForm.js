import React from 'react';
import MessageBox from "../../../../components/Form/MessageBox/MessageBox"
import 'date-fns';
import { get, post } from "../../../../api-helper/ApiHelper"
import CalendarFormBaseLayout from "../base-layout/BaseLayout";
import UnSelectedAdvisingItem from "../../events/event-type-specific-items/AdvisingSignUpItem";

export default class AdvisingSignUpForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "isLoading": false,
            "slots": [],
            "selectedSlotId": -1,
        };

        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.hideMessage = this.hideMessage.bind(this);
    }

    componentDidMount() {

        this.loadAllSlots();
    }


    loadAllSlots = () => {
        this.setState({ "isLoading": true });

        get("advising/all", (res) => {
            if (res.success) {

                let slots = [];

                if (res.results) {
                    res.results.forEach((item) => {
                        slots.push(item);
                    });
                }

                this.setState({ "isLoading": false, "slots": slots });

            } else {
                this.setState({ "isLoading": false, message: res.message });
            }
        });
    };

    hideMessage() {
        this.setState({message: ""});
    }

    handleChange(name, value) {
        this.setState({[name] : value});
    }

    handleSave() {

        if (this.state.selectedSlotId === -1) {
            this.setState({"message": "Please select a slot."});
            return;
        }
        if (this.state.calendarId === -1) {
            this.setState({"message": "Please select a calendar id."});
            return;
        }

        let data = {"calendarId": this.state.calendarId, "selectedSlotId": this.state.selectedSlotId};
        post("/advising/main", data, (res => {
            this.setState({isLoading: false, "message": res.message});
            if (res.success) {

            }
            this.props.onClose();
        }))        
    }

    dialogButtons = [
        {name: "Cancel", onClick: this.props.onClose},
    ];

    handleSlotSelected = (selectedEvent) => {

    };

    render() {

        let slots = [];

        if (this.state.slots) {
            this.state.slots.forEach((slot) => {
                slots.push(<UnSelectedAdvisingItem onSelect={this.handleSlotSelected} event={slot}/>);
            });
        }

        return (
            <CalendarFormBaseLayout open={this.props.open} buttons={this.dialogButtons} onClose={this.props.onClose} progress={this.state.isLoading} title="Select Advising Slot">
                <MessageBox message={this.state.message} hideMessage={this.hideMessage} />
                {slots}
            </CalendarFormBaseLayout>
        );
    }
}
