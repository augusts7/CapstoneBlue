export default class CalendarColorHandler {

    static setColor (colorScope, colorData, userCalendarHandler, sharedCalendarHandler, groupCalendarHandler) {

        switch (colorScope.scope) {

            case "group":
                groupCalendarHandler.setCalendarColor(colorScope.id, colorData.color);
                break;

            case "shared":
                sharedCalendarHandler.setCalendarColor(colorScope.id, colorData.color);
                break;

            case "user":
                userCalendarHandler.setCalendarColor(colorScope.id, colorData.color);
                break;
        }
    }
}