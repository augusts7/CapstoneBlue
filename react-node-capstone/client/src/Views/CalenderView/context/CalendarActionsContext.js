
import React from 'react';



const CalendarActionsContext = React.createContext({
    "showShareCalendarForm": (calendarId) => { },
    "showAddCalendarForm": () => { },
    "showAddEventForm": () => { },
    "getSocket": () => {},
    "showAddAppointmentForm": () => { },
    "showEditAppointmentForm": (eventData) => {}
});

export default CalendarActionsContext;

