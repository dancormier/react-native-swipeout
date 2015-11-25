var React = require('react-native');
var {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React

class Btn extends React.Component {
  render() {
    let customStyle = this.props.style || {}
    return (
      <TouchableHighlight {...this.props} style={[styles.btn, customStyle]} >
        <Text style={styles.btnText}>{this.props.text}</Text>
      </TouchableHighlight>
    )
  }
}

class Swipeout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      panX: new Animated.Value(0),
      props: props,
      width: 0,
    };
    this.state.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderGrant: (e, gestureState) => {
        let { panX } = this.state;
        panX.setOffset(panX._value);
      },

      onPanResponderMove: Animated.event([null, {
        dx: this.state.panX,
      }]),

      onPanResponderRelease: (e, gestureState) => {

        let {
          panX,
          left,
          leftWidth,
          right,
          rightWidth,
          start
        } = this.state;

        let change = (gestureState.moveX - gestureState.x0);
        let velocity = Math.abs(gestureState.vx);
        let velocityMin = 0.3;
        let speed = 200/velocity;
        let duration = speed > 100 ? Math.min(speed, 200) : 100;

        let openLeft = change > leftWidth && !right || change > 0 && left || velocity > velocityMin && !right && change > 0;
        let openRight = change < -rightWidth && !left || change < 0 && right || velocity > velocityMin && !left && change < 0;

        panX.flattenOffset();

        Animated.timing(panX, {
          duration: duration,
          toValue: openRight ? -rightWidth : openLeft ? leftWidth : 0
        }).start();

        this.setState({
          left: openLeft,
          right: openRight
        });

      },
    });
  }
  componentDidMount() {
    setTimeout(this.measureSwipeout.bind(this));
  }
  measureSwipeout() {
    this.refs.swipeout.measure((a, b, width, height, px, py) => {
      let { props } = this.state;
      this.setState({
        height: height,
        width: width,
        leftWidth: props.left ? (width/5) * props.left.length : 0,
        rightWidth: props.right ? (width/5) * props.right.length : 0,
      });
    });
  }
  render() {
    let { panX, props, height, width: w } = this.state;

    let xContent = panX.interpolate({
      inputRange: [-w, 0, w],
      outputRange: [props.right ? -w : 0, 0, props.left ? w : 0],
    })

    let styleBtnsLeft = {
      height: height,
      left: 0,
      width: panX.interpolate({inputRange: [0, w], outputRange: [0, w]})
    }
    let styleBtnsRight = {
      height: height,
      right: 0,
      width: panX.interpolate({inputRange: [-w, 0], outputRange: [w, 0]})
    }

    return (
      <View ref="swipeout" style={styles.container}>

        {props.left && w ?
          <Animated.View {...this.state.panResponder.panHandlers}
            style={[styles.btns, styleBtnsLeft]}>
            {
              props.left.map(function(btn) {
                let btnProps = btn.props ? btn.props[0] : []
                return <Btn text={btn.text} {...btnProps}/>
              })
            }
          </Animated.View>
        : <View/>}

        {props.right ?
          <Animated.View {...this.state.panResponder.panHandlers}
            style={[styles.btns, styleBtnsRight]}>
            {
              props.right.map(function(btn) {
                let btnProps = btn.props ? btn.props[0] : []
                return <Btn text={btn.text} {...btnProps}/>
              })
            }
          </Animated.View>
        : <View/>}

        <Animated.View
          {...this.state.panResponder.panHandlers}
          style={{flex: 2, transform: [{translateX: xContent}]}}>
          {this.props.children}
        </Animated.View>

      </View>
    );
  }
}

var styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    backgroundColor: '#b6bec0',
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  btnText: {
    color: '#fff',
  },
  btns: {
    backgroundColor: 'blue',
    flex: 1,
    flexDirection: 'row',
    height: 20,
    overflow: 'hidden',
    position: 'absolute',
  },
  container: {
    backgroundColor: 'red',
    flex: 1,
    flexDirection: 'row',
  },
});

module.exports = Swipeout
