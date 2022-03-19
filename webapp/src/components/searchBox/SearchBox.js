import { React } from 'react'
import { styled, alpha, InputBase, IconButton, Box } from '@mui/material'
// import styles from './styles'
import SearchIcon from '@mui/icons-material/Search'
import constants from '../../constants/styles/index'
import PropTypes from 'prop-types'
const _ = require('lodash')

const SearchContainer = styled(Box)(({ theme, active }) => ({
  position: 'relative',
  backgroundColor: active ? alpha('#000', 0.05) : theme.palette.primary.white,
  borderRadius: theme.sizes.borderRadius.large,
  border: `1px solid ${theme.palette.secondary.gray}`,
  width: 'auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}))

const SearchIconWrapper = styled('div')({
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

const SearchBox = ({ style, placeHolder, apiCallback, handleResult, handleClear, handleError, setLoading }) => {
  const callApi = _.debounce((query) => {
    setLoading(true)

    apiCallback(query).then(data => {
      handleResult(data)
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
    <SearchContainer style={style} sx={{
      ':hover': {
        boxShadow: 6
      }
    }
    }>
      <SearchInput placeholder={placeHolder} onChange={onChange}></SearchInput>
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
  placeHolder: PropTypes.string,
  apiCallback: PropTypes.func,
  handleResult: PropTypes.func,
  handleClear: PropTypes.func,
  handleError: PropTypes.func,
  setLoading: PropTypes.func
}

export default SearchBox
