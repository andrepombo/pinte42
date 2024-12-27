import React, { useState, useEffect } from 'react';
// import { makeStyles } from '@material-ui/core/styles';

//import Avatar from 'react-avatar';
import Grid from '@material-ui/core/Grid'

import { localization }  from './localization';
import { tableIcons }  from './icons';
import Edit from '@material-ui/icons/Edit';
import Clear from '@material-ui/icons/Clear'
import { IconButton } from '@material-ui/core';
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
import { Link } from "@material-ui/core";
import { useParams } from 'react-router-dom';
import MultipleSelectCheckmarks from "../../components/Widget/MultipleSelectCheckmarks";
import AutoCompleteMultiple from "../../components/Widget/AutoCompleteMultiple";




// function validateEmail(email){
//   const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
//   return re.test(String(email).toLowerCase());
// }



const cargos = {
  Pintor:"Pintor",
  Servente:"Servente",
  "Auxiliar de Pintor":"Auxiliar de Pintor",
  "Encarregado de Obras":"Encarregado de Obras",
  Mestre:"Mestre"
}


function ColabsObra() {
  const classes = useStyles();
  const states = {
    ativo: "success",
    bla: "warning",
    demitido : "secondary",
  };

  const { obra_id } = useParams();
  const { board } = useParams();  
  console.log(obra_id)
  console.log(board)

  
  var columns = [
    //{title: "Id", field: "id", hidden: false, filtering: true},
   
    //{title: "Obra", field: "board", filtering: true, render:rowData=> <Link href={`#/app/obra/${rowData.id}/${rowData.board}`}>{rowData.board}</Link>},
    //{title: "Obra", field: "board", filtering: true, render:rowData=> <Link href={`#/app/obra/${rowData.board}/${rowData.id}`}>{rowData.board}</Link>},
    //{title: "Avatar", render: rowData => <Avatar maxInitials={1} size={40} round={true} name={rowData === undefined ? " " : rowData.nome} />  },
    //{title: "Avatar", render: rowData => <Avatar maxInitials={1} size={40} round={true} name={rowData === undefined ? " " : rowData.nome} />  },
    //{title: "naturalidade", field: "naturalidade", render: (rowData) => <Chip label={rowData.naturalidade}  classes={{root: classes[states[rowData.naturalidade.toLowerCase()]]}} /> }, 
    //{title: "Foto", field: "image", render: (rowData) => <img src={rowData.image} style={{ width: 40, borderRadius: "50%" }} />,filtering: false,},
    //{title: "First name", field: "nome"},
    //{title: "Cliente", field: "user", lookup: ordered},
    
    //{title: "Nome", field: "nome"},

    {title: "Nome", field: "nome", defaultSort:"asc", filtering: true, render:rowData=> <Link href={`#/app/colabservices/${obra_id}/${rowData.id}/${rowData.nome}`}>{rowData.nome}</Link>},
    {title: "Matricula", field: "matricula", },
    {title: "CPF", field: "cpf", },
    {title: "Cargo", field: "cargo",lookup:cargos},
    {title: "Status", field: "status", lookup: {Ativo: "Ativo", Demitido: "Demitido"}, render: (rowData) => <Chip label={rowData.status}  classes={{root: classes[states[rowData.status.toLowerCase()]]}} />  },
    
  ]
    
    
    
  //const [meddata, setMedData] = useState(""); //table data
  //const [data, setData] = useState([]); //table data

  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  //querysort = query.sort()

  const changeWord = (data5) => {
    //console.log(data5); 
    setQuery(data5)
  }

  //console.log(meddata)

  
  //for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
  
  
//   useEffect(() => { 
//     axiosInstance.get('equipedata/' + id)
//         .then(res => {               
//             setData(res.data)
//             console.log(res.data)
//         })
//         .catch(error=>{
//             console.log("Error")
//         })
//     }, [])

  useEffect(() => { 
    ///axiosInstance.get('colabdataobra/'+ obra_id) 
    axiosInstance.get(`colabdataobra/${obra_id}/?q=${query}`)
        .then(res => {               
            setData(res.data)
            console.log(res.data)
        })
    }, [query])


    // useEffect(() => {
    //   const fetchData = async () => {
    //     //const res = axiosInstance.get(`colabdataobra/${obra_id}/?q=${query}`);
    //     const res = axiosInstance.get(`colabdataobra/${obra_id}`);
    //     setData(res.data);
    //     console.log(query)
    //   };
    //   //if (query.length === 0 || query.length > 2) 
    //   fetchData();
    // }, [query]);

 
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
    
    axiosInstance.delete('deletecolab/'+oldData.id)
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
          <AutoCompleteMultiple changeWord={data => changeWord(data)}/>
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
              title={board}
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
              //   {
              //     icon: Edit,
              //     tooltip: 'Edit Data',
              //     //isFreeAction: true,
              //     onClick: (event, rowData) => 
              //       //console.log(rowData.id),
              //       <Link to={`/app/newcolab/`}>Edit</Link>,
                    
              //   },
              // ]}
              options={{
                //tableLayout: "auto",
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

export default ColabsObra;
