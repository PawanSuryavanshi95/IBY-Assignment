import React, { Component, useEffect, useState, useRef } from 'react';

import { Line } from 'react-chartjs-2';

const LineGraph = (props) => {

    const data = (labels, data, rgb, label_title)=>{

        return {
        labels: labels,
        datasets: [
          {
            label: label_title,
            data: data,
            fill: true,
            backgroundColor:`rgba(${rgb}, 0.3)`,
            pointBorderColor:`rgba(${rgb}, 0.8)`,
            pointBorderWidth:1,
            pointRadius:0.5,
            tension: 0.4
          },
        ],
      }};
      
      const options = {
        plugins:{legend:{display:false}},
        layout:{padding:{bottom:100}},
        tooltips: {
            mode: 'index',
         },
         hover: {
            mode: 'index',
            intersect: false
         },
        scales: {
            x: {
                display: false
            },
            xAxes: [{
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                }
            }],
            yAxes: [{
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                }   
            }]
        },
      };
    
    return (
        <div className='plot'>
            <Line data={ data(props.labels, props.data, props.color, props.title) } options={options}/>
        </div>
    )
}

export default LineGraph;