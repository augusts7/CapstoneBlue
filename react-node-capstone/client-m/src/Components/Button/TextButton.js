
import React from 'react';
import "./Button.css";


class TextButton extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--grey-800" type={this.props.type}><i className="material-icons">{this.props.icon}</i>{this.props.name}</button >
        );
    }
}


export default TextButton;