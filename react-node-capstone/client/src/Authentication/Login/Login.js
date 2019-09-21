
import React from 'react';
import Form from "../../Components/Form/Form";


class Login extends React.Component {

    constructor(props) {
        super(props);

        this.FieldData = this.FieldData.bind(this);
        this.ActionLinkData = this.ActionLinkData.bind(this);
    }

    FieldData (label, type, id, name) {
        return { "label": label, "type": type, "id": id, "name": name };
    }

    ActionLinkData (link, title, icon) {
        return { "link": link, "title": title, "icon": icon };
    }

    render() {

        let fields = [
            this.FieldData("Email", "email", "email", "email"),
            this.FieldData("Password", "password", "password", "password")
        ];
        let actionLinks = [
            this.ActionLinkData("register", "Register as new User", "person_add"),
            this.ActionLinkData("forgotPassword", "Forgot Password", "help_outline")
        ];
        let title = "Login";
        let icon = "account_box";

        return (
            <Form icon={icon} title={title} actionLinks={actionLinks} fields={fields} onSubmit={() => { alert("Submitted"); }} />
        );
    }
}

export default Login;








