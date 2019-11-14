import React from "react";
import MessageBox from "../../../../../components/Form/MessageBox/MessageBox"
import {post, get} from "../../../../../ApiHelper/ApiHelper";
import DialogForm from "../../../../CalenderView/components/forms/dialog-form/DialogForm";
import FormInputFields from "../../../../../components/Form/FormInputFields";


class CreateUserForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "message": "",
            "isLoading": false,
            "user_type": "",
            "advisors": [],
        };

    }

    hideMessage = () => {
        this.setState({"message": ""});
    };

    onSubmit = (target) => {

        this.setState({"isLoading": true});
        let data = {
            "first_name": target.first_name.value,
            "last_name": target.last_name.value,
            "campusEmail": target.campusEmail.value,
            "password": target.password.value,
            "confirmPassword": target.confirmPassword.value,
            "user_type": target.user_type.value,
        };
        if (this.state.user_type === "student") {
            data["classification"] = target.classification.value;
            data["advisor_id"] = target.advisor.value;
            data["major"] = target.major.value;
        }

        post("/auth/createUser", data, (res) => {
            this.setState({
                "message": res.message,
                "isLoading": false
            });
            if (res.success) {
                this.context.login(res.user);
            }
        });

    };

    commonData = () => {
        return {
            commonFields: [
                {
                    "name": "user_type",
                    "type": "select",
                    "label": "User Type",
                    "require": true,
                    "onChange": this.handleChangeInUserType,
                    "options": [{"name": "Student", "value": "student"}, {"name": "Faculty", "value": "faculty"}]
                },
                {"name": "first_name", "type": "text", "label": "First Name", "required": true},
                {"name": "last_name", "type": "text", "label": "Last Name", "required": true},
                {"name": "campusEmail", "type": "email", "label": "Campus Email", "required": true, fullWidth: true},

            ],

            passwordFields: [
                {"name": "password", "type": "password", "label": "Password", "required": true},
                {"name": "confirmPassword", "type": "password", "label": "Confirm Password", "required": true},
            ],
            studentFields: [
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
            ],
        }
    };

    handleChangeInUserType = (value) => {

        this.setState({"user_type": value});

        if (value === "student") {
            this.loadAllAdvisers();
        }

    };

    loadAllAdvisers = () => {
        get("/user_info/advisors", (res) => {
            if (res.success) {
                let advisors = [];
                res.results.forEach(d => {
                    advisors.push({"name": d.first_name + " " + d.last_name, "value": d.user_id});
                });
                this.setState({"advisors": advisors});
            }
        });
    };

    getFields = () => {

        let studentFields = [];

        if (this.state.user_type === "student") {
            studentFields = this.commonData().studentFields;
        }

        return this.commonData().commonFields.concat(studentFields).concat(this.commonData().passwordFields);
    };

    handleSubmit = () => {

    };

    buttons = [
        {name: "Cancel", onClick: this.props.onClose},
        {name: "Submit", onClick: this.handleSubmit},
    ];

    render() {

        let fields = this.getFields();

        return (
            <DialogForm open={this.props.open} buttons={this.buttons} onClose={this.props.onClose}
                        progress={this.state.isLoading}
                        title="Create a New User"
                        text="To create a new user, enter his information and hit submit.">
                <MessageBox message={this.state.message} hideMessage={this.hideMessage}/>
                <FormInputFields fields={fields}/>
            </DialogForm>
        );
    }
}

export default CreateUserForm;
