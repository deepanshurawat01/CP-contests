import React from 'react'
import './main.css';

const Time = ({ seconds }) => {
    var d = Math.floor(seconds / (3600*24));
    var h = Math.floor(seconds % (3600*24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);

    var duration = "";
    var days = d > 0 ? d + (d == 1 ? " day " : " days ") : "";
    var hours = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
    var minutes = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
    var sec = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    duration = days + hours + minutes + sec;
    
    if(d > 0){
        duration = days;
    }

    //     if(h / 10 === 0){
    //         duration += "0";
    //     }
    //     duration += h + ":";

    //     if(m / 10 === 0){
    //         duration += "0";
    //     }
    //     duration += m;
    // }

    return (
        <div>
            {duration}
        </div>
    )
}

export default Time
