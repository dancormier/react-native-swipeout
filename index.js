var React = require('react-native')
var tweenState = require('react-tween-state')
var {PanResponder, TouchableHighlight, StyleSheet, Text, View} = React
var styles = require('./styles.js')

var SwipeoutBtn = React.createClass({
  getDefaultProps: function() {
    return {
      backgroundColor: null,
      color: null,
      component: null,
      underlayColor: null,
      height: 0,
      key: null,
      onPress: null,
      text: 'Click me',
      type: '',
      width: 0,
    }
  }
, render: function() {
    var btn = this.props

    var styleSwipeoutBtn = [styles.swipeoutBtn]

    //  apply "type" styles (delete || primary || secondary)
    if (btn.type === 'delete') styleSwipeoutBtn.push(styles.colorDelete)
    else if (btn.type === 'primary') styleSwipeoutBtn.push(styles.colorPrimary)
    else if (btn.type === 'secondary') styleSwipeoutBtn.push(styles.colorSecondary)

    //  apply background color
    if (btn.backgroundColor) styleSwipeoutBtn.push([{ backgroundColor: btn.backgroundColor }])

    styleSwipeoutBtn.push([{
      height: btn.height,
      width: btn.width,
    }])

    var styleSwipeoutBtnComponent = []

    //  set button dimensions
    styleSwipeoutBtnComponent.push([{
      height: btn.height,
      width: btn.width,
    }])

    var styleSwipeoutBtnText = [styles.swipeoutBtnText]

    //  apply text color
    if (btn.color) styleSwipeoutBtnText.push([{ color: btn.color }])

    return  (
      <TouchableHighlight
        onPress={this.props.onPress}
        style={styles.swipeoutBtnTouchable}
        underlayColor={this.props.underlayColor}
      >
        <View style={styleSwipeoutBtn}>
          {btn.component ?
            <View style={styleSwipeoutBtnComponent}>{btn.component}</View>
          : <Text style={styleSwipeoutBtnText}>{btn.text}</Text>
          }
        </View>
      </TouchableHighlight>
    )
  }
})

var Swipeout = React.createClass({
  mixins: [tweenState.Mixin]
, getDefaultProps: function() {
    return {
      rowID: -1,
      sectionID: -1,
    }
  }
, getInitialState: function() {
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
      timeStart: null,
    }
  }
, componentWillMount: function() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onMoveShouldSetPanResponder: (event, gestureState) => !(gestureState.dx === 0 || gestureState.dy === 0),
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
      onShouldBlockNativeResponder: (event, gestureState) => true,
    });
  }
, componentWillReceiveProps: function(nextProps) {
    if (nextProps.close) this._close()
  }
, _handlePanResponderGrant: function(e: Object, gestureState: Object) {
    if(this.props.onOpen){
      this.props.onOpen(this.props.sectionID, this.props.rowID)
    }
    this.refs.swipeoutContent.measure((ox, oy, width, height) => {
      this.setState({
        btnWidth: (width/5),
        btnsLeftWidth: this.props.left ? (width/5)*this.props.left.length : 0,
        btnsRightWidth: this.props.right ? (width/5)*this.props.right.length : 0,
        swiping: true,
        timeStart: (new Date()).getTime(),
      })
    })
  }
, _handlePanResponderMove: function(e: Object, gestureState: Object) {
    var posX = gestureState.dx
    var posY = gestureState.dy
    var leftWidth = this.state.btnsLeftWidth
    var rightWidth = this.state.btnsRightWidth
    if (this.state.openedRight) var posX = gestureState.dx - rightWidth
    else if (this.state.openedLeft) var posX = gestureState.dx + leftWidth

    //  prevent scroll if moveX is true
    var moveX = Math.abs(posX) > Math.abs(posY)
    if (this.props.scroll) {
      if (moveX) this.props.scroll(false)
      else this.props.scroll(true)
    }
    if (this.state.swiping) {
      //  move content to reveal swipeout
      if (posX < 0 && this.props.right) this.setState({ contentPos: Math.min(posX, 0) })
      else if (posX > 0 && this.props.left) this.setState({ contentPos: Math.max(posX, 0) })
    }
  }
