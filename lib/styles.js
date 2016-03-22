'use strict';

var _reactNative = require('react-native');

var _reactNative2 = _interopRequireDefault(_reactNative);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = _reactNative.StyleSheet.create({
  swipeout: {
    backgroundColor: '#dbddde',
    flex: 1,
    overflow: 'hidden'
  },
  swipeoutBtnTouchable: {
    flex: 1
  },
  swipeoutBtn: {
    alignItems: 'center',
    backgroundColor: '#b6bec0',
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden'
  },
  swipeoutBtnText: {
    color: '#fff',
    textAlign: 'center'
  },
  swipeoutBtns: {
    bottom: 0,
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    top: 0
  },
  swipeoutContent: {
    flex: 1
  },
  colorDelete: {
    backgroundColor: '#fb3d38'
  },
  colorPrimary: {
    backgroundColor: '#006fff'
  },
  colorSecondary: {
    backgroundColor: '#fd9427'
  }
});

module.exports = styles;