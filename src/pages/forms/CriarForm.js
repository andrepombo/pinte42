import React, { useState, useEffect } from 'react'
import axiosInstance from '../../axios';
//import { useNavigate } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { useHistory } from "react-router-dom";
import { Grid, } from '@material-ui/core';
import Controls from "../../components/Controls/Controls";
import { useForm, Form } from '../../components/useForm';
import MenuItem from '@mui/material/MenuItem';
import InputMask from 'react-input-mask';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//import * as employeeService from "../../services/employeeService";
import { FormControl, FormLabel, RadioGroup as MuiRadioGroup, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';

const currencies = [
    {
        value: 'Pintor',
        label: 'Pintor',
    },
    {
        value: 'Mestre',
        label: 'Mestre',
    },
    {
        value: 'Servente',
        label: 'Servente',
    },
    {
        value: 'Encarregado de Obras',
        label: 'Encarregado de Obras',
    },
    {
        value: 'Auxiliar de Pintor',
        label: 'Auxiliar de Pintor',
    },
  ];


const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
    { id: 'other', title: 'Other' },
]

const initialFValues = {
    id: 0,
    fullName: '',
    email: '',
    mobile: '',
    city: '',
    gender: 'male',
    departmentId: '',
    hireDate: new Date(),
    isPermanent: false,
}

