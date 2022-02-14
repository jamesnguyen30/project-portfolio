import { React, useEffect, useCallback } from 'react'
import {
  Container, Paper, TextField, Button, Typography
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import loginStyles from './styles'
import { useDispatch } from 'react-redux'
import { signInAction } from '../../redux/actions/authActions'

function LoginPage () {
  const { handleSubmit, control, formState: { errors } } = useForm(
    {
      defaultValues: {
        email: 'Khuong',
        password: 'Nguyen'
      }
    }
  )
  const dispatch = useDispatch()

  const signIn = useCallback((email, password) => {
    dispatch(signInAction(email, password))
  })

  useEffect(() => {
  })

  const onSubmit = (data) => signIn(data.email, data.password)

  return (
    <Container maxWidth="xl" style={loginStyles.LoginPage}>
      <Paper style={{ ...loginStyles.LoginPaper, flex: 1 }} elevation={3}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              <TextField onChange={onChange} value={value} label="Password" />
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
