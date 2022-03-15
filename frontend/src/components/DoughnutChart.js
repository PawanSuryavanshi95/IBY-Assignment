import React, { Component, useEffect, useState, useRef } from 'react';

import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = (props) => {

    const data = {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: props.label,
          data: props.data,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      };
      
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
        <div className='plot2'>
            <Doughnut data={ data } options={options}/>
        </div>
    )
}

export default DoughnutChart;