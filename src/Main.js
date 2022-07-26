import React from 'react'
import './main.css';
import { useState , useEffect} from 'react';
import Time from './Time.js';
import Cal from './Cal.js';
import moment from 'moment';
let name = ".";

const Main = () => {
    const [state , setState] = useState([]);
    const [lnk , setLnk] = useState("https://kontests.net/api/v1/all")
    const [loading , setLoading] = useState(false);
    const [view , setView] = useState(true);
    const [text , setText] = useState("");
    const [flag , setFlag] = useState(1);

    console.log(flag);
    console.log(window.innerHeight); 
    useEffect(() =>{
        setLoading(false);
        fetch(lnk)
        .then(res => res.json())
        .then(json => {
            setState(json);
            setLoading(true);
        });
    }
    , [lnk]);
    
    const handleChange = (e) =>{
        e.preventDefault();
        console.log(e.target.value);
        setText("");

        if(e.target.value === "All"){
            name = ".";
            setLnk("https://kontests.net/api/v1/all");
            setFlag(1);
        }else if(e.target.value === "Codeforces"){
            name = "Codeforces";
            setLnk("https://kontests.net/api/v1/codeforces");
            setFlag(0);
        }else if(e.target.value === "Atcoder"){
            name = "Atcoder";
            setLnk("https://kontests.net/api/v1/at_coder");
            setFlag(0);
        }else if(e.target.value === "Codechef"){
            name = "Codechef";
            setLnk("https://kontests.net/api/v1/code_chef");
            setFlag(0);
        }else if(e.target.value === "Topcoder"){
            name = "Topcoder";
            setLnk("https://kontests.net/api/v1/top_coder");
            setFlag(0);
        }else if(e.target.value === "HackerEarth"){
            name = "HackerEarth";
            setLnk("https://kontests.net/api/v1/hacker_earth");
            setFlag(0);
        }else if(e.target.value === "KickStart"){
            name = "Kick Start";
            setLnk("https://kontests.net/api/v1/kick_start");
            setFlag(0);
        }else{
            name = "LeetCode";
            setLnk("https://kontests.net/api/v1/leet_code");
            setFlag(0);
        } 
    }

    const handleClick = () =>{
        setView(!view);
    }

    const handleSearch = (e) =>{
        setText(e.target.value);
    }

    return (
        <>
        <div className = "back" >
            <div className = "header">
                <button className = "btn-view" onClick = {handleClick}>{view ? "Switch to Calendar View" : "Switch to List View"}</button>
                <h1>CP Contests</h1>
                <div className = "arrow">
                    <select className = "dropdown" onChange = {handleChange}>
                        <option value = "All">All</option>
                        <option value = "Codeforces">Codeforces</option>
                        <option value = "Atcoder">Atcoder</option>
                        <option value = "Codechef">Codechef</option>
                        <option value = "Topcoder">Topcoder</option>
                        <option value = "HackerEarth">HackerEarth</option>
                        <option value = "KickStart">KickStart</option>
                        <option value = "LeetCode">LeetCode</option>
                    </select>
                </div>
                
            </div>

            {view ? <div className = "container">
                <input type = "text" placeholder = "Search..." className = "search-bar" onChange = {handleSearch}></input>
                {loading ? <table className = "whole">
                    <thead className = "head">
                        <tr>
                            <th className = "col1">Start Time</th>
                            <th>Duration</th>
                            <th>Time Left</th>
                            <th>Event</th>
                            <th>Site</th>
                        </tr>
                    </thead>
                    <tbody className = "rows" >
                        {state.filter(function(obj){
                            if(flag === 1){
                                if(obj.site !== undefined){
                                    if(Math.round(obj.duration/3600) <= 240 && (obj.site.toLowerCase().indexOf(text.toLowerCase()) > -1 || obj.name.toLowerCase().indexOf(text.toLowerCase()) > -1 || moment(obj.start_time).format('DD-MM-YYYY  h:mm a').toLowerCase().indexOf(text.toLowerCase()) > -1)){
                                        return true;
                                    }
                                }
                            }else{ 
                                if(Math.round(obj.duration/3600) <= 240 && (name.toLowerCase().indexOf(text.toLowerCase()) > -1 || obj.name.toLowerCase().indexOf(text.toLowerCase()) > -1 || moment(obj.start_time).format('DD-MM-YYYY  h:mm a').toLowerCase().indexOf(text.toLowerCase()) > -1)){
                                    return true;
                                }
                            }
                        }).slice(0 , 30).map((it , idx) => (
                            <tr key = {idx} style = {{borderBottom: "1px solid #ddd"}}>
                                <td>{moment(it.start_time).format('DD-MM-YYYY  h:mm a')}</td>
                                <td><Time seconds = {it.duration} /></td>
                                <td>{it.status !== "CODING" ? moment(it.start_time).fromNow() : "Running"}</td>
                                <td>{<a href = {it.url} style = {{textDecoration: "none"}}>{it.name}</a>}</td>
                                <td className = "site_name">{name === "." ? it.site : name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>: <div className = "Load">Loading...</div>}
            </div>
            : <Cal Events = {state}/>}
        </div>
        </>
    )
}

export default Main
