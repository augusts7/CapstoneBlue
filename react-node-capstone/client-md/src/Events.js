import React from "react";
import MaterialTable from "material-table";

export default function MaterialTableDemo() {
  var [state, setState] = React.useState({
    columns: [
      { title: "Event ID", field: "eventID", type: "numeric" },
      { title: "Event Title", field: "eventTitle" },
      { title: "Event Description", field: "eventDescription" },
      { title: "Start Time", field: "startTime", type: "datetime" },
      { title: "End Time", field: "endTime", type: "datetime" }
    ],
    data: [
      {
        eventID: 1,
        eventTitle: "ULM Football Game",
        eventDescription: "ULM vs. Grambling",
        startTime: "",
        endTime: ""
      }
    ]
  });

  return (
    <MaterialTable
      title="Events"
      columns={state.columns}
      data={query =>
        new Promise((resolve, reject) => {
          let url = "/api/events";
          url += "per_page=" + query.pageSize;
          url += "&page=" + (query.page + 1);
          fetch(url)
            .then(response => response.json())
            .then(result => {
              resolve(this.data);
            });
        })
      }
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.push(newData);
              setState({ ...state, data });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              setState({ ...state, data });
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              setState({ ...state, data });
            }, 600);
          })
      }}
      options={{
        exportButton: "true"
      }}
    />
  );
}
