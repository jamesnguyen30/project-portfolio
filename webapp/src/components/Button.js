import PropTypes from 'prop-types'

const Button = (props) => {
  const onclick = () => {
    console.log('clicked')
  }
  return (
        <button style={{ backgroundColor: props.color }} onClick={onclick}>{props.text}</button>
  )
}

Button.defaultProps = {
  text: 'Default Button',
  color: 'yellow'

}

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string

}

export default Button
