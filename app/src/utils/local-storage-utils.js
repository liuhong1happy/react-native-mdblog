'use strict';
var LocalStorageManager = require('app/src/utils/local-storage-manager');

var manager = new LocalStorageManager();

module.exports = {
    setConfig:function(data){
        manager.setConfig(data,function(error){
            console.log(error);
        });
    },
    getConfig:function(callback){
        manager.getConfig(function(error,result){
            callback(error,result)
        });
    }
}