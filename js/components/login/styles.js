
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

module.exports = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FBFAFA',
  },
  shadow: {
    flex: 1,
    width: null,
    height: null,
  },
  bg: {
    flex: 1,
    marginTop: h / 1.75,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    bottom: 0,
  },
  input: {
    marginBottom: 20,
  },
  btn: {
    marginTop: 20,
    alignSelf: 'center',
  },
  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: w,
    height: h,
  },
  btnLogin: {
    position: 'absolute',
    top: (w / 2) - 20,
    left: 20,
    width: w - 40,
    height: 40,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
