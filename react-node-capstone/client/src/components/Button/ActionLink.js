import React from 'react';
import {Link} from 'react-router-dom';
import Button from '../Button/Button';


class ActionLink extends React.Component {

    render() {

        return (
            <Link to={this.props.link}><Button role="secondary"><i
                className="material-icons">{this.props.icon}</i>{this.props.title}</Button></Link>
        );
    }
}


export default ActionLink;








