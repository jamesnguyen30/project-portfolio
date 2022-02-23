import constants from '../../constants/styles/index'

const ProfilePageStyle = {
  InfoContainer: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'column', md: 'row' },
    alignItems: 'center'
  },
  InfoStack: {
    paddingLeft: constants.space.medium
  }
}

export { ProfilePageStyle }
