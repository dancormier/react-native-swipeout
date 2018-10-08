'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testProps = undefined;

var _reactNative = require('react-native');

var testProps = exports.testProps = function testProps(testId) {
  if (_reactNative.Platform.OS === 'android') {
    return { testID: testId, accessibilityLabel: testId };
  }
  return { testID: testId };
}; // TestProps required as React Native for Android doesn't correctly support testIDs
// as doing so would break Facebooks own automated testing pipeline.  Until
// Facebook update their internal testing pipeline this is the recommended
// way to handle this.
//