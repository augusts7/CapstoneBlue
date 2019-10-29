import React from "react";
import TableBaseLayout from "../layouts/TableBaseLayout";


export default function ProfileInfo(props) {

    const rows = [
        [{align: "left", name: "Calendar 1"},{align: "left", name: "Sanjeeb"}],
        [{align: "left", name: "Calendar 2"},{align: "left", name: "Sangraula"}],
        [{align: "left", name: "Calendar 3"},{align: "left", name: "sanjeeb@ulm.edu"}],
    ];

    const headers = [
        {"name": "Calendar Name", "align": "left"},
        {"name": "Shared By", "align": "left"},
    ];

    return (

        <TableBaseLayout icon="today" title="Calendars Shared To Me" rows={rows} headers={headers}/>
    );
}
