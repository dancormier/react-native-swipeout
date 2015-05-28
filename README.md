# react-native-swipeout
iOS-style swipeout buttons that appear from behind a component

## Installation
```
npm install --save react-native-swipeout
```

## Usage notes
This is a work in progress.

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

#### Button props

* `text`: string (example: 'click me')
* `type`: default || primary || secondary
* `color`: color string (example: '#ddfdde')
* `textColor`: color string

## To Do

* [ ] add onPress prop to buttons
* [ ] center button text
* [ ] fix buggy swipe
* [ ] add swipe from left

