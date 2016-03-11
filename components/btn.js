var React = require('react-native');
var {
  Animated,
  StyleSheet,
  Text,
  TouchableHighlight,
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
    let { panDimensions, style, text, width } = this.props;
    let customStyle = style || {};
    let setWidth = { width: Math.ceil(width) };

    return (
      <Animated.View style={[panDimensions]}>
        <TouchableHighlight {...this.props} style={[styles.btn, this.setTypeStyle(), customStyle]}>
          <Text style={[styles.btnText, setWidth]}>{text}</Text>
        </TouchableHighlight>
      </Animated.View>
    );
  }
}

/* Style */

var styles = StyleSheet.create({
  btn: {
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
    textAlign: 'center',
  },
});

module.exports = Btn;
