import { React } from 'react'
import { List } from '@mui/material'
import PropTypes from 'prop-types'
import BookSearchResult from './BookSearchResult'
import { saveFavorite } from '../../api/favorite'

const SearchResultList = ({ items, onItemClicked }) => {
  const onFavoriteClicked = (bookId) => {
    saveFavorite(bookId).then(response => {
      console.log(response)
    }).catch(err => {
      console.log(err)
    })
  }

  if (items) {
    return (
      <List>
        {items.map(item => (
          <BookSearchResult
            key={item.id}
            id={item.id}
            title={item.title}
            subtitle={item.subtitle}
            authors={item.authors}
            thumbnail={item.thumbnail}
            onClick={onItemClicked}
            favoriteClicked={onFavoriteClicked}
            isFavorite={false}
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
  items: PropTypes.array.isRequired,
  onItemClicked: PropTypes.func,
  onFavoriteClicked: PropTypes.func
}

export default SearchResultList
