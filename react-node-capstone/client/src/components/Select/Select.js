
import React from 'react';
import "./Select.css";
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';


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
        this.setState({ "value": event.target.value });
        if (this.props.onChange != null) {
            this.props.onChange(event.target.value);  
        }        
    }

    render() {

        let fullwidth = true;
        if (this.props.fullwidth === false) {
            fullwidth = false;
        }


        return (
            <TextField
                required={this.props.required}
                select
                style={this.props.style}
                name={this.props.name}
                fullwidth={fullwidth}
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