, _handlePanResponderEnd: function(e: Object, gestureState: Object) {
    var posX = gestureState.dx
    var posY = gestureState.dy
    var contentPos = this.state.contentPos
    var contentWidth = this.state.contentWidth
    var btnsLeftWidth = this.state.btnsLeftWidth
    var btnsRightWidth = this.state.btnsRightWidth

    //  minimum threshold to open swipeout
    var openX = contentWidth*0.33

    //  should open swipeout
    var openLeft = posX > openX || posX > btnsLeftWidth/2
    var openRight = posX < -openX || posX < -btnsRightWidth/2

    //  account for open swipeouts
    if (this.state.openedRight) var openRight = posX-openX < -openX
    if (this.state.openedLeft) var openLeft = posX+openX > openX

    //  reveal swipeout on quick swipe
    var timeDiff = (new Date()).getTime() - this.state.timeStart < 200
    if (timeDiff) {
      var openRight = posX < -openX/10 && !this.state.openedLeft
      var openLeft = posX > openX/10 && !this.state.openedRight
    }

    if (this.state.swiping) {
      if (posX == 0 && posY == 0) {
        var onPress = this.props.onPress;
        if (onPress) onPress();
      }

      if (openRight && contentPos < 0 && posX < 0) {
        // open swipeout right
        this._tweenContent('contentPos', -btnsRightWidth)
        this.setState({ contentPos: -btnsRightWidth, openedLeft: false, openedRight: true })
      } else if (openLeft && contentPos > 0 && posX > 0) {
        // open swipeout left
        this._tweenContent('contentPos', btnsLeftWidth)
        this.setState({ contentPos: btnsLeftWidth, openedLeft: true, openedRight: false })
      }
      else {
        // close swipeout
        this._tweenContent('contentPos', 0)
        this.setState({ contentPos: 0, openedLeft: false, openedRight: false })
      }
    }

    //  Allow scroll
    if (this.props.scroll) this.props.scroll(true)
  }
, _tweenContent: function(state, endValue) {
    this.tweenState(state, {
      easing: tweenState.easingTypes.easeInOutQuad,
      duration: endValue === 0 ? this.state.tweenDuration*1.5 : this.state.tweenDuration,
      endValue: endValue
    })
  }
, _rubberBandEasing: function(value, limit) {
    if (value < 0 && value < limit) return limit - Math.pow(limit - value, 0.85);
    else if (value > 0 && value > limit) return limit + Math.pow(value - limit, 0.85);
    return value;
  }

//  close swipeout on button press
, _autoClose: function(btn) {
    var onPress = btn.onPress
    if (onPress) onPress()
    if (this.state.autoClose) this._close()
  }
, _close: function() {
    this._tweenContent('contentPos', 0)
    this.setState({
      openedRight: false,
      openedLeft: false,
    })
  }
, render: function() {
    var contentWidth = this.state.contentWidth
    var posX = this.getTweeningValue('contentPos')

    var styleSwipeout = [styles.swipeout]
    if (this.props.backgroundColor) {
      styleSwipeout.push([{ backgroundColor: this.props.backgroundColor }])
    }

    var limit = -this.state.btnsRightWidth
    if (posX > 0) var limit = this.state.btnsLeftWidth

    var styleLeftPos = {
      left: {
        left: 0,
        overflow: 'hidden',
        width: Math.min(limit*(posX/limit), limit),
      }
    }
    var styleRightPos = {
      right: {
        left: Math.abs(contentWidth + Math.max(limit, posX)),
        right: 0,
      }
    }
    var styleContentPos = {
      content: {
        left: this._rubberBandEasing(posX, limit),
      }
    }

    var styleContent = [styles.swipeoutContent]
    styleContent.push(styleContentPos.content)

    var styleRight = [styles.swipeoutBtns]
    styleRight.push(styleRightPos.right)

    var styleLeft = [styles.swipeoutBtns]
    styleLeft.push(styleLeftPos.left)

    var isRightVisible = posX < 0;
    var isLeftVisible = posX > 0;

    return (
      <View style={styleSwipeout}>
        <View
          ref="swipeoutContent"
          style={styleContent}
          onLayout={this._onLayout}
          {...this._panResponder.panHandlers}>
          {this.props.children}
        </View>
        { this._renderButtons(this.props.right, isRightVisible, styleRight) }
        { this._renderButtons(this.props.left, isLeftVisible, styleLeft) }
      </View>
    )},

    _onLayout: function(event) {
      var { width, height } = event.nativeEvent.layout;
      this.setState({
        contentWidth: width,
        contentHeight: height
      });
    },

    _renderButtons: function(buttons, isVisible, style) {
      if (buttons && isVisible) {
        return( <View style={style}>
          { buttons.map(this._renderButton) }
        </View>);
      } else {
        return (
          <View/>
        );
      }
    },

    _renderButton: function(btn, i) {
      return (
        <SwipeoutBtn
            backgroundColor={btn.backgroundColor}
            color={btn.color}
            component={btn.component}
            height={this.state.contentHeight}
            key={i}
            onPress={() => this._autoClose(btn)}
            text={btn.text}
            type={btn.type}
            underlayColor={btn.underlayColor}
            width={this.state.btnWidth}/>
      )
    }
})

module.exports = Swipeout
