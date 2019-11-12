import React from 'react';



const CalendarEventsListContext = React.createContext({
    showDeleteDialog: (title, text, onDeleteClick) => {},
    hideDeleteDialog: () => {}
});

export default CalendarEventsListContext;