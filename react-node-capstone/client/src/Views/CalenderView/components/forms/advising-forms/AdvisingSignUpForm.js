import React from 'react';
import MessageBox from "../../../../../components/Form/MessageBox/MessageBox"
import 'date-fns';
import { get, post } from "../../../../../ApiHelper/ApiHelper"
import CalendarFormBaseLayout from "../dialog-form/DialogForm";
import UnSelectedAdvisingItem from "../../calendar-click-popup/single-event-layout/event-type-specific-items/AdvisingSignUpItem";

export default class AdvisingSignUpForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "isLoading": false,
            "slots": [],
            "selectedSlotId": -1,
        };

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


    dialogButtons = [
        {name: "Cancel", onClick: this.props.onClose},
    ];

    handleSlotSelected = (selectedEvent) => {

        let data = {eventID: selectedEvent.eventID};
        post("advising/attend", data, (res => {
            this.setState({isLoading: false, "message": res.message});
            if (res.success) {
                this.setState({message: "Slots has been added"});
            } else {
                this.setState({message: res.message || "Advising slot couldn't be added"});
            }
            this.props.onClose();
        }))
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
