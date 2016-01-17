# react-native-swipeout
iOS-style swipeout buttons that appear from behind a component

![swipeout preview](http://i.imgur.com/oCQLNFC.gif)

## Installation
```
npm install --save react-native-swipeout
```

## Usage example

See example/index.ios.js for a more detailed example.
See the [Wiki](https://github.com/dancormier/react-native-swipeout/wiki) usage tips.
To use swipeout behind a iOS-style listitem, try [react-native-listitem](https://github.com/dancormier/react-native-listitem).

```
var Swipeout = require('react-native-swipeout')

// Buttons
var swipeoutBtns = [
  {
    text: 'Button'
  }
]

// Swipeout component
<Swipeout right={swipeoutBtns}>
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
close           | bool   | Yes      |           | close swipeout
left            | array  | Yes      | []        | swipeout buttons on left
onOpen          | func   | Yes      |           |
right           | array  | Yes      | []        | swipeout buttons on right
scroll          | func   | Yes      |           | prevent parent scroll

##### Button props

Prop            | Type   | Optional | Default   | Description
--------------- | ------ | -------- | --------- | -----------
backgroundColor | string | Yes      | '#b6bec0' | background color
color           | string | Yes      | '#ffffff' | text color
component       | string | Yes      | null      | pass custom component to button
onPress         | func   | Yes      | null      | function executed onPress
text            | string | Yes      | 'Click Me'| text
type            | string | Yes      | 'default' | default, primary, secondary
underlayColor   | string | Yes      | null      | button underlay color on press

## To Do

[https://github.com/dancormier/react-native-swipeout/issues](https://github.com/dancormier/react-native-swipeout/issues)
