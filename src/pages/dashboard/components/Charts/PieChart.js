import React, { useState, useEffect } from 'react';
import { useTheme } from "@material-ui/styles";
//import ApexCharts from "react-apexcharts";
import axiosInstance from '../../../../axios';
import { useParams } from 'react-router-dom';

import {
    // ResponsiveContainer,
    // ComposedChart,
    // AreaChart,
    // LineChart,
    // Line,
    // Area,
    PieChart,
    Pie,
    Cell,
    // YAxis,
    // XAxis,
    // Tooltip
  } from "recharts";






 export  default function PieChart2() {
  var theme = useTheme();
  const { id } = useParams();
 ; 

  
  const [PieChartData, setData] = useState(true); //Heatmap data
 

  useEffect(() => { 
    
    axiosInstance.get('piedata/' + id)
        .then(res => {             
            setData(res.data)
            console.log(res.data)
        })
        .catch(error=>{
            console.log("Error")
        })
  }, [])
  

  // if (data === undefined) {
  //   return <></>;
  // }

  
  
  return (
    <PieChart>
        <Pie
            data={PieChartData}
            innerRadius={30}
            outerRadius={55}
            dataKey="value"
            cx="50%"
        >
            {PieChartData.map((entry, index) => (
            <Cell
                key={`cell-${index}`}
                fill={theme.palette[entry.color].main}
                //fill={theme.palette[entry.color]}
                //fill = {entry.color}
            />
            ))}
        </Pie>
        </PieChart>
    
  );
  
}

