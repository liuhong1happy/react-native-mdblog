'use strict'
var React = require('react');
var {
    Text,
    View,
    Navigator,
    Picker,
    TextInput,
    ScrollView,
    ListView,
    StyleSheet,
    TouchableHighlight
} = require('react-native')

var Dimensions = require('app/src/components/base/react-native-dimensions.js');
var {Link,History} = require('app/src/components/base/react-native-router.js');
var {ContentContainer} = require('app/src/components/base/system-container')
var ToolBar = require('app/src/components/base/react-native-toolbar.js');

var HomeIndexView = React.createClass({
    render:function(){
        return (<ContentContainer>
                        <ToolBar navIcon={{}} logo={{icon:require('../../images/logo.png')}} title="首页" subtitle="" actions={[]}></ToolBar>
                        <ScrollView>
                                <View>
                                    <Text>view</Text>
                                </View>
                        </ScrollView>              
                </ContentContainer>)
    }
})


var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: Dimensions.size["4"],
    backgroundColor: '#F6F6F6'
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
  thumb: {
    width: Dimensions.size["32"],
    height: Dimensions.size["32"],
  },
  text: {
    flex: 1
  },
  listTitle:{
    height:Dimensions.size["16"],
    padding:Dimensions.size["4"],
    backgroundColor:"#eee",
    marginTop:Dimensions.size["2"],
    borderTopWidth:1,
    borderTopColor:"#ddd",
    borderStyle:"solid"
  }
});

module.exports = HomeIndexView;