import React from 'react';
import {View,TouchableOpacity,Text}from 'react-native';
import {connect} from 'react-redux';

export default class SettingsScreen extends React.Component{

  color(){
    this.props.dispatch({type:'secound'})
  }
  render(){
    return(
  <View style={{alignItems:'center'}}>
    <TouchableOpacity onPress={()=>{this.color()}}><Text> change color </Text></TouchableOpacity>
  </View>
    )
  }
}

SettingsScreen.navigationOptions = {
  title: 'settings',
};

const mapStateToProps = state => ({
  color:state.color
});

//export default connect(mapStateToProps)(SettingsScreen);