import React, { useState } from "react";
import axiosInstance from '../../axios';
import { useHistory } from 'react-router-dom';
import { useForm, Form } from './useForm';
import Controls from './Controls';

import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
// import classnames from "classnames";

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.svg";
// import google from "../../images/google.svg";

// context
import { useUserDispatch, loginUser } from "../../context/UserContext";

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [errorMessages, setErrorMessages] = useState([])
  var [activeTabId, setActiveTabId] = useState(0);
  var [nameValue, setNameValue] = useState("");
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");
  let history = useHistory();

  const initialFValues = {
    username: '',
    email: '',
    password: '',
}

  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('username' in fieldValues)
        temp.username = fieldValues.username ? "" : "Esse campo é necessário."
    if ('email' in fieldValues)
        temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Esse Email não é válido"
    if ('password' in fieldValues)
        temp.password = fieldValues.password.length > 7 ? "" : "Mínimo de 8 números necessários."
    setErrors({
        ...temp
    })

    if (fieldValues === values)
        return Object.values(temp).every(x => x === "")
}

const {
  values,
  // setValues,
  errors,
  setErrors,
  handleInputChange,
  // resetForm
} = useForm(initialFValues, true, validate);

//console.log(values.email)



const handleSubmit = (e) => {
  e.preventDefault()
  setIsLoading(true);
  let errorList = []
  if(loginValue === "a"){
    errorList.push("Please enter first name")
  }
  if(nameValue === "a"){
    errorList.push("Please enter last name")
  }
  //if(errorList.length < 1){
  if(validate){
    axiosInstance
      .post(`create/`, {
          email: values.email,
          user_name: values.username,
          password: values.password,
      })
      .then((res) => {
          history.go('/login');
          console.log(res.data);
      })
      .catch(error => {
        console.log(error.response)
        setError(true)
        setIsLoading(false)
      })
  } else{
    setErrorMessages(errorList)
    setError(true)
    setIsLoading(false)
    
  }
};     
  
  
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container className={classes.container}>
        <div className={classes.logotypeContainer}>
          <img src={logo} alt="logo" className={classes.logotypeImage} />
          <Typography className={classes.logotypeText}>Pinte</Typography>
        </div>
        <div className={classes.formContainer}>
          <div className={classes.form}>
            <Tabs
              value={activeTabId}
              onChange={(e, id) => {setActiveTabId(id); setError(null)}}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Login" classes={{ root: classes.tab }} />
              {/* <Tab label="Novo Usuário" classes={{ root: classes.tab }} /> */}
            </Tabs>
            {activeTabId === 0 && (
              <React.Fragment>
                <Typography variant="h1" className={classes.greeting}>
                  Bom Dia, Usuário(a)
                </Typography>
                {/* <Button size="large" className={classes.googleButton}>
                  <img src={google} alt="google" className={classes.googleIcon} />
                  &nbsp;Sign in with Google
                </Button> */}
                <div className={classes.formDividerContainer}>
                  <div className={classes.formDivider} />
                  {/* <Typography className={classes.formDividerWord}>or</Typography> */}
                  <div className={classes.formDivider} />
                </div>
                <Fade in={error}>
                  <Typography color="secondary" className={classes.errorMessage}>
                    Alguma coisa errada com seu login ou password :(
                  </Typography>
                </Fade>
                  <TextField
                    id="email"
                    variant="outlined"
                    label="E-mail"
                    // InputProps={{
                    //   classes: {
                    //     underline: classes.textFieldUnderline,
                    //     input: classes.textField,
                    //   },
                    // }}
                    //value={loginValue}
                    onChange={e => setLoginValue(e.target.value)}
                    //error={errors.fullName}
                    {...(error && {error:true,helperText:error})}
                    margin="normal"
                    placeholder="Email Adress"
                    type="email"
                    fullWidth
                  />
                  <TextField
                    id="password"
                    name="password"
                    variant="outlined"
                    label="Password"
                    // InputProps={{
                    //   classes: {
                    //     underline: classes.textFieldUnderline,
                    //     input: classes.textField,
                    //   },
                    // }}
                    //value={passwordValue}
                    onChange={e => setPasswordValue(e.target.value)}
                    margin="normal"
                    autoComplete="current-password"
                    autoFocus
                    placeholder="Password"
                    type="password"
                    fullWidth
                  />
                  <div className={classes.formButtons}>
                    {isLoading ? (
                      <CircularProgress size={26} className={classes.loginLoader} />
                    ) : (
                      <Button
                        disabled={
                          loginValue.length === 0 || passwordValue.length === 0
                        }
                        onClick={() =>
                          loginUser(
                            userDispatch,
                            loginValue,
                            passwordValue,
                            props.history,
                            setIsLoading,
                            setError,
                          )
                        }
                        //onClick={handleLogin}
                        color="primary"
                        size="large"
                      >
                        Login
                      </Button>
                    )}
                    {/* <Button
                      color="primary"
                      size="large"
                      className={classes.forgetButton}
                    >
                      Forget Password
                    </Button> */}
                </div>
              </React.Fragment>
            )}
            {activeTabId === 1 && (
              <React.Fragment>
                <Typography variant="h1" className={classes.greeting}>
                  Bem Vindo!
                </Typography>
                <Typography variant="h2" className={classes.subGreeting}>
                  Crie sua conta
                </Typography>
                <Fade in={error}>
                  <Typography color="secondary" className={classes.errorMessage}>
                    Alguma coisa deu errado com seu login ou senha :( {errorMessages}
                  </Typography>
                </Fade>
                <Controls.Input
                        name="username"
                        label="Usuário"
                        value={values.username}
                        onChange={handleInputChange}
                        error={errors.username}
                    />
                {/* <TextField
                  id="username"
                  name="username"
                  variant="outlined"
                  label="Usuário"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  // value={nameValue}
                  // onChange={e => setNameValue(e.target.value)}
                  value={values.username}
                  onChange={handleInputChange}
                  //onChange={handleChange}
                  margin="normal"
                  placeholder="Usuário"
                  type="text"
                  fullWidth
                  error={errors.username}
                /> */}
                <Controls.Input
                        label="Email"
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                {/* <TextField
                  id="email"
                  variant="outlined"
                  name="email"
                  label="E-mail"
                  // InputProps={{
                  //   classes: {
                  //     underline: classes.textFieldUnderline,
                  //     input: classes.textField,
                  //   },
                  // }}
                  // value={loginValue}
                  // onChange={e => setLoginValue(e.target.value)}
                  value={values.email}
                  onChange={handleInputChange}
                  // onChange={handleChange}
                  //error={loginValue === "andre"}
                  //helperText={loginValue === "andre" ? "erro" : 'Insira seu e-mail'}
                  margin="normal"
                  placeholder="Email Adress"
                  type="email"
                  fullWidth
                  error={errors.email}
                  
                /> */}
                <Controls.Input
                        label="Senha"
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={handleInputChange}
                        error={errors.password}
                    />
                {/* <TextField
                  id="password"
                  name="password"
                  variant="outlined"
                  label="Senha"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  // value={passwordValue}
                  // onChange={e => setPasswordValue(e.target.value)}
                  value={values.password}
                  onChange={handleInputChange}
                  // onChange={handleChange}
                  margin="normal"
                  placeholder="Senha"
                  type="password"
                  fullWidth
                  error={errors.password}
                /> */}
                <div className={classes.creatingButtonContainer}>
                  {isLoading ? (
                    <CircularProgress size={26} />
                  ) : (
                    <Button
                      // onClick={() =>
                      //   loginUser(
                      //     userDispatch,
                      //     loginValue,
                      //     passwordValue,
                      //     props.history,
                      //     setIsLoading,
                      //     setError,
                      //   )
                      // }
                      //onClick={handleSubmit}
                      type="submit"
                      // disabled={
                      //   loginValue.length === 0 ||
                      //   passwordValue.length === 0 ||
                      //   nameValue.length === 0
                      // }
                      size="large"
                      variant="contained"
                      color="primary"
                      fullWidth
                      className={classes.createAccountButton}
                    >
                      Create your account
                    </Button>
                  )}
                </div>
                {/* <div className={classes.formDividerContainer}>
                  <div className={classes.formDivider} />
                  <Typography className={classes.formDividerWord}>or</Typography>
                  <div className={classes.formDivider} />
                </div>
                <Button
                  size="large"
                  className={classnames(
                    classes.googleButton,
                    classes.googleButtonCreating,
                  )}
                >
                  <img src={google} alt="google" className={classes.googleIcon} />
                  &nbsp;Sign in with Google
                </Button> */}
              </React.Fragment>
            )}
          </div>
          {/* <Typography color="primary" className={classes.copyright}>
          © 2014-{new Date().getFullYear()} <a style={{ textDecoration: 'none', color: 'inherit' }} href="https://flatlogic.com" rel="noopener noreferrer" target="_blank">Flatlogic</a>, LLC. All rights reserved.
          </Typography> */}
        </div>
      </Grid>
    </Form>
  );
}

export default withRouter(Login);
