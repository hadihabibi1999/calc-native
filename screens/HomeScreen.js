
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
//import Keypad from '../keypad';

export default class  HomeScreen extends React.Component{
  constructor(){
    super();
    this.state={
      result:''
    }
  }
  buttonPressed(num){
    if(num==='AC')
    this.setState({
      result:''
    })
    else
    this.setState({
        result:this.state.result+num
    })
}
   render(){
    let rows=[]
    let num = [[1,2,3],[4,5,6],[7,8,9],['.',' ',0]]
    for(let i=0;i<=3;i++){
      let row=[]
        for(let j=0;j<=2;j++)
        row.push(<TouchableOpacity  onPress={()=>this.buttonPressed(num[i][j])}><Text style={{color:'white',fontSize:20}}>{num[i][j]}</Text></TouchableOpacity>)
     rows.push(<View style={styles.row} >{row}</View>)
    }
    let row2 =[]
    let rows2=[]
    let operations =  ['x','-','+','='];
    for(let a=0;a<=3;a++){
        row2.push(<TouchableOpacity  onPress={()=>this.buttonPressed(operations[a])}><Text style={{color:'black',fontSize:20,padding:51}}>{operations[a]}</Text></TouchableOpacity>)
     }
      rows2.push(<View>{row2}</View>)
     
      let row3=[]
      let rows3=[]
      let operations2=['AC','±','%','÷']
      for(let b=0;b<=3;b++){
        row3.push(<TouchableOpacity  onPress={()=>this.buttonPressed(operations2[b])}><Text style={{color:'black',fontSize:20,padding:45}}>{operations2[b]}</Text></TouchableOpacity>)
     }
      rows3.push(<View style={{flexDirection:'row'}}>{row3}</View>)
  return (
      <View style={styles.container}>
          
          <View style={styles.resultText}>
             <Text style={{fontSize:45,paddingTop:70,alignItems:'center',color:'white'}}>{this.state.result}</Text>
          </View>

            <View style={styles.total}>

                      <View style={styles.numbers1}>
                         {rows3}
                      </View>

                 <View style={styles.buttons}>
               
                        <View style={styles.numbers}>
                          {rows}
                        </View>
                  
                    
                        <View style={styles.operations}>
                          {rows2}
                        </View>
               
                   </View>
         
             </View>
    </View>

    );
  }
    negative=()=>{
      this.setState({
        result:this.state.result * -1
      })
    }
    percent=()=>{
      this.setState({
        result:(this.state.result/100)
      })
    }
    reset=()=>{
      this.setState({
        result:""
      })
    }
    calculate=()=>{
      this.setState({
        result: eval(this.state.result)
      });
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
    backgroundColor:'gray',
    alignItems:'flex-end',
    justifyContent:'center'
  },
  buttons:{
    flex:3,
    flexDirection:"row",
  },
  numbers:{
    flex:0.84,
    backgroundColor:'lightblue'
  },
  row:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
  },
  operations:{
    flex:0.08,
    justifyContent:'space-around',
    alignItems:'center',
  
  },
  btn:{
    color:'white'
  },
  numbers1:{
  backgroundColor:'blue',
  flex:0.5,
  justifyContent:'space-around',
  flexDirection:'column',
  fontSize:25,
  backgroundColor:'white',
  alignItems:'center'
  },
  total:{
    flex:1,
    flexDirection:'column'
  },
});
