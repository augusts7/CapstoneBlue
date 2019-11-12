import React from "react";
import AuthFormSubmitButton from "../../../../Authentication/AuthenticationFormLayout/AuthFormSubmitButton";


export default function AddUsingFiles(props) {

    return (
        <div>
            <form action="/auth/createUsersFromFile"
                  method='post'
                  encType="multipart/form-data">
                <input type="file" name="userInfoFile"/>
                <AuthFormSubmitButton type='submit'>Upload Files With Data</AuthFormSubmitButton>
            </form>
        </div>
    );
}