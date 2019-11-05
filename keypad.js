
import React, { Component } from 'react';
import {View,Button,TouchableOpacity,Text,StyleSheet} from 'react-native';

export default class Keypad extends Component {
    constructor(){
        super();
        this.state={
          result:''
        }
      }
    buttonPressed(text){
        this.setState({
            result:this.state.result+text
        })
    }
    render() { 
        let rows=[]
        let num = [[1,2,3],[4,5,6],[7,8,9],['.',' ',0]]
        for(let i=0;i<=3;i++){
          let row=[]
            for(let j=0;j<=2;j++)
            row.push(<TouchableOpacity onPress={()=>this.buttonPressed(num[i][j])}><Text style={{color:'white',fontSize:20}}>{num[i][j]}</Text></TouchableOpacity>)
         rows.push(<View>{row}</View>)
        }
        return ( 
                 <View style={styles.container}>
                    {rows}
                 </View>
         );
    }
} 


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'space-around',
        alignItems:'center'
    },
    keypad:{
     flexDirection:'row',
    },
});