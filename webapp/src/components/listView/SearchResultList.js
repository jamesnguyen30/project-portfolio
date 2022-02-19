import { React } from 'react'
import { List, Box } from '@mui/material'
import PropTypes from 'prop-types'
// import BookSearch from '../../views/HomePage/BookSearch'

const BookSearchResult = ({ title, subtitle, arthors, thumbnail }) => (
  <Box>
    <img src={thumbnail} />
    <p>{title}</p>
    {subtitle && <p>{subtitle}</p>}
    <p>{arthors}</p>
  </Box>
)

BookSearchResult.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  arthors: PropTypes.array,
  thumbnail: PropTypes.string
}

const SearchResultList = ({ items }) => {
  if (items) {
    return (
      <List>
        {items.map(item => (
            <BookSearchResult
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              arthor={item.arthors}
              thumbnail={item.thumbnail}
            >
            </BookSearchResult>
        ))
        }
      </List>
    )
  } else {
    return (
      <h2>No results! search something in the search bar</h2>
    )
  }
}

SearchResultList.propTypes = {
  items: PropTypes.array
}

export default SearchResultList
