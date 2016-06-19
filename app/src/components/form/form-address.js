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

var {SystemContainer,ContentContainer} = require('../base/system-container')
var {History} = require('../base/react-native-router');
var ToolBar = require('../base/react-native-toolbar');
var Dimensions = require('../base/react-native-dimensions');
var SystemStore = require('../../stores/system-store');

var SystemActions = require('../../actions/system-actions');

var FormAddress = React.createClass({
    _pressRow:function(rowData){
        var {province,city,type,back,name} = this.props;
        if(type=="province"){
            province = rowData.value;
		    History.pushRoute("/form/msg?name="+name+"&type=city&"+"province="+province+"&city="+city+"&back="+back,
				2,Navigator.SceneConfigs.PushFromRight)
        }else{
            // 发送修改事件
            city = rowData.value;
            SystemActions.changedAddressForm({province,city,type,back,name})
            switch(back){
                case "send_carry_target":
                case "send_carry_source":
                    History.popToRoute("/send/carry")
                    break;
                case "send_ship_target":
                case "send_ship_source":
                    History.popToRoute("/send/ship")
                    break;
            }
        }
    },
    _renderProvincesRow:function(rowData, sectionID, rowID){
        var title = rowData.text;
        return (
          <TouchableHighlight onPress={() => this._pressRow(rowData)}>
            <View>
              <View style={styles.row}>
                <Text style={styles.text}>
                 {title}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        );
    },
    _renderCitiesRow:function(rowData, sectionID, rowID){
        var title = rowData.text;
        return (
          <TouchableHighlight onPress={() => this._pressRow(rowData)}>
            <View>
              <View style={styles.row}>
                <Text style={styles.text}>
                   {title}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        );
    },
    onNavIconPress:function(e){
        var {back} = this.props;
        switch(back){
            case "send_carry_target":
            case "send_carry_source":
                History.popRoute()
                break;
            case "send_ship_target":
            case "send_ship_source":
                History.popRoute()
                break;
        }
    },
	render:function(){
		var {province,city,type,back} = this.props;
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		var  provinces = SystemStore.getProvinces();
		var cities = SystemStore.getCities({value:this.props.province});
		var sourceData = ds.cloneWithRows(type=="province" ? provinces : cities);
		var renderRow = type=="province" ? this._renderProvincesRow : this._renderCitiesRow;
        
        var _provinces =  provinces.filter(function(ele,pos){
            return ele.value == province;
        })
        
        var _cities = cities.filter(function(ele,pos){
            return ele.value == city;
        })
        
		var address = (_provinces.length>0?_provinces[0].text:"")+" "+(_cities.length>0?_cities[0].text:"")
        return (<ContentContainer>
                        <ToolBar navIcon={{title:"返回"}} logo={{}} title="选择城市" subtitle="" actions={[]} onNavIconPress={this.onNavIconPress}></ToolBar>
                        <ScrollView>
                                <View style={[styles.listTitle,styles.tab]}><Text style={styles.tabTitle}>当前位置</Text></View>
								<TouchableOpacity style={styles.listTitle}>
									<Text>{ address }</Text>
								</TouchableOpacity>																							   		
                                <View style={[styles.listTitle,styles.tab]}><Text style={styles.tabTitle}>全部地区</Text></View>
								<TouchableOpacity style={[styles.listTitle,styles.twoTitle]}>
										<Text style={styles.leftTitle}>{ type=="province"?province.text : city.text}</Text>
										<Text style={styles.rightTitle}>已选地区</Text>
								</TouchableOpacity>
                                <ListView 
								enableEmptySections={true}
                                dataSource={sourceData}
                                renderRow={renderRow}
                                renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />} 
								></ListView>
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

module.exports = FormAddress;