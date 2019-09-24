import React from "react";
import "./RadioGroup.css";

class RadioGroup extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let options = [];

        this.props.options.map(option => {
            options.push(
                <label key={option.name + option.value} className="radio-item mdl-radio mdl-js-radio mdl-js-ripple-effect">
                    <input type="radio" className="mdl-radio__button" name={this.props.name} required={this.props.required} value={option.value} />
                    <span className="mdl-radio__label">{option.name}</span> 
                </label>
            );
        });

        return (
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"> 
                {options}
            </div>
        );
    }
}

export default RadioGroup;
