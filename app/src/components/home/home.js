'use strict'
var React = require('react');
var {
  View,
  Text,
  Navigator,
  StyleSheet
} = require('react-native');

var system = require('app/src/components/base/system-container.js')
var {SystemContainer} = system;

var HomeView = React.createClass({
    goBack(){
      this.props.navigator.push({name:"home"});
    },
    render() {
        return (
            <SystemContainer>
                {this.props.children}
            </SystemContainer>  
        )
    }
});

module.exports = HomeView;