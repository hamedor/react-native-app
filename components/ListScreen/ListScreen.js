import {StyleSheet ,View,Text,Button, FlatList, TouchableOpacity } from "react-native-web";
import { useNavigation } from '@react-navigation/native';

const ListScreen = ({ data, setNavCathegory}) => {

  const navigation = useNavigation();

  const openItem = (e) =>{
    setNavCathegory(e.target.textContent);
    navigation.navigate('ItemScreen');
  }

  const Item = ({ title }) => (
    <TouchableOpacity
      onPress={(e) => openItem(e)}
      style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );



  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
        <Item/>
          <FlatList
            data={data}
            renderItem={renderItem}
            />
          <Button
            title="Go to Item"
            onPress={() => navigation.navigate('ItemScreen')}
            />
    </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      
      backgroundColor: '#211c13',
      
    },
  });

export default ListScreen;