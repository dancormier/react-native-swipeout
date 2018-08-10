'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _reactNative = require('react-native');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = _reactNative.StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  textButton: {
    fontSize: 14,
    alignSelf: 'center'
  },
  opacity: {
    opacity: 0.8
  }
});

var NativeButton = (0, _createReactClass2.default)({
  displayName: 'NativeButton',


  propTypes: _extends({}, _reactNative.TouchableWithoutFeedback.propTypes, {
    textStyle: _propTypes2.default.any,
    disabledStyle: _propTypes2.default.any,
    children: _propTypes2.default.node.isRequired,
    underlayColor: _propTypes2.default.string,
    background: _propTypes2.default.any
  }),

  statics: {
    isAndroid: _reactNative.Platform.OS === 'android'
  },

  getDefaultProps: function getDefaultProps() {
    return {
      textStyle: null,
      disabledStyle: null,
      underlayColor: null
    };
  },

  _renderText: function _renderText() {
    // If children is not a string don't wrapp it in a Text component
    if (typeof this.props.children !== 'string') {
      return this.props.children;
    }

    return _react2.default.createElement(
      _reactNative.Text,
      { numberOfLines: 1, ellipsizeMode: _reactNative.Platform.OS === 'ios' ? 'clip' : 'tail', style: [styles.textButton, this.props.textStyle] },
      this.props.children
    );
  },

  render: function render() {
    var disabledStyle = this.props.disabled ? this.props.disabledStyle || styles.opacity : {};

    // Extract Button props
    var buttonProps = {
      accessibilityComponentType: this.props.accessibilityComponentType,
      accessibilityTraits: this.props.accessibilityTraits,
      accessible: this.props.accessible,
      delayLongPress: this.props.delayLongPress,
      delayPressIn: this.props.delayPressIn,
      delayPressOut: this.props.delayPressOut,
      disabled: this.props.disabled,
      hitSlop: this.props.hitSlop,
      onLayout: this.props.onLayout,
      onPress: this.props.onPress,
      onPressIn: this.props.onPressIn,
      onPressOut: this.props.onPressOut,
      onLongPress: this.props.onLongPress,
      pressRetentionOffset: this.props.pressRetentionOffset
    };

    // Render Native Android Button
    if (NativeButton.isAndroid) {
      buttonProps = Object.assign(buttonProps, {
        background: this.props.background || _reactNative.TouchableNativeFeedback.SelectableBackground()
      });

      return _react2.default.createElement(
        _reactNative.TouchableNativeFeedback,
        buttonProps,
        _react2.default.createElement(
          _reactNative.View,
          { style: [styles.button, this.props.style, disabledStyle] },
          this._renderText()
        )
      );
    }

    // Render default button
    return _react2.default.createElement(
      _reactNative.TouchableHighlight,
      _extends({}, buttonProps, {
        style: [styles.button, this.props.style, disabledStyle],
        underlayColor: this.props.underlayColor }),
      this._renderText()
    );
  }
});

exports.default = NativeButton;