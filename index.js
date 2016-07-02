const React = require('react-native');
const {
  Animated,
  PanResponder,
  StyleSheet,
  View
} = React

const Btn = require('./components/btn.js');

class Swipeout extends React.Component {
  componentDidMount() {
    let { panX } = this.state;

    setTimeout(this.measureSwipeout.bind(this));
    panX.addListener((value) => this.panListener(value.value));
  }
  componentWillUpdate(nextProps, nextState) {
    let {open} = this.props;
    let nextOpen = nextProps.open;

    if (open != nextProps.open) {
      if(!nextOpen) {
        this.handleClose(200);
      } else {
        this.handleOpen(200, nextOpen === "right" ? -this.state.rightWidth : this.state.leftWidth);
      }
    }
  }
  componentWillUnmount() {
    let { panX } = this.state;

    panX.removeAllListeners();
  }
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      leftBtnWidthDefault: 0,
      leftBtnWidths: [],
      leftOpen: false,
      leftVisible: false,
      leftWidth: 0,
      panX: new Animated.Value(0),
      rightBtnWidthDefault: 0,
      rightBtnWidths: [],
      rightOpen: false,
      rightVisible: false,
      rightWidth: 0,
      scroll: true,
      self: this,
      speedDefault: 100,
      width: 0,
    };

    this.state.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        let {
          panX,
          leftOpen,
          rightOpen,
        } = this.state;
        if (leftOpen || rightOpen) panX.setOffset(panX._value);
      },
      onPanResponderMove: Animated.event(
        [null, {
          dx: this.state.panX,
        }]
      ),
      onPanResponderRelease: (e, gestureState) => {
        this.handleEnd(e, gestureState);
      },
      onPanResponderTerminate: (e, gestureState) => {
        this.handleEnd(e, gestureState);
      },
    });
  }
  btnWidth(btn) {
    let hasCustomWidth = btn.props && btn.props.style && btn.props.style.width;
    return hasCustomWidth ? btn.props.style.width : false;
  }
  btnsWidthTotal(width, group, side) {
    let customWidths = [];

    group.forEach(btn => {
      this.btnWidth(btn) ? customWidths.push(this.btnWidth(btn)) : null;
    });

    let customWidthTotal = customWidths.reduce((a, b) => a + b, 0);
    let defaultWidth = (width - customWidthTotal)/(5 - customWidths.length);
    let defaultWidthsTotal = (group.length - customWidths.length) * defaultWidth;

    this.setState(side === 'left' ?
      { leftBtnWidthDefault: defaultWidth }
    : { rightBtnWidthDefault: defaultWidth }
    )

    return customWidthTotal + defaultWidthsTotal;
  }
  setBtnsWidth(left, right) {
    let {
      leftBtnWidthDefault: leftDefault,
      rightBtnWidthDefault: rightDefault,
    } = this.state;
    let leftWidths = [];
    let rightWidths = [];

    left ? left.forEach(btn => {
      leftWidths.push(this.btnWidth(btn) ? this.btnWidth(btn) : leftDefault);
    }) : null;

    right ? right.forEach(btn => {
      rightWidths.push(this.btnWidth(btn) ? this.btnWidth(btn) : rightDefault);
    }): null;

    this.setState({
      leftBtnWidths: leftWidths,
      rightBtnWidths: rightWidths,
    });
  }
  handleBtnPress(btn) {
    let { speedDefault } = this.state;

    if (btn.props && btn.props.onPress) btn.props.onPress();
    if (btn.autoClose) this.handleClose(speedDefault*2);
  }
  handleClose(duration) {
    let { onClose } = this.props;
    if (onClose) onClose();

    Animated.timing(this.state.panX, {
      duration: duration,
      toValue: 0,
    }).start();
  }
  handleEnd(e, gestureState) {
    let { onSwipeEnd } = this.props;
    let {
      speedDefault,
      panX,
      leftOpen,
      leftWidth,
      rightOpen,
      rightWidth,
    } = this.state;

    let move = gestureState.moveX;
    let moved = Math.abs(move) > 0;
    let change = move - gestureState.x0;
    let velocity = Math.abs(gestureState.vx);
    let speed = 200/velocity;
    let duration = speed > speedDefault ? Math.min(speed, 200) : speedDefault;
    let leftShouldOpen = change > 0 && move && this.shouldOpen(change, leftWidth, velocity, leftOpen, rightOpen);
    let rightShouldOpen = change < 0 && move && this.shouldOpen(change, rightWidth, velocity, rightOpen, leftOpen);

    panX.flattenOffset();

    if (onSwipeEnd) onSwipeEnd();

    if (moved && !rightOpen && !leftOpen) {
      if (rightShouldOpen) {
        this.handleOpen(duration, -rightWidth);
      } else if (leftShouldOpen) {
        this.handleOpen(duration, leftWidth);
      } else {
        this.handleClose(speedDefault);
      }
      this.setState({
        leftOpen: leftShouldOpen,
        rightOpen: rightShouldOpen,
      });
    } else {
      this.handleClose(speedDefault);
      this.setState({
        leftOpen: false,
        rightOpen: false,
      });
    }
  }
  handleOpen(duration, toValue) {
    let { onOpen } = this.props;
    if (onOpen) onOpen();

    Animated.timing(this.state.panX, {
      duration: duration,
      toValue: toValue,
    }).start();
  }
  handleStart() {
    let { onSwipeStart } = this.props;
    if (onSwipeStart) onSwipeStart();
    this.setState({ scroll: false })
  }
  measureSwipeout() {
    this.refs.swipeout.measure((a, b, width, height, px, py) => {
      let {
        left,
        right,
      } = this.props;

      this.setState({
        height: height,
        width: width,
        leftWidth: left ? this.btnsWidthTotal(width, left, 'left') : 0,
        rightWidth: right ? this.btnsWidthTotal(width, right, 'right') : 0,
      });

      this.setBtnsWidth(left, right);
    });
  }
  panListener(value) {
    let {
      leftOpen,
      rightOpen,
      scroll,
    } = this.state;

    let leftVisible = value > 5;
    let rightVisible = value < 5;
    let panning = leftVisible || rightVisible;
    if (scroll && panning) this.handleStart();

    this.setState({
      scroll: !panning,
      leftVisible: leftOpen || leftVisible,
      rightVisible: rightOpen || rightVisible,
    });
  }
  returnBtnDimensions(i, side) {
    let {
      height,
      leftBtnWidths,
      leftWidth,
      panX,
      rightBtnWidths,
      rightWidth,
      scroll,
      width: w,
    } = this.state;

    let width = !scroll ?
      panX.interpolate(side === 'left' ?
        { inputRange: [0, leftWidth], outputRange: [0, leftBtnWidths[i]] }
      : { inputRange: [-rightWidth, 0], outputRange: [rightBtnWidths[i], 0] }
      )
    : 0;

    return {
      height: height,
      width: width
    };
  }
  shouldOpen(min, width, velocity, isOpen, isOpenOpposite) {
    let velocityMin = 0.3;
    let open = isOpen || isOpenOpposite;
    let minAbs = Math.abs(min);
    let openMin = minAbs > width/2 && !open;
    let openFast = velocity > velocityMin && !open && minAbs > 0;
    let remainOpen = false

    return openMin || openFast || remainOpen;
  }
  styleBtns(show, left, right, inputRange, outputRange) {
    let {
      height,
      panX,
      scroll,
    } = this.state;

    return {
      height: height,
      left: left ? 0 : null,
      opacity: show ? 1 : 0,
      right: right ? 0 : null,
      width: !scroll ? panX.interpolate({inputRange: inputRange, outputRange: outputRange}) : 0,
    };
  }
  render() {
    let {
      children,
      left,
      right,
      style,
    } = this.props;

    let {
      leftBtnWidths,
      rightBtnWidths,
      height,
      panX,
      props,
      scroll,
      self,
      leftVisible,
      rightVisible,
      width: w,
    } = this.state;

    let customStyle = style || {};

    let xContent = !scroll ? panX.interpolate({
      inputRange: [-w, 0, w],
      outputRange: [right ? -w : 0, 0, left ? w : 0],
    }) : 0;

    let styleBtnsLeft = this.styleBtns(leftVisible, true, false, [0, w], [0, w]);
    let styleBtnsRight = this.styleBtns(rightVisible, false, true, [-w, 0], [w, 0]);

    return (
      <View ref="swipeout" style={[styles.container, customStyle]}>

        {left && leftVisible && w ?
          <Animated.View {...this.state.panResponder.panHandlers}
            style={[styles.btns, styleBtnsLeft]}>
            {
              left.map(function(btn, i) {
                let btnProps = btn.props ? btn.props : [];
                return (
                  <Btn
                    key={i}
                    panDimensions={self.returnBtnDimensions(i, 'left')}
                    text={btn.text}
                    type={btn.type}
                    width={leftBtnWidths[i]}
                    {...btnProps}
                    onPress={() => self.handleBtnPress(btn)}/>
                )
              })
            }
          </Animated.View>
        : <View/>}

        {right && rightVisible && w ?
          <Animated.View {...this.state.panResponder.panHandlers}
            style={[styles.btns, styleBtnsRight]}>
            {
              right.map(function(btn, i) {
                let btnProps = btn.props ? btn.props : [];
                return (
                  <Btn
                    key={i}
                    panDimensions={self.returnBtnDimensions(i, 'right')}
                    text={btn.text}
                    type={btn.type}
                    width={rightBtnWidths[i]}
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
          {children}
        </Animated.View>

      </View>
    );
  }
};

var styles = StyleSheet.create({
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
