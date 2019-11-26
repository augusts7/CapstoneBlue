import React from "react";
import ProfileItemBlockContainer from "../../generic/profile-view-item/profile-item-blocks/ProfileItemBlockContainer";
import ProfileListItemContents from "../../generic/profile-view-item/list-items/ProfileListItemContents";
import ProfileSectionContainer from "../../generic/profile-view-section/ProfileSectionContainer";
import ManageUsersView from "./ManageUsersView";
import AuthContext from "../../../../Context/AuthContext";
import LengthValidator from "../../../../utils/length-utils/LengthValidator";
import ls from "local-storage";
import {get} from "../../../../ApiHelper/ApiHelper";


export default class ProfileSideBar extends React.Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            progress: false,
            user_type: ls.get("user_type", "")
        };
    }

    handleResetPassword = () => {
        this.setState({progress: true});
        get("auth/sendPasswordResetEmail", (res) => {
            console.log(res);
            this.setState({progress: false})
        });
    };

    componentDidMount() {
        this.setState({progress: true});
        this.loadUserInfo();
    }

    loadUserInfo = () => {
        get("user_info/", (res) => {
            let user = null;
            if (res.success) {
                if (LengthValidator.isNotEmpty(res.results)) {
                    user = res.results[0];
                    if (user.user_type === "student") {
                        this.loadStudentInfo(user.user_id);
                    }
                }
            }
            this.setState({progress: false, user: user});
        });
    };

    loadStudentInfo = (user_id) => {
        this.setState({progress: true});
        get("user_info/studentInfoWithAdvisor/" + user_id, (res) => {
            let studentData = null;
            if (res.success) {
                if (LengthValidator.isNotEmpty(res.results)) {
                    studentData = res.results[0];
                    console.log(studentData);
                }
            }
            this.setState({progress: false, studentData});
        });
    };

    getProfileItems = () => {
        let profileItems = [];

        const user = this.state.user;

        if (LengthValidator.isNotEmpty(user)) {
            profileItems.push({name: "First name", value: user.first_name});
            profileItems.push({name: "Last name", value: user.last_name});
            profileItems.push({name: "Email", value: user.campusEmail});
            profileItems.push({name: "User Type", value: user.user_type});

        }
        return profileItems;
    };

    getStudentItems = () => {
        const user = this.state.user;
        let studentItems = [];
        if (LengthValidator.isEmpty(user)) {
            return studentItems;
        }
        if (user.user_type === "student" && LengthValidator.isNotEmpty(this.state.studentData)) {
            const studentData = this.state.studentData;
            const advisorName = studentData.first_name + " " + studentData.last_name;
            studentItems.push({name: "Advisor", value: advisorName});
            studentItems.push({name: "Classification", value: studentData.classification});
            studentItems.push({name: "Major", value: studentData.major});
        }
        return studentItems;
    };

    render() {

        let buttons = [
            {name: "Log Out", onClick: () => this.context.logout()},
            {name: "Reset Password", onClick: () => this.handleResetPassword()}
        ];

        let profileItems = this.getProfileItems();
        let studentItems = this.getStudentItems();
        console.log(this.state.user);

        let html = [];
        if (this.state.user_type === "faculty") {
            html.push(<ManageUsersView/>);
        } else {
            html.push(
                <ProfileItemBlockContainer progress={this.state.progress} title="Your University Data">

                    {studentItems.map((item) => {
                        return (
                            <ProfileListItemContents item={item}/>
                        );
                    })}

                </ProfileItemBlockContainer>
            );
        }

        return (
            <ProfileSectionContainer title="Profile" buttons={buttons}>

                <ProfileItemBlockContainer progress={this.state.progress} title="Basic Profile Info">

                    {profileItems.map((item) => {
                        return (
                            <ProfileListItemContents item={item}/>
                        );
                    })}

                </ProfileItemBlockContainer>

                {html}
            </ProfileSectionContainer>
        );
    }
}




