import { React } from 'react'
import { Box, Divider } from '@mui/material'
import PropTypes from 'prop-types'

const Post = (props) => {
  const { title, content, chapter, date, upvotes } = props
  return (
    <Box>
      <h3>{title}</h3>
      <p>{content}</p>
      <p>{chapter}</p>
      <p>{new Date(date).toDateString()}</p>
      <p>upvotes: {upvotes}</p>
      <Divider/>
    </Box>
  )
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  chapter: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  upvotes: PropTypes.number.isRequired
}

Post.defaultProps = {

}

export default Post
