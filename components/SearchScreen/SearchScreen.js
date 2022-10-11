import { useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  Image,
  Item,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const SearchScreen = ({ data, setItem }) => {
  const [text, setText] = useState("");
  const [template, setTemplate] = useState([]);

  const navigation = useNavigation();

  const openDetails = (id) => {
    setItem(id);
    navigation.navigate("Итемы");
  };

  useEffect(() => {
    const Search = () => {
      setTemplate(
        Object.values(data)
          .flat()
          .map((e) => e.data)
          .flat(2)
          .filter((el) => el.heading.toLowerCase().includes(text))
          .map((item) => item)
      );
    };
    setTemplate(Search);
  }, [text]);

 

  const Item = () => {
    if (!text) {
      return;
    }
    return template.map((e) => (
      <View key={e.id}>
        <Text style={styles.title}>{e.heading}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => openDetails(e.id)}
        >
          <Text style={styles.text}>Подробнее</Text>
        </TouchableOpacity>
      </View>
    ));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#6183a6", "#163538"]}
        style={styles.background}
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setText(text.toLowerCase())}
        placeholder="введите что-нибудь"
        placeholderTextColor="#000" 
      />
      <Item />
    </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: "#246BFA",
    
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#fff',
    alignSelf:'center'
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get("window").height,
  },
  title:{
    marginTop: 30,
    color: '#fff',
    textAlign: 'center'
  },
  text:{
    alignSelf:"center",
    marginTop:10,
    color:'#fff',
  },
  button:{
    alignSelf:'center',
    marginTop:10,
    backgroundColor: "#000000c0",
    width:180,
    height:40
  }
});

export default SearchScreen;
