import React from "react";
import Table from "../../Components/Table/Table";

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let studentName = "Student Name";
    let userInfoHeader = ["User Information"];
    let userInfo = [
      ["Email", "jdoe@warhawks.ulm.edu"],
      ["Classification", "Sophomore"],
      ["CWID", "12345678"],
      ["Advisor", "Lon Smith"]
    ];

    let groupsHeader = ["Current Groups"];
    let groups = [["group1"], ["group2"], ["group2"], ["group2"]];

    return (
      <div className="profile-page">
        <h2 className="name">{studentName}</h2>
        <div className="grid-container">
          <div className="user-info">
            <Table data={userInfo} header={userInfoHeader} />
          </div>
          <div className="current-groups">
            <Table data={groups} header={groupsHeader} />
          </div>
          <div className="classes-taken">
            <Table data={groups} header={groupsHeader} />
          </div>
          <div className="shared-with">
            <Table data={groups} header={groupsHeader} />
          </div>
          <div className="shared-with-me">
            <Table data={groups} header={groupsHeader} />
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
