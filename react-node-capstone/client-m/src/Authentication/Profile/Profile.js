
import React from 'react';
import Table from "../../Components/Table/Table";



class Profile extends React.Component {

    constructor(props) {
        super(props);

        
    }

    render() {

        let data = [["Email", "sanjeeb.sangraula@gmail.com"], ["First Name", "Sanjeeb"], ["Last Name", "Sangraula"],
        [""]];

        let headers = ["Title", "Data"];

        return (
            <Table selectable={true} data={data} headers={headers}  /> 
        );
    }
}

export default Profile;








