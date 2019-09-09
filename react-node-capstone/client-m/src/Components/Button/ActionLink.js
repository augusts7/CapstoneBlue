
import React from 'react';
import { Link } from 'react-router-dom';


class ActionLink extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <p><Link className="mdl-color-text--blue" to={this.props.link}><i className="material-icons">{this.props.icon}</i>{this.props.title}</Link></p>
        );
    }
}


export default ActionLink;








