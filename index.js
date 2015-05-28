var React = require('react-native')
var tweenState = require('react-tween-state')
var Dimensions = require('Dimensions')
var {PanResponder, TouchableHighlight, StyleSheet, Text, View} = React
var styles = require('./styles.js')

var Swipeout = React.createClass({
  mixins: [tweenState.Mixin]
, getInitialState: function() {
    return {
      height: 0
    , swipeoutMaxWidth: 0
    , swipeoutOpen: false
    , swiping: false
    , width: Dimensions.get('window').width
    , contentLeft: 0
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
, componentDidMount: function() {

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
        height: height,
        swiping: true,
        swipeoutMaxWidth: (width/5 - 4)*this.props.btns.length,
        width: width
      })
    })
  }
, _handlePanResponderMove: function(e: Object, gestureState: Object) {
    var xMin = 0
    var xPos = gestureState.dx
    if (this.state.swipeoutOpen) var xPos = gestureState.dx - this.state.swipeoutMaxWidth
    if (this.state.swiping) {
      this.setState({ contentLeft: Math.min(xPos, xMin) })
    }
  }
, _handlePanResponderEnd: function(e: Object, gestureState: Object) {
    var width = this.state.width
    var swipeoutShow = gestureState.dx < -1*(width*0.33)
    var swipeoutWidth = -1*(this.state.swipeoutMaxWidth)
    if (this.state.swiping) {
      this.tweenState('contentLeft', {
        easing: tweenState.easingTypes.easeInOutQuad,
        duration: 200,
        endValue: swipeoutShow ? swipeoutWidth : 0
      })
      if (swipeoutShow) this.setState({ contentLeft: swipeoutWidth, swipeoutOpen: true })
      else this.setState({ contentLeft: 0, swipeoutOpen: false })
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
    var styleSwipeoutMove = StyleSheet.create({
      swipeoutBtns: {
        left: Math.abs(this.state.width+ Math.max(this.state.swipeoutMaxWidth*-1, this.getTweeningValue('contentLeft')))
      },
      swipeoutContent: {
        left: this._rubberBandEasing(this.getTweeningValue('contentLeft'), this.state.swipeoutMaxWidth*-1)
      }
    })
    var styleSwipeoutContent = [styles.swipeoutContent]
    styleSwipeoutContent.push(styleSwipeoutMove.swipeoutContent)
    var styleSwipeoutBtns = [styles.swipeoutBtns]
    styleSwipeoutBtns.push(styleSwipeoutMove.swipeoutBtns)
    var Btns = this.props.btns.map(function(btn, i){
      var styleSwipeoutBtn = [styles.swipeoutBtn]
      var styleSwipeoutBtnText = [styles.swipeoutBtnText]
      styleSwipeoutBtn.push([{ height: self.state.height }])
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
        <View ref="swipeoutContent" style={styleSwipeoutContent} {...this._panResponder.panHandlers}>
          {this.props.children}
        </View>
        <View style={styleSwipeoutBtns}>{Btns}</View>
      </View>
    )
  }
})

module.exports = Swipeout