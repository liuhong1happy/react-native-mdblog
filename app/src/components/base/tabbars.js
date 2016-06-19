var React = require('react');
var {
    Navigator,
} = require('react-native');

var router = require('app/src/components/base/react-native-router.js');
var History = router.History;

var tabbar = require('app/src/components/base/react-native-tabbar.js');
var TabBar = tabbar.TabBar;
var Tab = tabbar.Tab;

var TabBars = React.createClass({
    _onPress:function(e,name){
        if(this.props.name!=name){
            History.pushRoute(name,0,Navigator.SceneConfigs.FadeAndroid)
        }
    },
    render:function(){
        return (<TabBar barColor="#fff">
                        <Tab selected={this.props.name=="/home/index"} systemIcon="home" name="/home/index" defaultColor="#bbb" selectedColor="#ee9900" title="首页" onPress={this._onPress}></Tab>
                        <Tab selected={this.props.name=="/search/index"} systemIcon="search" name="/search/index" defaultColor="#bbb" selectedColor="#ee9900"  title="搜索" onPress={this._onPress}></Tab>
                        <Tab selected={this.props.name=="/send/index"} systemIcon="send" name="/send/index" defaultColor="#bbb" selectedColor="#ee9900" title="发布" onPress={this._onPress}></Tab>
                        <Tab selected={this.props.name=="/user/index"} systemIcon="user" name="/user/index" defaultColor="#bbb" selectedColor="#ee9900" title="我" onPress={this._onPress}></Tab>
                    </TabBar>)
    }
})

module.exports = TabBars;