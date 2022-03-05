import { React, useState } from 'react'
import { Link, Stack, Divider, Button, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { SearchItemContainer } from './styles'
import { CommonButton } from '../../styles/Common'

const BookSearchResult = ({ id, title, subtitle, authors, thumbnail, onClick, favoriteClicked, unfavoriteClicked, isFavorite }) => {
  console.log('rendered book search result')

  const [favorite, setFavorite] = useState(isFavorite)

  const favoriteButtonClicked = () => {
    if (!favorite) {
      favoriteClicked(id).then(_ => {
        setFavorite(true)
      })
    } else {
      unfavoriteClicked(id).then(_ => {
        setFavorite(false)
      })
    }
  }

  return (
    <div>
      <div style={SearchItemContainer.ResultContainer}>
        <div style={SearchItemContainer.SearchImage}>
          <img src={thumbnail} width={100}/>
        </div>

        <div style={SearchItemContainer.InformationContainer}>
          <Link underline="hover" color="#2d2d2d" onClick={() => onClick(id)} style={{}}>
            <h3>{title}</h3>
          </Link>
          {subtitle && <p>{subtitle}</p>}
          <p>{authors}</p>
          <p>Rating 4.7 - 315 recaps</p>
          <Stack spacing={2} direction='row'>
            <Button
            style={{ ...CommonButton, color: 'red' }}
            onClick={favoriteButtonClicked}>
              {favorite && <img src="https://img.icons8.com/stickers/100/000000/hearts.png" width={25} height={25}/>}
              {favorite ? 'Unfavorite' : 'Favorite'}
            </Button>
            <Typography>You have 3 recaps</Typography>
          </Stack>
        </div>
      </div>
      <Divider/>
    </div>
  )
}

BookSearchResult.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
  thumbnail: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  subtitle: PropTypes.string,
  onClick: PropTypes.func,
  favoriteClicked: PropTypes.func,
  unfavoriteClicked: PropTypes.func
}

export default BookSearchResult
