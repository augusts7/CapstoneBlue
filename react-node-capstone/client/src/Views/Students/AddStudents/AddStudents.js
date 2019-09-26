
import React from 'react';
import "./AddStudents.css";
import Form from "../../../components/Form/Form"
 

class AddStudents extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "isLoading": false
        }

        this.FieldData = this.FieldData.bind(this);
        this.ActionLinkData = this.ActionLinkData.bind(this);
    }

    FieldData(label, type, id, name) {
        return { "label": label, "type": type, "id": id, "name": name };
    }

    ActionLinkData(link, title, icon) {
        return { "link": link, "title": title, "icon": icon };
    }

    render() {

        let fields = [
            this.FieldData("", "file", "studentFile", "studentFile"),
        ];
        let actionLinks = [
            this.ActionLinkData("/studentList", "View current Students", "list"),
            this.ActionLinkData("/studentList", "Add student using form", "add")
        ];
        let title = "Add Students using File";
        let icon = "add";

        return (
            <Form icon={icon} isLoading={this.state.isLoading} title={title} fields={fields} actionLinks={actionLinks} includesFile={true} />
        );
    }
}


export default AddStudents;








