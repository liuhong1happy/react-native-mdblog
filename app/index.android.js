'use strict';

var React = require('react');
var {
    AppRegistry
} = require('react-native');

var MainApp = require('app/src/components/main.js');
var WebAPIUtils = require('app/src/utils/web-api-utils.js');
var DateTimeAPIUtils = require('app/src/utils/datetime-utils.js');
var LocalStorageUtils = require('app/src/utils/local-storage-utils.js');
var SystemActions = require('app/src/actions/system-actions.js');

DateTimeAPIUtils.init();

var app = React.createClass({
  componentDidMount:function(){
       LocalStorageUtils.getConfig(function(error,json){
            var data = JSON.parse(json);
            if(data==null){
                WebAPIUtils.getConfig();
            }else{
                SystemActions.receivedConfig(data);
            }
        });
        
  },
  render: function() {
    return (
      <MainApp />
    );
  }
});

AppRegistry.registerComponent('app', () => app);