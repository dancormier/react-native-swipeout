/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
} = React;

var Swipeout = require('react-native-swipeout')

var swipeoutExample = React.createClass({
  render: function() {
    var btnsDefault = [
      {
        text: 'Button'
      }
    ]
    var btnsOnPress = [
      {
        text: 'onPress',
        onPress: function(){alert('button pressed')},
        type: 'primary',
      }
    ]
    var btnsTypes = [
      {
        text: 'Primary',
        type: 'primary',
      }, {
        text: 'Secondary',
        type: 'secondary',
      }, {
        text: 'Delete',
        type: 'delete',
      }
    ]
    var btnsCustomStyles = [
      {
        backgroundColor: '#4fba8a',
        color: '#17807a',
        text: 'Button',
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
    var btnsComponent = [
      {
        component: <Image style={styles.imgExample} source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}/>
      }
    ]
    return (
      <View style={styles.container}>
        <View style={styles.liContainer}>
          <Swipeout right={btnsDefault}>
            <Listitem text="Basic example"/>
          </Swipeout>
          <Swipeout right={btnsOnPress}>
            <Listitem text="onPress callback"/>
          </Swipeout>
          <Swipeout right={btnsTypes}>
            <Listitem text="Button types"/>
          </Swipeout>
          <Swipeout right={btnsCustomStyles}>
            <Listitem text="Custom button background and text color"/>
          </Swipeout>
          <Swipeout right={btnsDefault} backgroundColor="#006fff">
            <Listitem text="Custom background color (drag me far)"/>
          </Swipeout>
          <Swipeout right={btnsDefault} autoClose={true}>
            <Listitem text="autoClose={true}"/>
          </Swipeout>
          <Swipeout right={btnsFive} autoClose={true}>
            <Listitem text="Five buttons (full-width) and autoClose={true}"/>
          </Swipeout>
          <Swipeout right={btnsComponent}>
            <Listitem text="Custom button component"/>
          </Swipeout>
          <Swipeout left={btnsDefault}>
            <Listitem text="Swipe me right (buttons on left side)"/>
          </Swipeout>
          <Swipeout left={btnsTypes} right={btnsTypes}>
            <Listitem text="Buttons on both sides"/>
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
  imgExample: {
    flex: 1,
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
