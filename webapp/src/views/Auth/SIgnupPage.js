import { React, useRef, useCallback, useEffect, useState } from 'react'
import { Paper, TextField, Button, Grid, Box } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import loginStyles from './styles'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signUpAction } from '../../redux/actions/authActions'
import { SIGNED_IN, NOT_SIGNED_IN } from '../../redux/actions'
import CommonAlert from '../../components/alerts/CommonAlert'

const SignupPage = () => {
  const { handleSubmit, control, formState: { errors }, watch } = useForm({
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: ''
    }
  })
  const dispatch = useDispatch()
  const [openAlert, setOpenAlert] = useState(false)
  const [alertTitle, setAlertTitle] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  const [severity, setSeverity] = useState('')

  const signInState = useSelector(state => state.authReducer.type)
  const errorCode = useSelector(state => state.authReducer.errorCode)
  const timeStamp = useSelector(state => state.authReducer.timeStamp)

  useEffect(() => {
    if (signInState === SIGNED_IN) {
      // show success alert
      setOpenAlert(true)
      setAlertTitle('Awesome')
      setAlertMessage('You reigisted a new account. Please navigate back to login')
      setSeverity('success')
    } else if (signInState === NOT_SIGNED_IN) {
      setAlertTitle('Error')
      setSeverity('error')
      switch (errorCode) {
        case 'auth/email-already-in-use':
          setAlertMessage('Email has already taken')
          break
        case 'auth/weak-password':
          setAlertMessage('Password is weak, Need more than 6 characters')
          break
        default:
          setAlertMessage('Please try again later')
          break
      }
      setOpenAlert(true)
    }
  }, [timeStamp])

  const password = useRef()
  password.current = watch('password', '')

  const signUp = useCallback((email, password) => {
    dispatch(signUpAction(email, password))
  })

  const onSubmit = data => {
    signUp(data.email, data.password)
  }

  return (
        <Paper style={{ ...loginStyles.LoginPaper, flex: 1 }} elevation={3}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CommonAlert
                            style={{ width: '100px' }}
                            open={openAlert}
                            setOpen={setOpenAlert}
                            message={alertMessage}
                            title={alertTitle}
                            severity={severity} />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                        <form onSubmit={e => e.preventDefault()}>
                            <h2>Sign Up Page</h2>

                            <Controller
                                name={'email'}
                                control={control}
                                rules={{ required: 'This field is required' }}
                                render={({ field: { onChange, value } }) => (
                                    <TextField onChange={onChange} value={value} label={'Email'} />
                                )
                                }
                            />

                            <p style={loginStyles.FormValidationError}>{errors.email?.message}</p>

                            <Controller
                                name={'password'}
                                control={control}
                                rules={{
                                  required: 'This field is required',
                                  validate: value => value === password.current || 'Password does not match'
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <TextField onChange={onChange} value={value} label="Password" type='password'/>
                                )}
                            />

                            <p style={loginStyles.FormValidationError}>{errors.password?.message}</p>

                            <Controller
                                name={'repeatPassword'}
                                control={control}
                                rules={{
                                  required: 'This field is required',
                                  validate: value => value === password.current || 'password must match'
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <TextField onChange={onChange} value={value} label="Repeat password" type='password'/>
                                )}
                            />
                            <p style={loginStyles.FormValidationError}>{errors.repeatPassword?.message}</p>

                            <Button onClick={handleSubmit(onSubmit)} type="submit" variant="contained" style={loginStyles.SubmitButton}>Sign up</Button>
                            <Button component={Link} to="/signIn">Sign in</Button>
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
  )
}

export default SignupPage
