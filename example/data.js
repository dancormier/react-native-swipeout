import React from 'react';
import {Image} from 'react-native';

var btnsDefault = [ { text: 'Button' } ];

var btnsTypes = [
  { text: 'Primary',    type: 'primary',   },
  { text: 'Secondary',  type: 'secondary', },
  { text: 'Delete',     type: 'delete',    }
];

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
        underlayColor: "#006fff",
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
  },
];

export default rows;
