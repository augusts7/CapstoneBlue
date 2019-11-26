import React from "react";
import "./Form.css";
import Select from "../Select/Select";
import TextField from "@material-ui/core/TextField"


const textFieldStyle = {marginRight: "16px"};

export default function FormInputFields(props) {

    if (props.fields === undefined || props.fields === null || props.fields.length < 1) {
        return (<div/>);
    }

    let fields = [];

    let autofocusHasBeenAdded = false;

    let full = props.fullWidth || false;

    props.fields.map(field => {

        const fullWidth = field.fullWidth || false;

        if (field.type === "select") {

            return (
                fields.push(<Select
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    onChange={field.onChange}
                    value={field.value}
                    options={field.options}
                    required={field.required}
                />));
        } else {
            if (autofocusHasBeenAdded === false) {
                autofocusHasBeenAdded = true;
                return (
                    fields.push(<TextField
                        onChange={props.onChange}
                        autoFocus
                        fullWidth={fullWidth || full}
                        style={textFieldStyle}
                        id={field.id}
                        required={field.required}
                        value={field.value}
                        type={field.type}
                        label={field.label}
                        name={field.name}
                        margin="normal"/>));
            } else {
                return (
                    fields.push(<TextField
                        onChange={props.onChange}
                        style={textFieldStyle}
                        fullWidth={fullWidth || full}
                        id={field.id}
                        required={field.required}
                        value={field.value}
                        type={field.type}
                        label={field.label}
                        name={field.name}
                        margin="normal"/>));
            }

        }
    });


    return (
        <div>
            {fields}
        </div>
    );
}
