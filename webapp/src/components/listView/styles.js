import constants from '../../constants/styles'

const SearchItemContainer = {
  ResultContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: constants.space.medium,
    marginBottom: constants.space.medium
  },
  SearchImage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  InformationContainer: {
    marginLeft: constants.space.medium
  },
  PostEditorContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: constants.space.medium,
    paddingBottom: constants.space.medium
  }

}

export { SearchItemContainer }
