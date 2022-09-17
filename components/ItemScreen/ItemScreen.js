import { useEffect } from "react";
import { View,Text,Button, Image, StyleSheet } from "react-native";


const ItemScreen = ({navigation, data, navCathegory}) => {

  const Item = () =>{
    return(
      Object.values(data.filter(e=> e.title=== navCathegory)
      .map(el=>el.data).flat(2).map(el=> 
      <View key={el.id}>
        <Text>{el.heading}</Text>
        <Text>{el.text}</Text>
        <Image
          style={styles.img}
          source={{
            uri: el.img,
          }}/>
        </View>)) 
    )
  }
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Item/>
 
      </View>
    );
  }

const styles = StyleSheet.create({
  img:{
    width: 50,
    height:50
  },
});

export default ItemScreen;