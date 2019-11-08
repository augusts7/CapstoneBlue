import React from "react"
import "./ProfileItemBlockStyles.css";
import ProfileItemBlockContainer from "./ProfileItemBlockContainer";
import ProfileCardListItemContents from "../list-items/ProfileListItemContents";


export default function ProfileItemGenericBlock(props) {

    let title = props.data.title;
    let items = props.data.items;

    return (
        <ProfileItemBlockContainer title={title}>
            {items.map((item) => {
                return (
                    <ProfileCardListItemContents item={item}/>
                );
            })}
        </ProfileItemBlockContainer>
    );

}
