
import React from 'react';
import Form from "../../Components/Form/Form";



class ForgotPassword extends React.Component {

    constructor(props) {
        super(props);

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
            this.FieldData("Email", "email", "email", "email"),
        ];
        let actionLinks = [
            this.ActionLinkData("login", "Login", "person_add"),
            this.ActionLinkData("forgotPassword", "Forgot Password", "help_outline")
        ];
        let title = "Forgot Password";
        let icon = "help_outline";

        return (
            <Form icon={icon} title={title} actionLinks={actionLinks} fields={fields} />
        );
    }
}

export default ForgotPassword;








