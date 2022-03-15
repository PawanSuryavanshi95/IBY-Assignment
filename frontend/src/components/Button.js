import React, { Component, useEffect, useState, useRef } from 'react';

const Button = (props) => {
 
    return (
        <div className='btn' >
            <button style={{ 'background-color': props.color }} onClick={props.onClick} > {props.title} </button>
        </div>
    )
}

export default Button;