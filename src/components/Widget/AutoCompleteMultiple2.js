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
  const { id } = useParams();

  const [data, setData] = useState(true); //Heatmap data

  const [value, setValue] = React.useState([data]);

//   console.log(data)

//   console.log(value)
  
  
  //console.log(data)

  
  // if (value.length == 0) {
  //   setValue(data)
  // }
  //const [id, setId] = React.useState(null);
  const [name, setTitle] = React.useState(null);

  useEffect(() => { 
    axiosInstance.get('heatfilter/' + id)
        .then(res => {             
            setData(res.data['macros'])
            //setValue(res.data['heat'])
            //console.log(res.data)
        })
        .catch(error=>{
            console.log("Error")
        })
  }, [])

  //console.log([data[0]])

  //const changeWord = this.props.changeWord;

  return (
    <>
    <Autocomplete
        multiple
        //id="tags-standard"
        id="tags-outlined"
        options={data}
        //options={value.map((option) => option)}
        //options={value}
        //defaultValue={[meds[3].title]}
        //getOptionLabel={(option) => option}
        
        style={{ marginLeft: 20, marginBottom:10, backgroundColor: 'white' }}

        onChange={(event, newValue) => {
          if (newValue) {
            setValue(newValue);
            props.changeWord(newValue)
            //setId(newValue.id);
            //setTitle(newValue.title);
          }}}

        

        // onChange={(event, newValue) => {
        //   if (newValue) {
        //   props.changeWord(newValue)}
        //   // else {
        //   //   props.changeWord(data)
        //   // }
        // }}

        //onChange={(event, value) => console.log(value)}

        sx={{ width: 400 }}
        renderInput={(params) => (
          <TextField
            {...params}
            //variant="standard"
            label="Selecione o Macro"
            placeholder="Escolha o Macro"
          />
        )}
      />
    </>
  );
}

  

















