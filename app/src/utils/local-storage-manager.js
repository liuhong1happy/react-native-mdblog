'use strict';
var React = require('react');
var {
  AsyncStorage
} =  require('react-native');

var LocalStorageManager = function() {
    this.configKey = "configKey";
    this.storage = AsyncStorage;
}
// base function
LocalStorageManager.prototype.getItem = function(key,callback){
    AsyncStorage.getItem(key,callback)
}
LocalStorageManager.prototype.setItem = function(key,value,callback){
    AsyncStorage.setItem(key, value,callback);
}
LocalStorageManager.prototype.removeItem = async function(key,callback){
    AsyncStorage.removeItem(key,callback);
}

// data
LocalStorageManager.prototype.getConfig = function (callback) {
     return this.getItem(this.configKey,callback);
};
LocalStorageManager.prototype.setConfig = function (data,callback) {
    var json = data?JSON.stringify(data):null;
    this.setItem(this.configKey, json,callback);
};

module.exports = LocalStorageManager;