
import React from 'react';



const CalendarActionsContext = React.createContext({
    "showShareCalendarForm": (calendarId) => { },
    "showAddCalendarForm": () => { },
    "showAddEventForm": () => { },
    "showAddAppointmentForm": () => { },
    "showEditAppointmentForm": (eventData) => {}
});

export default CalendarActionsContext;

