var SystemDispatcher = require('app/src/dispatcher/system-dispatcher.js');
var WebAPIUtils = require('app/src/utils/web-api-utils.js');

module.exports = {
    getMySendInfo:function(formData){
        WebAPIUtils.getMySendInfo(formData);
    },
    getMyMessage:function(formData){
        WebAPIUtils.getMyMessage(formData);
    },
	userLogout:function(formData){
		WebAPIUtils.userLogout(formData);
	},
	userLogin:function(formData){
		WebAPIUtils.userLogin(formData);
	},
	postSendCarryForm:function(formData){
		WebAPIUtils.postSendCarryForm(formData);
	},
	postSendShipForm:function(formData){
		WebAPIUtils.postSendShipForm(formData);
	}
}