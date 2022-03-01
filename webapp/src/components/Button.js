import { React } from 'react'
import PropTypes from 'prop-types'

const Button = (props) => {
  return (
    <Button color="primary"
      style={{ borderRadius: '24px', fontSize: 12, fontWeight: 'bold' }}
      onClick={props.onClick}
      variant="contained">{props.text}</Button>
  )
}

Button.defaultProps = {
  text: 'Default'
}

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func
}

export default Button
