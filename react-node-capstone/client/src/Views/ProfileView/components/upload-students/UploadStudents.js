import React from "react";
import ProfileSectionContainer from "../../generic/profile-view-section/ProfileSectionContainer";
import ProfileItemBlockContainer from "../../generic/profile-view-item/profile-item-blocks/ProfileItemBlockContainer";
import UploadButton from "./UploadButton";


export default class UploadStudents extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {

    }

    render () {
        return (

            <ProfileSectionContainer title="Upload Students">
                <ProfileItemBlockContainer title="Upload Students">
                    <UploadButton>Upload Students</UploadButton>
                </ProfileItemBlockContainer>
            </ProfileSectionContainer>
        );
    }
}
