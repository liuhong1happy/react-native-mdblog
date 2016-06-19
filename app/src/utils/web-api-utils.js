'use strict'
var systemActions = require('app/src/actions/system-actions.js');
var localStorageUtils = require('app/src/utils/local-storage-utils.js');
var systemConstants = require('app/src/constants/system-constants.js');

var Ajax = function(options){
    fetch(systemConstants.BaseUrl+options.url,{
        method:options.type,
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(options.data),
    })
    .then((response)=> response.text())
    .then((responseText)=>{
        console.log(responseText);
        options.success(responseText);
    })
    .catch((error)=>{
        console.log(error);
        options.error('error',error);
    })
}

module.exports = {
	getConfig:function(){
		Ajax({
            url:"/config.json",
            type:"get",
            success:function(res){
                systemActions.receivedConfig(res);
            },
            error:function(e,err){
                console.log(e,err);
            }
        })
	}
}