import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { Link } from 'react-router-dom';
import {
  Grid,
  LinearProgress,
  Select,
  OutlinedInput,
  MenuItem,
  Button
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  LineChart,
  Line,
  Area,
  PieChart,
  Pie,
  Cell,
  YAxis,
  XAxis,
  Tooltip
} from "recharts";
import {useParams } from 'react-router-dom';

// styles
import useStyles from "./styles";

// components
import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Typography } from "../../components/Wrappers/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import TableObraLast from "./components/Tables/TablesObraLast /TableObraLast.js";

//import BigStat from "./components/BigStat/BigStat";
import ApexHeatmap from "./components/Charts/ApexHeatmap";
import ApexBars from "./components/Charts/ApexBars";
import ApexLineColabs from "./components/Charts/ApexLineColabs";
import AutoCompleteCustom from "../../components/Widget/AutoCompleteMultiple";
import TextField from '@mui/material/TextField';


export default function Dashboard2(props) {
  var classes = useStyles();
  var theme = useTheme();
  
  
  const { board } = useParams();
  const { id } = useParams();

  //console.log(board)



  // local
  const [data_update, setDataUpdate] = useState([]); //table data
  
  const [data, setData] = useState(true); //Heatmap data
  
  const [PieData, setPieData] = useState([]); 

  const [UsersData, setUsersData] = useState([]); 
  
  const [macros, setMacros] = useState([]); //Heatmap data

  
  
  // if (macros.length === 0) {
  //   setData2(value)
  // }

  //const teste1= ['teste']

  const user = {
    data: macros
  };
  
  // const roles2 = [{
  //   name: "P01",
  //   data: [{
  //     x: "group1", y:"1", macro:"P01"
  //   },{
  //     x: "group2", y:"1", macro:'P02'
  //   },{
  //     x: "group3",y:"1", macro:'P02'
  //   },{
  //     x: "group4",y:"1", macro:'P04'
  //   }]
  // }, {
  //   name: "P02",
  //   data: [{
  //     x: "group1",  y:"1",  macro:"P04"
  //   },{
  //     x: "group2",y:"1", macro:'P02'
  //   },{
  //     x: "group3",y:"1", macro:'P04'
  //   } ,{
  //     x: "group4",y:"1", macro:'P04'
  //   }]
  // }, {
  //   name: "P03",
  //   data: [{
  //     x: "group1",  y:"1", macro:'P01'
  //   }, {
  //     x: "group2",  y:"1", macro:"P01"
  //   },{
  //     x: "group3",y:"1", macro:'P02'
  //   },{
  //     x: "group4",y:"1", macro:'P04'
  //   }]
  // },{
  //   name: "P04",
  //   data: [{
  //     x: "group1", y:"1", macro:'P03'
  //   }, {
  //     x: "group2",  y:"1", macro:'P03'
  //   },{
  //     x: "group3",y:"1", macro:'P03'
  //   },{
  //     x: "group4",y:"1", macro:'P03'
  //   }]
  // }];

 

var invalidEntries = 0;

 function checkD(data) {
  if (user.data.includes(data.macro)) {
    return true;
  } else {
    data = {'x':data.x, "y": data.y}
    return false;
  }
}  

  useEffect(() => { 
    axiosInstance.get(`graphsdata/${id}/?q=${macros}`)
    
        .then(res => {             
            setPieData(res.data['pie'])
            setData(res.data['heat'])
            setUsersData(res.data['users'])
            console.log(res.data)
            
        })    
  }, [macros])

  useEffect(() => { 
    axiosInstance.get('update/')
        .then(res => {               
            setDataUpdate(res.data[0]['last_update'])
        })
        .catch(error=>{
            console.log("Error")
        })
    }, [])

    var date = new Date(data_update)
    const dateF = date.toLocaleString("pt-BR")
    
  return (
    <>
      <PageTitle title={board} time = {'Última Sincronização: ' + dateF}  button={<>
      <Button
        component={Link} to={'/app/equipes/' + board + "/" + id}
        variant="contained"
        style={{ fontWeight: 'bold'}}
        size="large"
        color="secondary"
        
      >
          Equipes
      </Button>

      <Button
        component={Link} to={'/app/colabsobra/' + board + "/" + id}
        variant="contained"
        style={{ fontWeight: 'bold', marginLeft:"10px"}}
        size="large"
        color="secondary"
        
      >
        Produção
      </Button>
      
      <Button
        component={Link} to={'/app/cardobra/' + board + '/' + id}
        variant="contained"
        style={{ fontWeight: 'bold', marginLeft:"10px"}}
        size="large"
        color="secondary"
        
      >
        Tabela de Dados
      </Button>
      
      </>} />
      
      <Grid container spacing={4}>

        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Widget
            title="Colaboradores (Teste)"
            upperTitle
            disableWidgetMenu
            disableWidgetAutoCompleteMultiple2
            //bodyClass={classes.fullHeightBody}
            bodyClass={classes.tableOverflow}
            className={classes.card}
          >
            <ApexLineColabs/>
          </Widget>
        </Grid>
        
        {/* <Grid item lg={4} md={4} sm={6} xs={12}>
          <Widget
            title="Colaboradores na Obra (Teste)"
            upperTitle
            disableWidgetMenu
            disableWidgetAutoCompleteMultiple2
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>
              <Grid container item alignItems={"center"}>
                <Grid item xs={6}>
              <Typography size="xl" weight="medium" noWrap>
                15
              </Typography>
                </Grid>
                <Grid item xs={6}>
              <LineChart
                width={100}
                height={30}
                data={[
                  { value: 10 },
                  { value: 15 },
                  { value: 10 },
                  { value: 17 },
                  { value: 18 },
                ]}
              >
                <Line
                  type="natural"
                  dataKey="value"
                  stroke={theme.palette.success.main}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
                </Grid>
              </Grid>
            </div>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                  Registros
                </Typography>
                <Typography size="md">34</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                  Sign Out
                </Typography>
                <Typography size="md">32</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                  Rate
                </Typography>
                <Typography size="md">3.25%</Typography>
              </Grid>
            </Grid>
          </Widget>
        </Grid> */}

        <Grid item lg={4} md={8} sm={6} xs={12}>
          {/* <Widget
            title="Supervisores (Teste)"
            upperTitle
            disableWidgetMenu
            disableWidgetAutoCompleteMultiple2
            className={classes.card}
            //bodyClass={classes.fullHeightBody}
            bodyClass={classes.tableOverflow}
          >
            <ApexBars data={UsersData}/>
          </Widget> */}
        </Grid>

        {/* <Grid item lg={4} md={8} sm={6} xs={12}>
          <Widget
            title="Top 3 Medições"
            upperTitle
            disableWidgetMenu
            disableWidgetAutoCompleteMultiple2
            className={classes.card}
            bodyClass={classes.fullHeightBody}
          >
            <div className={classes.performanceLegendWrapper}>
              <div className={classes.legendElement}>
                <Dot color="warning" />
                <Typography
                  color="text"
                  colorBrightness="secondary"
                  className={classes.legendElementText}
                >
                  Med.1
                </Typography>
              </div>
              <div className={classes.legendElement}>
                <Dot color="primary" />
                <Typography
                  color="text"
                  colorBrightness="secondary"
                  className={classes.legendElementText}
                >
                  Med.3
                </Typography>
              </div>
            </div>
            <div className={classes.progressSection}>
              <Typography
                size="14px"
                color="text"
                colorBrightness="scondary"
                className={classes.progressSectionTitle}
              >
                Med. 1
              </Typography>
              <LinearProgress
                variant="determinate"
                value={20}
                classes={{ barColorPrimary: classes.progressBarSuccess }}
                className={classes.progress}
              />
            </div>
            <div className={classes.progressSection}>
              <Typography
                size="14px"
                color="text"
                colorBrightness="secondary"
                className={classes.progressSectionTitle}
              >
                Med. 3
              </Typography>
              <LinearProgress
                variant="determinate"
                value={50}
                classes={{ barColorPrimary: classes.progressBarWarning }}
                className={classes.progress}
              />
            </div>
            
            <div>
              <Typography
                size="14px"
                color="text"
                colorBrightness="secondary"
                className={classes.progressSectionTitle}
              >
                Med. 5
              </Typography>
              <LinearProgress
                variant="determinate"
                value={15}
                classes={{ barColorPrimary: classes.progressBarDanger }}
                className={classes.progress}
              />
            </div>
          </Widget>
        </Grid> */}


        {/* <Grid item lg={3} md={8} sm={6} xs={12}>
          <Widget
            title="Consumo Material"
            upperTitle
            className={classes.card}
            bodyClass={classes.fullHeightBody}
          >
            <div className={classes.serverOverviewElement}>
              <Typography
                size="40px"
                color="text"
                colorBrightness="secondary"
                className={classes.serverOverviewElementText}
                noWrap
              >
                Selador 80% 
              </Typography>
              <div className={classes.serverOverviewElementChartWrapper}>
                <ResponsiveContainer height={50} width="99%">
                  <AreaChart data={getRandomData(10)}>
                    <Area
                      type="natural"
                      dataKey="value"
                      stroke={theme.palette.secondary.main}
                      fill={theme.palette.secondary.light}
                      strokeWidth={2}
                      fillOpacity="0.25"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className={classes.serverOverviewElement}>
              <Typography
                size="40px"
                color="text"
                colorBrightness="secondary"
                className={classes.serverOverviewElementText}
                noWrap
              >
                Massa 74% 
              </Typography>
              <div className={classes.serverOverviewElementChartWrapper}>
                <ResponsiveContainer height={50} width="99%">
                  <AreaChart data={getRandomData(10)}>
                    <Area
                      type="natural"
                      dataKey="value"
                      stroke={theme.palette.primary.main}
                      fill={theme.palette.primary.light}
                      strokeWidth={2}
                      fillOpacity="0.25"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className={classes.serverOverviewElement}>
              <Typography
                size="400px"
                color="text"
                colorBrightness="secondary"
                className={classes.serverOverviewElementText}
                noWrap
              >
                Tinta 57% 
              </Typography>
              <div className={classes.serverOverviewElementChartWrapper}>
                <ResponsiveContainer height={50} width="99%">
                  <AreaChart data={getRandomData(10)}>
                    <Area
                      type="natural"
                      dataKey="value"
                      stroke={theme.palette.warning.main}
                      fill={theme.palette.warning.light}
                      strokeWidth={2}
                      fillOpacity="0.25"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Widget>
        </Grid> */}
        
        {/* <Grid item lg={4} md={4} sm={6} xs={12}>
          <Widget title="Status Unidades" upperTitle className={classes.card}>
                <ApexPie/>
          </Widget>
        </Grid> */}
      
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Widget title="Status Unidades" upperTitle disableWidgetMenu
            disableWidgetAutoCompleteMultiple2 className={classes.card}>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <ResponsiveContainer width="100%" height={144}>
                  <PieChart>
                    <Pie
                      data={PieData}
                      innerRadius={28}
                      outerRadius={50}
                      dataKey="value"
                      cx="50%"
                    >
                      {PieData.reverse().map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={theme.palette[entry.color].main}
                          //fill={theme.palette[entry.color]}
                          //fill = {entry.color}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.pieChartLegendWrapper}>
                  {PieData.map(({ name, value, color }, index) => (
                    <div key={color} className={classes.legendItemContainer}>
                      <Dot color={color} />
                      <Typography style={{ whiteSpace: "nowrap", fontSize: 14 }} >
                        &nbsp;{name}&nbsp;
                      </Typography>
                      <Typography color="text" colorBrightness="secondary" >
                        &nbsp;{value}
                      </Typography>
                    </div>
                  ))}
                </div>
              </Grid>
            </Grid>
          </Widget>
        </Grid>


        {/* <Grid item xs={12}>
          <Widget
            bodyClass={classes.mainChartBody}
            header={
              <div className={classes.mainChartHeader}>
                <Typography
                  variant="h5"
                  color="text"
                  colorBrightness="secondary"
                >
                  Daily Line Chart
                </Typography>
                <div className={classes.mainChartHeaderLabels}>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="warning" />
                    <Typography className={classes.mainChartLegentElement}>
                      Tablet
                    </Typography>
                  </div>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="primary" />
                    <Typography className={classes.mainChartLegentElement}>
                      Mobile
                    </Typography>
                  </div>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="secondary" />
                    <Typography className={classes.mainChartLegentElement}>
                      Desktop
                    </Typography>
                  </div>
                </div>
                <Select
                  value={mainChartState}
                  onChange={e => setMainChartState(e.target.value)}
                  input={
                    <OutlinedInput
                      labelWidth={0}
                      classes={{
                        notchedOutline: classes.mainChartSelectRoot,
                        input: classes.mainChartSelect,
                      }}
                    />
                  }
                  autoWidth
                >
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                </Select>
              </div>
            }
          >
            <ResponsiveContainer width="100%" minWidth={500} height={350}>
              <ComposedChart
                margin={{ top: 0, right: -15, left: -15, bottom: 0 }}
                data={mainChartData}
              >
                <YAxis
                  ticks={[0, 2500, 5000, 7500]}
                  tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                  stroke={theme.palette.text.hint + "80"}
                  tickLine={false}
                />
                <XAxis
                  tickFormatter={i => i + 1}
                  tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                  stroke={theme.palette.text.hint + "80"}
                  tickLine={false}
                />
                <Area
                  type="natural"
                  dataKey="desktop"
                  fill={theme.palette.background.light}
                  strokeWidth={0}
                  activeDot={false}
                />
                <Line
                  type="natural"
                  dataKey="mobile"
                  stroke={theme.palette.primary.main}
                  strokeWidth={2}
                  dot={false}
                  activeDot={false}
                />
                <Line
                  type="linear"
                  dataKey="tablet"
                  stroke={theme.palette.warning.main}
                  strokeWidth={2}
                  dot={{
                    stroke: theme.palette.warning.dark,
                    strokeWidth: 2,
                    fill: theme.palette.warning.main,
                  }}
                />
                <Tooltip />
              </ComposedChart>
            </ResponsiveContainer>
          </Widget>
        </Grid> */}


        {/* <Grid item xs={3}>
          <AutoCompleteCustom/>
        </Grid> */}

        <Grid item xs={12}>
          <Widget  title="Unidades" upperTitle disableWidgetMenu  bodyClass={classes.tableOverflow}
            setMacros={setMacros}> 
            <ApexHeatmap  data2={data}/>
          </Widget>
        </Grid>

        {/* {mock.bigStat.map(stat => (
          <Grid item md={4} sm={6} xs={12} key={stat.product}>
            <BigStat {...stat} />
          </Grid>
        ))} */}

      <Grid item lg={6} md={8} sm={6} xs={12}>
          <Widget
            title="Atividade Supervisores"
            upperTitle
            disableWidgetMenu
            disableWidgetAutoCompleteMultiple2
            className={classes.card}
            //bodyClass={classes.fullHeightBody}
            bodyClass={classes.tableOverflow}
          >
            <ApexBars data={UsersData}/>
          </Widget>
        </Grid>
        <Grid item xs={12}>
            <TableObraLast/>
        </Grid>
        
        {/* <Grid item xs={12}>
            <Table/>
        </Grid> */}
      </Grid>
    </>
  );
}




// #######################################################################
// function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
//   var array = new Array(length).fill();
//   let lastValue;

//   return array.map((item, index) => {
//     let randomValue = Math.floor(Math.random() * multiplier + 1);

//     while (
//       randomValue <= min ||
//       randomValue >= max ||
//       (lastValue && randomValue - lastValue > maxDiff)
//     ) {
//       randomValue = Math.floor(Math.random() * multiplier + 1);
//     }

//     lastValue = randomValue;

//     return { value: randomValue };
//   });
// }

// function getMainChartData() {
//   var resultArray = [];
//   var tablet = getRandomData(31, 3500, 6500, 7500, 1000);
//   var desktop = getRandomData(31, 1500, 7500, 7500, 1500);
//   var mobile = getRandomData(31, 1500, 7500, 7500, 1500);

//   for (let i = 0; i < tablet.length; i++) {
//     resultArray.push({
//       tablet: tablet[i].value,
//       desktop: desktop[i].value,
//       mobile: mobile[i].value,
//     });
//   }

//   return resultArray;
// }
