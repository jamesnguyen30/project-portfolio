import React from 'react'
import { Container, Paper, TextField, Button } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import loginStyles from '../LoginPage/styles'
import { Link } from 'react-router-dom'

const SignupPage = () => {
  const { handleSubmit, control, formState: { errors } } = useForm()

  const onSubmit = data => {
    console.log(errors)
    console.logd(data)
  }

  return (
        <Container maxWidth='xl' style={loginStyles.LoginPage}>
            <Paper style={{ ...loginStyles.LoginPaper, flex: 1 }} elevation={3}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2>Sign Up Page</h2>
                    <Controller
                        name={'username'}
                        control={control}
                        rules={{ required: 'This field is required' }}
                        render={({ field: { onChange, value } }) => (
                            <TextField onChange={onChange} value={value} label={'Username'}/>
                        )
                        }
                    />

                    <p style={loginStyles.FormValidationError}>{errors.username?.message}</p>

                    <Controller
                        name={'email'}
                        control={control}
                        rules={{ required: 'This field is required' }}
                        render={({ field: { onChange, value } }) => (
                            <TextField onChange={onChange} value={value} label={'Email'}/>
                        )
                        }
                    />

                    <p style={loginStyles.FormValidationError}>{errors.username?.message}</p>

                    <Controller
                        name={'password'}
                        control={control}
                        rules={{ required: 'Passowrd is required' }}
                        render={({ field: { onChange, value } }) => (
                            <TextField onChange={onChange} value={value} label="Password"/>
                        )}
                    />

                    <p style={loginStyles.FormValidationError}>{errors.password?.message}</p>

                    <Controller
                        name={'repeatPassword'}
                        control={control}
                        rules={{ required: 'This must match the above password' }}
                        render={({ field: { onChange, value } }) => (
                            <TextField onChange={onChange} value={value} label="Repeat password"/>
                        )}
                    />

                    <p style={loginStyles.FormValidationError}>{errors.repeatPassword?.message}</p>

                    <Button onClick={() => handleSubmit()} type="submit" variant="contained" style={loginStyles.SubmitButton}>Sign up</Button>
                    <Button component={Link} to="/">Back to homepage</Button>
                </form>
            </Paper>
        </Container>
  )
}

export default SignupPage
