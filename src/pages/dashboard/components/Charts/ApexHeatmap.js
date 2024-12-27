import React, { useState, useEffect } from 'react';
import { useTheme } from "@material-ui/styles";
import ApexCharts from "react-apexcharts";
import axiosInstance from '../../../../axios';
import { useParams } from 'react-router-dom';
import './heatmap.css';

import AutoCompleteCustom from "../../../../components/Widget/AutoCompleteMultiple"


import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios, {AxiosResponse} from "axios";

import CircularProgress from '@mui/material/CircularProgress';

//import myVariable from "./AutoCompleteCustom"

import {
  Grid,
  // LinearProgress,
  // Select,
  // OutlinedInput,
  // MenuItem,
  Button
} from "@material-ui/core";


  export  default function ApexHeatmap(data2) {
    var theme = useTheme();
    const { id } = useParams();

  //const [data, setData] = useState(true); //Heatmap data

  const data3 = data2.data2

  const data4 = data3.length
 
  console.log(data4)
  // //const chartHeight = dynamicHeight < window.innerHeight ? '100%' : dynamicHeight;

  const dynamicWidth = (data3[0]?.data.length * 48);

  console.log(dynamicWidth)
  console.log(data3)

  const chartWidth = dynamicWidth < window.innerWidth ? '100%' : dynamicWidth;

  //const z = data3.length > 5 ? 600 : 400;

  const x  = data4 > 7 ? 600 :  data4 > 4 ? 500 : 350

 
  console.log(x)
  
  
   

  // useEffect(() => { 
    
  //   axiosInstance.get('graphsdata/' + id)
  //       .then(res => {             
  //           setData(res.data['heat'])
  //           setValue(res.data['heat'])
          
            
  //       })
  //       .catch(error=>{
  //           console.log("Error")
  //       })
  // }, [])
 

  return (
    <>
    {/* <Autocomplete
        multiple
        id="tags-standard"
        options={series}
        getOptionLabel={(option) => option.name }
        onChange={(event, newValue, oldValue) => {
          if (newValue) {
            setValue(newValue);
            //setId(newValue.id);
            //setTitle(newValue.title);
          }
        }}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Multiple values"
            placeholder="Favorites"
          />
        )}
      /> */}
      <ApexCharts
        options={themeOptions(theme)}
        series={data3}
        //series = {data}
        type="heatmap"
        height={x}
        width= {chartWidth}
        // height={400}
        // width= {3000}
      />
    </>
  );
 
}

