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
  ListView,
  StatusBarIOS,
  Text,
  View,
} = React;

var Swipeout = require('react-native-swipeout')

StatusBarIOS.setStyle(StatusBarIOS.Style['lightContent'])

//  Button examples
var btnsDefault = [ { text: 'Button' } ]
var btnsTypes = [
  { text: 'Primary',    type: 'primary',   },
  { text: 'Secondary',  type: 'secondary', },
  { text: 'Delete',     type: 'delete',    }
]

var swipeoutExample = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    }
  }
, componentWillMount: function() {
    this.updateDataSource([
      {
        text: "Basic Example",
        right: btnsDefault,
      }, {
        text: "onPress Callback",
        right: [
          { 
            text: 'Press Me',
            onPress: function(){ alert('button pressed') },
            type: 'primary', 
          }
        ],
      }, {
        text: "Button Types",
        right: btnsTypes,
      }, {
        text: "Button with custom styling",
        right: [
          {
            text: 'Button',
            backgroundColor: '#4fba8a',
            color: '#17807a',
          }
        ],
      }, {
        text: "Overswipe background color (drag me far)",
        right: btnsDefault,
        backgroundColor: '#006fff',
      }, {
        text: "Swipeout autoClose={true}",
        right: btnsDefault,
        autoClose: true,
      }, {
        text: "Five buttons (full-width) + autoClose={true}",
        right: [
          { text: 'One'},
          { text: 'Two'},
          { text: 'Three' },
          { text: 'Four' },
          { text: 'Five' }
        ],
        autoClose: true,
      }, {
        text: "Custom button component",
        right: [
          {
            component: <Image style={{flex: 1}} source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}/>
          }
        ],
      }, {
        text: "Swipe me right (buttons on left side)",
        left: btnsDefault,
      }, {
        text: "Buttons on both sides",
        left: btnsTypes,
        right: btnsTypes,
      }
    ])
  }
, handleScroll: function() {
  }
, updateDataSource: function(data) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data)
    })
  }
, renderRow: function (item) {
    return <Swipeout
            autoClose={item.autoClose}
            backgroundColor={item.backgroundColor}
            left={item.left}
            right={item.right}>
              <View style={styles.li}>
                <Text style={styles.liText}>{item.text}</Text>
              </View>
            </Swipeout>
  }
, render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.statusbar}/>
        <View style={styles.navbar}><Text style={styles.navbarTitle}>Swipeout</Text></View>
        <ListView
          dataSource={this.state.dataSource}
          onScroll={this.handleScroll}
          renderRow={this.renderRow}
          style={styles.listview}/>
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
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  listview: {
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
    flex: 2,
  },
  liText: {
    color: '#333',
    fontSize: 16,
  },
  navbar: {
    alignItems: 'center',
    backgroundColor: '#444',
    justifyContent: 'center',
    height: 44,
  },
  navbarTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: "500",
  },
  statusbar: {
    backgroundColor: '#444',
    height: 22,
  }
});

AppRegistry.registerComponent('swipeoutExample', () => swipeoutExample);
