import React, { Component, useEffect, useState, useRef } from 'react';

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { auth } from '../firebase-config';

import { Link } from "react-router-dom";

import axios from 'axios';

const GoogleSignInButton = (props) => {

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((re) => {
            console.log(re);
            auth.currentUser.getIdToken().then(token=>{
                console.log(token);
                console.log(auth.currentUser);
                axios.post("http://localhost:5050/api/auth/login", {IDToken:token}).then( async res=>{
                    await localStorage.setItem("userToken", res.data.token);
    
                    props.onComplete();
    
                }).catch(e=>{
                    console.log(e);
                })
            }).catch(e=>console.log(e));
        })
        .catch(e => {
            console.log(e);
        });
    }
 
    return (
        <div className='google-sign-in-btn' >
            <button onClick={signInWithGoogle} >Sign in with Google <i></i></button>
        </div>
    )
}

export default GoogleSignInButton;