import React from "react";
import "./slots.css"
import SingleSlot from "./Slot"
import Button from "../../../components/Button/Button"
import {Link} from "react-router-dom"
import Select from "../../../components/Select/Select";
import Input from "../../../components/Input/Input"
import ls from "local-storage";

class Slots extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            start: new Date(),
            end: new Date(),
            advisor: "smith",
            interval: "15",
            slots: [],
            user_type: ls.get("user_type")
        };
    }

    addToCalendar() {
        alert("Added");
    }

    componentDidMount() {
        fetch("/advising/all", {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(res => {
                console.log(res.results)
                this.setState({ slots: res.results })
            }).catch((err) => {
                console.log("Advising view. " + err);
        });
    }

    render() {

        let slots = [];

        let slotsStyle = { "overflowY": "scroll", "height": window.innerHeight * 0.8 };

        if (this.state.slots && this.state.slots.length > 0) {
            this.state.slots.forEach(slot => {
                console.log(slot);
                slots.push(<SingleSlot userType={this.state.user_type} className="mdl-cell--6-col" key={slot.eventID} data={slot} />);
            });
        }

        let fields = [
            {
                "name": "empty",
                "label": "Empty or Occupied",
                "type": "select",
                "required": true,
                "options": [{"name": "Empty", "value": "empty"}, {"name": "Occupied", "value": "occupied"}]
            },

        ];

        let slotTitleButton = [];
        let title = "All Available Timeslots";

        if (this.state.user_type == "faculty") {
            title = "Created timeslots";
            slotTitleButton.push(
                <div className="slotsTitleButton">
                    <Link to="/advisingSlots/add"><Button role="primary"><i className="material-icons">add</i>Create
                                New Slots</Button></Link>
                </div>
            );
        }

        return (
            <div className="advisingSlotsRoot mdl-grid">
                <div className="mdl-cell--3-col">
                    <div className="slotsTitle">
                        <div><h4>Filter Timeslots</h4></div>
                        {slotTitleButton}
                    </div>

                    <div className="styleScroll" style={slotsStyle}>
                        {fields.map(field => {
                            if (field.type === "select") {
                                return (
                                    <Select
                                        key={field.name}
                                        name={field.name}
                                        label={field.label}
                                        onChange={field.onChange}
                                        options={field.options}
                                        required={field.required}
                                    />);
                            } else {
                                return (
                                    <Input
                                        formId={this.props.id}
                                        label={field.label}
                                        type={field.type}
                                        onChange={field.onChange}
                                        key={field.id}
                                        name={field.name}
                                        required={field.required}
                                        value={field.value}
                                    />);
                            }
                        })}
                    </div>

                </div>
                <div className="mdl-cell--9-col">
                    <div className="slotsTitle">
                        <div><h4>{title}</h4></div>
                        {slotTitleButton}
                    </div>

                    <div className="styleScroll" style={slotsStyle}>
                        {slots}
                    </div>

                </div>

            </div>
        );
    }
}

export default Slots;
