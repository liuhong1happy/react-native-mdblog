'use strict'
var React = require('react');
var {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} = require('react-native');
var Dimensions = require('app/src/components/base/react-native-dimensions.js');
var {height, width} = Dimensions.get('window');
// navIcon,logo,title,titleColor,subtitle,subtitleColor,actions
// name title icon show showWithText
var ActionButton = React.createClass({
    onPress:function(e){
        if(this.props.onPress){
            this.props.onPress(e,this.props.name);
        }
    },
    genImage:function(){
        if(this.props.icon){
            return (<Image source={this.props.icon} style={styles.actionImg} />)
        }else{
            return (<Text></Text>)
        }
    },
    render:function(){
        var img = this.genImage();
        return (<TouchableOpacity onPress={this.onPress} style={ [styles.button,{"width":this.props.width,"marginLeft":this.props.marginLeft} ]}>
                        {img}
                        <Text style={{color:"#fff",fontSize:Dimensions.size["6"]}}>{this.props.title}</Text>
                </TouchableOpacity>)
    }
})
var ToolBar = React.createClass({
    getInitialState:function(){
          var { navIcon,logo,title,titleColor,subtitle,subtitleColor,actions} = this.props;
        return {
            navIcon:navIcon,logo:logo,title:title,titleColor:titleColor,subtitle:subtitle,subtitleColor:subtitleColor,actions:actions
        }
    },
    onNavIconPress:function(e){
        if(this.props.onNavIconPress){
            this.props.onNavIconPress(e);
        }
    },
    onLogoPress:function(e){
        if(this.props.onLogoPress){
            this.props.onLogoPress(e);
        }
    },
    onActionPress:function(e,name){
        if(this.props.onActionPress){
            this.props.onActionPress(e,name);
        }
    },
    setNavIcon:function(navIcon){
      this.setState({
          navIcon:navIcon
      })  
    },
    setLogo:function(logo){
        this.setState({
          logo:logo
      })  
    },
    setTitle:function(title){
      this.setState({
          title:title
      })  
    },
    setSubtitle:function(subtitle){
        this.setState({
          subtitle:subtitle
      })  
    },
    genTitle:function(title){
        if(title){
            return (<View><Text style={styles.title}>{title}</Text></View>)
        }else{
            return (<View></View>)
        }
    },
    genSubtitle:function(subtitle){
        if(subtitle){
            return (<View><Text style={styles.subtitle}>{subtitle}</Text></View>)
        }else{
            return (<View></View>)
        }
    },
    render:function(){
        var { navIcon,logo,title,titleColor,subtitle,subtitleColor,actions} = this.state;
        var onActionPress = this.onActionPress;
        var title = this.genTitle(this.props.title);
        var subtitle = this.genSubtitle(this.props.subtitle);
        return (<View style={styles.toolbar}>
                            <View style={[styles.item,styles.actions,{justifyContent:"flex-start",marginLeft:5}]}>
                                <ActionButton icon={navIcon.icon} title={navIcon.title} name={navIcon.name} width={navIcon.width} onPress={this.onNavIconPress}/>
                                <ActionButton icon={logo.icon} title={logo.title} name={logo.name} width={navIcon.width}  onPress={this.onLogoPress}/>
                            </View>
                            <View style={[styles.item,styles.titles]}>
                                { title }
                                { subtitle }
                            </View>
                            <View style={[styles.item,styles.actions,{justifyContent:"flex-end",marginRight:Dimensions.size["2"]}]}>
                                {
                                    actions.map(function(action,pos){
                                        action.onPress = onActionPress;
                                        action.key = pos;
										action.marginLeft = Dimensions.size["6"];
                                        return React.createElement(ActionButton,action,null);
                                    })
                                }
                            </View>
                </View>)
    }
});
var styles = StyleSheet.create({
    toolbar:{
        flexDirection:"row",
        justifyContent:"space-around",// 水平方向
        alignItems:"center",
        width:width,
        borderBottomColor:"#ccc",
        borderBottomWidth:0.5,
        borderStyle:"solid",
        backgroundColor:"#3399ff",
		height:Dimensions.toolBarHeight
    },
    item:{
        flex:1
    },
    titles:{
        flexDirection:"column",
        justifyContent:"space-around",
        marginTop:Dimensions.size["2"],
        marginBottom:Dimensions.size["2"],
        alignItems:"center"
    },
    title:{
        flex:1,
        color:"#fff",
        fontSize:Dimensions.size["6"],
        textAlign:"center"
    },
    subtitle:{
        flex:1,
        color:"#fff",
        fontSize:Dimensions.size["4"],
        textAlign:"center"
    },
    actions:{
        flexDirection:"row",
        alignItems:"center",
    },
    button:{
        flexDirection:"row",
        justifyContent:"space-around",// 水平方向
        alignItems:"center",
        flex:0
    },
	actionImg:{
		width:Dimensions.size["12"],
		height:Dimensions.size["12"]
	}
});
module.exports = ToolBar;