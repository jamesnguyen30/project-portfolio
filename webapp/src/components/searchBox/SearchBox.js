import { React, useEffect } from 'react'
import { styled, alpha, InputBase, IconButton } from '@mui/material'
// import styles from './styles'
import SearchIcon from '@mui/icons-material/Search'
import constants from '../../constants/styles/index'
import PropTypes from 'prop-types'
const _ = require('lodash')
const { search } = require('../../api/books')

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

const SearchBox = ({ style, handleResult, handleClear, handleError, setLoading }) => {
  useEffect(() => {
    console.log('rendered search box')
  }, [])

  const callApi = _.debounce((query) => {
    setLoading(true)
    search(query).then(response => {
      handleResult(response.data)
    }).catch(err => {
      handleError(err)
    })
    setLoading(false)
  }, 200)

  const onChange = (event) => {
    const newQuery = event.target.value
    if (newQuery === '') handleClear()
    else {
      callApi(newQuery)
    }
  }

  return (
    <SearchContainer style={style}>
      <SearchInput placeholder='Search book ...' onChange={onChange}></SearchInput>
      <SearchIconWrapper>
        <IconButton>
          <SearchIcon/>
        </IconButton>
      </SearchIconWrapper>
    </SearchContainer>
  )
}

SearchBox.propTypes = {
  style: PropTypes.object,
  handleResult: PropTypes.func.isRequired,
  handleClear: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired
}

export default SearchBox
