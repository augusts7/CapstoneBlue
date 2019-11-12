import React from "react";
import Button from "@material-ui/core/Button";

const styles = {
    button: {
        margin: "8px",
    },
    input: {
        display: "none",
    },
};

export default function UploadStudents(props) {

    return (
        <div>
            <input
                accept=".xls,.xlsx"
                style={styles.input}
                id="contained-button-file"
                title="Select File With Student's Data"
                multiple
                type="file"
            />
            <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span" style={styles.button}>
                    {props.children}
                </Button>
            </label>
        </div>

    );
}
