import { React, useEffect, useCallback, useState } from 'react'
import {
  TextField, Button, Typography,
  Grid, Box, Stack
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import loginStyles from './styles'
import { useSelector, useDispatch } from 'react-redux'
import { signInAction } from '../../redux/actions/authActions'

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
        email: 'a@email.com',
        password: 'password'
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
      navigation('/home')
    } else if (signInState === NOT_SIGNED_IN) {
      switch (errorCode) {
        case 'auth/user-not-found':
          setOpenErrorAlert(true)
          setErrorTitle('No account found')
          setErrorMessage('No account registered with this email. Please sign up :)')
          break
        case 'auth/wrong-password':
          setOpenErrorAlert(true)
          setErrorTitle('Wrong password')
          setErrorMessage('Please try again')
          break
        default:
          break
      }
    }
  }, [timeStamp])

  const onSubmit = (data) => {
    signIn(data.email, data.password)
  }

  return (
    <Grid container style={{ height: '100vh' }}>
      <Grid item sm={0} md={6} style={{ backgroundColor: '#f0f8ff' }}>
        <Typography variant="h4">BookRecap</Typography>
      </Grid>
      <Grid item sm={12} md={6} style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* <div style={{}}> */}
        <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Box>
            <CommonAlert open={openErrorAlert} setOpen={setOpenErrorAlert}
              title={errorTitle}
              severity='error'
              message={errorMessage} />
          </Box>
          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Typography variant="h4">Create a new account</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack>
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
                <Button type="submit" variant="contained" style={loginStyles.SubmitButton}>Sign in</Button>
                <Button component={Link} to="/signup">
                  Sign up
                </Button>
                <Button component={Link} to="/#">
                  Forgot password
                </Button>

              </Stack>
            </form>
          </Box>
        </Box>

        {/* </div> */}
      </Grid>

    </Grid>
  )
}

export default LoginPage
