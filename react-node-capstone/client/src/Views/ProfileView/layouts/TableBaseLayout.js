import React from "react";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import BaseLayout from "../layouts/BaseLayout";
import withStyles from "@material-ui/core/styles/withStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";


const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: "",
        color: theme.palette.common.black,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
}));

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: "",
        },

    },
}))(TableRow);

export default function TableBaseLayout (props) {

    const classes = useStyles();

    let rowsHtml = [];

    if (props.rows) {
        props.rows.forEach((row) => {
            rowsHtml.push(
                <StyledTableRow hover>
                    {row.map((column) => (
                        <StyledTableCell align={column.align}>
                            <Typography variant="subtitle1">
                                {column.name}
                            </Typography>
                        </StyledTableCell>
                    ))}
                </StyledTableRow>
            );
        });
    }

    return (
        <BaseLayout icon={props.icon} title={props.title}>

            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow hover>
                        {props.headers.map(header => (
                            <StyledTableCell variant="subtitle1" align={header.align}>{header.name}</StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowsHtml}
                </TableBody>
            </Table>

        </BaseLayout>

    );
}
