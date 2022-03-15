import React, { Component, useEffect, useState, useRef } from 'react';

import axios from 'axios';

import { Link } from "react-router-dom";

import Video from './Video';

import Button from '../components/Button';
import Header from '../components/Header';

const Home = (props) => {

    const [start, setStart] = useState(false);

    const [currSession, setCurrSession] = useState(null);

    const createSession = () => {

        const token = localStorage.getItem("userToken");
        const headers = {authorization:token};

        const name = "sgv";

        axios.post("http://localhost:5050/api/session/create", { name:name }, { headers}).then( async res=>{
            setCurrSession(res.data.session);
            setStart(true);
        }).catch(e => {
            console.log(e);
        });
    }
 
    return (
        <div className='home-screen'>

            <Header />
            
            <div style={{'padding-bottom': '40px'}}>
                { start &&  <Button color="#ff4733" onClick={() => { setStart(false); }} title="End" /> }
                { !start && <Button color="#6ede40" onClick={() => { createSession(); }} title="Start" /> }
            </div>
            
            <div className='cam-area'>
                { start && <Video session={currSession} /> }
                { !start && <div className='blank-cam'>
                    <div>
                        Press Start to Analyze Emotions
                    </div>
                </div> }
            </div>

        </div>
    )
}

export default Home;