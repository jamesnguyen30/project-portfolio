import { React } from 'react'
import { Typography } from '@mui/material'
import PropTypes from 'prop-types'

const BookSearch = (props) => {
  const { title } = props
  return (
        <Typography variant="h3">
            {title}
        </Typography>
  )
}

BookSearch.propTypes = {
  title: PropTypes.string
}

export default BookSearch
