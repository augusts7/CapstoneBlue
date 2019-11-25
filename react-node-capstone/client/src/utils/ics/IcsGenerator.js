import LengthValidator from "../length-utils/LengthValidator";
import {saveAs} from "file-saver";
import Ics from "./Ics";

export default class IcsGenerator {

    static generateIcs (eventsList) {

        if (LengthValidator.isEmpty(eventsList)) {
            return false;
        }
        let cal = Ics();
        eventsList.forEach((event) => {
            cal.addEvent(event.title, event.description, "Monroe", event.start, event.end);
        });

        cal.download("Exported Calendar");
    }

    static createIcsFile(eventsList) {

        if (LengthValidator.isEmpty(eventsList)) {
            return false;
        }

        let icsString = this.startIcsString();

        const current = new Date();
        eventsList.forEach((event) => {
            icsString += this.convertToIcsString(event, current);
        });

        icsString += this.endIcsString();

        this.downloadIcsFile("Calendar Events.ics", icsString);
    }

    static downloadIcsFile (filename, text) {
        let blob = new Blob([text], {
            type: "text/plain;charset=utf-8"
        });

        saveAs(blob, filename);
    }

    static convertToIcsString(event, current) {
        return `BEGIN:VEVENT\nDTSTART:${event.start}\nDTEND:${event.end}\DTSTAMP:${current}\nUID:${event.eventID}\nSUMMARY:${event.title}\nDESCRIPTION:${event.description}\nCLASS:PUBLIC\n` +
            `CATEGORIES:${event.event_type}\nEND:VEVENT\n`;
    }

    static startIcsString () {
        return `BEGIN:VCALENDAR\nPRODID:-//ULM Scheduling Website//EN\nVERSION:2.0//\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\nX-WR-CALNAME:ULM Scheduling Website Calendar\nX-WR-TIMEZONE:America/Chicago\nBEGIN:VTIMEZONE\nTZID:America/Chicago\nX-LIC-LOCATION:America/Chicago\nBEGIN:DAYLIGHT\nTZOFFSETFROM:-0600\nTZOFFSETTO:-0500\n` +
                `TZNAME:CDT\nDTSTART:19700308T020000\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\nEND:DAYLIGHT\nBEGIN:STANDARD\nTZOFFSETFROM:-0500\nTZOFFSETTO:-0600\nTZNAME:CST\nDTSTART:19701101T020000\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\nEND:STANDARD\\nEND:VTIMEZONE\n`;
    }

    static endIcsString () {
        return `END VCALENDAR`;
    }
}