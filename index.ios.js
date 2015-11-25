'use strict';

var React = require('react-native');
var {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

//  3rd party dependencies
var Swipeout = require('./index.js');

var btn = [
  {
    autoClose: true,
    text: 'btn!',
    props: {
      onPress: function() {alert('btn.props.onPress func')},
      style: {
        backgroundColor: 'green',
        width: 200
      },
      underlayColor: '#cc0',
    }
  }, {
    autoClose: true,
    text: 'btn!',
  },
];

var text = "Sample text";

var rows = [
  {contents: text, right: btn, left: btn},
  {contents: text, right: btn},
];

var swipeout = React.createClass({
  allowScroll: function(scrollEnabled) {
    this.setState({ scrollEnabled: scrollEnabled })
  },
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      }).cloneWithRows(rows),
    };
  },
  dummyFunc: function(text) {
    console.log(text);
  },
  renderRow: function(rowData: string) {
    return (
      <Swipeout
        onClose={() => this.dummyFunc('onClose triggered')}
        onOpen={() => this.dummyFunc('onOpen triggered')}
        right={rowData.right}
        left={rowData.left}>
        <View style={styles.li}><Text>{rowData.contents}</Text></View>
      </Swipeout>
    )
  },
  render: function() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this.renderRow(rowData)}
        />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  li: {
    backgroundColor: 'white',
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
});

AppRegistry.registerComponent('swipeout', () => swipeout);
