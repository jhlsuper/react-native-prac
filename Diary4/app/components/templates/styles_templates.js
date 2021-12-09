import {StyleSheet} from 'react-native';
import {MAIN_BACKGROUND} from '../../i18n/msg';

export default styles_templates = StyleSheet.create({
  screen: {
    flex: 6,
    backgroundColor: MAIN_BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
  },

  flex1: {
    flex: 2.5,
    marginTop: 60,
  },
  flex3: {
    flex: 1,
  },
  text: {
    fontSize: 30,
    fontStyle: 'italic',
  },
  ///news ///
  newsContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: MAIN_BACKGROUND,
    // backgroundColor: '#eee',
    height: '100%',
    padding: 10,
  },

  loading: {
    flex: 1,
    backgroundColor: MAIN_BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /// statistics
  container: {
    flex: 1,
    alignContent: 'center',
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: MAIN_BACKGROUND,
  },
  graphContainer: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    flex: 1,
    marginTop: 90,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  ///ranking
  topContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  rankginContainer: {
    flex: 7,
  },

  //mypage
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  //auth
  authcontainer: {
    flex: 1,
    backgroundColor: '#7487C5',
    paddingTop: 130,
    paddingLeft: 50,
    paddingRight: 50,
  },
});
