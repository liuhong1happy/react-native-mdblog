var SystemDispatcher = require('app/src/dispatcher/system-dispatcher.js');
var SystemConstants = require('app/src/constants/system-constants.js');

var ActionTypes = SystemConstants.ActionTypes;

module.exports = {
    receivedConfig:function(data){
        SystemDispatcher.dispatch({
            type:ActionTypes.RECEIVED_CONFIG,
            data:data
        })
    }
}