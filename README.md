# react-native-swipeout
iOS-style swipeout buttons that appear from behind a component
![swipeout preview](http://i.imgur.com/oCQLNFC.gif)

## Installation
```
npm install --save react-native-swipeout
```

## Usage notes

```
var Swipeout = require('react-native-swipeout')

var swipeoutBtns = [
  {
    text: 'Button'
  }
]

<Swipeout btns={swipeoutBtns}>
  <View>
    <Text>Swipe me left</Text>
  </View>
</Swipeout>

```

## Usage example

```
var Swipeout = require('react-native-swipeout')

var swipeoutExample = React.createClass({
  render: function() {
    var swipeoutBtns = [
      {
        text: 'Color',
        backgroundColor: '#ddfdde',
        color: 'green'
      }, {
        text: 'Default'
      }, {
        text: 'Delete',
        type: 'delete'
      }
    ]
    return (
      <View style={styles.container}>
        <Swipeout btns={swipeoutBtns}>
          <View style={styles.swipeoutContent}>
            <Text style={styles.swipeoutContentText}>Swipe me left</Text>
          </View>
        </Swipeout>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  swipeoutContent: {
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    flex: 1,
    padding: 16,
    paddingTop: 14,
  },
  swipeoutContentText: {
    fontSize: 16,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
```

## Props

Prop            | Type   | Optional | Default   | Description
--------------- | ------ | -------- | --------- | -----------
autoClose       | bool   | Yes      | false     | auto close on button press
backgroundColor | string | Yes      | '#dbddde' | 
btns            | array  | No       | []        | swipeout buttons 

#### Button props

Prop            | Type   | Optional | Default   | Description
--------------- | ------ | -------- | --------- | -----------
backgroundColor | string | Yes      | '#b6bec0' | background color
color           | string | Yes      | '#ffffff' | text color
onPress         | func   | Yes      | null      | function executed onPress
text            | string | No       | 'Click Me'| text
type            | string | Yes      | 'default' | keyword styles: default, primary, secondary

## To Do

* [ ] overswipe to trigger action
* [ ] option for swipeout to extend to 100% width
* [ ] icon support
* [ ] swipe from left
* [ ] lock scroll when swiping
* [ ] add comments to index.js
* [ ] close open other swipeouts when initiating swipeout
* [ ] account for device rotation
* [x] open swipeout on quick swipe
* [x] change button color prop to backgroundColor
* [x] add autoClose prop
* [x] wrap button text
* [x] make buttons appear from under each other instead of resizing
* [x] add an example gif to this readme
* [X] add onPress prop to buttons
* [x] center button text
* [x] fix buggy swipe

