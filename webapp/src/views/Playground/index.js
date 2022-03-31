import React from 'react'
import AuthorizedOnly from '../../utils/AuthorizedOnly'
import UnauthorizedErrorPage from '../../views/Error/UnauthorizedErrorPage'
import Playground from './Playground'

const ProtectedPlayground = props =>
  (
  <AuthorizedOnly
    {...props}
    Component={Playground}
    ErrorComponent={UnauthorizedErrorPage} />
  )

export default ProtectedPlayground
