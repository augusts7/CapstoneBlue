import React from "react";
import Table from "../../Components/Table/Table";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import "./Profile.css";

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
    let groups = ["group1", "group2", "group2", "group2"];
    let groupsList = "";
    for (let g of groups) {
      groupsList += g + ", ";
    }

    let classesTakenHeader = ["Classes Taken"];
    let classesTaken = [
      ["CSCI", "2000, 2003, 3020, 3030, 4065"],
      ["MATH", "1016, 1032, 2002, 3003"],
      ["ENGL", "1001, 1030"],
      ["BIOL", "1020, 1026"],
      ["CINS", "3040, 3041"],
      ["PHYS", "2003, 2004, 2009, 2010"]
    ];

    let sharedWithHeader = ["Calendar Shared With"];
    let sharedWith = [
      "asdf asdf",
      "asdfdsf asdfsd",
      "asdfsdf fdfe",
      "asdfsd sfdrref"
    ];
    let sharedWithList = "";
    for (let s of sharedWith) {
      sharedWithList += s + ", ";
    }

    let sharedWithMeHeader = ["Calendars Shared With Me"];
    let sharedWithMe = [
      "asdf asdf",
      "asdfdsf asdfsd",
      "asdfsdf fdfe",
      "asdfsd sfdrref"
    ];
    let sharedWithMeList = "";
    for (let sm of sharedWithMe) {
      sharedWithMeList += sm + ", ";
    }

      return (
        <div className="profile-page">
          <h2 className="name"> {studentName} </h2>
          <div className="grid-container">
            <div className="user-info item1">
              <Table data={userInfo} header={userInfoHeader} />
            </div>
            <div className="classes-taken item2">
              <Table data={classesTaken} header={classesTakenHeader} />
            </div>
            <div className="current-groups item3">
              <Card>
                <CardContent>
                  <Typography
                    className={"MuiTypography--heading"}
                    variant={"h6"}
                    gutterBottom
                  >
                    {groupsHeader}
                  </Typography>
                  <Divider />
                  <Typography className={"MuiTypography--subheading"}>
                    {groupsList}
                  </Typography>
                </CardContent>
              </Card>
            </div>
            <div className="shared-with item4">
              <Card>
                <CardContent>
                  <Typography
                    className={"MuiTypography--heading"}
                    variant={"h6"}
                    gutterBottom
                  >
                    {sharedWithHeader}
                  </Typography>
                  <Divider />
                  <Typography className={"MuiTypography--subheading"}>
                    {sharedWithList}
                  </Typography>
                </CardContent>
              </Card>
            </div>
            <div className="shared-with-me item5">
              <Card>
                <CardContent>
                  <Typography
                    className={"MuiTypography--heading"}
                    variant={"h6"}
                    gutterBottom
                  >
                    {sharedWithMeHeader}
                  </Typography>
                  <Divider />
                  <Typography className={"MuiTypography--subheading"}>
                    {sharedWithMeList}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      );
    }
  }


export default Profile;
