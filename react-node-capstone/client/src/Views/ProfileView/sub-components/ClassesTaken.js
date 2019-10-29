import React from "react";
import TableBaseLayout from "../layouts/TableBaseLayout";


export default function ProfileInfo(props) {

    const rows = [
        [{align: "left", name: "CS"},{align: "left", name: "2000, 2003, 2053, 4055"}],
        [{align: "left", name: "Math"},{align: "left", name: "1031, 3003"}],
        [{align: "left", name: "English"},{align: "left", name: "1001"}],
    ];

    const headers = [
        {"name": "Course Name", "align": "left"},
        {"name": "Course Ids", "align": "left"},
    ];

    return (

        <TableBaseLayout icon="description" title="Classes Taken" rows={rows} headers={headers}/>

    );
}
