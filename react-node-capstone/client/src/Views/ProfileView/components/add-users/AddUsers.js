import React from "react";
import ProfileItemContainer from "../container/ProfileItemContainer";
import ProfileItemBlockContainer from "../container/profile-item-blocks/ProfileItemBlockContainer";
import AddUserForm from "./AddUserForm";
import AddUsingFiles from "./AddUsingFiles";


export default function AddUsers(props) {

    return (

        <ProfileItemContainer title="Add Users">

            <ProfileItemBlockContainer title="Submit User information">

                <AddUserForm/>

            </ProfileItemBlockContainer>

            <ProfileItemBlockContainer title="Upload User information using files">

                <AddUsingFiles/>

            </ProfileItemBlockContainer>

        </ProfileItemContainer>
    );
}
