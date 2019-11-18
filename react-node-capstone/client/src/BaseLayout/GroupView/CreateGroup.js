import React, { Fragment } from "react";
import "./CreateGroup.css";
import {TextField} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import XLSX from 'xlsx';
 
 
 
class CreateGroup extends React.Component{
 
    constructor(props) {
        super(props);
        this.state = {
          file: {},
          data: [],
          cols: [],
          groupName: "",
          creator_id: 30030101
        }
        this.handleFile = this.handleFile.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleGroupName = this.handleGroupName.bind(this);
        this.createGroup = this.createGroup.bind(this);
      }

    handleChange(e) {
      const files = e.target.files;
      if (files && files[0]) this.setState({ file: files[0] });
    }

    handleGroupName(e) {
      this.setState({groupName: e.target.value});
    }
      
    handleFile() {
      const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString;
      reader.onload = (e) => {
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true });
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
      };
      
    }

    createGroup(){
      fetch("/groups/createGroups", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          data: this.state.data,
          title: this.state.groupName,
          creator_id: this.state.creator_id
        }),
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(body) {
        console.log(body);
      });
    }

    render(){
         return(
           <Fragment>
            <div className="create-group-constainer">
                <div className="createGroupTitle">
                    <h3> Group File Upload</h3>
                </div>
                <DialogContent>
                  <DialogContentText>
                    To create a group select a .xlsx file containing your group members.
                  </DialogContentText>
                    <div className='uploadfile'>
                        <TextField //Needs limiter on number of characters for group name
                          className='groupTitle'
                          name='title'
                          title="Group Name"
                          placeholder="Group Name"
                          fullWidth
                          variant='outlined'
                          type="text"
                          onChange={this.handleGroupName}
                          value={this.state.groupName}
                        /> 
                        <br/><br/>
                        <input type='file' 
                          className='custom-file-input' 
                          id='file' 
                          onChange={this.handleChange} 
                        />

                        <br />
                        <input
                          type='submit'
                          value='Upload'
                          className='submit'
                          onClick={this.handleFile}
                        />
                    </div>
                  </DialogContent>
            </div>
            </Fragment>   
         );
    }
}
 
export default CreateGroup;
