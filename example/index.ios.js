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
  Text,
  View,
} = React;
var styles = require('./styles.js')

var Swipeout = require('react-native-swipeout')

//  Button examples
var btnsDefault = [ { text: 'Button' } ]
var btnsTypes = [
  { text: 'Primary',    type: 'primary',   },
  { text: 'Secondary',  type: 'secondary', },
  { text: 'Delete',     type: 'delete',    }
]

//  Example row data
var rows = [
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
  },
  {
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
        component: <Image style={{flex: 1}} source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}} />
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
]

var swipeoutExample = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true})
    return {
      dataSource: ds.cloneWithRows(rows),
      scrollEnabled: true
    }
  }
, _allowScroll: function(scrollEnabled) {
    this.setState({ scrollEnabled: scrollEnabled })
  }
, _handleSwipeout: function(sectionID, rowID) {
    for (var i = 0; i < rows.length; i++) {
      if (i != rowID) rows[i].active = false
      else rows[i].active = true
    }
    this._updateDataSource(rows)
  }
, _updateDataSource: function(data) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data)
    })
  }
, _renderRow: function (rowData: string, sectionID: number, rowID: number) {
    return <Swipeout
            left={rowData.left}
            right={rowData.right}
            rowID={rowID}
            sectionID={sectionID}
            autoClose={rowData.autoClose}
            backgroundColor={rowData.backgroundColor}
            close={!rowData.active}
            onOpen={(sectionID, rowID) => this._handleSwipeout(sectionID, rowID)}
            scroll={event => this._allowScroll(event)}>
              <View style={styles.li}>
                <Text style={styles.liText}>{rowData.text}</Text>
              </View>
            </Swipeout>
  }
, render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.statusbar}/>
        <View style={styles.navbar}><Text style={styles.navbarTitle}>Swipeout</Text></View>
        <ListView
          scrollEnabled={this.state.scrollEnabled}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          style={styles.listview}/>
      </View>
    );
  }
});

AppRegistry.registerComponent('swipeoutExample', () => swipeoutExample);
