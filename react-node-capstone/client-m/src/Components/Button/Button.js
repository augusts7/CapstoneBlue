
import React from 'react';
import "./Button.css";


class Button extends React.Component {

    constructor(props) {
        super(props);
       
    }

    render() {
        return (
            <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color--primary mdl-color-text--white" type={this.props.type}><i className="material-icons">{this.props.icon}</i>{this.props.name}</button >
        );
    }
}


export default Button;








