import {StyleSheet ,View,Text,Button, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useState } from "react";

const ItemsListScreen = ({ data, setNavCathegory, navCathegory, setItem}) => {

  const navigation = useNavigation();

  const openDetails = (heading) =>{
    navigation.navigate('Итемы');
    setItem(heading);    
  }

  const Item = () =>{
    return(
      data.filter(e=> e.title=== navCathegory)
      .map(el=>el.data).flat(2).map(el=> 
      <View key={el.id}>
          <Image
          style={styles.img}
          source={{
            uri: el.img,
          }}/>
        <Text>{el.heading}</Text>
        <Text>{el.text}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={()=> openDetails(el.heading)}> 
          <Text style={styles.text}>Подробнее</Text>
        </TouchableOpacity>
      </View>)
    )
  }
    return (
      <View style={styles.container}>
        <Item/>
 
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

});



export default ItemsListScreen;

/*



*/