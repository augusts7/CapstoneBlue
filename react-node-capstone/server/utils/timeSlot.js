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
module.exports = { createSlots };