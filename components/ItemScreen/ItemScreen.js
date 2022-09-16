import { View,Text,Button } from "react-native-web";


const ItemScreen = ({navigation, data, navCathegory}) => {

    console.log(data.filter(e=> e.title=== navCathegory))  //ОТРЕНДЕРИТЬ ЭТО
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Item</Text>
    
      </View>
    );
  }

export default ItemScreen;