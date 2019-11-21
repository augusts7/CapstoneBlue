import React from 'react';
import MessagesPopup from "./popup-views/MessagesPopup";
import Badge from "@material-ui/core/Badge";
import CustomIconButton from "../../../Views/GenericViews/IconButton";
import SocketContext from "../../../Context/SocketContext";
import MessagesDataStore from "./MessagesDataStore";
import LengthValidator from "../../../utils/length-utils/LengthValidator";


export default class Messages extends React.Component {

    static contextType = SocketContext;

    constructor(props) {
        super(props);

        this.state = {
            showPopup: false,
            anchor: null,
            badgeCount: 0
        };

        this.dataStore = null;
    }

    componentDidMount() {
        if (this.dataStore === undefined || this.dataStore === null) {
            this.dataStore = new MessagesDataStore(this.context.socket, this.onDataChange, this.onProgress);
        }
    }

    onProgress = (isLoading) => {
        this.setState({isLoading: isLoading});
    };

    onDataChange = (listOfData) => {
        this.setState({allMessages: listOfData});
        console.log(listOfData);
    };

    onDeleteItem = (id) => {
        this.dataStore.deleteItem(id);
    };

    handlePopupClose = () => {
        this.setState({showPopup: false, anchor: null});
    };

    handleAvatarClick = (event) => {
        this.setState({showPopup: true, anchor: event.currentTarget});
    };

    render() {

        let icon = <i className="material-icons">message</i>;

        if (LengthValidator.isNotEmpty(this.state.allMessages)) {
            icon = <Badge badgeContent={this.state.allMessages.length} color="primary">
                <i className="material-icons">message</i>
            </Badge>;
        }

        return (

            <div>
                <MessagesPopup onDeleteItem={this.onDeleteItem} allMessages={this.state.allMessages} anchor={this.state.anchor} onClose={this.handlePopupClose}/>
                <div className="secondaryItem">
                    <CustomIconButton onClick={this.handleAvatarClick} aria-label="show 4 new mails" color="inherit">
                        {icon}
                    </CustomIconButton>

                </div>
            </div>
        );
    }
}
