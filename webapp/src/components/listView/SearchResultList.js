import { React } from 'react'
import { List, Link, Stack, Divider } from '@mui/material'
import PropTypes from 'prop-types'
import { SearchItemContainer } from './styles'
// import BookSearch from '../../views/HomePage/BookSearch'

const BookSearchResult = ({ id, title, subtitle, authors, thumbnail, onClick }) => (
  <div>
    <div style={SearchItemContainer.ResultContainer}>
      <div style={SearchItemContainer.SearchImage}>
        <img src={thumbnail} width={100}/>
      </div>

      <div style={SearchItemContainer.InformationContainer}>
        <Link underline="hover" color="#2d2d2d" onClick={() => onClick(id)}>
          <h3>{title}</h3>
        </Link>
        {subtitle && <p>{subtitle}</p>}
        <p>{authors}</p>
        <p>Rating 4.7 - 315 recaps</p>
        <Stack spacing={2} direction='row'>
          <button>Want to read</button>
          <button>Favorite</button>
          <button>Amazon</button>
        </Stack>
      </div>
    </div>
    <Divider/>

  </div>
)

BookSearchResult.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
  thumbnail: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  subtitle: PropTypes.string
}

const SearchResultList = ({ items, onItemClicked }) => {
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
  onItemClicked: PropTypes.func
}

export default SearchResultList
