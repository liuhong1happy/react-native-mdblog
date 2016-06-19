var React = require('react');
var { 
    ListView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    Navigator
} = require('react-native');
var DatePicker = require('../base/react-native-datepicker');
var {SystemContainer,ContentContainer} = require('../base/system-container')
var {History} = require('../base/react-native-router');
var ToolBar = require('../base/react-native-toolbar');
var Dimensions = require('../base/react-native-dimensions');
var SystemStore = require('../../stores/system-store');

var SystemActions = require('../../actions/system-actions');

var FormDatePicker = React.createClass({
    handleDatePress:function(e,rowData){
        var {date,type,back,name} = this.props;
		// 发送修改事件
		date = rowData.value;
		SystemActions.changedDatePickerForm({date,type,back,name})
		History.popRoute()
    },
    onNavIconPress:function(e){
        History.popRoute()
    },
	render:function(){
		var {date,type,back} = this.props;
		var date = parseInt(date);
		var today = new Date();
		var objDate = {
			date:today,
			value:today.valueOf()/1000,
			text:today.Format("yyyy/MM/dd")
		}
		var handleDatePress = this.handleDatePress;
		var strDate = date?new Date(date*1000).Format("yyyy/MM/dd"):"" ;
        return (<ContentContainer>
                        <ToolBar navIcon={{title:"返回"}} logo={{}} title="选择" subtitle="" actions={[]} onNavIconPress={this.onNavIconPress}></ToolBar>
                        <ScrollView>
                                <View style={[styles.listTitle,styles.tab]}><Text style={styles.tabTitle}>当前选择</Text></View>
								<TouchableOpacity style={styles.listTitle}>
									<Text>{ strDate }</Text>
								</TouchableOpacity>																							   		
                                <View style={[styles.listTitle,styles.tab]}><Text style={styles.tabTitle}>全部选择</Text></View>
								<TouchableOpacity style={[styles.listTitle,styles.twoTitle]}>
										<Text style={styles.leftTitle}>{ strDate }</Text>
										<Text style={styles.rightTitle}>已选项</Text>
								</TouchableOpacity>
                                <DatePicker data={[objDate]} onDatePress={handleDatePress} />
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
    backgroundColor:"#F6F6F6",
    marginTop:Dimensions.size["2"],
    borderTopWidth:1,
    borderTopColor:"#ddd",
    borderStyle:"solid"
  },
  tab:{
    padding:Dimensions.size["0"],
	backgroundColor:"transparent",
	height:Dimensions.size["6"]
  },
  tabTitle:{
	fontSize:Dimensions.size["4"],
    lineHeight:Dimensions.size["6"],
	color:"#999"
  },
  twoTitle:{
    flexDirection: 'row',
    justifyContent: 'center',
	backgroundColor: '#F6F6F6',
	marginBottom:Dimensions.size["4"],
  },
  leftTitle:{
	flex:1,
	textAlign:"left"
  },
  rightTitle:{
	flex:1,
	textAlign:"right",
	color:"#999",
	fontSize:Dimensions.size["4"],
  }
});

module.exports = FormDatePicker;