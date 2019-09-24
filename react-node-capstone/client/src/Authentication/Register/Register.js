import React from "react";
import Form from "../../Components/Form/Form";
import MessageBox from "../../Components/Form/MessageBox/MessageBox"

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "message": "",
            "isLoading": false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.hideMessage = this.hideMessage.bind(this);
    }

    hideMessage() {
        this.setState({ "message": "" });
    }

    onSubmit(target) {
        
        this.setState({"isLoading": true});
        let data = {
            "first_name": target.first_name.value,
            "last_name": target.last_name.value,
            "cwid": target.cwid.value,
            "campusEmail": target.campusEmail.value,
            "personalEmail": target.personalEmail.value,
            "major": target.major.value,
            "advisor": target.advisor.value,
            "password": target.password.value,
            "confirmPassword": target.confirmPassword.value,
            "classification": target.classification.value,
            "user_type": target.user_type.value,
        };

        fetch("/auth/register", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => { return res.json();})
            .then((res) => {
            if (res.status == 200) {
                this.setState({
                    "message": res.message,
                    "isLoading": false
                });
            } else {
                this.setState({
                    "message": res.message,
                    "isLoading": false
                });
            }
        });
    }

    render() {
        let fields = [
            { "name": "first_name", "type": "text", "label": "First Name", "required": true },
            { "name": "last_name", "type": "text", "label": "Last Name", "required": true },
            { "name": "cwid", "type": "number", "label": "Campus Wide ID (CWID)", "required": true },
            { "name": "campusEmail", "type": "email", "label": "Campus Email", "required": true },
            { "name": "personalEmail", "type": "email", "label": "Personal Email (Not Required)", "required": false },
            { "name": "major", "type": "text", "label": "Major", "required": true },
            { "name": "advisor", "type": "email", "label": "Advisor Email", "required": true },
            { "name": "password", "type": "password", "label": "Password", "required": true },
            { "name": "confirmPassword", "type": "password", "label": "Confirm Password", "required": true },
            { "name": "classification", "type": "radio", "options": [{ "name": "Freshman", "value": "freshman" }, { "name": "Sophomore", "value": "sophomore" }, { "name": "Junior", "value": "junior" }, { "name": "Senior", "value": "senior" }] },
            { "name": "user_type", "type": "radio", "options": [{ "name": "Student", "value": "student" }, { "name": "Professor", "value": "professor" }] }
        ];
        let actionLinks = [
            { "link": "login", "title": "Login", "icon": "person_add" },
            { "link": "forgotPassword", "title": "Forgot Password", "icon": "help_outline" },
        ];
        let title = "Register";
        let icon = "account_box";

        return (
            <div>
                <MessageBox message={this.state.message} hideMessage={this.hideMessage} />
                <Form
                    onSubmit={this.onSubmit}
                    icon={icon}
                    title={title}
                    actionLinks={actionLinks}
                    fields={fields}
                    isLoading={this.state.isLoading}
                />
            </div>
        );
    }
}

export default Register;
