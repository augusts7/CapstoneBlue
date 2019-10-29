import React from "react";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import BaseLayout from "../layouts/BaseLayout";


export default function ProfileInfo(props) {

    const rows = [
        {name: "First Name", value: "Sanjeeb"},
        {name: "Last Name", value: "Sangraula"},
        {name: "Campus Email", value: "sanjeeb@ulm.edu"},
        {name: "User Type", value: "Student"},
    ];

    return (
        <BaseLayout icon="input" title="User Information">

            <Table aria-label="simple table">

                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.name}>
                            <CustomCell title={true} align="left">{row.name}</CustomCell>
                            <CustomCell align="left">{row.value}</CustomCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </BaseLayout>

    );
}

function CustomCell(props) {


    return (
        <TableCell align={props.align}>
            <Typography variant="subtitle1">
                {props.children}
            </Typography>
        </TableCell>

    );
}