var React = require('react-native')
var {StyleSheet} = React

var styles = StyleSheet.create({
  swipeout: {
    flex: 1,
    overflow: 'hidden',
  },
  swipeoutBtn: {
    backgroundColor: '#b6bec0',
    flex: 1,
  },
  swipeoutBtnText: {
    alignSelf: 'center',
    color: '#fff',
  },
  swipeoutBtns: {
    bottom: 0,
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  swipeoutContent: {
    flex: 1,
  },
  colorDelete: {
    backgroundColor: '#fb3d38',
  },
  colorPrimary: {
    backgroundColor: '#006fff'
  },
  colorSecondary: {
    backgroundColor: '#fd9427'
  },
})

module.exports = styles