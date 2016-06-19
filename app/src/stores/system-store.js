'use strict'
var SystemDispatcher = require('app/src/dispatcher/system-dispatcher.js');
var {ActionTypes,EventTypes} = require('app/src/constants/system-constants.js');

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

// store model
var _config = null;

var SystemStore = assign({},EventEmitter.prototype,{
    emitChange:function(type){
        this.emit(type);
    },
    addChangeListener:function(type,callback){
        this.on(type,callback);
    },
    removeChangeListener:function(type,callback){
        this.removeListener(type,callback)
    },
    getConfig:function(){
        return _config;
    }
})

SystemStore.dispatchToken = SystemDispatcher.register(function(action){
    switch(action.type){
        case ActionTypes.RECEIVED_CONFIG:
            _config = action.data;
            SystemStore.emitChange(EventTypes.RECEIVED_CONFIG);
            break;
    }
})

module.exports = SystemStore;