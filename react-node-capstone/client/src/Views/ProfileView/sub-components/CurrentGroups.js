import React from "react";
import TableBaseLayout from "../layouts/TableBaseLayout";


export default function (props) {

    const rows = [
        [{align: "left", name: "Group 1"},{align: "left", name: "Creator"}],
        [{align: "left", name: "Group 2"},{align: "left", name: "Member"}],
        [{align: "left", name: "Group 3"},{align: "left", name: "Member"}],
    ];

    const headers = [
        {"name": "Group Name", "align": "left"},
        {"name": "Status", "align": "left"},
    ];

    return (

        <TableBaseLayout icon="dashboard" title="Current Groups" rows={rows} headers={headers}/>
    );
}
