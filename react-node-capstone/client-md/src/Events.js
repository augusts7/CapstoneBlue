import React from 'react';
import MaterialTable from 'material-table';

export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Event Title', field: 'eventTitle' },
      { title: 'Event Description', field: 'eventDescription' },
      { title: 'Start Time', field: 'startTime', type: 'date-time' },
      { title: 'End Time', field: 'endTime', type: 'date-time'},
    ],
    data: [
      { title: 'ULM Football Game', 
        eventDescription: 'ULM vs. Grambling', 
        startTime: '08/31/19 7:00PM', 
        endTime:  '08/31/19 10:00PM' },
    ],
  });

  return (
    <MaterialTable
      title="Events"
      columns={state.columns}
      data={state.data}
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
          }),
      }}
    />
  );
}