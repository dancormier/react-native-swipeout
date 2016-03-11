# react-native-swipeout
iOS-style swipeout buttons that appear from behind a component

![swipeout preview](http://i.imgur.com/oCQLNFC.gif)

## To do for v3.0.0 ([issues](https://github.com/dancormier/react-native-swipeout/issues))

### Done

- [x] Android compatibility (#43)
- [x] Implement `Animated` library
  - [x] Remove `react-tween-state` dependency (#49)
- [x] Add ability to pass props to swipeout parent
  - [x] Including `style`
- [x] Add ability to pass props to buttons
  - [x] Including `onPress`, `style`, `underlayColor`
- [x] Add ability to pass props to buttons
- [x] Add `onClose` prop (#32)
- [x] Update button `type` prop
- [x] Add ability to set custom button widths (#42 - in progress)
- [x] Reimplement `scroll` prop (considering `Animated` library)

### Not Done

- [ ] iPhone 6s compatibility (#44)
- [ ] Add `overswipe` button prop (#10)
- [ ] Compensate for device rotation (#7)
- [ ] Reimplement `close` prop
- [ ] Rewrite Readme
  - [ ] Update preview gif (#21)
- [ ] Update wiki

## Installation
```
npm install --save react-native-swipeout
```

## Usage example

See index.ios.js for a more detailed example.
See the [Wiki](https://github.com/dancormier/react-native-swipeout/wiki) usage tips.

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

All props are *optional*.

Prop            | Type   | Default   | Description
--------------- | ------ | --------- | -----------
autoClose       | bool   | false     | auto close on button press
close           | bool   |           | close swipeout
left            | array  | []        | swipeout buttons on left
onClose         | func   |           | function when buttons are hidden
onOpen          | func   |           | function when buttons are exposed
props           | array  | null      | pass props to swipeout (ex: `style`)
right           | array  | []        | swipeout buttons on right
scroll          | func   |           | prevent parent scroll

##### Button props

Prop            | Type   | Default   | Description
--------------- | ------ | --------- | -----------
component       | string | null      | pass custom component to button
props           | array  | null      | pass props to button (ex: `onPress`, `style`, `underlayColor`)
text            | string | 'Click Me'| text
type            | string | null      | `danger`/`delete`, `primary`, `secondary`, `success`
