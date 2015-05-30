# react-native-swipeout
iOS-style swipeout buttons that appear from behind a component
![swipeout preview](http://i.imgur.com/oCQLNFC.gif)

## Installation
```
npm install --save react-native-swipeout
```

## Usage example

note: see example/index.ios.js for more detailed example

```
var Swipeout = require('react-native-swipeout')

// Buttons
var swipeoutBtns = [
  {
    text: 'Button'
  }
]

// Swipeout component
<Swipeout btns={swipeoutBtns}>
  <View>
    <Text>Swipe me left</Text>
  </View>
</Swipeout>

```

## Props

Prop            | Type   | Optional | Default   | Description
--------------- | ------ | -------- | --------- | -----------
autoClose       | bool   | Yes      | false     | auto close on button press
backgroundColor | string | Yes      | '#dbddde' | 
btns            | array  | No       | []        | swipeout buttons 

##### Button props

Prop            | Type   | Optional | Default   | Description
--------------- | ------ | -------- | --------- | -----------
backgroundColor | string | Yes      | '#b6bec0' | background color
color           | string | Yes      | '#ffffff' | text color
onPress         | func   | Yes      | null      | function executed onPress
text            | string | No       | 'Click Me'| text
type            | string | Yes      | 'default' | keyword styles: default, primary, secondary

## To Do

* [ ] prevent scroll when swiping
* [ ] close open other swipeouts when initiating swipeout
* [ ] custom button component support
* [ ] add overswipe to trigger action
* [ ] add prop to extend swipeout buttons to 100% width
* [ ] add swipeout from left support
* [ ] add different examples in example app
* [ ] add comments to index.js
* [ ] fix swipeout width on device rotation
* [ ] update sample gif
