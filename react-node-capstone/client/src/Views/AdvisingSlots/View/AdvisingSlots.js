import React from "react";
import "./slots.css"
import SingleSlot from "./Slot"
import Button from "../../../components/Button/Button"
import {Link} from "react-router-dom"
import Select from "../../../components/Select/Select";
import Input from "../../../components/Input/Input"

class Slots extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            start: new Date(),
            end: new Date(),
            advisor: "smith",
            interval: "15",
            slots: [],
            user_type: "student"
        };
    }

    addToCalendar() {
        alert("Added");
    }

    componentDidMount() {
        fetch("/advising")
            .then(res => res.json())
            .then(res => this.setState({slots: res.results}));
    }

    render() {

        let slots = [];

        let slotsStyle = {"overflow-y": "scroll", "height": window.innerHeight * 0.9};

        if (this.state.slots.length > 0) {
            this.state.slots.map(slot => {
                return (
                    slots.push(<SingleSlot key={slot.eventID} data={slot}/>));
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

        return (
            <div className="mdl-grid">
                <div className="mdl-cell--4-col">
                    <div className="slotsTitle">
                        <div><h4>Filter Timeslots</h4></div>
                        <div className="slotsTitleButton">
                            <Link to="/addAdvisingSlots"><Button role="primary"><i className="material-icons">add</i>Create
                                New Slots</Button></Link>
                        </div>
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
                <div className="mdl-cell--8-col">
                    <div className="slotsTitle">
                        <div><h4>All Available Timeslots</h4></div>
                        <div className="slotsTitleButton">
                            <Link to="/addAdvisingSlots"><Button role="primary"><i className="material-icons">add</i>Create
                                New Slots</Button></Link>
                        </div>
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
