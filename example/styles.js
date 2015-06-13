var React = require('react-native')
var {StyleSheet} = React

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
})

module.exports = styles