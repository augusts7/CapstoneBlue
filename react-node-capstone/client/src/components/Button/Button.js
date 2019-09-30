
import React from 'react';
import "./Button.css";
import Button from "@material-ui/core/Button"

function getStyles(role) {

    let style = {
        "border": "0",
        "border-radius": "3",
        "box-shadow": '0 3px 5px 2px rgba(255, 105, 135, .3)',
        "color": 'white',
        "padding": "8px 16px",
        "height": "48",
    };

    if (role == "primary") {
        style["background"] = 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)';
    } else if (role == "secondary") {
        style["background"] = 'linear-gradient(45deg, #4A148C 30%, #7B1FA2 90%)';
    } else if (role = "main") {
        style["background"] = 'linear-gradient(45deg, #880E4F 30%, #AD1457 90%)';
    } else {
        style["background"] = 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)';
    }

    return style;   
    
}


class CustomButton extends React.Component {

    render() {

        let style = getStyles(this.props.role);

        if (this.props.style) {
            for (var key in this.props.style) {
                style[key] = this.props.style[key];
            }
        }

        return (          
             <Button onClick={this.props.onClick} style={style} type={this.props.type}>{this.props.children}</Button>
        );
    }
}


export default CustomButton;
