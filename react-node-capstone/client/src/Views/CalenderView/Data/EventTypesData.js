

const dataMapping = {
    "advisingSlots": { url: "advising/all", title: "Adivising Slots" },
    "attendingEvents": { url: "events/attending", title: "Attending Events" },
    "createdEvents": { url: "events/created", title: "Created Events" },
    "createdAppointments": { url: "appointments/created", title: "Created Appointments" },
    "requestedAppointments": { url: "appointments/receivedInvite", title: "Requested Appointments" },
    "approvedAppointments": { url: "advising/all", title: "Approved Appointments" }
};

const allEventTypes = ["advisingSlots", "attendingEvents", "createdEvents", "requestedAppointments", "approvedAppointments"];

const eventTypesMenuOptions = [
    { "name": "Advising Slots", "value": "advisingSlots" },
    { "name": "Attending Events", "value": "attendingEvents" },
    { "name": "Created Events", "value": "createdEvents" },
    { "name": "Created Appointments", "value": "createdAppointments" },
    { "name": "Requested Appointments", "value": "requestedAppointments" },
    { "name": "Approved Appointments", "value": "approvedAppointments" },
];

function addEventTypeSpecificData(eventType, data) {

    switch (eventType) {
        case "advisingSlots":

            data["advising"] = true;

            break;
        case "attendingEvents":



            break;
        case "createdEvents":

            data["created"] = true;

            break;

        case "createdAppointments":

            data["created"] = true;


            break;
        case "requestedAppointments":

            data["requested"] = true;

            break;

        case "approvedAppointments":

            data["approved"] = true;

            break;
    }

    return data;
}


const EventTypesData = {
    "dataMapping": dataMapping,
    "allTypes": allEventTypes,
    "addEventSpecificData": addEventTypeSpecificData,
    "eventTypesMenuOptions": eventTypesMenuOptions
};

export default EventTypesData;