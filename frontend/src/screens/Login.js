import React, { Component, useEffect, useState, useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import GoogleSignInButton from '../components/GoogleSignInButton';


const Login = (props) => {

    let navigate = useNavigate();
    
    return (
        <div className='login-screen'>
            <h1 style={{'textAlign':'center', 'fontSize':'50px', padding:'80px 20px'}}> Emotion Analyser </h1>
            <h2> Login to Continue </h2>
            <GoogleSignInButton onComplete={()=>{ navigate("/"); }} />
        </div>
    )
}

export default Login;