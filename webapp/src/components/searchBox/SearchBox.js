import { React } from 'react'
import { styled, alpha, InputBase, IconButton } from '@mui/material'
// import styles from './styles'
import SearchIcon from '@mui/icons-material/Search'
import constants from '../../constants/styles/index'
import PropTypes from 'prop-types'

const SearchContainer = styled('div')(({
  position: 'relative',
  backgroundColor: alpha('#fff', 0.15),
  borderRadius: constants.borderRadius.small,
  width: 'auto',
  '&:hover': {
    backgroundColor: alpha('#fff', 0.25)
  },
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}))

const SearchIconWrapper = styled('div')({
  // height: '100vp',
  paddingLeft: constants.space.small,
  diplay: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

const SearchInput = styled(InputBase)({
  width: 'auto',
  marginLeft: constants.space.small,
  paddingLeft: constants.space.small,
  paddingRight: constants.space.small,
  flex: 1
})

const SearchBox = ({ style }) => {
  return (
    <SearchContainer style={style}>
      <SearchInput placeholder='Search book ...'></SearchInput>
      <SearchIconWrapper>
        <IconButton>
          <SearchIcon/>
        </IconButton>
      </SearchIconWrapper>
    </SearchContainer>
  )
}

SearchBox.propTypes = {
  style: PropTypes.object
}

export default SearchBox
