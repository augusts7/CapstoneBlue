import React from "react";
import ProfileItemContainer from "../container/ProfileItemContainer";
import ProfileItemBlockContainer from "../container/profile-item-blocks/ProfileItemBlockContainer";


export default class ProfileInfo extends React.Component {


    constructor (props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {

    }

    render () {
        return (

            <ProfileItemContainer title="Classes Taken">
                <ProfileItemBlockContainer>
                    Classes Taken
                </ProfileItemBlockContainer>
            </ProfileItemContainer>
        );
    }
}
