'use strict'
var React = require('react');
var {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} = require('react-native');
var Dimensions = require('app/src/components/base/react-native-dimensions');
var Platform = require('app/src/components/base/react-native-platform');
var DateTimeAPIUtils = require('app/src/utils/datetime-utils')

var WeekList = ["日","一","二","三","四","五","六"];

var DateButton = React.createClass({
	handlePress:function(e){
		var {name,date,onPress} = this.props;
		if(onPress){
			onPress(e,{name,date});
		}
	},
	render:function(){
		var handlePress = this.handlePress;
		return (<TouchableOpacity onPress={handlePress} style={this.props.style}>
						{this.props.children}
					</TouchableOpacity>)
	}
})
	
var DatePicker = React.createClass({
    getInitialState: function() {
        return { 
            title:"选择日期",
            month_format:"yyyy年MM月",
            date_format:"yyyy/MM/dd",
            date:this.props.date?this.props.date:new Date(),
            data:this.props.data?this.props.data:[]
        };
    },
    _toLastMonth:function(e){
        var date = DateTimeAPIUtils.LastMonth(this.state.date);
        this._onMonthChange(date);
        this.setState({date:date});
    },
    _toNextMonth:function(e){
        var date = DateTimeAPIUtils.NextMonth(this.state.date);
        this._onMonthChange(date);
        this.setState({date:date});
    },
    _onMonthChange:function(date){
        if(this.props.onMonthChange){
            this.props.onMonthChange(date)
        }
    },
    _onDatePress:function(e,data){
		var date = {
			value:new Date(data.date).valueOf()/1000,
			date:new Date(data.date),
			text:data.date
		}
        if(this.props.onDatePress){
            this.props.onDatePress(e,date)
        }
    },
    render:function(){
        var today = new Date();
        var currentDay = this.state.date;
        var date_format = this.state.date_format;
        var month_format = this.state.month_format;
        var monthly = currentDay.Monthly();
        var strLastMonth = "-",strNextMonth = "+";
        var toNextMonth = this._toNextMonth;
        var toLastMonth = this._toLastMonth;
        
        var toggle = this.props.toggle?true:false;
        var position = this.props.position?this.props.position:{left:0,top:0};
        var onDatePress = this._onDatePress;
        var data = this.state.data;
        var i = 0,j=0;
        return (
			<View>
				<View style={[styles.row,styles.month]}>
					<TouchableOpacity style={[styles.item,styles.monthItem]} onPress={toLastMonth}>
						<Text style={styles.monthText}>{strLastMonth}</Text>
					</TouchableOpacity>
					<Text style={[styles.item,styles.monthText,styles.monthItem]} >{currentDay.Format(month_format)}</Text>
					<TouchableOpacity style={[styles.item,styles.monthItem]}  onPress={toNextMonth}>
						<Text style={styles.monthText}>{strNextMonth}</Text>
					</TouchableOpacity>
				</View>
				<View>
						<View style={[styles.row,styles.week]}>
							{
								WeekList.map(function(str,pos){
									return (<View style={styles.item}  key={pos}>
													<Text style={styles.weekText}>{str}</Text>
												</View>);
								})
							}
						</View>
						<View style={styles.monthly}>
								{
									monthly.map(function(weeks){
										return (<View key={j++} style={styles.row}>{
												weeks.map(function(day){
													var isCurMonth = currentDay.getMonth()==day.getMonth();
													var canGreen = isCurMonth ? data.filter(function(ele){
														return day.sameDate(ele.date);
													}):false;
													var textStyle = isCurMonth?(canGreen && canGreen.length>0?styles.yellowText:{}):styles.gray;
													var buttonStyle = canGreen && canGreen.length>0?styles.yellow:{};
													return (<DateButton style={[styles.item,styles.button,buttonStyle]}  key={day.Format(date_format)} onPress={onDatePress} date={day.Format(date_format)} >
															<Text style={[styles.buttonText,textStyle]}>{ day.getDate() }</Text>
														</DateButton>)
												})
										}</View>)
									})
								}
						</View>
				</View>
			</View>
        )
    }
})

var styles = StyleSheet.create({
	row:{
		flexDirection:"row",
		justifyContent:"center"
	},
	item:{
		flex:1
	},
	month:{
		backgroundColor:"#ee9900",
		marginTop:Dimensions.size["6"],
		paddingHorizontal:Dimensions.size["12"],
		paddingVertical:Dimensions.size["4"]
	},
	monthText:{
		fontSize:Dimensions.size["6"],
		lineHeight:Dimensions.size["8"],
		color:"#fff",
		textAlign:"center"
	},
	monthItem:{
		width:Dimensions.size["64"]
	},
	week:{
		backgroundColor:"#ee9900",
		paddingVertical:Dimensions.size["4"]
	},
	weekText:{
		fontSize:Dimensions.size["6"],
		lineHeight:Dimensions.size["8"],
		color:"#fff",
		textAlign:"center"
	},
	monthly:{
		backgroundColor:"#fff",
		borderBottomColor:"#dbdbdb",
		borderBottomWidth:1,
		borderStyle:"solid",
		paddingVertical:Dimensions.size["4"]
	},
	button:{
		height:Dimensions.width/7,
		width:Dimensions.width/7,
		flexDirection:"row",
		justifyContent:"center",
		alignItems:"center"
	},
	buttonText:{
		textAlign:"center"
	},
	yellow:{
		backgroundColor:"#ee9900",
		borderRadius:Dimensions.width/7
	},
	gray:{
		color:"#dbdbdb"
	},
	yellowText:{
		color:"#fff"
	}
})

module.exports = DatePicker;