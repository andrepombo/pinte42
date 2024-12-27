import React, { useState, useEffect } from 'react'
import axiosInstance from '../../axios';
//import { useNavigate } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { useHistory } from "react-router-dom";
import { Grid, } from '@material-ui/core';
import Controls from "../../components/Controls/Controls";
import { useForm, Form } from '../../components/useForm';
import { useNavigate, useParams } from 'react-router-dom';
import { FormControl, FormLabel, RadioGroup as MuiRadioGroup, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import MenuItem from '@mui/material/MenuItem';
import InputMask from 'react-input-mask';


//import * as employeeService from "../../services/employeeService";

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

export default function EquipeForm() {

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
    const history = useHistory()
    const { id } = useParams();
    const { equipe } = useParams();
    const { obra_id } = useParams();


    console.log(obra_id)
    console.log(equipe)

    const initialFormData = Object.freeze({
		pintor1:'',
        pintor2:'',
        pintor3:'',
        pintor4:''
	});

    //const id2 = '6308fa56ecf932015119559d'
    

    const [postData, updateFormData] = useState(initialFormData);
	const [postimage, setPostImage] = useState(false);
	const [fileName, setFileName] = useState("");


    useEffect(() => {
		axiosInstance.get(`equipedatadetail/${obra_id}/${equipe}`)
        .then((res) => {
			updateFormData({
				...postData,
				['pintor1']: res.data.pintor1,
                ['pintor2']: res.data.pintor2,
                ['pintor3']: res.data.pintor3,
                ['pintor4']: res.data.pintor4,
				
			});
			console.log(res.data);
		});
	}, [updateFormData]);

    

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


    const handleChange2 = (event) => {
        console.log(event.target.value)
        updateFormData(event.target.value);
      };

    const handleSubmit = (e) => {
		e.preventDefault();
		console.log(postData)
		let formData = new FormData();
		formData.append('nome', postData.nome);
		//formData.append('email', postData.email);
        //formData.append('matricula', postData.matricula);
		formData.append('cpf', postData.cpf);
		formData.append('telefone', postData.telefone);
        formData.append('nascimento', postData.nascimento);
        formData.append('cargo', postData.cargo);
        formData.append('status', postData.status);
		// if (postimage) {
		// 	formData.append('image', postimage.image[0]);
		// }
		axiosInstance.put(`editcolab/` + id + '/', formData);
		history.push({
			pathname: '/app/colaboradores/',
		});
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
                    label="Membro 1"
                    name="nome"
                    autoComplete="nome"
                    value={postData.pintor1}
                    onChange={handleChange}
                />
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="nome"
                    label="Membro 2"
                    name="nome"
                    autoComplete="nome"
                    value={postData.pintor2}
                    onChange={handleChange}
                />
                
                    
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="nome"
                        label="Membro 3"
                        name="nome"
                        autoComplete="nome"
                        value={postData.pintor3}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="nome"
                        label="Membro 4"
                        name="nome"
                        autoComplete="nome"
                        value={postData.pintor4}
                        onChange={handleChange}
                    />
                      
                    

                    <div>
                        {/* <Controls.Button
                            type="submit"
                            text="Atualizar" /> */}
                        {/* <Controls.Button
                            text="Upload Foto"
                            color="default"
                            //onClick={resetForm} 
                            /> */}
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}