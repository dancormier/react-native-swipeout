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
  renderRow: function (item){
    return  <Listitem swipeout={true} text={item.name} onPress={this.props.nextPage.bind(null, item)}/>
  }
, render: function() {
    var btnsDefault = [
      {
        text: 'Button'
      }
    ]
    var btnsOnPress = [
      {
        text: 'onPress'
      , onPress: function(){alert('button pressed')}
      }
    ]
    var btnsTypes = [
      {
        text: 'Primary'
      , type: 'primary'
      }, {
        text: 'Secondary'
      , type: 'secondary'
      }, {
        text: 'Delete'
      , type: 'delete'
      }
    ]
    var btnsCustomStyles = [
      {
        backgroundColor: '#4fba8a'
      , color: '#17807a'
      , text: 'Button'
      }
    ]
    var btnsFive = [
      {
        text: 'One'
      }, {
        text: 'Two'
      }, {
        text: 'Three'
      }, {
        text: 'Four'
      }, {
        text: 'Five'
      }
    ]
    return (
      <View style={styles.container}>
        <View style={styles.liContainer}>
          <Swipeout btns={btnsDefault}>
            <Listitem text="Basic example"/>
          </Swipeout>
          <Swipeout btns={btnsOnPress}>
            <Listitem text="onPress callback"/>
          </Swipeout>
          <Swipeout btns={btnsTypes}>
            <Listitem text="Button types"/>
          </Swipeout>
          <Swipeout btns={btnsCustomStyles}>
            <Listitem text="Custom button background and text color"/>
          </Swipeout>
          <Swipeout btns={btnsDefault} backgroundColor="#006fff">
            <Listitem text="Custom background color (drag me far)"/>
          </Swipeout>
          <Swipeout btns={btnsDefault} autoClose={true}>
            <Listitem text="autoClose={true}"/>
          </Swipeout>
          <Swipeout btns={btnsFive} autoClose={true}>
            <Listitem text="Five buttons (full-width) and autoClose={true}"/>
          </Swipeout>
        </View>
      </View>
    );
  }
});

var Listitem = React.createClass({
  render: function() {
    return (
      <View style={styles.li}>
        <Text style={styles.liText}>{this.props.text}</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  liContainer: {
    flex: 1,
  },
  liText: {
    color: '#333',
    fontSize: 16,
  },
});

AppRegistry.registerComponent('swipeoutExample', () => swipeoutExample);
