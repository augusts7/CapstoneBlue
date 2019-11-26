import React from "react";
import DialogForm from "../../CalenderView/components/forms/dialog-form/DialogForm";
import {ListItemIcon, ListItemText} from "@material-ui/core";
import ColorPalette from "./ColorPalette";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import "./ColorDialog.css";

const iconStyle = {marginRight: "16px"};

export default function ColorDialog(props) {

    const [selectedColor, setSelectedColor] = React.useState(null);
    const colorOptions = ColorPalette.getColors();

    const handleSave = () => {
        props.onSubmit(selectedColor);
        props.onClose();
    };

    const buttons = [
        {name: "Cancel", onClick: props.onClose},
        {name: "Submit", onClick: handleSave}
    ];

    const handleClick = (color) => {
        setSelectedColor(color);
    };

    let showSelected = [];

    if (selectedColor !== null) {
        const selectedColorHash = selectedColor.color;
        showSelected =
            <ListItem key="selected" className="selected color-dialog-item" selected={selectedColor.id === 'Pyxis'}>
                <ListItemIcon style={iconStyle}><span style={{
                    height: "48px",
                    width: "48px",
                    backgroundColor: selectedColorHash
                }}/></ListItemIcon><ListItemText primary="Selected Color" secondary={selectedColor.name}/>
            </ListItem>;
    } else {
        showSelected = <ListItem key="selected" className="selected color-dialog-item" onClick={() => handleClick(null)}>
            <ListItemIcon style={iconStyle}><span style={{height: "48px", width: "48px", backgroundColor: "#fff"}}/></ListItemIcon><ListItemText
            primary="Selected Color" secondary="None"/>
        </ListItem>;
    }

    return (
        <DialogForm fullWidth={true} open={props.open} buttons={buttons} onClose={props.onClose} progress={false}
                    title="Select Color"
                    text="Select color for your calendar events"
        >

            <List>

                {showSelected}

                <div style={{overflowY: "scroll", height: 0.5 * window.innerHeight}} className="styleScroll">
                    {colorOptions.map(option => {

                        const color = option.color;


                        return (
                            <ListItem className="color-dialog-item" onClick={() => handleClick(option)} key={option.color}
                                      selected={option === 'Pyxis'}>
                                <ListItemIcon style={iconStyle}><span style={{
                                    height: "48px",
                                    width: "48px",
                                    backgroundColor: color
                                }}/></ListItemIcon><ListItemText secondary={option.color} primary={option.name}/>
                                <ListItemSecondaryAction><Button
                                    color="primary"><Icon>done_all</Icon>Select</Button></ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                </div>
            </List>
        </DialogForm>
    );
}
