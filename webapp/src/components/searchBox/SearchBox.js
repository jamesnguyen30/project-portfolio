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

// Search box component
// @ props
// @ placeHolder string: place holder string
// @ apiCallback function: api call function from parent
// @ handleResult function: handle result function from parent
// @ handleClear function: Happens when text input is empty
// @ handleError function: Called when error is thrown while calling api funciton
// @ setLoading function: indicate if waiting for api result
// @ onFocus function: called when text input box is focused
// @ onBlur function: called when text input box lost focus

const SearchBox = (props) => {
  const { placeHolder, apiCallback, handleResult, handleClear, handleError, setLoading, onFocus, onBlur, autoComplete } = props

  const callApi = _.debounce((query) => {
    setLoading(true)

    apiCallback(query).then(data => {
      setLoading(false)
      handleResult(data)
    }).catch(err => {
      handleError(err)
    })
  }, 500)

  const onChange = (event) => {
    const newQuery = event.target.value
    if (newQuery === '') handleClear()
    else {
      if (autoComplete) callApi(newQuery)
    }
  }

  return (
    <SearchContainer sx={{
      ...props.sx,
      ':hover': {
        boxShadow: 6
      }
    }}>
      <SearchInput onClick={onFocus} placeholder={placeHolder} onChange={onChange} onBlur={onBlur}></SearchInput>
      <SearchIconWrapper>
        <IconButton disableRipple>
          <SearchIcon/>
        </IconButton>
      </SearchIconWrapper>

    </SearchContainer>
  )
}

SearchBox.propTypes = {
  sx: PropTypes.object,
  style: PropTypes.object,
  placeHolder: PropTypes.string,
  apiCallback: PropTypes.func,
  handleResult: PropTypes.func,
  handleClear: PropTypes.func,
  handleError: PropTypes.func,
  setLoading: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  autoComplete: PropTypes.bool
}

SearchBox.defaultProps = {
  autoComplete: false
}

export default SearchBox
