import React from 'react'
import { Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"

const localizer = momentLocalizer(moment)

const Cal = ({ Events }) => {
    const objects = []

    Events.filter(function(obj){
        if(Math.round(obj.duration/3600) <= 240){
            return true;
        }
    }).map((it) => {
        let time = moment(it.start_time).format('DD-MM-YYYY  h:mm a');
        let obj = {};
        obj.title = <a href = {it.url} style = {{textDecoration: "none" , color: "white"}}>{it.name}</a>

        let year = parseInt(time[6] + time[7] + time[8] + time[9]);
        let day = parseInt(time[0] + time[1]);
        let month = parseInt(time[3] + time[4]) - 1;
        let hours = parseInt(time[12]);
        let min = parseInt(time[14] + time[15]);
        let sign;
        
        if(time.length == 20){
            hours *= 10;
            sign = time[18] + time[19];
            hours += parseInt(time[13]);
            min = parseInt(time[15] + time[16]);
        }else{
            sign = time[17] + time[18];
        }
        
        if(sign === "pm"){
            hours += 12;
        }

        hours %= 24;
        obj.start = new Date(year , month , day , hours , min);
        console.log(time.length);

        time = moment(it.end_time).format('DD-MM-YYYY  h:mm a');
        year = parseInt(time[6] + time[7] + time[8] + time[9]);
        day = parseInt(time[0] + time[1]);
        month = parseInt(time[3] + time[4]) - 1;
        hours = parseInt(time[12]);
        min = parseInt(time[14] + time[15]);

        if(time.length == 20){
            hours *= 10;
            hours += parseInt(time[13]);
            sign = time[18] + time[19];
            min = parseInt(time[15] + time[16]);
        }else{
            sign = time[17] + time[18];
        }
        
        if(sign === "pm"){
            hours += 12;
        }

        hours %= 24;
        obj.end = new Date(year , month , day , hours , min);
        objects.push(obj);
    })

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={objects}
                startAccessor="start"
                endAccessor="end"
                views = {['month' , 'day' , 'week']}
                style={{ height: 550 , margin: "50px" , color: "black" , backgroundColor: "white"}}
            />
        </div>
    )
}

export default Cal
