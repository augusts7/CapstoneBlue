const createSlots = ({start, end, interval, creator_id, title, description, event_type, carousel})=>{
  start = new Date(start), end = new Date(end);
  let num =  Math.floor((Math.abs(end - start)/(60000 * interval)));
  let slots = [];
   for(let i = 0; i < num; i++){
       end = addInterval(start, interval);
       slots.push({title, description, start, end, event_type, creator_id, carousel});
       start = new Date(end);
   }
   return slots;
}

const addInterval = (time, interval)=>{
  time = new Date(time);
   let mins = time.getMinutes() + interval; 
   time.setMinutes(mins < 60? mins : mins - 60 );
   if(mins > 59)time.setHours(time.getHours() + 1);
 console.log(time)
    return time;
}

function getSlots(start, endStr, intervalStr, creator_id, title, description, event_type, carousel) {

    var slots = [];
    const end = new Date(endStr);
    const interval = parseInt(intervalStr);

    var current = new Date(start);

    current.setSeconds(0);
    end.setSeconds(0);

    while (testAddTime(current, interval) <= end) {

        var slot = {};
        slot.start = new Date(current);
        slot.creator_id = creator_id;
        slot.title = title;
        slot.description = description;
        slot.event_type = event_type;
        slot.carousel = carousel;
        slot.end = addTime(new Date(current), interval);

        slots.push(slot);

        current = new Date(slot.end);
        current.setSeconds(0);
    }

    return slots;

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
    console.log("Test = " + testTime);
    var time = new Date(testTime);

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
    console.log("Test = " + testTime);
    return time;
}

module.exports = {
    "createSlots": createSlots,
    "getSlots": getSlots
};