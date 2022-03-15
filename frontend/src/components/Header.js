import React, { Component, useEffect, useState, useRef } from 'react';

import { Link } from "react-router-dom";

const Header = (props) => {

    const logoutUser = () => {
        localStorage.removeItem("uesrToken");
    }
 
    return (
        <div className='head'>
            <div className='title'> Emotion Analyser </div>
            <div className='tabs'>
                <div>
                    <Link to="/"> Home </Link>
                </div>
                <div>
                    <Link to="/analytics"> Analytics </Link>
                </div>
                <div>
                    <Link to="/login" onClick={logoutUser}> Logout </Link>
                </div>
            </div>
        </div>
    )
}

export default Header;