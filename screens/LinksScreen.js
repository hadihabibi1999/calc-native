
import React, {Component} from 'react';
import { ScrollView, View,  Text, StyleSheet} from 'react-native';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';

  
  function Timer({interval, style}) {
    const pad = (n) => n < 10 ? '0'+n : n
    const duration = moment.duration(interval)
    const centisecond = Math.floor(duration.milliseconds()/10)
    return <Text style={style}>{pad(duration.minutes())}:{pad(duration.seconds())}.{pad(centisecond)}</Text>
  }

  function RoundButtons ({title,color,backgroundColor,onPress,disabled}){
  return (
    <TouchableOpacity onPress={()=>!disabled && onPress() } activeOpacity={disabled ? 0.1 : 0.6} style={[styles.button,{backgroundColor:backgroundColor}]}> 
      <View style={styles.buttonBorder}>
        <Text style={[styles.buttonTitle,{color}]}>{title}</Text>
      </View>
    </TouchableOpacity>
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

  function LapsTable ({laps,timer}){
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
            interval={index===0?timer+lap:lap}
            key={laps.length - index}
            slowest={lap===max}
            fastest={lap===min}
          />))}
      </ScrollView>
    )
  }

export default class LinksScreen extends Component {
 constructor(props){
   super(props);
   this.state={
    start:0,
    now:0,
    laps:[ ]
   }
 }

 componentWillUnmount(){
   clearInterval(this.timer)
 }


 start=()=>{
const now = new Date().getTime()
this.setState({
start:now,
now,
laps:[0]
})
this.time = setInterval(()=>{
  this.setState({
    now : new Date().getTime()})
  },100)
 }


 lap=()=>{
   const timestamp = new Date().getTime()
   const {laps,now,start} = this.state
   const [firstLap, ...others] = laps
   this.setState({
   laps :[0,firstLap+now-start,...others],
   start:timestamp,
   now:timestamp
   })
 }

 stop=()=>{
   clearInterval(this.time)
  const {laps,now,start} = this.state
  const [firstLap, ...others] = laps
  this.setState({
  laps :[firstLap + now - start ,  ...others],
  start:0,
  now:0
  })
 }

 reset=()=>{
   this.setState({
     laps:[],
     now:0,
     start:0
   })
 }
  
 resume=()=>{
   const now = new Date().getTime()
   this.setState({
     start:now,
     now,
   })
   this.time = setInterval(()=>{
    this.setState({
      now : new Date().getTime()})
    },100)
 }


  render(){
    const {now,start,laps} = this.state
    const time = now - start
    return (
      <View style={styles.container}>
        <Timer interval={laps.reduce((total,curr)=>total+curr,0)+time} style={styles.timer}/>

        {laps.length===0 && (  <ButtonsRow>
          <RoundButtons onPress={this.reset} title='Lap' color='#8B8B90' backgroundColor='#151515' disabled/>
          <RoundButtons onPress={this.start} title='Start' color='#50D167' backgroundColor='#1B361F'/>
        </ButtonsRow>)}
       
        {start > 0 && ( <ButtonsRow>
          <RoundButtons onPress={this.lap}   title='Lap' color='#FFFFFF' backgroundColor='#3D3D3D'/>
          <RoundButtons onPress={this.stop} title='Stop' color='#E33935' backgroundColor='#3C1715'/>
        </ButtonsRow>)}

        {laps.length > 0 && start===0 && ( <ButtonsRow>
          <RoundButtons onPress={this.reset}   title='Reset' color='#FFFFFF' backgroundColor='#3D3D3D'/>
          <RoundButtons onPress={this.resume} title='Start'  color='#50D167' backgroundColor='#1B361F'/>
        </ButtonsRow>)}
       
          <LapsTable laps={laps} timer={time}/>
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
      borderWidth:1,
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