import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';

import { MonoText } from '../components/StyledText';

export default class  HomeScreen extends React.Component{
  render(){
    let rows=[]
    for(let i=0;i<3;i++){
      let row=[]
        for(let j=0;j<3;j++)
        row.push(<TouchableOpacity><Text style={{color:'white',fontSize:20}}>{i+j+1}</Text></TouchableOpacity>)
     rows.push(<View style={styles.row}>{row}</View>)
    }
  return (
      <View style={styles.container}>
          
          <View style={styles.resultText}>
             <Text style={{fontSize:45,paddingTop:70,alignItems:'center',color:'white'}}>1222</Text>
          </View>

            <View style={styles.total}>

                      <View style={styles.numbers1}>
                        <Button title='AC'></Button>
                        <Button title='/'></Button>
                        <Button title='%'></Button>
                        <Button title='÷'></Button>
                      </View>

                 <View style={styles.buttons}>
               
                        <View style={styles.numbers}>
                          {rows}
                        </View>
                  
                    
                        <View style={styles.operations}>
                            <Button title='x'></Button>
                            <Button title='-'></Button>
                            <Button title='+'></Button>
                        </View>
               
                   </View>
         
             </View>
    </View>

    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};


function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
  },
  resultText:{
    flex:0.4,
    backgroundColor:'green',
    alignItems:'flex-end',
    justifyContent:'center'
  },
  buttons:{
    flex:3,
    flexDirection:"row",
  },
  numbers:{
    flex:0.84,
    backgroundColor:'blue'
  },
  row:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
  },
  operations:{
    justifyContent:'space-around',
    paddingLeft:20,
    flex:0.08
  },
  btn:{
    color:'white'
  },
  numbers1:{
  backgroundColor:'blue',
  flex:0.5,
  justifyContent:'space-around',
  flexDirection:'row',
  fontSize:25,
  backgroundColor:'white',
  alignItems:'center'
  },
  total:{
    flex:1,
    flexDirection:'column'
  },
});
