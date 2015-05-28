var React = require('react-native')
var {StyleSheet} = React

var styles = StyleSheet.create({
  swipeout: {
    flex: 1,
  },
  swipeoutBtn: {
    flex: 1,
  },
  swipeoutBtn: {
    alignItems: 'center',
    backgroundColor: '#b6bec0',
    flex: 1,
    overflow: 'hidden',
  },
  swipeoutBtnText: {
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
})

module.exports = styles