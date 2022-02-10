import { React } from 'react'
import {
  Container, Paper, TextField, Button, Typography
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import loginStyles from './styles'

function LoginPage () {
  const { handleSubmit, control, formState: { errors } } = useForm(
    {
      defaultValues: {
        firstName: 'Khuong',
        lastName: 'Nguyen'
      }
    }
  )

  console.log(errors)
  const onSubmit = (data) => console.log(data)

  return (
    <Container maxWidth="xl" style={loginStyles.LoginPage}>
      <Paper style={{ ...loginStyles.LoginPaper, flex: 1 }} elevation={3}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Login Page</h2>
          <Controller
            name="firstName"
            control={control}
            rules={{ required: 'This field is required' }}
            render={({ field: { onChange, value } }) => (
              <TextField onChange={onChange} value={value} label="First Name" />
            )}
          />

          <p style={loginStyles.FormValidationError}>{errors.firstName?.message}</p>

          <Controller
            name="lastName"
            control={control}
            rules={{ required: 'Last name is required' }}
            render={({ field: { onChange, value } }) => (
              <TextField onChange={onChange} value={value} label="Last Name" />
            )}
          />

          <p style={loginStyles.FormValidationError}>{errors.lastName?.message}</p>

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
