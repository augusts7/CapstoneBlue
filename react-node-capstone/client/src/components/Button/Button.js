
import React from 'react';
import "./Button.css";


class Button extends React.Component {

    render() {

        let styles = {};

        if (this.props.styles) {
            styles = this.props.styles;
        }
        return (
            <div className="buttonWrapper">
                <button onClick={this.props.onClick} style={styles} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color--primary mdl-color-text--white" type={this.props.type}><i className="material-icons">{this.props.icon}</i>{this.props.name}</button >
            </div>
        );
    }
}


export default Button;
