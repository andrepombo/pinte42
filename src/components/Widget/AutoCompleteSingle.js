import React, { useState, useEffect } from 'react';
import { useTheme } from "@material-ui/styles";
import axiosInstance from '../../axios';
import { useParams } from 'react-router-dom';


import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


import CircularProgress from '@mui/material/CircularProgress';

import {
  Grid,
  // LinearProgress,
  // Select,
  // OutlinedInput,
  // MenuItem,
  Button
} from "@material-ui/core";



 export  default function AutoCompleteCustom(props) {
  var theme = useTheme();
  const { id } = useParams();
 
  
  const [data, setData] = useState(true); //Heatmap data

  const [value, setValue] = React.useState(data);

  if (value.length == 0) {
    setValue(data)
  }

  // console.log(value4)


  //const [id, setId] = React.useState(null);
  const [name, setTitle] = React.useState(null);

 
  useEffect(() => { 
    
    axiosInstance.get('graphsdata/' + id)
        .then(res => {             
            setData(res.data['heat'])
            setValue(res.data['heat'])
            //console.log(res.data['heat'])
        })
        .catch(error=>{
            console.log("Error")
        })
  }, [])

  return (
    <>
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={info}
      onChange={(event, newValue) => {
        if (newValue) {
        props.changeInside(newValue)}
        // else {
        //   props.changeWord(data)
        // }
      }}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Movie" />}
    />
    </>
  );
}


const info = [
    { label: 'Equipe', info: 'eq' },
    { label: 'Medição', info: 'med' }]

















