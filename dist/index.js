'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactTweenState = require('react-tween-state');

var _reactTweenState2 = _interopRequireDefault(_reactTweenState);

var _NativeButton = require('./NativeButton');

var _NativeButton2 = _interopRequireDefault(_NativeButton);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _reactNative = require('react-native');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SwipeoutBtn = (0, _createReactClass2.default)({
  displayName: 'SwipeoutBtn',


  propTypes: {
    backgroundColor: _propTypes2.default.string,
    color: _propTypes2.default.string,
    component: _propTypes2.default.node,
    onPress: _propTypes2.default.func,
    text: _propTypes2.default.string,
    type: _propTypes2.default.string,
    underlayColor: _propTypes2.default.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      backgroundColor: null,
      color: null,
      component: null,
      underlayColor: null,
      height: 0,
      onPress: null,
      disabled: false,
      text: 'Click me',
      type: '',
      width: 0
    };
  },

  render: function render() {
    var btn = this.props;

    var styleSwipeoutBtn = [_styles2.default.swipeoutBtn];

    //  apply "type" styles (delete || primary || secondary)
    if (btn.type === 'delete') styleSwipeoutBtn.push(_styles2.default.colorDelete);else if (btn.type === 'primary') styleSwipeoutBtn.push(_styles2.default.colorPrimary);else if (btn.type === 'secondary') styleSwipeoutBtn.push(_styles2.default.colorSecondary);

    //  apply background color
    if (btn.backgroundColor) styleSwipeoutBtn.push([{ backgroundColor: btn.backgroundColor }]);

    styleSwipeoutBtn.push([{
      height: btn.height,
      width: btn.width
    }]);

    var styleSwipeoutBtnComponent = [];

    //  set button dimensions
    styleSwipeoutBtnComponent.push([{
      height: btn.height,
      width: btn.width
    }]);

    var styleSwipeoutBtnText = [_styles2.default.swipeoutBtnText];

    //  apply text color
    if (btn.color) styleSwipeoutBtnText.push([{ color: btn.color }]);

    return _react2.default.createElement(
      _NativeButton2.default,
      {
        onPress: this.props.onPress,
        underlayColor: this.props.underlayColor,
        disabled: this.props.disabled,
        style: [_styles2.default.swipeoutBtnTouchable, styleSwipeoutBtn],
        textStyle: styleSwipeoutBtnText },
      btn.component ? _react2.default.createElement(
        _reactNative.View,
        { style: styleSwipeoutBtnComponent },
        btn.component
      ) : btn.text
    );
  }
});

