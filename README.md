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
        color: '#ddfdde',
        textColor: 'green'
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

* `btns`: pass an array of buttons to display
* `backgroundColor`: color string (seen when "rubber-banding" the swipeout content)

#### Button props (optional)

* `color`: color string (example: '#ddfdde')
* `onPress`: function (example: `function(){alert('pressed!')}` or `this.btnCallback`)
* `text`: string (example: 'click me')
* `textColor`: color string
* `type`: default || primary || secondary

## To Do

* [ ] open swipeout on quick swipe
* [ ] overswipe to trigger action
* [ ] option for swipeout to extend to 100% width
* [ ] icon support
* [ ] swipe from left
* [ ] lock scroll when swiping
* [ ] add comments to index.js
* [ ] close open other swipeouts when initiating swipeout
* [x] add autoClose prop
* [x] wrap button text
* [x] make buttons appear from under each other instead of resizing
* [x] add an example gif to this readme
* [X] add onPress prop to buttons
* [x] center button text
* [x] fix buggy swipe

