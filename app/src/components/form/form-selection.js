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

var FormSelection = React.createClass({
    _pressRow:function(rowData){
        var {category,type,back,name} = this.props;
		// 发送修改事件
		category = rowData.value;
		SystemActions.changedCategoryForm({category,type,back,name})
		History.popRoute()
    },
    _renderRow:function(rowData, sectionID, rowID){
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
        History.popRoute()
    },
	render:function(){
		var {category,type,back} = this.props;
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		var  categories = SystemStore.getCategoryByType(type);
		var sourceData = ds.cloneWithRows(categories);
		var renderRow =  this._renderRow;
        
        var _categories =  categories.filter(function(ele,pos){
            return ele.value == category;
        })

		var category_text = _categories.length>0?_categories[0].text:"";
        return (<ContentContainer>
                        <ToolBar navIcon={{title:"返回"}} logo={{}} title="选择" subtitle="" actions={[]} onNavIconPress={this.onNavIconPress}></ToolBar>
                        <ScrollView>
                                <View style={[styles.listTitle,styles.tab]}><Text style={styles.tabTitle}>当前选择</Text></View>
								<TouchableOpacity style={styles.listTitle}>
									<Text>{ category_text }</Text>
								</TouchableOpacity>																							   		
                                <View style={[styles.listTitle,styles.tab]}><Text style={styles.tabTitle}>全部选择</Text></View>
								<TouchableOpacity style={[styles.listTitle,styles.twoTitle]}>
										<Text style={styles.leftTitle}>{ category_text }</Text>
										<Text style={styles.rightTitle}>已选项</Text>
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

module.exports = FormSelection;