var Swipeout = (0, _createReactClass2.default)({
  displayName: 'Swipeout',

  mixins: [_reactTweenState2.default.Mixin],

  propTypes: {
    autoClose: _propTypes2.default.bool,
    backgroundColor: _propTypes2.default.string,
    close: _propTypes2.default.bool,
    left: _propTypes2.default.array,
    onOpen: _propTypes2.default.func,
    onClose: _propTypes2.default.func,
    right: _propTypes2.default.array,
    scroll: _propTypes2.default.func,
    style: (_reactNative.ViewPropTypes || _reactNative.View.propTypes).style,
    sensitivity: _propTypes2.default.number,
    buttonWidth: _propTypes2.default.number,
    disabled: _propTypes2.default.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      disabled: false,
      rowID: -1,
      sectionID: -1,
      sensitivity: 50
    };
  },

  getInitialState: function getInitialState() {
    return {
      autoClose: this.props.autoClose || false,
      btnWidth: 0,
      btnsLeftWidth: 0,
      btnsRightWidth: 0,
      contentHeight: 0,
      contentPos: 0,
      contentWidth: 0,
      openedRight: false,
      swiping: false,
      tweenDuration: 160,
      timeStart: null
    };
  },

  componentWillMount: function componentWillMount() {
    var _this = this;

    this._panResponder = _reactNative.PanResponder.create({
      onStartShouldSetPanResponder: function onStartShouldSetPanResponder(event, gestureState) {
        return true;
      },
      onStartShouldSetPanResponderCapture: function onStartShouldSetPanResponderCapture(event, gestureState) {
        return _this.state.openedLeft || _this.state.openedRight;
      },
      onMoveShouldSetPanResponderCapture: function onMoveShouldSetPanResponderCapture(event, gestureState) {
        return Math.abs(gestureState.dx) > _this.props.sensitivity && Math.abs(gestureState.dy) <= _this.props.sensitivity;
      },
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
      onShouldBlockNativeResponder: function onShouldBlockNativeResponder(event, gestureState) {
        return false;
      },
      onPanResponderTerminationRequest: function onPanResponderTerminationRequest() {
        return false;
      }
    });
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.close) this._close();
    if (nextProps.openRight) this._openRight();
    if (nextProps.openLeft) this._openLeft();
  },

  _handlePanResponderGrant: function _handlePanResponderGrant(e, gestureState) {
    var _this2 = this;

    if (this.props.disabled) return;
    if (!this.state.openedLeft && !this.state.openedRight) {
      this._callOnOpen();
    } else {
      this._callOnClose();
    }
    this.refs.swipeoutContent.measure(function (ox, oy, width, height) {
      var buttonWidth = _this2.props.buttonWidth || width / 5;
      _this2.setState({
        btnWidth: buttonWidth,
        btnsLeftWidth: _this2.props.left ? buttonWidth * _this2.props.left.length : 0,
        btnsRightWidth: _this2.props.right ? buttonWidth * _this2.props.right.length : 0,
        swiping: true,
        timeStart: new Date().getTime()
      });
    });
  },

  _handlePanResponderMove: function _handlePanResponderMove(e, gestureState) {
    if (this.props.disabled) return;
    var posX = gestureState.dx;
    var posY = gestureState.dy;
    var leftWidth = this.state.btnsLeftWidth;
    var rightWidth = this.state.btnsRightWidth;
    if (this.state.openedRight) var posX = gestureState.dx - rightWidth;else if (this.state.openedLeft) var posX = gestureState.dx + leftWidth;

    //  prevent scroll if moveX is true
    var moveX = Math.abs(posX) > Math.abs(posY);
    if (this.props.scroll) {
      if (moveX) this.props.scroll(false);else this.props.scroll(true);
    }
    if (this.state.swiping) {
      //  move content to reveal swipeout
      if (posX < 0 && this.props.right) {
        this.setState({ contentPos: Math.min(posX, 0) });
      } else if (posX > 0 && this.props.left) {
        this.setState({ contentPos: Math.max(posX, 0) });
      };
    }
  },

  _handlePanResponderEnd: function _handlePanResponderEnd(e, gestureState) {
    if (this.props.disabled) return;
    var posX = gestureState.dx;
    var contentPos = this.state.contentPos;
    var contentWidth = this.state.contentWidth;
    var btnsLeftWidth = this.state.btnsLeftWidth;
    var btnsRightWidth = this.state.btnsRightWidth;

    //  minimum threshold to open swipeout
    var openX = contentWidth * 0.33;

    //  should open swipeout
    var openLeft = posX > openX || posX > btnsLeftWidth / 2;
    var openRight = posX < -openX || posX < -btnsRightWidth / 2;

    //  account for open swipeouts
    if (this.state.openedRight) var openRight = posX - openX < -openX;
    if (this.state.openedLeft) var openLeft = posX + openX > openX;

    //  reveal swipeout on quick swipe
    var timeDiff = new Date().getTime() - this.state.timeStart < 200;
    if (timeDiff) {
      var openRight = posX < -openX / 10 && !this.state.openedLeft;
      var openLeft = posX > openX / 10 && !this.state.openedRight;
    }

    if (this.state.swiping) {
      if (openRight && contentPos < 0 && posX < 0) {
        this._open(-btnsRightWidth, 'right');
      } else if (openLeft && contentPos > 0 && posX > 0) {
        this._open(btnsLeftWidth, 'left');
      } else {
        this._close();
      }
    }

    //  Allow scroll
    if (this.props.scroll) this.props.scroll(true);
  },

  _tweenContent: function _tweenContent(state, endValue) {
    this.tweenState(state, {
      easing: _reactTweenState2.default.easingTypes.easeInOutQuad,
      duration: endValue === 0 ? this.state.tweenDuration * 1.5 : this.state.tweenDuration,
      endValue: endValue
    });
  },

  _rubberBandEasing: function _rubberBandEasing(value, limit) {
    if (value < 0 && value < limit) return limit - Math.pow(limit - value, 0.85);else if (value > 0 && value > limit) return limit + Math.pow(value - limit, 0.85);
    return value;
  },

  //  close swipeout on button press
  _autoClose: function _autoClose(btn) {
    if (this.state.autoClose) this._close();
    var onPress = btn.onPress;
    if (onPress) onPress();
  },

  _open: function _open(contentPos, direction) {
    var left = direction === 'left';
    var _props = this.props,
        sectionID = _props.sectionID,
        rowID = _props.rowID,
        onOpen = _props.onOpen;

    onOpen && onOpen(sectionID, rowID, direction);
    this._tweenContent('contentPos', contentPos);
    this.setState({
      contentPos: contentPos,
      openedLeft: left,
      openedRight: !left,
      swiping: false
    });
  },

  _close: function _close() {
    var _props2 = this.props,
        sectionID = _props2.sectionID,
        rowID = _props2.rowID,
        onClose = _props2.onClose;

    if (onClose && (this.state.openedLeft || this.state.openedRight)) {
      var direction = this.state.openedRight ? 'right' : 'left';
      onClose(sectionID, rowID, direction);
    }
    this._tweenContent('contentPos', 0);
    this._callOnClose();
    this.setState({
      openedRight: false,
      openedLeft: false,
      swiping: false
    });
  },

  _callOnClose: function _callOnClose() {
    if (this.props.onClose) this.props.onClose(this.props.sectionID, this.props.rowID);
  },

  _callOnOpen: function _callOnOpen() {
    if (this.props.onOpen) this.props.onOpen(this.props.sectionID, this.props.rowID);
  },

  _openRight: function _openRight() {
    var _this3 = this;

    this.refs.swipeoutContent.measure(function (ox, oy, width, height) {
      _this3.setState({
        btnWidth: width / 5,
        btnsRightWidth: _this3.props.right ? width / 5 * _this3.props.right.length : 0
      }, function () {
        _this3._tweenContent('contentPos', -_this3.state.btnsRightWidth);
        _this3._callOnOpen();
        _this3.setState({
          contentPos: -_this3.state.btnsRightWidth,
          openedLeft: false,
          openedRight: true,
          swiping: false
        });
      });
    });
  },

  _openLeft: function _openLeft() {
    var _this4 = this;

    this.refs.swipeoutContent.measure(function (ox, oy, width, height) {
      _this4.setState({
        btnWidth: width / 5,
        btnsLeftWidth: _this4.props.left ? width / 5 * _this4.props.left.length : 0
      }, function () {
        _this4._tweenContent('contentPos', _this4.state.btnsLeftWidth);
        _this4._callOnOpen();
        _this4.setState({
          contentPos: _this4.state.btnsLeftWidth,
          openedLeft: true,
          openedRight: false,
          swiping: false
        });
      });
    });
  },

  render: function render() {
    var contentWidth = this.state.contentWidth;
    var posX = this.getTweeningValue('contentPos');

    var styleSwipeout = [_styles2.default.swipeout, this.props.style];
    if (this.props.backgroundColor) {
      styleSwipeout.push([{ backgroundColor: this.props.backgroundColor }]);
    }

    var limit = -this.state.btnsRightWidth;
    if (posX > 0) var limit = this.state.btnsLeftWidth;

    var styleLeftPos = {
      left: {
        left: 0,
        overflow: 'hidden',
        width: Math.min(limit * (posX / limit), limit)
      }
    };
    var styleRightPos = {
      right: {
        left: Math.abs(contentWidth + Math.max(limit, posX)),
        right: 0
      }
    };
    var styleContentPos = {
      content: {
        left: this._rubberBandEasing(posX, limit)
      }
    };

    var styleContent = [_styles2.default.swipeoutContent];
    styleContent.push(styleContentPos.content);

    var styleRight = [_styles2.default.swipeoutBtns];
    styleRight.push(styleRightPos.right);

    var styleLeft = [_styles2.default.swipeoutBtns];
    styleLeft.push(styleLeftPos.left);

    var isRightVisible = posX < 0;
    var isLeftVisible = posX > 0;

    return _react2.default.createElement(
      _reactNative.View,
      { style: styleSwipeout },
      _react2.default.createElement(
        _reactNative.View,
        _extends({
          ref: 'swipeoutContent',
          style: styleContent,
          onLayout: this._onLayout
        }, this._panResponder.panHandlers),
        this.props.children
      ),
      this._renderButtons(this.props.right, isRightVisible, styleRight),
      this._renderButtons(this.props.left, isLeftVisible, styleLeft)
    );
  },

  _onLayout: function _onLayout(event) {
    var _event$nativeEvent$la = event.nativeEvent.layout,
        width = _event$nativeEvent$la.width,
        height = _event$nativeEvent$la.height;

    this.setState({
      contentWidth: width,
      contentHeight: height
    });
  },

  _renderButtons: function _renderButtons(buttons, isVisible, style) {
    if (buttons && isVisible) {
      return _react2.default.createElement(
        _reactNative.View,
        { style: style },
        buttons.map(this._renderButton)
      );
    } else {
      return _react2.default.createElement(_reactNative.View, null);
    }
  },

  _renderButton: function _renderButton(btn, i) {
    var _this5 = this;

    return _react2.default.createElement(SwipeoutBtn, {
      backgroundColor: btn.backgroundColor,
      color: btn.color,
      component: btn.component,
      disabled: btn.disabled,
      height: this.state.contentHeight,
      key: i,
      onPress: function onPress() {
        return _this5._autoClose(btn);
      },
      text: btn.text,
      type: btn.type,
      underlayColor: btn.underlayColor,
      width: this.state.btnWidth
    });
  }
});

Swipeout.NativeButton = _NativeButton2.default;
Swipeout.SwipeoutButton = SwipeoutBtn;

exports.default = Swipeout;