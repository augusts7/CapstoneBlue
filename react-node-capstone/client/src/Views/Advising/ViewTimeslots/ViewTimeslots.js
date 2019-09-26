
import React from 'react';
import "./ViewTimeslots.css";
import Form from "../../../components/Form/Form"
import Progress from "../../../components/Progress/Progress";
import Container from "../../../components/Container/SingleColumnWithHeader/Container"
import MaterialTable from "material-table";

class ViewTimeslots extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "isLoading": false,
            "timeslots": []
        }

        this.body = this.body.bind(this);
    }

    componentDidMount() {
        
        this.setState({ "isLoading": true });

        fetch("/advising/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => { return res.json(); })
            .then((res) => {
                this.setState({
                    "isLoading": false,
                    "timeslots": res
                });
                
            });
    }

    body() {

        
    }

    render() {

        let title = "View All time slots";
        let icon = "aspect_ratio";
        let body = this.body();



        return (
            <Container title={title} icon={icon} body={body} isLoading={this.state.isLoading} />
        );
    }
}


export default ViewTimeslots;