import { React } from 'react'
// import { FixedSizeList } from 'react-window'
import { List, ListItem, ListItemText } from '@mui/material'
// import PropTypes from 'prop-types'

const dummyData = (count = 50) => {
  const items = []
  for (let i = 0; i < count; i++) {
    items.push(i)
  }
  return items
}

const items = dummyData()

const ListView = () => (
  <List>
    {items.map(value => {
      return (
        <ListItem key={value}>
          <ListItemText primary={`List items  ${value}`}></ListItemText>
        </ListItem>
      )
    })}
  </List>
)

export default ListView
