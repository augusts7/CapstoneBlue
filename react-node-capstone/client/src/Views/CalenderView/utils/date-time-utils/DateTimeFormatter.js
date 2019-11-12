import React from "react";

const dateOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
const timeOptions = {minute: '2-digit', hour: "2-digit"};


export default class DateTimeFormatter {

    static formatDate (date) {
        return  date.toLocaleDateString("en-US", dateOptions);
    }

    static formatTime (time) {
        return time.toLocaleTimeString("en-US", timeOptions);
    }
}