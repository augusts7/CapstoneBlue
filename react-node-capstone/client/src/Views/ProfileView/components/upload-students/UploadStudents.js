import React from "react";
import ProfileItemContainer from "../container/ProfileItemContainer";
import ProfileItemBlockContainer from "../container/profile-item-blocks/ProfileItemBlockContainer";
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

            <ProfileItemContainer title="Upload Students">
                <ProfileItemBlockContainer title="Upload Students">
                    <UploadButton>Upload Students</UploadButton>
                </ProfileItemBlockContainer>
            </ProfileItemContainer>
        );
    }
}
