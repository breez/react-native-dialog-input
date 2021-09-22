import React, { PureComponent } from 'react';
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

class DialogInput extends PureComponent{
  constructor(props){
    super(props);
    this.state = { inputModal: props.initValueTextInput, openning: true };
  }

  handleOnRequestClose = () => {
    this.props.closeDialog();
    this.setState({ inputModal: '' });
  };

  handleOnKeyPress = () => {
    this.setState({ openning: false });
  };

  handleOnChangeText = (inputModal) => {
    this.setState({ inputModal, openning: false });
  };

  handleOnCloseDialog = () => {
    this.props.closeDialog();
    this.setState({ inputModal: '',openning: true });
  };

  handleSubmit = () => {
    this.props.submitInput(this.state.inputModal);
    this.setState({ inputModal: '',openning: true });
  };

  render(){
    const title = this.props.title || '';
    const hintInput = this.props.hintInput || '';
    let value = '';
    if (!this.state.openning) {
      value = this.state.inputModal;
    }else{
      value = this.props.initValueTextInput ? this.props.initValueTextInput : '';
    }

    const textProps = this.props.textInputProps || null;
    const modalStyleProps = this.props.modalStyle || {};
    const dialogStyleProps = this.props.dialogStyle || {};
    const hintTextColor = this.props.hintTextColor
    const animationType = this.props.animationType || 'fade';
    let cancelText = this.props.cancelText || 'Cancel';
    let submitText = this.props.submitText || 'Submit';
    cancelText = (Platform.OS === 'ios')? cancelText:cancelText.toUpperCase();
    submitText = (Platform.OS === 'ios')? submitText:submitText.toUpperCase();

    return(
      <Modal
        animationType={animationType}
        transparent={true}
        visible={this.props.isDialogVisible}
      	onRequestClose={this.handleOnRequestClose}>
        <View style={[styles.container, {...modalStyleProps}]}  >
          <TouchableOpacity style={styles.container} activeOpacity={1} onPress={this.handleOnCloseDialog}>
            <View style={[styles.modal_container, {...dialogStyleProps}]} >
              <View style={styles.modal_body} >
                <Text style={styles.titleStyle}>{title}</Text>
                <Text style={[this.props.message ? styles.message_modal : {height:0} ]}>{this.props.message}</Text>
                <TextInput style={this.props.inputStyle}
                  autoCorrect={(textProps && textProps.autoCorrect==false)?false:true}
                  autoCapitalize={(textProps && textProps.autoCapitalize)?textProps.autoCapitalize:'none'}
                  clearButtonMode={(textProps && textProps.clearButtonMode)?textProps.clearButtonMode:'never'}
                  clearTextOnFocus={(textProps && textProps.clearTextOnFocus==true)?textProps.clearTextOnFocus:false}
                  keyboardType={(textProps && textProps.keyboardType)?textProps.keyboardType:'default'}
                  secureTextEntry={(textProps && textProps.secureTextEntry)?textProps.secureTextEntry:false}
                  maxLength={(textProps && textProps.maxLength > 0)?textProps.maxLength:null}
                  autoFocus={true}
                  onKeyPress={this.handleOnKeyPress}
                  underlineColorAndroid='transparent'
                  placeholder={hintInput}
                  hintTextColor={hintTextColor}
                  onChangeText={this.handleOnChangeText}
                  value={value}
                  secureTextEntry={this.props.inputSecureTextEntry}
                  />
              </View>
              <View style={styles.btn_container}>
                <TouchableOpacity style={styles.touch_modal}
                  onPress={this.handleOnCloseDialog}>
                  <Text style={styles.cancelStyle}>{cancelText}</Text>
                </TouchableOpacity>
                <View style={styles.divider_btn}></View>
                <TouchableOpacity  style={styles.touch_modal}
                  onPress={this.handleSubmit}>
                  <Text style={styles.submitStyle}>{submitText}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      android:{
        backgroundColor: 'rgba(0,0,0,0.62)'
      }
    }),
  },
  modal_container:{
    marginLeft: 30,
    marginRight: 30,
    ...Platform.select({
      ios: {
        backgroundColor:'#E3E6E7',
        borderRadius: 10,
        minWidth: 300,
      },
      android: {
        backgroundColor:'#fff',
        elevation: 24,
        minWidth: 280,
        borderRadius: 5,
      },
    }),
  },
  modal_body:{
    ...Platform.select({
      ios: {
        padding: 10,
      },
      android: {
        padding: 24,
      },
    }),
  },
  message_modal:{
    fontSize: 16,
    ...Platform.select({
      ios: {
        textAlign:'center',
        marginBottom: 10,
      },
      android: {
        textAlign:'left',
        marginTop: 20
      },
    }),
  },
  btn_container:{
    flex: 1,
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        justifyContent: 'center',
        borderTopWidth: 1,
        borderColor: '#B0B0B0',
        maxHeight: 48,
      },
      android:{
        alignSelf: 'flex-end',
        maxHeight: 52,
        paddingTop: 8,
        paddingBottom: 8,
      }
    }),
  },
  divider_btn:{
    ...Platform.select({
      ios:{
      	width: 1,
        backgroundColor: '#B0B0B0',
      },
      android:{
	      width: 0
      },
    }),
  },
  touch_modal:{
    ...Platform.select({
      ios: {
        flex: 1,
      },
      android:{
        paddingRight: 8,
        minWidth: 64,
        height: 36,
      }
    }),
  },
});
export default DialogInput;
