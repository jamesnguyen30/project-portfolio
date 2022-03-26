import { React } from 'react'
import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import './styles.css'

const ClickActiveAnimation = (props) => {
  return (
      <CSSTransition
        in={props.in}
        timeout={200}
        classNames={'anim'}
        unmountOnExit
        {...props}
      >
        {
          props.children
        }
      </CSSTransition>
  )
}

ClickActiveAnimation.propTypes = {
  in: PropTypes.bool.isRequired,
  children: PropTypes.object.isRequired
}

export default ClickActiveAnimation
