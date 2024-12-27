import React from "react";
import ApexCharts from "react-apexcharts";
import { useTheme } from "@material-ui/styles";

const series = [
  {
    name: "series1",
    data: [31, 40, 28, 51, 42, 109, 100],
  },
  {
    name: "series2",
    data: [11, 32, 45, 32, 34, 52, 41],
  },
];

  const teste = [
    {
    name: "Liberado",
    data: [{
      x: "Daniel", y:"56", macro:"P01"
    },{
      x: "João", y:"21", macro:'P02'
    },{
      x: "Carlos",y:"50", macro:'P02'
    },{
      x: "Manoel",y:"30", macro:'P04'
    }]
    }, 
    {
        name: "Iniciado",
        data: [{
          x: "Daniel", y:"40", macro:"P01"
        },{
          x: "João", y:"28", macro:'P02'
        },{
          x: "Carlos",y:"35", macro:'P02'
        },{
          x: "Manoel",y:"69", macro:'P04'
        }]
        }, 
        {
            name: "Finalizado",
            data: [{
              x: "Daniel", y:"100", macro:"P01"
            },{
              x: "João", y:"25", macro:'P02'
            },{
              x: "Carlos",y:"30", macro:'P02'
            },{
              x: "Manoel",y:"42", macro:'P04'
            }]
            }, 
            {
                name: "Entregue",
                data: [{
                  x: "Daniel", y:"20", macro:"P01"
                },{
                  x: "João", y:"45", macro:'P02'
                },
                {
                  x: "Carlos",y:"30", macro:'P02'
                },{
                  x: "Manoel",y:"42", macro:'P04'
                }
                 ]
                }, 
];

export default function ApexBarChart(data) {
  var theme = useTheme();
  console.log(data.data)
  const data2 = data.data
  return (
    <ApexCharts
      options={themeOptions(theme)}
      series={data2}
      type="bar"
      height={200}
    />
  );
}

// ############################################################
function themeOptions(theme) {
  return {
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
    //   type: "datetime",
    //   categories: [
    //     "2018-09-19T00:00:00",
    //     "2018-09-19T01:30:00",
    //     "2018-09-19T02:30:00",
    //     "2018-09-19T03:30:00",
    //     "2018-09-19T04:30:00",
    //     "2018-09-19T05:30:00",
    //     "2018-09-19T06:30:00",
    //   ],
    },
    tooltip: {
    //   x: {
    //     format: "dd/MM/yy HH:mm",
    //   },
    },
    fill: {
      colors: [ '#FFCE54','#A0D568','#4FC1E8', '#AC92EB'],
    },
    //colors: [theme.palette.primary.main, theme.palette.success.main],
    chart: {
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
  };
}
