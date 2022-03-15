import React, { Component, useEffect, useState, useRef } from 'react';

import axios from 'axios';

const Video = (props) => {

    const FRPS = 2;
    const DSInterval = 10000;
    
    const videoRef = useRef(null);
    const photoRef = useRef(null);

    const [hasPhoto, setHasPhoto] = useState(true);

    const [data, setData] = useState([]);

    const   getVideo = () => {
        navigator.mediaDevices.getUserMedia({
            video: { width: 1000, height: 600 }
        }).then( stream => {
            let video = videoRef.current;
            video.srcObject = stream;
            video.play();
        })
        .catch(e => {
            console.log(e);
        })
    }

    const takePhoto = () => {
        const width = 224;
        const height = 224*9/16;

        let video = videoRef.current;
        let photo = photoRef.current;

        photo.width = width;
        photo.height = height;

        let ctx = photo.getContext('2d');
        ctx.drawImage(video, 0, 0, width, height);
        setHasPhoto(true);

        axios.post('http://10.25.24.170:5000/analyze', {
        "img": [
            photo.toDataURL()
        ],
        "actions": ['emotion']
        }).then(res =>{
            console.log(res);
            var temp = data;
            temp.push({
                "emotion": res.data.instance_1.emotion,
                "dominant_emotion": res.data.instance_1.dominant_emotion,
            });
            console.log(temp);
            setData(temp);

            const region = res.data.instance_1.region;

            ctx.rect(region.x, region.y, region.w, region.h);
            ctx.stroke();
        }).catch(e => {
            console.log(e);
        })
    }

    const sendData = () => {

        const token = localStorage.getItem("userToken");
        const headers = {authorization:token};

        axios.post("http://localhost:5050/api/session/send-data", { data, session:props.session }, { headers}).then( async res=>{
            
            if(res.success===true){
                setData([]);
            }
        }).catch(e => {
            console.log(e);
        });
    }

    useEffect(()=>{
        getVideo();
    }, [videoRef]);

    useEffect(()=>{
        const timer = setInterval(() => { takePhoto(); }, 1000/FRPS);
        return () => clearTimeout(timer)
    }, []);
    
    useEffect(()=>{
        const timer = setInterval(() => { sendData(); }, DSInterval);
        return () => clearTimeout(timer)
    }, []);

    return (
        <div>
            
            <div className='camera'>
                <video ref={videoRef} >
                </video>
                {/*<button onClick={takePhoto}>Take Photo</button>*/}
            </div>

            { hasPhoto &&
                <div className={'result'}>
                    <canvas ref={photoRef}></canvas>
                </div>
            }

        </div>
    )
}

export default Video;