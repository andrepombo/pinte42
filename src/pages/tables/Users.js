import React, { useState, useEffect } from 'react';
// import { makeStyles } from '@material-ui/core/styles';

//import Avatar from 'react-avatar';
import Grid from '@material-ui/core/Grid'

import { localization }  from './localization';
import { tableIcons }  from './icons';
// import Paper from '@material-ui/core/Paper'
// import { Button, Link } from "@material-ui/core";
import axiosInstance from '../../axios';

//import DateFnsUtils from "@date-io/date-fns"; // import
//import { DatePicker,KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MaterialTable from "material-table";
//import axios from 'axios'
//import Alert from '@mui/material/Alert';
// import Duplicate from '@material-ui/icons/LibraryAdd';
// import { BorderColor } from '@material-ui/icons';
// import { TableCell, Table, TableRow } from '@material-ui/core';
import  { Chip } from "@material-ui/core";
//import moment from "moment"

import useStyles from "./styles";
// import { Autocomplete } from '@mui/material';
// import { TextField } from '@material-ui/core';




// function validateEmail(email){
//   const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
//   return re.test(String(email).toLowerCase());
// }

function Users() {
  const classes = useStyles();
  const states = {
    sim: "success",
    bla: "warning",
    não : "secondary",
  };

  
  var columns = [
    //{title: "Id", field: "id", hidden: false, filtering: true, defaultSort:"desc"},
    //{title: "Email", field: "e", filtering: true, render:rowData=> <Link href={`#/app/cards/${rowData.id}/${rowData.board}`}>{rowData.board}</Link>},
    //{title: "Avatar", render: rowData => <Avatar maxInitials={1} size={40} round={true} name={rowData === undefined ? " " : rowData.user} />  },
    //title: "naturalidade", field: "naturalidade", render: (rowData) => <Chip label={rowData.naturalidade}  classes={{root: classes[states[rowData.naturalidade.toLowerCase()]]}} /> }, 
    //{title: "Foto", field: "image", render: (rowData) => <img src={rowData.image} style={{ width: 40, borderRadius: "50%" }} />,filtering: false,},
    //{title: "First name", field: "nome"},
    {title: "Usuário", field: "user_name"},
    {title: "Email", field: "email"},
    {title: "Admin", field: "is_staff", lookup: {Sim: "Sim", Não: "Não"},
    render: (rowData) => <Chip label={rowData.is_staff}  classes={{root: classes[states[rowData.is_staff.toLowerCase()]]}} />  },
    //{title: "Nascimento", field: "nascimento", type: "date", dateSetting: { locale: "pt-BR"}}, 
    //{title: "Nascimento", field: "nascimento", type: "date", dateSetting: {format: 'dd/MM/yyyy'}, render: rowData => moment(rowData.nascimento).format('DD/MM/YYYY')},
    //{title: "Nascimento", field: "nascimento", render: rowData => moment(rowData.nascimento).format('YYYY/MM/DD')},
    //{title: "Nascimento", field: "nascimento", type: "date", dateSetting: {format: 'dd/MM/yyyy'}},
    // {title: "Checklist", field: "checklist", width: "20%"},
    
    // {title: "Item2", field: "item2", width: "20%"},

    // {title: "Naturalidade", field: "naturalidade", lookup: { Aquiraz: "Aquiraz", Fortaleza: "Fortaleza", Natal: "Natal" }, width: "20%",  
    // render: (rowData) => <Chip label={rowData.naturalidade}  classes={{root: classes[states[rowData.naturalidade.toLowerCase()]]}} />  },
    //{title: "hobbies", field: "hobbies", filterPlaceholder:"Procurar", width: "80%" },
    //{title: "email", field: "email"}
  ]

  const [data, setData] = useState([]); //table data

  //for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
  
  
  useEffect(() => { 
    axiosInstance.get('userdata/')
        .then(res => {               
            setData(res.data)
            console.log(res.data)
        })
        .catch(error=>{
            console.log("Error")
        })
    }, [])

 
  // const handleRowUpdate = (newData, oldData, resolve) => {
  //   //validation
  //   let errorList = []
  //   if(newData.nome === ""){
  //     errorList.push("Please enter first name")
  //   }
  //   if(newData.sobrenome === ""){
  //     errorList.push("Please enter last name")
  //   }
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

  //   function FormataStringData(data) {
  //     var dia  = data.split("/")[0];
  //     var mes  = data.split("/")[1];
  //     var ano  = data.split("/")[2];
    
  //     return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
  //     // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
  //   }
  //   const nascimento = FormataStringData(newData.nascimento)

  //   if(errorList.length < 1){
  //     let formData = new FormData();
  //     formData.append('sobrenome', newData.sobrenome);
  //     //formData.append('slug', newData.slug);
  //     formData.append('author', 1);
  //     formData.append('nome', newData.nome);
  //     formData.append('naturalidade', newData.naturalidade);
  //     formData.append('hobbies', newData.hobbies);
  //     //console.log(newData.nascimento)
  //     formData.append('nascimento', nascimento);
  //     axiosInstance.put("admin/edit/" +newData.id + "/", formData)
  //     .then(res => {
  //       const dataUpdate = [...data];
  //       const index = oldData.tableData.id;
  //       //console.log(oldData)
  //       //console.log(data[0].id)
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

  const handleRowDelete = (oldData, resolve) => {
    
    axiosInstance.delete('deleteuser/'+oldData.id)
      .then(res => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve()
      })
      .catch(error => {
        setErrorMessages(["Delete failed! Server error"])
        setIserror(true)
        resolve()
      })
  }

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
              title="Usuários"
              localization={localization}
              columns={columns}
              data={data}
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
                //tableLayout: "auto",
                sorting: true, search: true,
                padding:"dense",
                searchFieldAlignment: "right", searchAutoFocus: true, searchFieldVariant: "standard",
                filtering: true, paging: true, pageSizeOptions: [2, 5, 10, 20, 25, 50, 100], pageSize: 5,
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
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    handleRowDelete(oldData, resolve)
                  }),
              }}
            />
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
    </div>
  );
}

export default Users;
