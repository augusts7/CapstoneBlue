import React from "react";
import Form from "../../components/Form/Form";
import MessageBox from "../../components/Form/MessageBox/MessageBox"
import {Link} from "react-router-dom"
import Button from "../../components/Button/Button"

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "message": "",
            "isLoading": false,
            "user_type": "",
            "advisors": [],
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.hideMessage = this.hideMessage.bind(this);
        this.handleChangeInUserType = this.handleChangeInUserType.bind(this);
    }

    hideMessage() {
        this.setState({"message": ""});
    }

    onSubmit(target) {

        this.setState({"isLoading": true});
        let data = {
            "first_name": target.first_name.value,
            "last_name": target.last_name.value,
            "user_id": target.cwid.value,
            "campusEmail": target.campusEmail.value,
            "personalEmail": target.personalEmail.value || "",
            "password": target.password.value,
            "confirmPassword": target.confirmPassword.value,
            "user_type": target.user_type.value,
        };
        if (this.state.user_type === "student") {
            data["classification"] = target.classification.value;
            data["advisor_id"] = target.advisor.value;
            data["major"] = target.major.value;
        }

        fetch("/users/register", {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            return res.json();
        })
            .then((res) => {
                this.setState({
                    "message": res.message,
                    "isLoading": false
                });
                if (res.success) {
                    if (this.props.hasLoggedIn) {
                        this.props.hasLoggedIn(res.user);
                    }
                }
            });
    }

    handleChangeInUserType(value) {
        this.setState({"user_type": value});

        if (value === "student") {
            fetch("/users/advisors", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                return res.json();
            })
                .then((res) => {
                    if (res.success) {
                        let advisors = [];
                        res.results.forEach(d => {
                            advisors.push({"name": d.first_name + " " + d.last_name, "value": d.user_id});
                        });
                        this.setState({"advisors": advisors});
                    }
                });
        }

    }

    render() {

        let fields = [
            {"name": "first_name", "type": "text", "label": "First Name", "required": true},
            {"name": "last_name", "type": "text", "label": "Last Name", "required": true},
            {"name": "cwid", "type": "number", "label": "Campus Wide ID (CWID)", "required": true},
            {"name": "campusEmail", "type": "email", "label": "Campus Email", "required": true},
            {"name": "personalEmail", "type": "email", "label": "Personal Email (Not Required)", "required": false},
            {
                "name": "user_type",
                "type": "select",
                "label": "User Type",
                "require": true,
                "onChange": this.handleChangeInUserType,
                "options": [{"name": "Student", "value": "student"}, {"name": "Faculty", "value": "faculty"}]
            },
            {"name": "password", "type": "password", "label": "Password", "required": true},
            {"name": "confirmPassword", "type": "password", "label": "Confirm Password", "required": true},
        ];

        if (this.state.user_type === "student") {
            fields = [
                {"name": "first_name", "type": "text", "label": "First Name", "required": true},
                {"name": "last_name", "type": "text", "label": "Last Name", "required": true},
                {"name": "cwid", "type": "number", "label": "Campus Wide ID (CWID)", "required": true},
                {"name": "campusEmail", "type": "email", "label": "Campus Email", "required": true},
                {"name": "personalEmail", "type": "email", "label": "Personal Email (Not Required)", "required": false},
                {
                    "name": "user_type",
                    "type": "select",
                    "label": "User Type",
                    "require": true,
                    "onChange": this.handleChangeInUserType,
                    "options": [{"name": "Student", "value": "student"}, {"name": "Faculty", "value": "faculty"}]
                },
                {"name": "major", "type": "text", "label": "Major", "required": true},
                {
                    "name": "advisor",
                    "type": "select",
                    "label": "Select Advisor",
                    "require": true,
                    "options": this.state.advisors
                },
                {
                    "name": "classification",
                    "label": "Classification",
                    "type": "select",
                    "required": true,
                    "options": [{"name": "Freshman", "value": "freshman"}, {
                        "name": "Sophomore",
                        "value": "sophomore"
                    }, {"name": "Junior", "value": "junior"}, {"name": "Senior", "value": "senior"}]
                },
                {"name": "password", "type": "password", "label": "Password", "required": true},
                {"name": "confirmPassword", "type": "password", "label": "Confirm Password", "required": true},
            ];
        }
        // eslint-disable-next-line
        let actionLinks = [
            {"link": "login", "title": "Login", "icon": "person_add"},
            {"link": "forgotPassword", "title": "Forgot Password", "icon": "help_outline"},
        ];
        let title = "Create a new Account";
        let icon = "add";
        let id = "register";

        return (
            <div className="mdl-grid" style={{"width": "100%"}}>
                <div
                    className="mdl-cell--6-col mdl-cell--12-col-phone mdl-cell--10-col-tablet mdl-color--white mdl-shadow--4dp center">
                    <div>
                        <MessageBox message={this.state.message} hideMessage={this.hideMessage}/>
                        <Form customSubmitButton={true} id={id} icon={icon} onSubmit={this.onSubmit} title={title}
                              fields={fields}>
                            <div><Link to="/forgotPassword">Forgot password?</Link></div>
                            <div>
                                <Button role="main" type="submit"
                                        style={{"margin-top": "16px", "padding-left": "16px", "padding-right": "32px"}}><i
                                    className="material-icons">add</i>Create new Account</Button>
                            </div>
                        </Form>
                    </div>
                    <div className="mdl-shadow--4dp" style={{
                        "border": "0.5px solid #1976D2",
                        "background-color": "#1565C0",
                        "color": "white",
                        "padding": "24px 8px 8px 8px",
                        "margin": "16px 0px 0px 0px"
                    }}>
                        <div style={{"display": "flex", "justify-content": "center", "margin-bottom": "16px"}}>Already
                            have an Account? Sign in
                        </div>
                        <div style={{"display": "flex", "justify-content": "center"}}>
                            <Link to="/login">
                                <Button role="primary" style={{"padding-left": "16px", "padding-right": "32px"}}><i
                                    className="material-icons">accessibility</i>Sign In</Button>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Register;
