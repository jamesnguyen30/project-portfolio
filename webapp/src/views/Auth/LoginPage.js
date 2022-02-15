import { React, useEffect, useCallback, useState } from 'react'
import {
  Container, Paper, TextField, Button, Typography
  //  Alert, Collapse, Box, IconButton
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import loginStyles from './styles'
import { useSelector, useDispatch } from 'react-redux'
import { signInAction } from '../../redux/actions/authActions'
// import CloseIcon from '@mui/icons-material/Close'

import CommonAlert from '../../components/alerts/CommonAlert'

import {
  NOT_SIGNED_IN,
  SIGNED_IN
} from '../../redux/actions/index'

function LoginPage () {
  const [openErrorAlert, setOpenErrorAlert] = useState(false)
  const [errorTitle, setErrorTitle] = useState()
  const [errorMessage, setErrorMessage] = useState()

  const dispatch = useDispatch()
  const { handleSubmit, control, formState: { errors } } = useForm(
    {
      defaultValues: {
        email: 'a@a.com',
        password: 'something here12'
      }
    }
  )

  const signInState = useSelector(state => state.authReducer.type)
  const errorCode = useSelector(state => state.authReducer.errorCode)
  const timeStamp = useSelector(state => state.authReducer.timeStamp)

  const navigation = useNavigate()

  const signIn = useCallback((email, password) => {
    dispatch(signInAction(email, password))
  })

  useEffect(() => {
    if (signInState === SIGNED_IN) {
      navigation('/profile')
    } else if (signInState === NOT_SIGNED_IN) {
      if (errorCode === 'auth/user-not-found') {
        setOpenErrorAlert(true)
        setErrorTitle('No account found')
        setErrorMessage('No account registered with this email. Please sign up :)')
      }
    }
  }, [timeStamp])

  const onSubmit = (data) => signIn(data.email, data.password)

  return (
    <Container maxWidth="xl" style={loginStyles.LoginPage}>
      <Paper style={{ ...loginStyles.LoginPaper, flex: 1 }} elevation={3}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CommonAlert open={openErrorAlert} setOpen={setOpenErrorAlert}
          title={errorTitle}
          severity='error'
          message={errorMessage}/>
          <h2>Login Page</h2>
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email missing',
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Invalid email!'
              }
            }}
            render={({ field: { onChange, value } }) => (
              <TextField onChange={onChange} value={value} label="Email" />
            )}
          />

          <p style={loginStyles.FormValidationError}>{errors.email?.message}</p>

          <Controller
            name="password"
            control={control}
            rules={{ required: 'Password missing' }}
            render={({ field: { onChange, value } }) => (
              <TextField onChange={onChange} value={value} label="Password" type='password' />
            )}
          />

          <p style={loginStyles.FormValidationError}>{errors.password?.message}</p>

          <Button type="submit" variant="contained" style={loginStyles.SubmitButton}>Login</Button>
          <Button variant="contained" style={loginStyles.SubmitButton} component={Link} to="/signup">Sign Up</Button>
          <Typography>
            <a href="/*">Forget password</a>
          </Typography>

        </form>
      </Paper>
    </Container>
  )
}

export default LoginPage
