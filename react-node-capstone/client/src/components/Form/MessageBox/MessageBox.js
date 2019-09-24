import React from "react";
import "./MessageBox.css";
import Button from "../../Button/Button";

class MessageBox extends React.Component {


    constructor(props) {
        super(props);

        this.hideMessage = this.hideMessage.bind(this);
    }

    hideMessage() {
        this.props.hideMessage();
    }

    render() {

        let html = [];

        let show = this.props.message != null && this.props.message.length > 0;

        if (show) {
            html.push(
                <div className="message-wrapper">
                    <div className="message-box">
                        {this.props.message}
                    </div>
                    <div>
                        <Button type="button" icon="visibility_off" name="Hide" onClick={this.hideMessage} />
                    </div>
                </div>
            );
        } 

        return (
            <div>
                {html}
            </div>
        );
    }
}

export default MessageBox;
