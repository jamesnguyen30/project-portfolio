import { React } from 'react'
import {
  Alert, Collapse, Box, IconButton, AlertTitle
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import PropTypes from 'prop-types'

const CommonAlert = ({ open, onClose, title, severity, message }) => {
  return (
    <Box>
      <Collapse in={open}>
        <Alert
        severity={severity !== null ? severity : 'info'}
        action={
          <IconButton size='small' onClick={() => { onClose() }}>
            <CloseIcon />
          </IconButton>
        }>
          <AlertTitle><strong>{title}</strong></AlertTitle>
          {message}
        </Alert>
      </Collapse>
    </Box>
  )
}

CommonAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  severity: PropTypes.string,
  message: PropTypes.string
}

CommonAlert.defaultProps = {
  title: 'Put an alert title here',
  severity: 'success',
  messge: 'Put some message body here'
}

export default CommonAlert
