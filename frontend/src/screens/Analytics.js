import React, { Component, useEffect, useState, useRef } from 'react';

import LineGraph from '../components/LineGraph';

import { useNavigate } from 'react-router-dom';
import DoughnutChart from '../components/DoughnutChart';

import axios from 'axios'; 
import Button from '../components/Button';
import Header from '../components/Header';

const Analytics = (props) => {

    let navigate = useNavigate();

    const [sessionData, setSessionData] = useState(null);

    const [idx, setIdx] = useState(3);

    const [donutData, setDonutData] = useState(null);

    useEffect(()=>{

        const token = localStorage.getItem("userToken");
        const headers = {authorization:token};

        axios.post("http://localhost:5050/api/session/get-data", {}, { headers } ).then(res=>{
            console.log(res.data);
            const data = res.data.session[idx]['dominant'];

            var temp = [];
            temp.push(data['angry']);
            temp.push(data['disgust']);
            temp.push(data['fear']);
            temp.push(data['happy']);
            temp.push(data['neutral']);
            temp.push(data['sad']);
            temp.push(data['surprise']);

            setSessionData(res.data.session);
            setDonutData(temp);
        }).catch(e => {
            console.log(e);
        });
        
    }, []);
    
    return (
        <div className='analytics-screen'>
            <Header />

            { sessionData!==null && <div className='charts'>

                <h2>{sessionData[idx].name}</h2>

            <div className='row' style={{ justifyContent:'space-between', margin:'0 20vw' }}>
                <Button color="#00325e" onClick={() => { if(idx>0) setIdx(idx - 1); }} title="Previous" />
                <Button color="#00325e" onClick={() => { if(idx<(sessionData.length-1)) setIdx(idx + 1); }} title="Next" />
            </div>

                <div>
                <div className='row'>
                    <DoughnutChart data={donutData} label = "Emotions" />
                </div>

                <div>
                    <div className='row'>
                        <LineGraph labels = {sessionData[idx]['labels']} data = {sessionData[idx]['angry']} color="19, 100, 232" title="Active Cases" />
                        <LineGraph labels = {sessionData[idx]['labels']} data = {sessionData[idx]['disgust']} color="19, 100, 232" title="Active Cases" />
                    </div>
                    <div className='row'>
                        <LineGraph labels = {sessionData[idx]['labels']} data = {sessionData[idx]['fear']} color="19, 100, 232" title="Active Cases" />
                        <LineGraph labels = {sessionData[idx]['labels']} data = {sessionData[idx]['happy']} color="19, 100, 232" title="Active Cases" />
                    </div>
                    <div className='row'>
                        <LineGraph labels = {sessionData[idx]['labels']} data = {sessionData[idx]['neutral']} color="19, 100, 232" title="Active Cases" />
                        <LineGraph labels = {sessionData[idx]['labels']} data = {sessionData[idx]['sad']} color="19, 100, 232" title="Active Cases" />
                    </div>
                    <div className='row'>
                        <LineGraph labels = {sessionData[idx]['labels']} data = {sessionData[idx]['surprise']} color="19, 100, 232" title="Active Cases" />
                    </div>
                </div>
                </div>
                
            </div>
            }
            
        </div>
    )
}

export default Analytics;