import { useEffect, useState } from 'react';
import { StyleSheet, Text,View, Image, Item,TouchableOpacity, TextInput,  Dimensions  } from 'react-native';

import MapView from 'react-native-maps';

const SearchScreen = (data) =>{
    const [text, setText] = useState('');
    const [template, setTemplate] = useState([]);
    
    useEffect(()=>{
      const Search = () =>{  
        setTemplate(Object.values(data).flat().map(e=>e.data).flat(2)
        .filter(el=>el.heading.includes(text)).map((item)=> item));
      }
      setTemplate(Search);  
    },[text])

    const Item = () => {
      if(!text){
        return
      }
      return(
        template.map(e=>
          <View key={e.id}>
            <Text>
              {e.heading}
            </Text>
          </View>
        )
      )
    }

    return(
      <View style={{flex:1, justifyContent:'flex-start', alignItems:'center'}}>
        <TextInput
        style={styles.input}
        onChangeText={(text) =>setText(text.toLowerCase())}
        placeholder='введите что-нибудь'
      />
      <Item/>
      <MapView style={styles.map} />
      </View>
    )
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    width:300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});


export default SearchScreen;