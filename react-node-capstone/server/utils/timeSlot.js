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

    let slots = [];
    const end = new Date(endStr);
    const interval = parseInt(intervalStr);

    let current = new Date(start);

    current.setUTCSeconds(0, 0);
    end.setSeconds(0);

    while (testAddTime(current, interval) <= end) {

        let end = addTime(new Date(current), interval);
        slots.push({"start": new Date(current), "creator_id": creator_id, "title": title, "description": description, "event_type": event_type, "carousel": carousel, "end": end});

        current = new Date(end);
        current.setSeconds(0);
    }
    return slots;

}

function addTime(time, interval) {

    let newMins = time.getMinutes() + interval;

    if (newMins >= 60) {
        time.setHours(time.getHours() + Math.floor(newMins / 60));
        time.setMinutes(newMins - Math.floor(newMins / 60) * 60);
    } else {
        time.setMinutes(newMins);
    }
    time.setSeconds(0);
    return time;
}

function testAddTime(testTime, interval) {
    let time = new Date(testTime);

    return addTime(time, interval);
}

module.exports = {
    "createSlots": createSlots,
    "getSlots": getSlots
};