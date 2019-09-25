import React from "react";
import "./Input.css";
import TextField from '@material-ui/core/TextField';
class Input extends React.Component {


    render() {

        let id = this.props.formId + "" + this.props.name;

        return (

            <TextField
                fullWidth
                id={id}
                required={this.props.required}
                value={this.props.value}
                type={this.props.type}
                label={this.props.label}
                name={this.props.name}
                margin="normal"/>

        );
    }
}

export default Input;
