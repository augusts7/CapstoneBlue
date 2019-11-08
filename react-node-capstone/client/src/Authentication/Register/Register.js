import React from "react";
import Form from "../../components/Form/Form";
import MessageBox from "../../components/Form/MessageBox/MessageBox"
import {Link} from "react-router-dom"
import Button from "../../components/Button/Button"
import AuthContext from "../../Context/AuthContext";
import AuthFormContainer from "../AuthFormLayout/AuthFormContainer";
import AuthFormAlternateButton from "../AuthFormLayout/AuthFormAlternateButton";
import {post, get} from "../../api-helper/ApiHelper";
import AuthFormSubmitButton from "../AuthFormLayout/AuthFormSubmitButton";



class Register extends React.Component {

    static contextType = AuthContext;

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
            "password": target.password.value,
            "confirmPassword": target.confirmPassword.value,
            "user_type": target.user_type.value,
        };
        if (this.state.user_type === "student") {
            data["classification"] = target.classification.value;
            data["advisor_id"] = target.advisor.value;
            data["major"] = target.major.value;
        }

        post("/auth/register", data, (res) => {
            this.setState({
                "message": res.message,
                "isLoading": false
            });
            if (res.success) {
                this.context.login(res.user);
            }
        });

    }

    commonData = {
        commonFields: [
            {"name": "first_name", "type": "text", "label": "First Name", "required": true},
            {"name": "last_name", "type": "text", "label": "Last Name", "required": true},
            {"name": "cwid", "type": "number", "label": "Campus Wide ID (CWID)", "required": true},
            {"name": "campusEmail", "type": "email", "label": "Campus Email", "required": true},
            {
                "name": "user_type",
                "type": "select",
                "label": "User Type",
                "require": true,
                "onChange": this.handleChangeInUserType,
                "options": [{"name": "Student", "value": "student"}, {"name": "Faculty", "value": "faculty"}]
            },
        ],

        passwordFields: [
            {"name": "password", "type": "password", "label": "Password", "required": true},
            {"name": "confirmPassword", "type": "password", "label": "Confirm Password", "required": true},
        ],
    };

    handleChangeInUserType(value) {
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

    }

    getFields = () => {

        let studentFields = [];

        if (this.state.user_type === "student") {
            studentFields = [
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
            ];
        }

        return this.commonData.commonFields.concat(studentFields).concat(this.commonData.passwordFields);
    };


    render() {

        let fields = this.getFields();

        return (
            <AuthFormContainer>
                <MessageBox message={this.state.message} hideMessage={this.hideMessage}/>
                <Form customSubmitButton={true} id="register" onSubmit={this.onSubmit}
                      title="Create Your new Account"
                      fields={fields}>
                    <div><Link to="/forgotPassword">Forgot password?</Link></div>
                    <AuthFormSubmitButton icon="how_to_reg">Create Account</AuthFormSubmitButton>
                </Form>
                <AuthFormAlternateButton link="/login" text="Already created an account? Sign In instead.">
                    <i className="material-icons">accessibility</i>Sign In
                </AuthFormAlternateButton>
            </AuthFormContainer>
        );
    }
}

export default Register;
