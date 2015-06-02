var React = require('react-native')
var tweenState = require('react-tween-state')
var Dimensions = require('Dimensions')
var {PanResponder, TouchableHighlight, StyleSheet, Text, View} = React
var styles = require('./styles.js')

var SwipeoutBtn = React.createClass({
  getDefaultProps: function() {
    return {
      backgroundColor: null,
      color: null,
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
    var styleSwipeoutBtnText = [styles.swipeoutBtnText]
    styleSwipeoutBtn.push([{
      height: btn.height,
      width: btn.width,
    }])
    if (btn.type === 'delete') styleSwipeoutBtn.push(styles.colorDelete)
    else if (btn.type === 'primary') styleSwipeoutBtn.push(styles.colorPrimary)
    else if (btn.type === 'secondary') styleSwipeoutBtn.push(styles.colorSecondary)
    if (btn.backgroundColor) styleSwipeoutBtn.push([{ backgroundColor: btn.backgroundColor }])
    if (btn.color) styleSwipeoutBtnText.push([{ color: btn.color }])

    return  (
      <TouchableHighlight
        onPress={this.props.onPress}
        style={styles.swipeoutBtnTouchable}
      >
        <View style={styleSwipeoutBtn}>
          <Text style={styleSwipeoutBtnText}>{btn.text}</Text>
        </View>
      </TouchableHighlight>
    )
  }
})

var Swipeout = React.createClass({
  mixins: [tweenState.Mixin]
, getInitialState: function() {
    return {
      autoClose: this.props.autoClose || false,
      btnWidth: 0,
      btnsWidth: 0,
      contentHeight: 0,
      contentPos: 0,
      contentWidth: Dimensions.get('window').width,
      exposed: false,
      swiping: false,
      tweenDuration: 160,
      timeSwipeStart: null,
    }
  }
, componentWillMount: function() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });
  }
, _handleStartShouldSetPanResponder: function(e: Object, gestureState: Object): boolean {
    return true;
  }
, _handleMoveShouldSetPanResponder: function(e: Object, gestureState: Object): boolean {
    return true;
  }
, _handlePanResponderGrant: function(e: Object, gestureState: Object) {
    this.refs.swipeoutContent.measure((ox, oy, width, height) => {
      this.setState({
        btnWidth: (width/5),
        btnsWidth: (width/5)*this.props.btns.length,
        contentHeight: height,
        contentWidth: width,
        swiping: true,
        timeSwipeStart: (new Date()).getTime(),
      })
    })
  }
, _handlePanResponderMove: function(e: Object, gestureState: Object) {
    var posX = gestureState.dx
    if (this.state.exposed) var posX = gestureState.dx - this.state.btnsWidth
    if (this.state.swiping) this.setState({ contentPos: Math.min(posX, 0) })
  }
, _handlePanResponderEnd: function(e: Object, gestureState: Object) {
    var timeDiff = (new Date()).getTime() - this.state.timeSwipeStart < 200
    var btnsWidth = -1*(this.state.btnsWidth)
    var contentWidth = this.state.contentWidth
    var posX = gestureState.dx
    var openX = -1*(contentWidth*0.33)
    var expose = posX < openX || posX < btnsWidth
    if (this.state.exposed) var expose = posX+openX < openX

    if (this.state.swiping) {
      if (timeDiff) {
        var expose = posX < openX/10
        this.tweenState('contentPos', {
          easing: tweenState.easingTypes.easeInOutQuad,
          duration: this.state.tweenDuration/2,
          endValue: expose ? btnsWidth : 0
        })
        if (expose) this.setState({ contentPos: btnsWidth, exposed: true })
        else this.setState({ contentPos: 0, exposed: false })
      } else {
        this.tweenState('contentPos', {
          easing: tweenState.easingTypes.easeInOutQuad,
          duration: this.state.tweenDuration,
          endValue: expose ? btnsWidth : 0
        })
        if (expose) this.setState({ contentPos: btnsWidth, exposed: true })
        else this.setState({ contentPos: 0, exposed: false })
      }
    }
    this.setState({ swiping: false })
  }
, _rubberBandEasing: function(value, lowerLimit) {
    if(value < lowerLimit) {
      return lowerLimit - Math.pow(lowerLimit - value, 0.85);
    }
    return value;
  }
, _autoClose: function(i) {
    var onPress = this.props.btns[i].onPress
    if (onPress) onPress()
    if (this.state.autoClose) {
      this.tweenState('contentPos', {
        easing: tweenState.easingTypes.easeInOutQuad,
        duration: this.state.tweenDuration,
        endValue: 0
      })
      this.setState({ exposed: false })
    }
  }
, render: function() {
    var self = this

    var styleSwipeout = [styles.swipeout]
    if (self.props.backgroundColor) {
      styleSwipeout.push([{ backgroundColor: self.props.backgroundColor }])
    }

    var styleSwipeoutMove = StyleSheet.create({
      swipeoutBtns: {
        left: Math.abs(self.state.contentWidth+ Math.max(self.state.btnsWidth*-1, self.getTweeningValue('contentPos'))),
      },
      swipeoutContent: {
        left: self._rubberBandEasing(self.getTweeningValue('contentPos'), self.state.btnsWidth*-1),
      }
    })

    var styleSwipeoutContent = [styles.swipeoutContent]
    styleSwipeoutContent.push(styleSwipeoutMove.swipeoutContent)

    var styleSwipeoutBtns = [styles.swipeoutBtns]
    styleSwipeoutBtns.push(styleSwipeoutMove.swipeoutBtns)

    return (
      <View style={styleSwipeout}>
        <View ref="swipeoutContent" style={styleSwipeoutContent} {...self._panResponder.panHandlers}>
          {self.props.children}
        </View>
        <View style={styleSwipeoutBtns}>
          {
            self.props.btns.map(function(btn, i){
              return (
                <SwipeoutBtn
                  backgroundColor={btn.backgroundColor}
                  color={btn.color}
                  height={self.state.contentHeight}
                  key={i}
                  onPress={() => self._autoClose(i)}
                  text={btn.text}
                  type={btn.type}
                  width={self.state.btnWidth}/>
              )
            })
          }
        </View>
      </View>
    )
  }
})

module.exports = Swipeout