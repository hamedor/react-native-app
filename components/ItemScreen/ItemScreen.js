import { useEffect } from "react";
import { View,Text,Button, Image, StyleSheet,Dimensions } from "react-native";
import MapView from 'react-native-maps';

const ItemScreen = ({ data, navCathegory, item}) => {

  const Item = () =>{
    return(
      data.map(el=>el.data).flat(2).filter(el=>el.heading===item).map(el=> 
      <View key={el.id}>
        <Text>{el.heading}</Text>
        <Text>{el.text}</Text>
        <Image
          style={styles.img}
          source={{
            uri: el.img,
          }}/> 
        </View>))  
  }
    return (
      <View style={styles.container}>
        <Item/>
        <MapView style={styles.map} />
      </View>
    );
  }

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: 22,
    backgroundColor:'#246BFA',
  },
  img:{
    width: 50,
    height:50
  },
  map: {
    width: 100,
    height: 100,
  },

});

export default ItemScreen;