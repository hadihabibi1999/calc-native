import {createStore} from 'redux';
import {StyleSheet} from 'react-native'

const initial = styles.color1

const reducer = (state=initial,action) => {
switch(action.type){
    case 'first':
        return styles.color1
    case 'secound':
        return styles.color2
    default:
        return state;
}
}

const store = createStore(reducer);

export default store;


const styles= StyleSheet.create({
    color1:{
        backgroundColor:'skyblue'
    },
    color2:{
        backgroundColor:'steelblue'
    }
})