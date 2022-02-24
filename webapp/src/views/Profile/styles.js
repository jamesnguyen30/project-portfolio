import constants from '../../constants/styles/index'

const ProfilePageStyle = {
  InfoContainer: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'column', md: 'row' },
    alignItems: 'center',
    padding: constants.space.medium
  },
  InfoStack: {
    paddingLeft: constants.space.medium
  }
}

export { ProfilePageStyle }
