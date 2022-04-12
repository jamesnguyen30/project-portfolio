import { React, useCallback, useState } from 'react'
import {
  TextField, Button, Typography,
  Box, Stack
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import loginStyles from './styles'
import { signIn as signInApi } from '../../api/auth'
import CommonAlert from '../../components/alerts/CommonAlert'

const SigninPage = (props) => {
  const [errorTitle, setErrorTitle] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const { handleSubmit, control, formState: { errors } } = useForm(
    {
      defaultValues: {
        email: 'a@a.com',
        password: 'password'
      }
    }
  )

  const navigation = useNavigate()

  const signIn = useCallback((email, password) => {
    signInApi(email, password).then(_ => {
      navigation('/')
    }).catch(err => {
      switch (err.code) {
        case 'auth/user-not-found':
          setErrorTitle('User not found')
          setErrorMessage('This is email is not signed up')
          break
        case 'auth/wrong-password':
          setErrorTitle('Invalid credentials')
          setErrorMessage('Wrong email or password')
          break
        default:
          break
      }
    })
  })

  const onSubmit = (data) => {
    signIn(data.email, data.password)
  }

  return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}>
        <Box>
          <CommonAlert open={errorTitle !== null}
            onClose={() => setErrorTitle(null)}
            title={errorTitle}
            severity='error'
            message={errorMessage} />
        </Box>
        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Typography variant="h4">Sign in</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={1}>
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
              <Button
              type="submit"
              variant="contained"
              disableRipple
              sx={{
                backgroundColor: 'primary.darkPurple',
                ':hover': {
                  backgroundColor: 'primary.purple',
                  transition: 'backgroundColor 100ms'
                },
                ':active': {
                  transform: 'translateY(5px)',
                  transition: 'transform 50ms'
                }
              }}
              >
              Sign in
              </Button>
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
  )
}

export default SigninPage
