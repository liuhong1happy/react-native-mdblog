var {
  Modal,
  StyleSheet,
  View,
} = require('react-native');
var NewModal = React.createClass({
  render:function() {
	var modalBackgroundStyle = {
      	backgroundColor: this.props.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };
	var {...props} = this.props;
    return (
        <Modal {...props}>
          <View style={[styles.container, modalBackgroundStyle]}>
          	{this.props.children}
          </View>
        </Modal>
    );
  }
});

var styles = StyleSheet.create({
	  container: {
		flex: 1,
		justifyContent: 'center',
		padding: 20,
	  },
})

module.exports = NewModal;