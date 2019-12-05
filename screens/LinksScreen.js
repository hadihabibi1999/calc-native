import React, {Component} from 'react';
import { ScrollView, View,  Text, StyleSheet} from 'react-native';
import moment from 'moment';

  const Data = {
    time:12345,
    laps:[1123, 4566, 23456, 43456]
  }

  function Timer({interval, style}) {
    const duration = moment.duration(interval)
    const centisecond = Math.floor(duration.milliseconds()/10)
    return <Text style={style}>{duration.minutes()}:{duration.seconds()}:{centisecond}</Text>
  }

  function RoundButtons ({title,color,backgroundColor}){
  return (
    <View style={[styles.button,{backgroundColor:backgroundColor}]}> 
      <View style={styles.buttonBorder}>
        <Text style={[styles.buttonTitle,{color}]}>{title}</Text>
      </View>
    </View>
   )
  }

  function ButtonsRow ({children}){
    return (
      <View style={styles.buttonsrow}>{children}</View>
    )
  }
 
  function Lap ({number, interval, fastest, slowest}){
    const lapStyle = [
      styles.lapText,
      fastest && styles.fastest,
      slowest && styles.slowest

    ]
    return(
    <View style={styles.lap}>
      <Text style={lapStyle}>Lap {number} </Text>
      <Text style={lapStyle}>{interval}</Text>
    </View>
    )
  }

  function LapsTable ({laps}){
    const finishedLap = laps.slice(1)
    let max = Number.MIN_SAFE_INTEGER
    let min = Number.MAX_SAFE_INTEGER
    if(finishedLap.length>=2){
      finishedLap.forEach(lap => {
        if(lap>max) max=lap
        if(lap<min) min=lap
      });
    }

    return(
      <ScrollView style={styles.ScrollView}>
        {laps.map((lap,index)=>(
          <Lap 
            number={laps.length - index} 
            interval={lap}
            key={laps.length - index}
            slowest={lap===max}
            fastest={lap===min}
          />))}
      </ScrollView>
    )
  }

export default class LinksScreen extends Component {
 
  render(){
    return (
      <View style={styles.container}>
        <Timer interval={Data.time} style={styles.timer}/>
        <ButtonsRow>
          <RoundButtons title='Reset' color='#FFFFFF' backgroundColor='#3D3D3D'/>
          <RoundButtons title='Start' color='#50D167' backgroundColor='#1B361F'/>
        </ButtonsRow>
          <LapsTable laps={Data.laps}/>
      </View>
    );
  }
}

LinksScreen.navigationOptions = {
  title: 'Timer',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    backgroundColor: '#0D0D0D',
    paddingTop:130,
    paddingHorizontal:20,
  },
  timer:{
    color:'white',
    fontSize:40,
    fontWeight:'200'
  },
  button:{
    width:80,
    height:80,
    borderRadius:40,
    justifyContent:'center',
    alignItems:'center'
    },
    buttonTitle:{
      fontSize:20
    },
    buttonBorder:{
      width:78,
      height:78,
      borderRadius:40,
      borderWidth:2,
      justifyContent:'center',
      alignItems:'center',
    },
    buttonsrow:{
      flexDirection:'row',
      alignSelf:'stretch',
      justifyContent:'space-between',
      marginTop:80,
      marginBottom:30
    },
    lapText:{
      color:'#FFFFFF',
      fontSize:18
    },
    ScrollView:{
      alignSelf:'stretch',
      borderColor:'#151515',
      borderTopWidth:1,
      paddingVertical:10,
    },
    lap:{
      flexDirection:'row',
      justifyContent:'space-between'
    },
    fastest:{
      color:'#4BC05F',
    },
    slowest:{
      color:'#CC3531',
    }
  });