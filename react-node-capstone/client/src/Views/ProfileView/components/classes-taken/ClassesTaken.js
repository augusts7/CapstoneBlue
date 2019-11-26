import React from "react";
import ProfileItemBlockContainer from "../../generic/profile-view-item/profile-item-blocks/ProfileItemBlockContainer";
import {get, post} from "../../../../ApiHelper/ApiHelper";
import LengthValidator from "../../../../utils/length-utils/LengthValidator";
import ProfileItemGridTitle from "../generic/ProfileItemGridTitle";
import SingleItemInProfileGrid from "../generic/SingleItemInProfileGrid";
import ProfileItemGridRow from "../generic/ProfileItemGridRow";

const classesTitles = ["Course Title", "Course Subject", "CRN"];

export default class ProfileInfo extends React.Component {


    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        this.loadClasses();
    }

    loadClasses = () => {
        this.setState({"progress": true});

        get("/classes_taken/", (res) => {
            if (res.success) {

                let classes = [];

                if (LengthValidator.isNotEmpty(res.results)) {

                    res.results.forEach((r) => {
                        classes.push(r);
                    });
                }

                this.setState({"progress": false, "classes": classes});

            } else {
                this.setState({"progress": false, message: res.message});
            }
        });
    };

    handleDelete = (id) => {
        const data = {id};
        this.setState({progress: true});
        post("/classes_taken/delete", data, (res) => {
            const classes = this.state.classes.filter((cls) => cls.id !== id);
            this.setState({progress: false, classes});
        });
    };


    render() {

        let html = [];

        if (LengthValidator.isNotEmpty(this.state.classes)) {
            html.push(<ProfileItemGridTitle titles={classesTitles}/>);
            this.state.classes.forEach((cls) => {
                html.push(<ClassItem key={cls.id} onDelete={this.handleDelete} data={cls}/>);
            });
        }

        return (

            <ProfileItemBlockContainer title="Classes Taken">
                {html}
            </ProfileItemBlockContainer>
        );
    }
}

function ClassItem (props) {

    return (
        <ProfileItemGridRow {...props}>
            <SingleItemInProfileGrid>{props.data.course_title}</SingleItemInProfileGrid>
            <SingleItemInProfileGrid>{props.data.course_subject}</SingleItemInProfileGrid>
            <SingleItemInProfileGrid>{props.data.CRN}</SingleItemInProfileGrid>
        </ProfileItemGridRow>
    );
}
