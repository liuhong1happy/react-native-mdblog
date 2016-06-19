'use strict'
var React = require('react');
var {
  View,
  Text,
  Navigator,
  StyleSheet,
  Dimensions
} = require('react-native')

var {height, width} = Dimensions.get('window');

var HomeView = require('app/src/components/home/home-index.js')
var HomeIndexView = require('app/src/components/home/home-index.js')
var HomeWelcomeView = require('app/src/components/home/home-welcome.js')

var FormView = require('app/src/components/form/form.js')
var FormAddress =  require('app/src/components/form/form-address.js')
var FormSelection = require('app/src/components/form/form-selection.js')
var FormDatePicker = require('app/src/components/form/form-datepicker.js')

var router = require('app/src/components/base/react-native-router.js')
var Route = router.Route;
var Router = router.Router;
var History = router.History;

var SystemStore = require('app/src/stores/system-store.js')
var {EventTypes} = require('app/src/constants/system-constants.js')

var MainApp = React.createClass({
	componentDidMount:function(){
		SystemStore.addChangeListener(EventTypes.RECEIVED_CONFIG,this.handleConfigChange);
	},
	componentWillUnmount:function(){
		SystemStore.removeChangeListener(EventTypes.RECEIVED_CONFIG,this.handleConfigChange);
	},
	handleConfigChange:function(){
        History.pushRoute("/home/index");
	},
    render:function(){
        return (<View style={styles.main}>
                {this.props.children}
            </View>)
    }
})

var RouterApp = React.createClass({
    render:function() {
        return (<Router defaultRoute="/home/welcome" path="/" component={MainApp}>
                        <Route component={HomeView} path="home">
                                <Route component={HomeIndexView} path="index"></Route>
                                <Route component={HomeWelcomeView} path="welcome"></Route>
                        </Route>
                </Router>)
    },
})
        
var styles = {
    main:{
        height:height,
        width:width
    }
}

module.exports = RouterApp;