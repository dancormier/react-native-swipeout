import React, {
    Component,
    Image,
    LayoutAnimation,
    TouchableOpacity,
    TouchableHighlight,
    PanResponder,
    TouchableHighlight,
    StyleSheet,
    Text,
    View
    ListView
} from 'react-native'

import styles from './styles.js'


class SwipeoutBtn extends Component {

  constructor(props) {

  }

  render() {
    const {
        type,
        component,
        text,
        styleButton,
        height,
        width,
        styleText
    } = this.props;

    var styleSwipeoutBtn = [styles.swipeoutBtn]
    const styleSwipeoutBtnComponent = [];
    const styleSwipeoutBtnText = [styles.swipeoutBtnText];

    //  apply "type" styles (delete || primary || secondary)
    switch (type) {
      case 'delete':
        styleSwipeoutBtn.push(styles.colorDelete)
      case 'primary':
        styleSwipeoutBtn.push(styles.colorPrimary)
      case 'secondary':
        styleSwipeoutBtn.push(styles.colorSecondary)
      default:
    }

    styleSwipeoutBtn.push(styleButton ? styleButton : {})
    styleSwipeoutBtn.push({height, width})

    //  set button dimensions
    styleSwipeoutBtnComponent.push({height, width})

    //  apply text color
    styleSwipeoutBtnText.push(styleText ? styleText : {})

    return (
        <TouchableHighlight
            onPress={this.props.onPress}
            style={styles.swipeoutBtnTouchable}
            underlayColor={this.props.underlayColor}>

          <View style={styleSwipeoutBtn}>
            {component ?
                <View style={styleSwipeoutBtnComponent}>{component}</View>
                : <Text style={styleSwipeoutBtnText}>{text}</Text>
            }
          </View>
        </TouchableHighlight>
    )
  }
}

SwipeoutBtn.defaultProps = {
  backgroundColor: null,
  color: null,
  component: null,
  underlayColor: null,
  height: 0,
  key: null,
  onPress: null,
  text: 'Click me',
  type: '',
  width: 0
}

export default SwipeoutBtn;