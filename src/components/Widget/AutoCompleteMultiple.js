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



 export  default function AutoCompleteMultiple(props) {
  var theme = useTheme();
  const { obra_id } = useParams();

  const [data, setData] = useState(true); //Heatmap data

  const [value, setValue] = React.useState("teste");

  //const datasort = data2.sort()

  //console.log(data)

  useEffect(() => { 
    axiosInstance.get('heatfilter/' + obra_id)
        .then(res => {             
            setData(res.data['medicoes'])
            //setValue(res.data['heat'])
            console.log(res.data)
        })
        .catch(error=>{
            console.log("Error")
        })
  }, [])

 
  return (
    <>
    <Autocomplete
        multiple
        //id="tags-standard"
        id="tags-outlined"
        options={data}
        //options={meds.map((option) => option.title)}
        //defaultValue={[meds[3].title]}
        //getOptionLabel={(option) => option}
        
        style={{ marginLeft: 20, marginBottom:10, backgroundColor: 'white' }}

        // onChange={(event, newValue) => {
        //   if (newValue) {
        //     setValue(newValue);
        //     props.changeWord(newValue)
        //     //setId(newValue.id);
        //     //setTitle(newValue.title);
        //   }}}

        

        onChange={(event, newValue) => {
          if (newValue) {
          props.changeWord(newValue)}
          // else {
          //   props.changeWord(data)
          // }
        }}

        //onChange={(event, value) => console.log(value)}

        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            //variant="standard"
            label="Selecione a Medição"
            placeholder="Escolha a Medição"
          />
        )}
      />
    </>
  );
}

  const meds = [
    {title: "M1"},
    {title: "M2"},
    {title: "M3"},
    {title: "M4"},
    {title: "M5"},
    {title: "M6"},
    {title: "M7"},
  ];


















