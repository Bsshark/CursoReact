import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from 'react-router-dom';
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";

const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [ (value) => value.includes('@'), 'El correo debe de tener una @'],
  password: [ (value) => value.length >= 6 , 'La password debe tener al menos 6 caracteres'],
  displayName: [ (value) => value.length >= 1, 'El nombre es obligatorio']
}

export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {status, errorMessage} = useSelector(state => state.auth);
  const isCheckingauthentication = useMemo(() => status === 'checking', [status] );

  const { 
    formState, displayName, email, password, onInputChange,
    isFormValid, displayNameValid, emailValid, passwordValid
  } = useForm(formData, formValidations);


  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if(!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword(formState));
  }

  return (
    <AuthLayout title='Registro'>
      <h1>FormValid: {isFormValid ? 'Válido' : 'Incorrecto'}</h1>
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
        <Grid container>
          <Grid item xs={12} sx={{mt: 2}}>
            <TextField 
              label="Nombre completo" 
              type="text" 
              placeholder="John Doe" 
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={ !!displayNameValid && formSubmitted}
              helperText= { displayNameValid }
              />

          </Grid>
          <Grid item xs={12} sx={{mt: 2}}>
            <TextField 
              label="Correo" 
              type="email" 
              placeholder="correo@gmail.com" 
              fullWidth
              name="email"
              error={!!emailValid && formSubmitted}
              helperText= { emailValid }
              value={email}
              onChange={onInputChange}
              />

          </Grid>
          <Grid item xs={12} sx={{mt: 2}}>
            <TextField 
              label="Contraseña" 
              type="password" 
              placeholder="contraseña" 
              fullWidth
              name="password"
              error={!!passwordValid && formSubmitted}
              value={password}
              helperText={passwordValid}
              onChange={onInputChange}/>

          </Grid>
          <Grid container spacing={ 2 } sx={{mb: 2, mt: 1}}>
          <Grid item xs={ 12 }  display={!!errorMessage ? '': 'none'}>
            <Alert severity="error">
                {errorMessage}
            </Alert>
            </Grid>
            <Grid item xs={ 12 } >
              <Button disabled={isCheckingauthentication} type="submit" variant="contained" fullWidth>Crear Cuenta</Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{mr: 1}}>¿Ya tienes cuenta?</Typography>
            <Link component={ RouterLink } color='inherit' to="/auth/login">
              Ingresar
            </Link>

          </Grid>

        </Grid>

      </form>
    </AuthLayout>
  )
}
