var React = require('react-native')
var tweenState = require('react-tween-state')
var Dimensions = require('Dimensions')
var {PanResponder, TouchableHighlight, StyleSheet, Text, View} = React
var styles = require('./styles.js')

var Swipeout = React.createClass({
  mixins: [tweenState.Mixin]
, getInitialState: function() {
    var {width, height} = Dimensions.get('window');
    return {
      height: height
    , swipeoutMaxWidth: (width/5 - 4)*this.props.btns.length
    , swipeoutOpen: false
    , swipeoutTimeStart: null
    , swiping: false
    , width: width
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
    this.setState({
      swiping: true,
      swipeoutTimeStart: (new Date()).getTime()
    })
  }
, _handlePanResponderMove: function(e: Object, gestureState: Object) {
    var timeDiff = (new Date()).getTime() - this.state.swipeoutTimeStart
    var xMin = 0
    var xPos = gestureState.dx
    if (this.state.swipeoutOpen) var xPos = gestureState.dx - this.state.swipeoutMaxWidth
    if (this.state.swiping) {
      if (timeDiff < 160 && xMin-xPos > 10) {
        this.tweenState('contentLeft', {
          easing: tweenState.easingTypes.easeInOutQuad,
          duration: 200,
          endValue: -this.state.swipeoutMaxWidth
        })
      } else if (xPos < 0) {
        this.setState({ contentLeft: xPos })
      } else {
        this.setState({ contentLeft: 0 })
      }
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
, render: function() {
    var self = this
    var styleSwipeoutMove = StyleSheet.create({
      swipeoutBtns: {
        left: Math.abs(this.state.width+this.getTweeningValue('contentLeft'))
      },
      swipeoutContent: {
        left: this.getTweeningValue('contentLeft')
      }
    })
    var styleSwipeoutContent = [styles.swipeoutContent]
    styleSwipeoutContent.push(styleSwipeoutMove.swipeoutContent)
    var styleSwipeoutBtns = [styles.swipeoutBtns]
    styleSwipeoutBtns.push(styleSwipeoutMove.swipeoutBtns)
    var Btns = this.props.btns.map(function(btn, i){
      var styleSwipeoutBtn = [styles.swipeoutBtn]
      var styleSwipeoutBtnText = [styles.swipeoutBtnText]
      if (btn.type === 'delete') styleSwipeoutBtn.push(styles.colorDelete)
      else if (btn.type === 'primary') styleSwipeoutBtn.push(styles.colorPrimary)
      else if (btn.type === 'secondary') styleSwipeoutBtn.push(styles.colorSecondary)
      if (btn.color) styleSwipeoutBtn.push([{backgroundColor: btn.color}])
      if (btn.textColor) styleSwipeoutBtnText.push([{color: btn.textColor}])
      return  <TouchableHighlight
                key={i}
                style={styleSwipeoutBtn}
                underlayColor="rgba(0,0,0,.015)"
                onPress={btn.onPress}>
                  <Text style={styleSwipeoutBtnText}>{btn.text}</Text>
              </TouchableHighlight>
    })
    return (
      <View style={styles.swipeout}>
        <View style={styleSwipeoutBtns}>{Btns}</View>
        <View style={styleSwipeoutContent} {...this._panResponder.panHandlers}>
          {this.props.children}
        </View>
      </View>
    )
  }
})

module.exports = Swipeout