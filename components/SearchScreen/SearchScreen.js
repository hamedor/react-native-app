import { useEffect, useState } from 'react';
import { StyleSheet, Text,View, Image, Item,TouchableOpacity, TextInput } from 'react-native';

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
});


export default SearchScreen;