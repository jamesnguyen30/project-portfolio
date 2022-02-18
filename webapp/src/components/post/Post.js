import { React } from 'react'
import { Box, Divider } from '@mui/material'
import PropTypes from 'prop-types'

const Post = (props) => {
  const { title, subtitle, body, reviewer, date, upvotes, comments } = props
  return (
    <Box>
      <h3>{title}</h3>
      <p>{subtitle}</p>
      <p>{body}</p>
      <p>{reviewer}</p>
      <p>{date}</p>
      <button>Expand</button>
      <p>upvotes: {upvotes}</p>
      <p>comments: {comments}</p>
      <Divider/>
    </Box>
  )
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  reviewer: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  upvotes: PropTypes.number.isRequired,
  comments: PropTypes.number.isRequired
}

Post.defaultProps = {

}

export default Post
