import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MaterialTable from 'material-table'
import "./StudentList.css"

class StudentList extends Component {

    constructor(props) {
        super(props);
        let items = [
            { firstName: 'Sanjeeb', lastName: 'Sangraula', email: "sangras@warhawks.ulm.edu" },
            { firstName: 'Sanjeeb2', lastName: 'Sangraula2', email: "sangras2@warhawks.ulm.edu" },
            { firstName: 'Sanjeeb3', lastName: 'Sangraula3', email: "sangras3@warhawks.ulm.edu" },
        ];
        this.state = {
            isLoaded: false, 
            items: items,
        };
    }

    componentDidMount() {
        fetch("/students")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.items
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        items: [],
                    });
                }
            )
    }

    
    render() {
        return (
            <div className="studentListContainer" style={{ maxWidth: '100%' }}>

                <MaterialTable

                    options={{ search: true }}

                    columns={[
                        { title: 'First Name', field: 'firstName' },
                        { title: 'Last Name', field: 'lastName' },
                        { title: 'Email', field: 'email', type: 'email' },
                    ]}
                    data={[
                        { firstName: 'Sanjeeb', lastName: 'Sangraula', email: "sangras@warhawks.ulm.edu" },
                        { firstName: 'Sanjeeb2', lastName: 'Sangraula2', email: "sangras2@warhawks.ulm.edu" },
                        { firstName: 'Sanjeeb3', lastName: 'Sangraula3', email: "sangras3@warhawks.ulm.edu" },
                    ]}
                    title="Students"
                />
      </div>
    )
  }
}

export default StudentList;

