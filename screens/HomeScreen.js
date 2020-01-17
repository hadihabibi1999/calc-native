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
      result:'',
      calculationText:''
    }
     this.operations =  ['/','*','-','+','='] // x ÷
  }



calculateResult(){
  const text = this.state.result
  this.setState({
    calculationText:eval(text)
  })
}



  buttonPressed(text){
    if(text=='<')
     this.back()
    else
   // if(text=='.')
    // this.point()
   // else
      this.setState({
        result:this.state.result+text})
  }



operationPressed(operation){
switch(operation){
  
  case '=':
  return this.calculateResult()
  case '%':
  this.percent()
  break;
  case 'AC':
  this.reset()
  break;
  case '±':
  this.negative()
  break;

  case '*':
  case '/':
   
  case '+':
  case '-':

  const lastChar = this.state.result.split('').pop()

  if(this.operations.indexOf(lastChar) >= 0 ) return
  

  if(this.state.text=='')return


  this.setState({
    result:this.state.result + operation
    });
  }
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
    result:"",
    calculationText:""
  })
}

back=()=>{
  const text = this.state.result.split('')
  text.pop()
  this.setState({
    result:text.join('')
  });
}


   render(){
    let rows=[]
    let num = [[1,2,3],[4,5,6],[7,8,9],[' . ',0,'<']]
    for(let i=0;i<=3;i++){
      let row=[]
        for(let j=0;j<=2;j++)
        row.push(<TouchableOpacity key={num[i][j]} onPress={()=>this.buttonPressed(num[i][j])}><Text style={{color:'#080808',fontSize:20}}>{num[i][j]}</Text></TouchableOpacity>)
     rows.push(<View style={styles.row}>{row}</View>)
    }


    let row2 =[]
    let rows2=[]
    for(let a=0;a<=4;a++){
        row2.push(<TouchableOpacity key={this.operations[a]} onPress={()=>this.operationPressed(this.operations[a])}><Text style={{color:'black',fontSize:20,padding:47,marginLeft:30}}>{this.operations[a]}</Text></TouchableOpacity>)
     }
      rows2.push(<View style={{marginBottom:100}}>{row2}</View>)
     

      let row3=[]
      let rows3=[]
      let operations2=['AC','±','%']
      for(let b=0;b<=3;b++){
        row3.push(<TouchableOpacity  key={operations2[b]} onPress={()=>this.operationPressed(operations2[b])}><Text style={{color:'black',fontSize:20,padding:45}}>{operations2[b]}</Text></TouchableOpacity>)
     }
      rows3.push(<View style={{flexDirection:'row'}}>{row3}</View>)


  return (
      <View style={styles.container}>
          
          <View style={styles.resultText}>
             <Text style={{fontSize:45,paddingTop:70,alignItems:'center',color:'white'}}>{this.state.result}</Text>
             <Text style={{fontSize:20,alignItems:'center',color:'white'}}>{this.state.calculationText}</Text>
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
    backgroundColor:'#4c4c4c',
    alignItems:'flex-end',
    justifyContent:'center'
  },
  buttons:{
    flex:3,
    flexDirection:"row",
  },
  numbers:{
    flex:0.8,
    backgroundColor:'#e0e0e0'
  },
  row:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
  },
  operations:{
    flex:0.09,
    justifyContent:'space-around',
    alignItems:'center',
    backgroundColor:'white',
  
  
  },
  btn:{
    color:'#d6d6d6'
  },
  numbers1:{
  backgroundColor:'white',
  flex:0.5,
  justifyContent:'space-around',
  flexDirection:'column',
  fontSize:25,
  alignItems:'center',
  paddingBottom:15
  },
  total:{
    flex:1,
    flexDirection:'column'
  },
});