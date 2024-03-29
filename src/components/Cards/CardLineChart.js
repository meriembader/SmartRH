import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import Chart from "chart.js";

export default function CardLineChart() {
  const [StatList, setStatList] = useState([]);
  React.useEffect(() => {
   let element1 = [];
   let elements = [];
   let element2= [];
   let element2s = [];
   let Res1 = [];
   let Res2 = [];
  
    Axios
    .get("http://localhost:5000/api/test2")
    .then((response) => {
      Res1 = response.data;
     console.log( Res1)

       
      //console.log(response.data);
      for(let i =0; i< Res1.length; i++){
        element1.push(Res1[i].date);
        elements.push(Res1[i].forecast);
      }
     
console.log ( "element1 ", element1)
console.log ("elements", elements)

      
  }).catch(err => {
    console.log(err);
  });
/******************************* origin data ************ */
 
Axios
.get("http://localhost:5000/api/test4")
.then((response) => {
  Res2 = response.data;
 console.log( Res2)

   
  //console.log(response.data);
  for(let i =0; i< Res2.length; i++){
    element2.push(Res2[i].year);
    element2s.push(Res2[i].leave);
  }
 
console.log ( "element2 ", element2)
console.log ("element2s", element2s)

  
}).catch(err => {
console.log(err);
});
// console.log("hihiihihi:", element2s, element2);
  var config = {
    type: "line",
    data: {
      //labels:element1,
       labels:element1,
      datasets: [
        {
          label:element1 ,
          backgroundColor: "#4c51bf",
          borderColor: "#4c51bf",
          data:elements,
          fill: false,
        },
        {
          label:element2 ,
          backgroundColor: "#fff",
          borderColor: "#fff",
          data:element2s,
          fill: false,
        },
       
       
      ],
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      title: {
        display: false,
        text: "Leave / Forecast Compare Charts",
        fontColor: "white",
      },
      legend: {
        labels: {
          fontColor: "white",
        },
        align: "end",
        position: "bottom",
      },
      tooltips: {
        mode: "index",
        intersect: false,
      },
      hover: {
        mode: "nearest",
        intersect: true,
      },
      scales: {
        xAxes: [
          {
            ticks: {
              fontColor: "rgba(255,255,255,.7)",
            },
            display: true,
            scaleLabel: {
              display: false,
              labelString: "Month",
              fontColor: "white",
            },
            gridLines: {
              display: false,
              borderDash: [2],
              borderDashOffset: [2],
              color: "rgba(33, 37, 41, 0.3)",
              zeroLineColor: "rgba(0, 0, 0, 0)",
              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: [2],
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              fontColor: "rgba(255,255,255,.7)",
            },
            display: true,
            scaleLabel: {
              display: false,
              labelString: "Value",
              fontColor: "white",
            },
            gridLines: {
              borderDash: [3],
              borderDashOffset: [3],
              drawBorder: false,
              color: "rgba(255, 255, 255, 0.15)",
              zeroLineColor: "rgba(33, 37, 41, 0)",
              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: [2],
            },
          },
        ],
      },
    },
  };
  
    var ctx = document.getElementById("line-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, []);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                Users
              </h6>
              <h2 className="text-white text-xl font-semibold"> Nombre of self-diagnostic Test</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="line-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