function themeOptions(theme) {
  var dentro2 = localStorage.getItem("teste")
  //console.log(dentro2)
  return {
    chart: {
      events: {
        dataPointSelection: function(event, chartContext, obj) {
            //return document.location.href = obj.w.config.series[obj.seriesIndex].data[obj.dataPointIndex].link;
            return window.open(obj.w.config.series[obj.seriesIndex].data[obj.dataPointIndex].link);
        },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
            enabled: true,
            delay: 150
        },
        dynamicAnimation: {
            enabled: true,
            speed: 350
        }
    }
    },
      toolbar: {
        show: true,
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 40,
      fontSize: '14px',
      fontWeight: 400,
      onItemClick: {
        toggleDataSeries: true
      },
      
      
    //   onItemHover: {
    //     highlightDataSeries: true
    // },

    
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.65,
        // radius: 2,
        // useFillColorAsStroke: true,
        colorScale: {
          ranges: [
            {
              from: -1,
              to: -1,
              name: 'Não Existente',
              color: '#C1C1C1'
            },
            {
              from: 0,
              to: 0,
              name: 'Não Liberado',
              color: '#ED5564'
            },
            {
              from: 1,
              to: 1,
              name: 'Liberado',
              color: '#FFCE54'
            },
            {
              from: 2,
              to: 2,
              name: 'Iniciado',
              color: '#A0D568'
            },
            {
              from: 3,
              to: 3,
              name: 'Finalizado',
              color: '#4FC1E8'
            },
            {
              from: 4,
              to: 4,
              name: 'Entregue',
              color: '#AC92EB'
            },
          ]
        }
      }
    },

    tooltip: {
      custom: function({series, seriesIndex, dataPointIndex, w}) {
        var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
        //var autoinicio = data.autoinicio.split(".")[0]
        var autoinicio = new Date(data.autoinicio)
        const autoinicioF = autoinicio.toLocaleString("pt-BR")
        var autofinal = new Date(data.autofinal)
        const autofinalF = autofinal.toLocaleString("pt-BR")
        //console.log(dateF)
        //console.log(autoinicio)
        //console.log(data.autoinicio)
        //console.log(data.autofinal)
        var a = data.med
        var b = data.eq
  
        if (a == null) {
          return "";
        }
        else {
          return (
          '<div class="custom-tooltip">' +
            '<div class="group">' +
              '<div class="group2">Nome: ' +
              '<b>'+ data.nome +'</b>' +
              '<hr>' +
            "</div>" +
            '<div class="group">' +
              '<div class="group2">Ínicio: ' +
                '<b>' + data.inicio +'</b>'+ ' (' + autoinicioF + ')' +
                
            "</div>" +
            '<div class="group">' +
              '<div class="group2">Término: ' +
              '<b>' +data.final +'</b>'+ ' (' + autofinalF + ')' +
            "</div>" +
         '</div>')
        }
      },
      fill: {
        opacity: [1, 0.2]
      },
    },

    dataLabels: {
      enabled: true,
      formatter: function(value, { seriesIndex, dataPointIndex, w }) {
        var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
        var a = data.med
        var b = data.eq
        if (a == null) {
          return b;
        }
        else {
          return [a,b];
        }
      },
      
      offsetY: -3,
      style: {
        fontSize: '12px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        //colors: undefined
      },
      
      
      
     
    },
    
    noData: {  
      text: "Loading...",  
      align: 'center',  
      verticalAlign: 'middle',  
      offsetX: 0,  
      offsetY: 0,  
      style: {  
        color: "#000000",  
        fontSize: '14px',  
        fontFamily: "Helvetica"  
      }  
    }
    
    //colors: [theme.palette.primary.main],
  };
}





// return '<ul>' +
// '<li><b>Equipe</b>:' + data.eq + '</li>' +
// '<li><b>Medição</b>:' + data.med + '</li>' +
// '</ul>';


// ##################################################################


// const series = [
//   {
//     name: "P1",
//     data: generateData(18, {
//       min: 0,
//       max: 90,
//     }),
//   },
//   {
//     name: "P2",
//     data: generateData(18, {
//       min: 0,
//       max: 90,
//     }),
//   },
//   {
//     name: "P3",
//     data: generateData(18, {
//       min: 0,
//       max: 90,
//     }),
//   },
//   {
//     name: "P4",
//     data: generateData(18, {
//       min: 0,
//       max: 90,
//     }),
//   },
//   {
//     name: "P5",
//     data: generateData(18, {
//       min: 0,
//       max: 90,
//     }),
//   },
//   {
//     name: "P6",
//     data: generateData(18, {
//       min: 0,
//       max: 90,
//     }),
//   },
//   {
//     name: "P7",
//     data: generateData(18, {
//       min: 0,
//       max: 90,
//     }),
//   },
//   {
//     name: "P8",
//     data: generateData(18, {
//       min: 0,
//       max: 90,
//     }),
//   },
//   {
//     name: "P9",
//     data: generateData(18, {
//       min: 0,
//       max: 90,
//     }),
//   },
// ];


// function generateData(count, yrange) {
//   var i = 0;
//   var series = [];
//   while (i < count) {
//     var x = "w" + (i + 1).toString();
//     var y =
//       Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

//     series.push({
//       x: x,
//       y: y,
//     });
//     i++;
//   }
//   return series;
  
// }