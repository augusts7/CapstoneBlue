import React from "react";
import "./CreateGroup.css";
import {TextField} from "@material-ui/core";
import XLSX from 'xlsx';
 
 
 
class CreateGroup extends React.Component{
 
    constructor(props) {
        super(props);
        this.state = {
          file: {},
          data: [],
          cols: []
        }
        this.handleFile = this.handleFile.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const files = e.target.files;
        if (files && files[0]) this.setState({ file: files[0] });
      };
      
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
          console.log(JSON.stringify(this.state.data, null, 2));
        });
   
      };
   
      if (rABS) {
        reader.readAsBinaryString(this.state.file);
      } else {
        reader.readAsArrayBuffer(this.state.file);
      };
    };

    

    render(){
         return(
            <div className="create-group-constainer">
                <div className="createGroupTitle">
                    <h3> Group File Upload</h3>
                </div>
                
                    <div className='uploadfile'>
                        <input type='file' 
                        className='custom-file-input' 
                        id='file' 
                        onChange={this.handleChange} />
                    
                        <br/><br/>
                        <TextField 
                        className='groupTitle'
                        name='title'
                        placeholder='Name of Group'
                        variant='outlined'
                        />

                        <br />
                        <input
                            type='submit'
                            value='Upload'
                            className='submit'
                            onClick={this.handleFile}
                        />

                    </div>

                
            </div>
            
            
         );
    }
}
 
export default CreateGroup;
