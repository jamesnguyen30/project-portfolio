import { React } from 'react'
import { FixedSizeList } from 'react-window'
import { ListItem } from '@mui/material'
import PropTypes from 'prop-types'

const dummyData = (count = 20) => {
  const items = []
  for (let i = 0; i < count; i++) {
    items.push(i)
  }
  return items
}

const items = dummyData()

const Item = ({ index, style }) => (
    <ListItem style={style} key={index} component='div'>
        <h3>{items[index]}</h3>
    </ListItem>
)

const ListView = () => (
    <FixedSizeList
        height={800}
        itemCount={items.length}
        itemSize={50}
    >
        {Item}
    </FixedSizeList>
)

Item.propTypes = {
  index: PropTypes.number.required,
  style: PropTypes.object.required
}

export default ListView
