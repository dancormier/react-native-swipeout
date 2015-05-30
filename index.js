var React = require('react-native')
var tweenState = require('react-tween-state')
var Dimensions = require('Dimensions')
var {PanResponder, TouchableHighlight, StyleSheet, Text, View} = React
var styles = require('./styles.js')

var Swipeout = React.createClass({
  mixins: [tweenState.Mixin]
, getInitialState: function() {
    return {
      btnWidth: 0,
      btnsWidth: 0,
      contentHeight: 0,
      contentPos: 0,
      contentWidth: Dimensions.get('window').width,
      exposed: false,
      swiping: false,
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
      })
    })
  }
, _handlePanResponderMove: function(e: Object, gestureState: Object) {
    var xPos = gestureState.dx
    if (this.state.exposed) var xPos = gestureState.dx - this.state.btnsWidth
    if (this.state.swiping) this.setState({ contentPos: Math.min(xPos, 0) })
  }
, _handlePanResponderEnd: function(e: Object, gestureState: Object) {
    var contentWidth = this.state.contentWidth
    var expose = gestureState.dx < -1*(contentWidth*0.33)
    var btnsWidth = -1*(this.state.btnsWidth)
    if (this.state.swiping) {
      this.tweenState('contentPos', {
        easing: tweenState.easingTypes.easeInOutQuad,
        duration: 160,
        endValue: expose ? btnsWidth : 0
      })
      if (expose) this.setState({ contentPos: btnsWidth, exposed: true })
      else this.setState({ contentPos: 0, exposed: false })
    }
    this.setState({ swiping: false })
  }
, _rubberBandEasing: function(value, lowerLimit) {
    if(value < lowerLimit) {
      return lowerLimit - Math.pow(lowerLimit - value, 0.85);
    } 
    return value;
  }
, render: function() {
    var self = this
    var styleSwipeout = [styles.swipeout]
    if (self.props.backgroundColor) styleSwipeout.push([{ backgroundColor: self.props.backgroundColor }])
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
    var Btns = self.props.btns.map(function(btn, i){
      var styleSwipeoutBtn = [styles.swipeoutBtn]
      var styleSwipeoutBtnText = [styles.swipeoutBtnText]
      styleSwipeoutBtn.push([{
        height: self.state.contentHeight,
        width: self.state.btnWidth,
      }])
      if (btn.type === 'delete') styleSwipeoutBtn.push(styles.colorDelete)
      else if (btn.type === 'primary') styleSwipeoutBtn.push(styles.colorPrimary)
      else if (btn.type === 'secondary') styleSwipeoutBtn.push(styles.colorSecondary)
      if (btn.color) styleSwipeoutBtn.push([{ backgroundColor: btn.color }])
      if (btn.textColor) styleSwipeoutBtnText.push([{ color: btn.textColor }])
      return  <TouchableHighlight
                key={i}
                onPress={btn.onPress}
                style={styles.swipeoutBtnTouchable}
              >
                <View style={styleSwipeoutBtn}>
                  <Text style={styleSwipeoutBtnText}>{btn.text}</Text>
                </View>
              </TouchableHighlight>
    })
    return (
      <View style={styles.swipeout}>
        <View ref="swipeoutContent" style={styleSwipeoutContent} {...self._panResponder.panHandlers}>
          {self.props.children}
        </View>
        <View style={styleSwipeoutBtns}>{Btns}</View>
      </View>
    )
  }
})

module.exports = Swipeout