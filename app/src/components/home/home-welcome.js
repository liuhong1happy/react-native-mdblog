'use strict'
var React = require('react');
var {
    View,
	StyleSheet,
    Text
} = require('react-native');
var {ContentContainer}  = require('app/src/components/base/system-container.js')
var { Link,History } = require('app/src/components/base/react-native-router.js');
var { Button,TextInput } = require('app/src/components/base/react-native-form.js');
var Dimensions = require('app/src/components/base/react-native-dimensions.js');

var WebAPIActions = require('app/src/actions/web-api-actions.js');
var SystemStore = require('app/src/stores/system-store.js');
var {EventTypes} = require('app/src/constants/system-constants.js');

var HomeWelcomeView = React.createClass({
    render:function(){
        return (<ContentContainer style={styles.container}>
                    <View style={styles.form}>
							<View style={styles.textView}>
								<Text style={styles.title}>Welcome to new world!</Text>
							</View>
							<View style={styles.textView}>
								<Text style={styles.text}>MarkDown Blog</Text>
							</View>
					</View>			  	
                </ContentContainer>)
    }
})

var styles = StyleSheet.create({
	  form: {
			flexDirection: "column",
			justifyContent: 'center',
		  	width:Dimensions.screenWidth,
		  	height:Dimensions.screenHeight,
		    alignItems:"center",
		    marginTop:-Dimensions.size["24"]
	  },
	  textView:{
          height:Dimensions.size["16"],
          width:Dimensions.screenWidth-Dimensions.size["6"],
	  },
      title:{
		  lineHeight:Dimensions.size["16"],
          textAlign:"center",
		  fontSize:Dimensions.size["8"],
          color:"#3399ff"
      },
	  text:{
		  lineHeight:Dimensions.size["12"],
          textAlign:"center",
		  fontSize:Dimensions.size["6"],
          color:"#999"
	  },
	  button:{
		  width:Dimensions.size["64"],
		  height:Dimensions.size["12"],
		  backgroundColor:"#3399ff",
		  borderBottomLeftRadius:Dimensions.size["2"],
		  borderBottomRightRadius:Dimensions.size["2"],
		  borderTopLeftRadius:Dimensions.size["2"],
		  borderTopRightRadius:Dimensions.size["2"],
		  marginTop:Dimensions.size["6"]
	  },
	  container:{
		backgroundColor:"#f0f0f0"
	}
})

module.exports = HomeWelcomeView;