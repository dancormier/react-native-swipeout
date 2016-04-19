import React, {
    Component,
    Image,
    PanResponder,
    TouchableHighlight,
    Text,
    View
} from 'react-native'
import styles from './styles.js'

class SwipeoutBtn extends Component {

  constructor(props) {
    super(props)
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

    let styleSwipeoutBtn = [styles.swipeoutBtn]
    let styleSwipeoutBtnComponent = [];
    let styleSwipeoutBtnText = [styles.swipeoutBtnText];

    //  apply "type" styles (delete || primary || secondary)
    switch (type) {
      case 'delete':
        styleSwipeoutBtn.push(styles.colorDelete)
      case 'primary':
        styleSwipeoutBtn.push(styles.colorPrimary)
      case 'secondary':
        styleSwipeoutBtn.push(styles.colorSecondary)
      default :
        styleSwipeoutBtn.push({})
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
  styleButton : {
    backgroundColor: null
  },
  styleText : {
    color: null
  },
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