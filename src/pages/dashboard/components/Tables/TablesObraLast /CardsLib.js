import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { Link } from "@material-ui/core";

//import Avatar from 'react-avatar';
import Grid from '@material-ui/core/Grid'

import { localization }  from '../localization';
import { tableIcons }  from '../icons';
// import Paper from '@material-ui/core/Paper'
// import { Button } from "@material-ui/core";
import axiosInstance from '../../../../../axios';

//import DateFnsUtils from "@date-io/date-fns"; // import
//import { DatePicker,KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MaterialTable from "material-table";
//import axios from 'axios'
//import Alert from '@mui/material/Alert';
// import Duplicate from '@material-ui/icons/LibraryAdd';
// import RefreshIcon from '@material-ui/icons/Refresh';
// import { BorderColor, TrendingUp, TurnedIn } from '@material-ui/icons';
// import { TableCell, Table, TableRow } from '@material-ui/core';
import  { Chip } from "@material-ui/core";
//import moment from "moment"

import useStyles from "../styles";
// import { Autocomplete } from '@mui/material';
// import { TextField } from '@material-ui/core';



// function validateEmail(email){
//   const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
//   return re.test(String(email).toLowerCase());
// }

function CardsLast() {
  const classes = useStyles();
  const states = {
    complete: "success",
    aquiraz: "warning",
    incomplete: "secondary",
  };

  const [data, setData] = useState([]); //table data

  var obj = data.reduce(function(acc, cur, i) {
    acc[cur.equipe] = cur.equipe;

    return acc;
  }, {});
  
  const removeProp = '';

  const { [removeProp]: remove, ...rest } = obj;


  const ordered = Object.values(rest).sort().reduce(
    (obj, key) => { 
      obj[key] = rest[key]; 
      return obj;
    }, 
    {}
  );

  var obj2 = data.reduce(function(acc, cur, i) {
    acc[cur.med] = cur.med;

    return acc;
  }, {});
  
  

  const removeProp2 = '';

  const { [removeProp2]: remove2, ...rest2 } = obj2;


  const ordered2 = Object.values(rest2).sort().reduce(
    (obj, key) => { 
      obj[key] = rest2[key]; 
      return obj;
    }, 
    {}
  );

  var columns = [
    //{title: "Code", field: "code", hidden:true},
    {title: "Obra", field: "board",hidden:true},
    {title: "LocalCode", field: "local",hidden:true},
    {title: "Local", field: "card",render:rowData=> <Link href={`${rowData.cardUrl}`} target="_blank">{rowData.card}</Link>},
    //{title: "Atualizado", field: "cardActive",hidden:true},
    {title: "Pacote", field: "pacote",hidden:true},
    {title: "Descrição", field: "checklist"},
    
    {title: "Item1", field: "item1",hidden:true},
    {title: "Item1_status", field: "i1_status", hidden:true, lookup: {complete: "complete", incomplete: "incomplete"},  
    render: (rowData) => <Chip label={rowData.i1_status}  classes={{root: classes[states[rowData.i1_status.toLowerCase()]]}} />  },
    {title: "Item1_Data_Usuário", field: "i1_data",hidden:true},
    {title: "Item1_Usuário", field: "i1_user", hidden:true},
    {title: "Data", field: "i1_date_auto",type: "date", render: rowData => moment(rowData.i1_date_auto).format('DD/MM/YYYY')},
    
    {title: "Item2", field: "item2",hidden:true},
    {title: "Item2_status", field: "i2_status", hidden:true, lookup: {complete: "complete", incomplete: "incomplete"},  
    render: (rowData) => <Chip label={rowData.i2_status}  classes={{root: classes[states[rowData.i2_status.toLowerCase()]]}} />  },
    {title: "Item2_Data_Usuário", field: "i2_data",hidden:true},
    {title: "Item2_Usuário", field: "i2_user", hidden:true},
    {title: "Item2_Data_Auto", field: "i2_date_auto",hidden:true},
  
    {title: "Item3", field: "item3",hidden:true},
    {title: "Item3_status", field: "i3_status", hidden:true,lookup: {complete: "complete", incomplete: "incomplete"},  
    render: (rowData) => <Chip label={rowData.i3_status}  classes={{root: classes[states[rowData.i3_status.toLowerCase()]]}} />  },
    {title: "Item3_Data_Usuário", field: "i3_data",hidden:true},
    {title: "Item3_Usuário", field: "i3_user", hidden:true},
    {title: "Item3_Data_Auto", field: "i3_date_auto",hidden:true},

    {title: "Item4", field: "item4",hidden:true},
    {title: "Item4_status", field: "i4_status",hidden:true},
    {title: "Medição", field: "med", lookup: ordered2, hidden:true},
    {title: "Item4_Usuário", field: "i4_user", hidden:true},
    {title: "Item4_Data_Auto", field: "i4_date_auto",hidden:true},

    {title: "Item5", field: "item5",hidden:true},
    {title: "Item5_status", field: "i5_status", hidden:true, lookup: {complete: "complete", incomplete: "incomplete"},  
    render: (rowData) => <Chip label={rowData.i5_status}  classes={{root: classes[states[rowData.i5_status.toLowerCase()]]}} />  },
    {title: "Equipe", field: "equipe", lookup: ordered},
    {title: "Item5_Usuário", field: "i5_user", hidden:true},
    {title: "Item5_Data_Auto", field: "i5_date_auto",hidden:true},

    {title: "Link", field: "cardUrl",hidden:true},
  ]  


  const { id } = useParams();
  const { board } = useParams();
  // console.log(columns[7]['field'])
  // console.log(columns)


  //for error handling
  // const [iserror, setIserror] = useState(false)
  // const [errorMessages, setErrorMessages] = useState([])
  
  
  useEffect(() => { 
    axiosInstance.get('carddataobra/' + id + "/" + columns[6]['field']) 
        .then(res => {               
            setData(res.data)
            //console.log(res.data)
        })
        .catch(error=>{
            console.log("Error")
        })
    }, [])


  return (
    <div className="App">
      <Grid container spacing={1}>
          <Grid item xs={1}></Grid>
          <Grid item xs={12}>
            <MaterialTable
              //title= {'Últimos 5 ' + columns[8]["title"] + 's'}
              title= {'Últimos 5 Liberados'}
              localization={localization}
              columns={columns}
              data={data}
              icons={tableIcons}
              options={{
                //tableLayout: "auto",
                sorting: true, search: false,
                padding:"dense",
                searchFieldAlignment: "right", searchAutoFocus: true, searchFieldVariant: "standard",
                filtering: false, paging: false, pageSizeOptions: [5, 8, 10, 15, 25, 50, 100], pageSize: 5,
                paginationType: "stepped",  exportButton: true,
                actionsColumnIndex: -1,
                exportAllData: true, exportFileName: board + '_' + moment().format('DD-MM-YYYYTHH-mm'), addRowPosition: "first",  
                showFirstLastPageButtons: true,
                //selection: true,
                //paginationPosition: "both",
                // showSelectAllCheckbox: true, showTextRowsSelected: true, selectionProps: rowData => ({
                //   disabled: rowData.age == null,
                //   color:"primary"
                // }),
                // grouping: true, 
                columnsButton: true,
                rowStyle: (data, index) => index % 2 === 0 ? { background: "#f5f5f5" } : null,
                //headerStyle: { background: "#ffc6c4",color: "#f90000aa"}
              }}
            />
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
    </div>
  );
}

export default CardsLast;
