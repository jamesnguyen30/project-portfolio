import constants from '../../constants/styles/index'

const SubmitButton = {
  display: 'flex',
  marginTop: constants.space.medium,
  marginBottom: constants.space.medium
}

const LoginPage = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const LoginPaper = {
  display: 'flex',
  paddingTop: constants.space.xxxlarge,
  paddingBottom: constants.space.xxxlarge,
  paddingLeft: constants.space.xxxlarge,
  paddingRight: constants.space.xxxlarge,
  marginTop: constants.space.xxxlarge,
  marginBottom: constants.space.xxxlarge,
  justifyContent: 'center',
  alignItems: 'center'
}

const FormValidationError = {
  color: constants.colors.red,
  fontSize: constants.fontSize.small
}

const LoginIntroContainer = {
}

const loginStyles = {
  SubmitButton: SubmitButton,
  LoginPage: LoginPage,
  LoginPaper: LoginPaper,
  FormValidationError: FormValidationError,
  LoginIntroContainer: LoginIntroContainer
}

export default loginStyles
