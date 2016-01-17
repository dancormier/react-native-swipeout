/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  ListView,
  Text,
  View,
} = React;

//  include react-native-swipeout
var Swipeout = require('./index.js')

//  example row data (see for json structure)
var rows = require('./example/data.js')

//  example styles
var styles = require('./example/styles.js')

//  example swipout app
var swipeout = React.createClass({
  getInitialState: function() {
    //  datasource rerendered when change is made (used to set swipeout to active)
    var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true})

    return {
      dataSource: ds.cloneWithRows(rows),
      scrollEnabled: true
    }
  }

//  set scrolling to true/false
, _allowScroll: function(scrollEnabled) {
    this.setState({ scrollEnabled: scrollEnabled })
  }

//  set active swipeout item
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
    )
  }
})

AppRegistry.registerComponent('swipeout', () => swipeout);
