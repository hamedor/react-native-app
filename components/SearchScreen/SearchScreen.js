import { useEffect, useState } from 'react';
import { StyleSheet, Text,View, Image, Item,TouchableOpacity, TextInput  } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const SearchScreen = ({data, setItem}) =>{
    const [text, setText] = useState('');
    const [template, setTemplate] = useState([]);

    const navigation = useNavigation();

    const openDetails = (heading) =>{
      navigation.navigate('Итемы');
      setItem(heading);    
    }
    
    useEffect(()=>{
      const Search = () =>{  
        setTemplate(Object.values(data).flat().map(e=>e.data).flat(2)
        .filter(el=>el.heading.toLowerCase().includes(text)).map((item)=> item));
      }
      setTemplate(Search);  
      console.log(template)
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
            <TouchableOpacity
              style={styles.button}
              onPress={()=> openDetails(e.heading)}> 
              <Text style={styles.text}>Подробнее</Text>
            </TouchableOpacity>
          </View>
        )
      )
    }

    return(
      <View style={styles.container}>
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
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor:'#246BFA',
  },
  input: {
    height: 40,
    width:300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

});


export default SearchScreen;