import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { makeStyles } from '@material-ui/core/styles';
import { SingleSelect } from 'react-select-material-ui';
import Avatar from '@mui/material/Avatar';
//import Avatar from 'react-avatar';

//import Avatar from 'react-avatar';
import Grid from '@material-ui/core/Grid'

import { localization }  from './localization';
import { tableIcons }  from './icons';
// import Paper from '@material-ui/core/Paper'
import { Link } from "@material-ui/core";
import axiosInstance from '../../axios';
//

//import DateFnsUtils from "@date-io/date-fns"; // import
//import { DatePicker,KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MaterialTable from "material-table";
//import axios from 'axios'
//import Alert from '@mui/material/Alert';
// import Duplicate from '@material-ui/icons/LibraryAdd';
// import { BorderColor } from '@material-ui/icons';
// import { TableCell, Table, TableRow } from '@material-ui/core';
// import  { Chip } from "@material-ui/core";
//import moment from "moment"

// import useStyles from "./styles";
// import { Autocomplete } from '@mui/material';
// import { TextField } from '@material-ui/core';




// function validateEmail(email){
//   const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
//   return re.test(String(email).toLowerCase());
// }

function ColabEquipes() {
  // const classes = useStyles();
  // const states = {
  //   fortaleza: "success",
  //   aquiraz: "warning",
  //   natal : "secondary",
  // };

  const { id } = useParams();
  const { board } = useParams();  
  const { nome } = useParams();  
  //console.log(nome)
 
  // const [data, setData] = useState([]); //table data
  const [userdata, setDataUser] = useState([]); //table data


 

  //for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])


  var obj = userdata.reduce(function(acc, cur, i) {
    //acc[cur.id] = cur.id;
    acc[cur.nome] = cur.nome;

    return acc;
  }, {});
  
  const removeProp = '';

  const {[removeProp]: remove, ...rest } = obj;




  const ordered = Object.values(rest).sort().reduce(
    (obj, key) => { 
      obj[key] = rest[key]; 
      return obj;
    }, 
    {}
  );

  var columns = [
    //{title: "Id", field: "id", hidden: false, filtering: true},
    //{title: "Obra", field: "board", filtering: true, render:rowData=> <Link href={`#/app/obra/${rowData.id}/${rowData.board}`}>{rowData.board}</Link>},
    //{title: "Obra", field: "board", filtering: true, render:rowData=> <Link href={`#/app/obra/${rowData.board}/${rowData.id}`}>{rowData.board}</Link>},
    //{title: "Avatar", render: rowData => <Avatar maxInitials={1} size={40} round={true} name={rowData === undefined ? " " : rowData.nome} />  },
    //{title: "Avatar", render: rowData => <Avatar maxInitials={1} size={40} round={true} name={rowData === undefined ? " " : rowData.nome} />  },
    //title: "naturalidade", field: "naturalidade", render: (rowData) => <Chip label={rowData.naturalidade}  classes={{root: classes[states[rowData.naturalidade.toLowerCase()]]}} /> }, 
    //{title: "Foto", field: "image", render: (rowData) => <img src={rowData.image} style={{ width: 40, borderRadius: "50%" }} />,filtering: false,},
    //{title: "First name", field: "nome"},
    //{title: "Cliente", field: "user", lookup: ordered},
    
    {title: "Obra", field: "obra", defaultSort:"asc" },
    
    //{title: "Obra", field: "obra", filtering: true, },
    {title: "Equipe", field: "nome", render:rowData=> <Link href={`#/app/colabservices/${rowData.obra_id}/${id}/${nome}`}>{rowData.nome}</Link>},
    //{title: "Medição", field: "med",defaultSort:"asc"},

    // {title: "Obra", field: "board", },
    // {title: "Local", field: "card"},
    // {title: "Descrição", field: "checklist"},
    // {title: "Medição", field: "med",defaultSort:"desc"},
    // {title: "Equipe", field: "equipe"},
    
    
  ]

  
  
  // useEffect(() => { 
  //   axiosInstance.get('equipedata/' + id)
  //       .then(res => {               
  //           setData(res.data)
  //           console.log(res.data)
  //       })
  //       .catch(error=>{
  //           console.log("Error")
  //       })
  //   }, [])

  useEffect(() => { 
    axiosInstance.get('colabdataequipes/' + id)
        .then(res => {               
            setDataUser(res.data)
            console.log(res.data)
        })
        .catch(error=>{
            console.log("Error")
        })
    }, [])

 
  // const handleRowUpdate = (newData, oldData, resolve) => {
  //   //validation
  //   let errorList = []
  //   // if(newData.nome === ""){
  //   //   errorList.push("Please enter first name")
  //   // }
  //   // if(newData.sobrenome === ""){
  //   //   errorList.push("Please enter last name")
  //   // }
  //   // if(newData.email === "" || validateEmail(newData.email) === false){
  //   //   errorList.push("Please enter a valid email")
  //   // }

  //   //date conversion
  //   // function convert(str) {
  //   //   var date = new Date(str),
  //   //     mnth = ("0" + (date.getMonth() + 1)).slice(-2),
  //   //     day = ("0" + date.getDate()).slice(-2);
  //   //   return [date.getFullYear(), mnth, day].join("-");
  //   // }
  //   // const newNasc = convert(newData.nascimento)

  //   // function FormataStringData(data) {
  //   //   var dia  = data.split("/")[0];
  //   //   var mes  = data.split("/")[1];
  //   //   var ano  = data.split("/")[2];
    
  //   //   return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
  //   //   // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
  //   // }
  //   // const nascimento = FormataStringData(newData.nascimento)

    
    
  //   //console.log(parseInt(newData.user))

  //   //const userNew = newData.user

  //   // var str = userNew.toString();

  //   //const userNew = parseInt(newData.user)

  //   //const userNew = BigInt(newData.user)

  //   if(errorList.length < 1){
  //     let formData = new FormData();
  //     formData.append('obra', newData.obra);

  //     if (newData.pintor1 !== null) {
  //     formData.append('pintor1', newData.pintor1);}
  //     else {formData.append('pintor1', "");}

  //     if (newData.pintor2 !== null) {
  //     formData.append('pintor2', newData.pintor2);}
  //     else {formData.append('pintor2', "");}





  //     //formData.append('pintor2', newData.pintor2);

      
  //     axiosInstance.put("editequipe/" + newData.id + "/", formData)
  //     .then(res => {
  //       const dataUpdate = [...data];
  //       const index = oldData.tableData.id;
  //       dataUpdate[index] = newData;
  //       setData([...dataUpdate]);
  //       resolve()
  //       setIserror(false)
  //       setErrorMessages([])
  //     })
  //     .catch(error => {
  //       setErrorMessages(["Update failed! Server error"])
  //       setIserror(true)
  //       resolve()
        
  //     })
  //     }else{
  //       setErrorMessages(errorList)
  //       setIserror(true)
  //       resolve()

  //     }
  // }

  // const handleRowAdd = (newData, resolve) => {
  //   //validation
  //   let errorList = []
  //   if(newData.nome === undefined){
  //     errorList.push("Please enter first name")
  //   }
  //   if(newData.sobrenome === undefined){
  //     errorList.push("Please enter last name")
  //   }
  //   // if(newData.email === undefined || validateEmail(newData.email) === false){
  //   //   errorList.push("Please enter a valid email")
  //   // }

  //   function FormataStringData(data) {
  //     var dia  = data.split("/")[0];
  //     var mes  = data.split("/")[1];
  //     var ano  = data.split("/")[2];
    
  //     return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
  //     // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
  //   }
  //   const nascimento = FormataStringData(newData.nascimento)

  //   if(errorList.length < 1){ //no error
  //     let formData = new FormData();
  //     formData.append('sobrenome', newData.sobrenome);
  //     //formData.append('slug', newData.slug);
  //     formData.append('author', 1);
  //     formData.append('nome', newData.nome);
  //     formData.append('naturalidade', newData.naturalidade);
  //     formData.append('hobbies', newData.hobbies);
  //     formData.append('nascimento', nascimento);
  //     axiosInstance.post("admin/create/", formData)
  //     .then(res => {
  //       const dataToAdd = [...data];
  //       dataToAdd.push(newData);
  //       setData([...dataToAdd]);
  //       resolve()
  //       setErrorMessages([])
  //       setIserror(false)
  //     })
  //     .catch(error => {
  //       setErrorMessages(["Cannot add data. Server error!"])
  //       setIserror(true)
  //       resolve()
  //     })
  //     }else{
  //       setErrorMessages(errorList)
  //       setIserror(true)
  //       resolve()
  //     }
  //     window.location.reload();
  // }

  // const handleRowDelete = (oldData, resolve) => {
    
  //   axiosInstance.delete('admin/delete/'+oldData.id)
  //     .then(res => {
  //       const dataDelete = [...data];
  //       const index = oldData.tableData.id;
  //       dataDelete.splice(index, 1);
  //       setData([...dataDelete]);
  //       resolve()
  //     })
  //     .catch(error => {
  //       setErrorMessages(["Delete failed! Server error"])
  //       setIserror(true)
  //       resolve()
  //     })
  // }

  // const handleDuplicate = (newData,resolve) => {
  
  //   function FormataStringData(data) {
  //     var dia  = data.split("/")[0];
  //     var mes  = data.split("/")[1];
  //     var ano  = data.split("/")[2];
    
  //     return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
  //     // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
  //   }
  //   const nascimento = FormataStringData(newData.nascimento)
    
  //   let formData = new FormData();
  //   formData.append('sobrenome', newData.sobrenome);
  //   //formData.append('slug', data.slug);
  //   formData.append('author', 1);
  //   formData.append('nome', newData.nome);
  //   formData.append('nome', 'Novo');
  //   formData.append('naturalidade', newData.naturalidade);
  //   formData.append('hobbies', newData.hobbies);
  //   formData.append('nascimento', nascimento);
  //   // axiosInstance.post("admin/create/", formData)
  //   // .then(res => {
  //   //   let dataToAdd = [...data];
  //   //   dataToAdd.push(data);
  //   //   setData(dataToAdd);
  //   //   console.log(data)
  //   //   resolve()
  //   // })
  //   // .catch(error => {
  //   //   setErrorMessages(["Duplicate failed! Server error"])
  //   //   setIserror(true)
  //   //   resolve()
  //   // })
  //   //window.location.reload();
  //   console.log(formData)
  //   axiosInstance.post("admin/create/", formData)
  //     .then(res => {
  //       const dataToAdd = [...data];
  //       //console.log(newData.id)
  //       //console.log(data[0].id)
  //       //dataToAdd[index] = newData;
  //       //newData['id'] = 200;
  //       console.log(newData)
  //       dataToAdd.push(newData);
  //       setData([...dataToAdd]);
  //       //resolve()
  //       setErrorMessages([])
  //       setIserror(false)
  //     })
  //     .catch(error => {
  //       setErrorMessages(["Cannot add data. Server error!"])
  //       setIserror(true)
  //       //resolve()
  //     })
  //     window.location.reload();
  // };

  return (
    <div className="App">
      <Grid container spacing={1}>
          <Grid item xs={1}></Grid>
          <Grid item xs={12}>
          {/* <div>
            {iserror && 
              <Alert severity="error">
                  {errorMessages.map((msg, i) => {
                      return <div key={i}>{msg}</div>
                  })}
              </Alert>
            }       
          </div> */}
            <MaterialTable
              title="Obras e Equipes"
              localization={localization}
              columns={columns}
              data={userdata}
              icons={tableIcons}
              // components={{
              //   Toolbar: (props) => (
              //     <div
              //       style={{
              //         display: "flex",
              //         justifyContent: "flex-end",
              //         //alignItems: "center"
              //       }}
              //     >
              //       <div style={{ width: "200rem" }}>
              //         <MTableToolbar {...props} />
              //         <Grid style={{padding:15, marginLeft:10}}>
              //           <Button
              //             style={{ height: "fit-content" }}
              //             color="primary"
              //             variant="contained"
              //         >
              //           Test
              //         </Button>
              //         </Grid>
              //       </div>
              //     </div>
              //   ),
              //   Container: (props) => <Paper {...props} elevation={8} />
              // }}
              // actions={[
              //   // {
              //   //   icon: Refresh,
              //   //   tooltip: 'Refresh Data',
              //   //   isFreeAction: true,
              //   //   onClick: () => this.tableRef.current.onQueryChange()
              //   // },
              //   {
              //     icon: Duplicate,
              //     tooltip: 'Duplicar',
              //     //onClick: (event, rowData) => console.log(rowData)
              //     onClick: (event,newData) =>
              //       new Promise((resolve) => {
              //         handleDuplicate(newData, resolve)
              //     }),
              //   },
              // ]}
              options={{
                tableLayout: "auto",
                sorting: true, search: true,
                padding:"dense",
                searchFieldAlignment: "right", searchAutoFocus: true, searchFieldVariant: "standard",
                filtering: true, paging: true, pageSizeOptions: [2, 5, 10, 20, 25, 50, 100], pageSize: 10,
                paginationType: "stepped",  exportButton: true,
                actionsColumnIndex: -1,
                exportAllData: true, exportFileName: "TableData", addRowPosition: "first",  
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
              editable={{
                // onRowUpdate: (newData, oldData) =>
                //   new Promise((resolve) => {
                //       handleRowUpdate(newData, oldData, resolve);
                //   }),
                // onRowAdd: (newData) =>
                //   new Promise((resolve) => {
                //     handleRowAdd(newData, resolve)
                //   }),
                // onRowDelete: (oldData) =>
                //   new Promise((resolve) => {
                //     handleRowDelete(oldData, resolve)
                //   }),
              }}
            />
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
    </div>
  );
}

export default ColabEquipes;
