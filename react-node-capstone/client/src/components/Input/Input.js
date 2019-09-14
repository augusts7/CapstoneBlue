
import React from 'react';
import "./Input.css";



class Input extends React.Component {

    constructor(props) {
        super(props);
       
    }

    render() {
        return (
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input class="mdl-textfield__input" type={this.props.type} id={this.props.id} name={this.props.name} /> 
                    <label class="mdl-textfield__label" for="username">{this.props.label}</label>
                    <span class="mdl-textfield__error">Enter valid username</span>
            </div>
        );
    }
}


export default Input;








