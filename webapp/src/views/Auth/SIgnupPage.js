import { React, useRef, useCallback, useState } from 'react'
import { TextField, Button, Box, Typography, Stack } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import loginStyles from './styles'
import { Link, useNavigate } from 'react-router-dom'
import { signUp as signUpApi } from '../../api/auth'
import CommonAlert from '../../components/alerts/CommonAlert'

const SignupPage = () => {
  const { handleSubmit, control, formState: { errors }, watch } = useForm({
    defaultValues: {
      email: 'a@a.com',
      password: 'password',
      repeatPassword: 'password'
    }
  })
  const [alertTitle, setAlertTitle] = useState(null)
  const [alertMessage, setAlertMessage] = useState(null)
  const [severity, setSeverity] = useState(null)

  const navigation = useNavigate()
  const password = useRef()
  password.current = watch('password', '')

  const signUp = useCallback((email, password) => {
    signUpApi(email, password).then(_ => {
      setAlertTitle('Woo hoo! Awesome')
      setAlertMessage('You created a new account. Redirecting to home page in 3s ')
      setSeverity('success')
      setTimeout(() => {
        navigation('/')
      }, 3000)
    }).catch(err => {
      switch (err.code) {
        case 'auth/email-already-in-use':
          setAlertMessage('Email has already taken')
          break
        case 'auth/weak-password':
          setAlertMessage('Password needs to be longer (more than 6 characters)')
          break
        default:
          setAlertMessage('Please try again later')
          break
      }
      setSeverity('error')
      setAlertTitle("There's an error :P")
    })
  })

  const onSubmit = data => {
    signUp(data.email, data.password)
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <CommonAlert
        style={{ width: '100px' }}
        open={alertTitle !== null}
        onClose={() => setAlertTitle(null)}
        message={alertMessage}
        title={alertTitle}
        severity={severity}
        />

      <Typography variant="h4">Create a new account</Typography>
      <form onSubmit={e => e.preventDefault()}>

        <Stack spacing={1}>
          <Controller
            name={'email'}
            control={control}
            rules={{ required: 'This field is required' }}
            render={({ field: { onChange, value } }) => (
              <TextField onChange={onChange} value={value} label={'Email'} />
            )}
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
              <TextField onChange={onChange} value={value} label="Password" type='password' />
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
              <TextField onChange={onChange} value={value} label="Repeat password" type='password' />
            )}
          />
          <p style={loginStyles.FormValidationError}>{errors.repeatPassword?.message}</p>
          <Button
            onClick={handleSubmit(onSubmit)}
            type="submit"
            variant="contained"
            disableRipple
            sx={{
              marginTop: 1,
              marginBottom: 1,
              flex: 1,
              backgroundColor: 'primary.darkGreen',
              ':hover': {
                backgroundColor: 'primary.green',
                transition: 'backgroundColor 100ms'
              },
              ':active': {
                transform: 'translateY(5px)',
                transition: 'transform 50ms'
              }
            }}
          >
            Create new account
          </Button>
          <Button component={Link} to="/signIn">Sign in</Button>

        </Stack>
      </form>
    </Box>
  )
}

export default SignupPage
