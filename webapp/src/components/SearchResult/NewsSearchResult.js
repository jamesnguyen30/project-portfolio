import { React } from 'react'
import { List, ListItem, Typography, Menu } from '@mui/material'
import PropTypes from 'prop-types'

const NewsSearchResult = (props) => {
  return (
    <Menu {...props}>
      <List>
        {
          props.result.map((x, index) => (
            <ListItem key={index}>
              <Typography>{x}</Typography>
            </ListItem>
          ))
        }
      </List>
    </Menu>
  )
}

NewsSearchResult.propTypes = {
  result: PropTypes.array
}

export default NewsSearchResult
