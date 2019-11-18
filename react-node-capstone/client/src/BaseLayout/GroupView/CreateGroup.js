import React, { Fragment } from "react";
import "./CreateGroup.css";
import { TextField, Menu, MenuItem } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { Input } from "@material-ui/core";
import XLSX from "xlsx";
import UserContext from "../../Context/UserContext";
import { isNull } from "util";

class CreateGroup extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      file: {},
      data: [],
      cols: [],
      groupName: "",
      creator_id: this.props.creator_id,
      open: false
    };
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleGroupName = this.handleGroupName.bind(this);
    this.createGroup = this.createGroup.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleChange(e) {
    const files = e.target.files;
    if (files && files[0]) this.setState({ file: files[0] });
  }

  handleGroupName(e) {
    this.setState({ groupName: e.target.value });
  }

  handleFile() {
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = e => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {
        type: rABS ? "binary" : "array",
        bookVBA: true
      });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      this.setState({ data: data }, () => {
        this.createGroup();
      });
    };

    if (rABS) {
      reader.readAsBinaryString(this.state.file);
    } else {
      reader.readAsArrayBuffer(this.state.file);
    }
  }

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };

  createGroup() {
    if (this.state.data !== null) {
      fetch("/groups/createGroups", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          data: this.state.data,
          title: this.state.groupName,
          creator_id: this.context.user_id
        })
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(body) {
          console.log(body);
        });
    } else {
      fetch("/groups/createGroups", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: this.state.groupName,
          creator_id: this.context.user_id
        })
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(body) {
          console.log(body);
        });
    }
  }

  render() {
    const { open } = this.state;
    return (
      <Fragment>
        <MenuItem
          type="submit"
          size="large"
          className="msgBtn2"
          onClick={this.handleToggle}
        >
          <i className="material-icons">group_add</i>Create Group
        </MenuItem>
        <Dialog
          open={open}
          onClose={this.handleToggle}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create Group</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To create a group select a .xlsx file containing your group
              members.
            </DialogContentText>

            <TextField //Needs limiter on number of characters for group name
              className="groupTitle"
              name="title"
              title="Group Name"
              placeholder="Group Name"
              fullWidth
              variant="outlined"
              type="text"
              onChange={this.handleGroupName}
              value={this.state.groupName}
            />
            <Button component="label">
              <i className="material-icons">attachment</i>Upload File
              <Input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={this.handleChange}
              />
            </Button>

            <Button type="submit" value="Upload" onClick={this.handleFile}>
              Submit
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleToggle} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleToggle} color="primary">
              Create Group
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default CreateGroup;
