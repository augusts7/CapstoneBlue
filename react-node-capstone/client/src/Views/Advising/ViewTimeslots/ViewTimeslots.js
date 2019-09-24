
import React from 'react';
import "./ViewTimeslots.css";
import Form from "../../../Components/Form/Form"
import Progress from "../../../Components/Progress/Progress";
import Container from "../../../Components/Container/SingleColumnWithHeader/Container"


class ViewTimeslots extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "isLoading": false
        }

        this.body = this.body.bind(this);
    }

    body() {
        

    }

    render() {

        let title = "View all timeslots";
        let icon = "aspect_ratio";
        let body = this.body();


        return (
            <Container title={title} icon={icon} body={body} isLoading={this.state.isLoading} />
        );
    }
}


export default ViewTimeslots;