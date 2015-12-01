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
  setTypeStyle(element) {
    switch (this.props.type) {
      case "danger":
      case "delete":
        return styles.btnDanger;
        break;
      case "primary":
        return styles.btnPrimary;
        break;
      case "secondary":
        return styles.btnSecondary;
        break;
      case "success":
        return styles.btnSuccess;
      default:
        return {};
        break;
    }
  }
  render() {
    let customStyle = this.props.style || {};

    return (
      <TouchableHighlight {...this.props} style={[styles.btn, this.setTypeStyle(), customStyle]}>
        <Text style={styles.btnText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}

class Swipeout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultSpeed: 100,
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
          defaultSpeed,
          panX,
          left,
          leftWidth,
          right,
          rightWidth,
          start
        } = this.state;

        let moved = gestureState.moveX != 0;
        let change = gestureState.moveX - gestureState.x0;
        let velocity = Math.abs(gestureState.vx);
        let velocityMin = 0.3;
        let speed = 200/velocity;
        let duration = speed > defaultSpeed ? Math.min(speed, 200) : defaultSpeed;

        let openLeft = change > leftWidth && !right || change > 0 && left || velocity > velocityMin && !right && change > 0;
        let openRight = change < -rightWidth && !left && moved || change < 0 && right || velocity > velocityMin && !left && change < 0;

        panX.flattenOffset();

        if (openRight || openLeft) {
          let toValue = openRight ? -rightWidth : leftWidth;
          this.handleOpen(duration, toValue);
        } else {
          this.handleClose(defaultSpeed);
        };

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
  handleBtnPress(btn) {
    let { defaultSpeed } = this.state;
    if (btn.props && btn.props.onPress) btn.props.onPress();
    if (btn.autoClose) this.handleClose(defaultSpeed*2);
  }
  handleClose(duration) {
    Animated.timing(this.state.panX, {
      duration: duration,
      toValue: 0,
    }).start();
    if (this.props.onClose) this.props.onClose();
  }
  handleOpen(duration, toValue) {
    Animated.timing(this.state.panX, {
      duration: duration,
      toValue: toValue,
    }).start();
    if (this.props.onOpen) this.props.onOpen();
  }
  getBtnsWidth(group, defaultWidth) {
    let width = 0;
    group.forEach(btn => {
      width += btn.props && btn.props.style && btn.props.style.width ? btn.props.style.width : defaultWidth;
    });
    return width;
  }
  measureSwipeout() {
    this.refs.swipeout.measure((a, b, width, height, px, py) => {
      let { props } = this.state;
      let { left, right } = props;
      let defaultWidth = width/5;

      this.setState({
        height: height,
        width: width,
        leftWidth: props.left ? this.getBtnsWidth(left, defaultWidth) : 0,
        rightWidth: props.right ? this.getBtnsWidth(right, defaultWidth) : 0,
      });
    });
  }
  render() {
    let { panX, props, height, width: w } = this.state;

    let customStyle = this.props.style || {};

    let xContent = panX.interpolate({
      inputRange: [-w, 0, w],
      outputRange: [props.right ? -w : 0, 0, props.left ? w : 0],
    });

    let styleBtnsLeft = {
      height: height,
      left: 0,
      width: panX.interpolate({inputRange: [0, w], outputRange: [0, w]}),
    };
    let styleBtnsRight = {
      height: height,
      right: 0,
      width: panX.interpolate({inputRange: [-w, 0], outputRange: [w, 0]}),
    };

    let self = this;

    return (
      <View ref="swipeout" style={[styles.container, customStyle]}>

        {props.left && w ?
          <Animated.View {...this.state.panResponder.panHandlers}
            style={[styles.btns, styleBtnsLeft]}>
            {
              props.left.map(function(btn, i) {
                let btnProps = btn.props ? btn.props : [];
                return (
                  <Btn
                    key={i}
                    text={btn.text}
                    {...btnProps}
                    onPress={() => self.handleBtnPress(btn)}/>
                )
              })
            }
          </Animated.View>
        : <View/>}

        {props.right ?
          <Animated.View {...this.state.panResponder.panHandlers}
            style={[styles.btns, styleBtnsRight]}>
            {
              props.right.map(function(btn, i) {
                let btnProps = btn.props ? btn.props : [];
                return (
                  <Btn
                    key={i}
                    text={btn.text}
                    type={btn.type}
                    {...btnProps}
                    onPress={() => self.handleBtnPress(btn)}/>
                )
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
};

var styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    backgroundColor: '#b6bec0',
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  btnDanger: {
    backgroundColor: '#FF3B30',
  },
  btnPrimary: {
    backgroundColor: '#006fff',
  },
  btnSecondary: {
    backgroundColor: '#fd9427',
  },
  btnSuccess: {
    backgroundColor: '#4cd965',
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

module.exports = Swipeout;
