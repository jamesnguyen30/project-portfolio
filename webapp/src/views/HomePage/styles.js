import constants from '../../constants/styles/index'

const MainFeed = {
  height: '500px',
  backgroundColor: constants.colors.ashenWhite,
  borderRadius: constants.borderRadius.medium,
  paddingLeft: constants.space.medium,
  paddingRight: constants.space.medium,
  border: `1px solid ${constants.colors.darkAshenWhite}`
}

const CommonContainer = {
  backgroundColor: constants.colors.ashenWhite,
  borderRadius: constants.borderRadius.medium,
  paddingLeft: constants.space.medium,
  paddingRight: constants.space.medium,
  border: `1px solid ${constants.colors.darkAshenWhite}`,
  paddingTop: constants.space.medium,
  paddingBottom: constants.space.medium

}

const SearchBar = {
  borderRadius: constants.borderRadius.large,
  border: `1px solid ${constants.colors.darkAshenWhite}`,
  backgroundColor: constants.colors.white
}
const BookCoverContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const BookInformationContainer = {
  paddingLeft: constants.space.medium,
  paddingRight: constants.space.medium
}

const AboutMeContainer = {
  marginTop: constants.space.medium,
  display: 'flex',
  flexDirection: 'column'
}

const MainPageStyle = {
  MainFeed: MainFeed,
  SearchBar: SearchBar,
  CommonContainer: CommonContainer,
  BookInformationContainer: BookInformationContainer,
  BookCoverContainer: BookCoverContainer,
  AboutMeContainer: AboutMeContainer
}

const DetailPageStyle = {
  BookCoverContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  BookInformationContainer: {
    flex: 1,
    marginLeft: constants.space.medium,
    marginRight: constants.space.medium

  }
}

export { MainPageStyle, DetailPageStyle }
