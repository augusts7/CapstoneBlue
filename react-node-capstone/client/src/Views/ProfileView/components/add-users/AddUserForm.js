import React from "react";
import Form from "../../../../components/Form/Form";
import MessageBox from "../../../../components/Form/MessageBox/MessageBox"
import {post, get} from "../../../../ApiHelper/ApiHelper";
import AuthFormSubmitButton from "../../../../Authentication/AuthenticationFormLayout/AuthFormSubmitButton";


class AddUserForm extends React.Component {

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
            "user_id": target.cwid.value,
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
                {"name": "cwid", "type": "number", "label": "Campus Wide ID (CWID)", "required": true},
                {"name": "campusEmail", "type": "email", "label": "Campus Email", "required": true},

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
            get("/user_info/advisors", (res) => {
                if (res.success) {
                    let advisors = [];
                    res.results.forEach(d => {
                        advisors.push({"name": d.first_name + " " + d.last_name, "value": d.user_id});
                    });
                    this.setState({"advisors": advisors});
                }
            });
        }

    };

    getFields = () => {

        let studentFields = [];

        if (this.state.user_type === "student") {
            studentFields = this.commonData().studentFields;
        }

        return this.commonData().commonFields.concat(studentFields).concat(this.commonData().passwordFields);
    };


    render() {

        let fields = this.getFields();

        return (
            <div>
                <MessageBox message={this.state.message} hideMessage={this.hideMessage}/>
                <Form customSubmitButton={true} id="new-user-form" onSubmit={this.onSubmit}
                      fields={fields}>
                    <AuthFormSubmitButton icon="how_to_reg">Create User</AuthFormSubmitButton>
                </Form>
            </div>
        );
    }
}

export default AddUserForm;
