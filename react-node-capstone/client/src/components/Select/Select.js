
import React from 'react';
import "./Select.css";


class Select extends React.Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.props.onChange(event.target.value);  
    }

    render() {
        return (

            <div className="selectWrapper">
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <select onChange={this.onChange} className="mdl-textfield__input">
                        {this.props.options.map(option => {
                            return <option value={option.value}>{option.name}</option>
                        })}
                    </select>
                    <label className="mdl-textfield__label" htmlFor="octane">{this.props.title}</label>
                </div>
            </div>
            );
    }
}


export default Select;







