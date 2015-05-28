/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var Swipeout = require('react-native-swipeout')

var swipeoutExample = React.createClass({
  render: function() {
    var swipeoutBtns = [
      {
        text: 'Primary Button'
      , type: 'primary'
      }, {
        text: 'Secondary'
      , type: 'secondary'
      }, {
        text: 'Color'
      , color: '#ffee00'
      , textColor: 'green'
      }, {
        text: 'Default'
      }, {
        text: 'Delete'
      , type: 'delete'
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

AppRegistry.registerComponent('swipeoutExample', () => swipeoutExample);
