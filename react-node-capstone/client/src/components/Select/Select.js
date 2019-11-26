
import React from 'react';
import "./Select.css";
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import LengthValidator from "../../utils/length-utils/LengthValidator";


class Select extends React.Component {

    constructor(props) {
        super(props);

        let value = this.props.default || "";

        this.state = {
            "value": value
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.onValueChange(event.target.value);
    }

    onValueChange (value) {
        this.setState({ value });
        if (this.props.onChange != null) {
            this.props.onChange(value);
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (LengthValidator.isNotEmpty(nextProps.value)) {
            this.setState({value: nextProps.value});
        }
    }

    render() {

        let fullWidth = true;
        if (this.props.fullWidth === false) {
            fullWidth = false;
        }


        return (
            <TextField
                required={this.props.required}
                select
                style={this.props.style}
                name={this.props.name}
                fullWidth={fullWidth}
                label={this.props.label}
                value={this.state.value}
                onChange={this.onChange}
                helperText={this.props.helperText || this.props.label}
                margin="normal">
                {this.props.options.map(option => {
                    return <MenuItem key={option.value} value={option.value}>
                        {option.name}
                    </MenuItem>
                })}
                
            </TextField>
        );
    }
}


export default Select;








