'use strict'
var React = require('react');
var {
    View,
    Text,
    Switch,
    Picker,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} = require('react-native');
var Dimensions = require('app/src/components/base/react-native-dimensions');
var Platform = require('app/src/components/base/react-native-platform');
// props
// {name:xxx,icon:xxx,title:xxx,style:{},onPress:function(){} }
var Button = React.createClass({
    onPress:function(e){
        if(this.props.onPress){
            this.props.onPress(e,this.props.name);
        }
    },
    genImage:function(){
		var style = this.props.style;
		var height = style && style.height?style.height :Dimensions.size["16"];
        if(this.props.icon){
            return (<View style={{height:height}}><Image source={this.props.icon} style={[styles.buttonImg,{lineHeight:height},this.props.imgStyle]} /></View>)
        }else{
            return (<View style={{height:0,width:0}}></View>)
        }
    },
    render:function(){
        var img = this.genImage();
		var {title,style,icon,onPress,name,titleStyle,imgStyle,textAlign,...props} = this.props;
		 var _style = StyleSheet.flatten(style);
		var height = _style && _style.height?_style.height :Dimensions.size["16"];
		
		var screenWidth = _style && _style.width?_style.width : Dimensions.screenWidth;
		var _imgStyle = icon?{width:Dimensions.size["12"],height:Dimensions.size["12"]}:{height:0,width:0};
				
		var textWidth  =  screenWidth - _imgStyle.width -Dimensions.size["4"]*2;
				
		var textStyle = Platform.isIOS ?[styles.buttonText,titleStyle] : [styles.buttonText,{lineHeight:height},titleStyle];
        return (<TouchableOpacity onPress={this.onPress} style={[styles.buttonContainer,{height:height},style]} {...props}>
                        {img}
						<View style={[styles.buttonTextContainer,{height:height, justifyContent:textAlign?textAlign:"flex-start", width:textWidth}]}>
                        	<Text style={textStyle}>{this.props.title}</Text>
						</View>
                </TouchableOpacity>)
    }
})
// like TextInput       
var TextArea = React.createClass({
    render:function(){
        var {multiline,...props} = this.props;
        return (<TextInput multiline={true} {...props}></TextInput>)
    }
})
// DatePicker
// DateTimePicker
// CheckBox / CheckGroup
// RadioBox / RadioGroup

// NewTextIntput
var NewTextIntput = React.createClass({
    handleChangeText:function(text){
        if(this.props.onChangeText){
             this.props.onChangeText(this.props.name,text)
        }  
    },
    render:function(){
        var {name,onChangeText,...props} = this.props;
        return (<TextInput {...props} onChangeText={this.handleChangeText} underlineColorAndroid="transparent" autoCapitalize="none"/>)
    }
})

var styles = StyleSheet.create({
	buttonContainer:{
		paddingHorizontal:Dimensions.size["4"]
	},
    buttonImg:{
        width:Dimensions.size["12"], 
		height:Dimensions.size["12"]
    },
	buttonTextContainer:{
		flexDirection:"row",
		alignItems:"center"
	},
	buttonText:{
		color:"#fff",
		fontSize:Dimensions.size["6"],
		textAlignVertical:"center",
		textAlign:"left",
		lineHeight:Dimensions.size["8"],
		height:Dimensions.size["8"]
	}
})

module.exports.Button = Button;
module.exports.TextInput = NewTextIntput;
module.exports.TextArea = TextArea;
module.exports.Picker = Picker;
module.exports.Switch = Switch;