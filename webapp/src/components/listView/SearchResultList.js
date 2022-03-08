import { React } from 'react'
import { List } from '@mui/material'
import PropTypes from 'prop-types'
import BookSearchResult from './BookSearchResult'
import { saveFavorite, deleteFavorite } from '../../api/favorite'
import { useSelector } from 'react-redux'

const SearchResultList = ({ items, onItemClicked }) => {
  const favorites = useSelector(state => state.profileReducers.favorites)
  const favoriteLookup = new Set(favorites !== null ? favorites.map(f => f.bookid) : [])

  const favorite = (bookId) => {
    return saveFavorite(bookId).then(response => {
      return response
    }).catch(err => {
      console.log(err)
    })
  }

  const unfavorite = (bookId) => {
    return deleteFavorite(bookId).then(response => {
      return response
    }).catch(err => {
      console.log(err)
    })
  }

  if (items) {
    return (
      <List>
        {items && items.map(item => (
          <BookSearchResult
            key={item.id}
            id={item.id}
            title={item.title}
            subtitle={item.subtitle}
            authors={item.authors}
            thumbnail={item.thumbnail}
            onClick={onItemClicked}
            favoriteClicked={favorite}
            unfavoriteClicked={unfavorite}
            isFavorite={(favoriteLookup !== null && favoriteLookup.has(item.id))}
          >
          </BookSearchResult>
        ))
        }
        {(items === null || items.length === 0) && <h3>No search results</h3>}
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
