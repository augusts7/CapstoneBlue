import React from "react";
import ProfileItemBlockContainer from "../../generic/profile-view-item/profile-item-blocks/ProfileItemBlockContainer";


export default class ProfileInfo extends React.Component {


    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return (

            <ProfileItemBlockContainer title="Classes Taken">
                Classes Taken
            </ProfileItemBlockContainer>
        );
    }
}
