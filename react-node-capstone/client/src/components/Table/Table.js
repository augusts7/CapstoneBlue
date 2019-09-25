import React from "react";
import "./Table.css";

class Table extends React.Component {
  render() {
    let header = this.props.header;
    let json = this.props.data;

    let className = "mdl-data-table mdl-js-data-table mdl-shadow--2dp";

    if (this.props.selectable) {
      className += " mdl-data-table--selectable";
    }
    if (json == null) {
      json = [[1, 2], [3, 4]];
    }
    if (header == null) {
      header = ["Sunday", "Monday"];
      }

      return (

      <table className={className}>
        <thead>
          {header.map(h => {
            return <th className="mdl-data-table__cell--non-numeric">{h}</th>;
          })}
        </thead>
        <tbody>
          {json.map(row => {
            return (
              <tr className="table-row">
                {row.map(col => {
                  return (
                    <td className="table-column mdl-data-table__cell--non-numeric">
                      {col}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default Table;
