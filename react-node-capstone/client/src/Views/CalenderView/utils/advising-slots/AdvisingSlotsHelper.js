

function getSlots(data) {

    var slots = [];
    const start = data.start;
    const end = new Date(data.end);
    const interval = parseInt(data.interval);

    var current = new Date(start);

    current.setUTCSeconds(0, 0);

    end.setUTCSeconds(0, 0);

    var index = 0;

    while (testAddTime(current, interval) <= end) {

        var endTime = addTime(new Date(current), interval);

        slots.push({"interval": interval, "index": index, "title": data.title, "description": data.description, "start": new Date(current), "end": endTime});

        index++;

        current = new Date(endTime);
        current.setSeconds(0);
    }
    return { "slots": slots, "count": index };

}

function addTime(time, interval) {

    var newMins = time.getMinutes() + interval;

    if (newMins >= 60) {
        var newHours = time.getHours() + Math.floor(newMins / 60);
        var mins = newMins - Math.floor(newMins / 60) * 60;
        time.setHours(newHours);
        time.setMinutes(mins);
    } else {
        time.setMinutes(newMins);
    }
    time.setSeconds(0);
    return time;
}

function testAddTime(testTime, interval) {

    var time = new Date(testTime);

    var newMins = time.getMinutes() + interval;

    if (newMins >= 60) {
        time.setHours(time.getHours() + Math.floor(newMins / 60));
        time.setMinutes(newMins - Math.floor(newMins / 60) * 60);
    } else {
        time.setMinutes(newMins);
    }
    time.setSeconds(0);
    return time;
}

module.exports = {
    "getSlots": getSlots
}