export default function ColabForm() {

    // const validate = (fieldValues = values) => {
    //     let temp = { ...errors }
    //     if ('fullName' in fieldValues)
    //         temp.fullName = fieldValues.fullName ? "" : "This field is required."
    //     if ('email' in fieldValues)
    //         temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
    //     if ('mobile' in fieldValues)
    //         temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required."
    //     if ('departmentId' in fieldValues)
    //         temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."
    //     setErrors({
    //         ...temp
    //     })

    //     if (fieldValues == values)
    //         return Object.values(temp).every(x => x == "")
    // }

    // const {
    //     values,
    //     setValues,
    //     errors,
    //     setErrors,
    //     handleInputChange,
    //     resetForm
    // } = useForm(initialFValues, true, validate);

    //const navigate = useNavigate();

    

    // const showToastMessage = () => {
    //     toast.success('Success Notification !', {
    //         position: toast.POSITION.TOP_RIGHT
    //     });
    // };


    const initialFormData = Object.freeze({
		id :'',
        nome: '',
		cpf: '',
        matricula:'',
		//email: '',
		telefone: '',
        nascimento: '',
        cargo: '',
        status: 'Ativo',
	});

    const resetForm = () => {
        updateFormData(initialFormData);
        //setErrors({})
    }

    const [postData, updateFormData] = useState(initialFormData);
	const [postimage, setPostImage] = useState(false);
	const [fileName, setFileName] = useState("");

    const handleChange = (e) => {
		if ([e.target.name] == 'image') {
			setPostImage({
				image: e.target.files,
			});
			setFileName(e.target.files[0].name);
			console.log(e.target.files);
		}
		if ([e.target.name] == 'sobrenome') {
			updateFormData({
				...postData,
				[e.target.name]: e.target.value.trim(),
				//['slug']: slugify(e.target.value.trim()),
			});
		} else {
			updateFormData({
				...postData,
				[e.target.name]: e.target.value,
                // trim() = sem espaços
			});
		}
	};

    // function parseJwt(token) {
	// 	if (!token) { return; }
	// 	const base64Url = token.split('.')[1];
	// 	const base64 = base64Url.replace('-', '+').replace('_', '/');
	// 	return JSON.parse(window.atob(base64));
	// }
	
	// const userInfo = parseJwt(localStorage.getItem('access_token'))
	// const userID = userInfo.user_id

    const handleSubmit = (e) => {
		e.preventDefault();
		//console.log(postimage.image[0])
		let formData = new FormData();
		formData.append('nome', postData.nome);
		//formData.append('email', postData.email);
        formData.append('matricula', postData.matricula);
		formData.append('cpf', postData.cpf);
		formData.append('telefone', postData.telefone);
        formData.append('nascimento', postData.nascimento);
        formData.append('cargo', postData.cargo);
        formData.append('status', postData.status);
		// if (postimage) {
		// 	formData.append('image', postimage.image[0]);
		// }
        
		axiosInstance.post(`criarcolab/`, formData);
        toast.success('Successo!!', {
            //position: toast.POSITION.TOP_RIGHT,
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 1000,
            theme: "colored",
        });
        
		// navigate({
		// 	pathname: '/admin/',
		// });
        //setTimeout(window.location.reload, 1000)
		//window.location.reload();
	};

    // const handleSubmit = e => {
    //     e.preventDefault()
    //     if (validate()){
    //         employeeService.insertEmployee(values)
    //         resetForm()
    //     }
    // }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="nome"
                    label="Nome Completo"
                    value={postData.nome}
                    name="nome"
                    //autoComplete="nome"
                    onChange={handleChange}
                />
                {/* <TextField
                    variant="outlined"
                    //required
                    fullWidth
                    id="matricula"
                    label="Matricula"
                    name="matricula"
                    autoComplete="matricula"
                    onChange={handleChange}
                /> */}
                <InputMask
                    mask="999.999.999-99"
                    //value={this.state.phone}
                    disabled={false}
                    maskChar=" "
                    value={postData.matricula}
                    onChange={handleChange}
                    >
                    {() => <TextField  
                    variant="outlined"
                    fullWidth
                    id="matricula"
                    label="Matricula"
                    name="matricula"
                    autoComplete="matricula"
                    />}
                </InputMask>

                {/* <TextField
                    variant="outlined"
                    //required
                    fullWidth
                    id="cpf"
                    label="CPF"
                    name="cpf"
                    //autoComplete="nome"
                    onChange={handleChange}
                /> */}

                <InputMask
                    mask="999.999.999-99"
                    //value={this.state.phone}
                    disabled={false}
                    maskChar=" "
                    value={postData.cpf}
                    onChange={handleChange}
                    >
                    {() => <TextField  
                    variant="outlined"
                    fullWidth
                    id="cpf"
                    label="CPF"
                    name="cpf"
                    autoComplete="cpf"
                    />}
                </InputMask>
                <TextField
                    variant="outlined"
                    //required
                    fullWidth
                    id="telefone"
                    label="Telefone"
                    name="telefone"
                    value={postData.telefone}
                    autoComplete="telefone"
                    onChange={handleChange}
                />
                    
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        variant="outlined"
                        select
                        //required
                        fullWidth
                        id="cargo"
                        label="Cargo"
                        name="cargo"
                        value={postData.cargo}
                        //value="Pintor"
                        autoComplete="cargo"
                        onChange={handleChange}
							>
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                    </TextField>        
                    <TextField
                        variant="outlined"
                        //required
                        fullWidth
                        type="date"
                        //format="dd/mm/yyyy"
                        id="nascimento"
                        label="Data de Nascimento"
                        name="nascimento"
                        value={postData.nascimento}
                        InputLabelProps={{ shrink: true }}
                        autoComplete="nascimento"
                        onChange={handleChange}
                        />
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                id = "status"
                                name="status"
                                value={postData.status}
                                defaultValue="Ativo"
                                onChange={handleChange}
                            >
                                <FormControlLabel value="Ativo" control={<Radio />} label="Ativo" />
                                <FormControlLabel value="Demitido" control={<Radio />} label="Demitido" />
                            </RadioGroup>
                        </FormControl>

                    <div>
                        <Controls.Button
                            type="submit"
                            text="Criar" 
                            // onClick={showToastMessage}
                            // onSubmit={showToastMessage}
                            />
                            
                        <Controls.Button
                            text="Resetar"
                            color="default"
                            onClick={resetForm} 
                            />
                        <ToastContainer 
                        autoClose={1000}
                        />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}