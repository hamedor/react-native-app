import { useEffect } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import MapView from "react-native-maps";
import { LinearGradient } from "expo-linear-gradient";

const ItemScreen = ({ data, navCathegory, item }) => {
  const Item = () => {
    return data
      .map((el) => el.data)
      .flat(2)
      .filter((el) => el.id === item)
      .map((el) => (
        <View key={el.id}>
          <Text>{el.heading}</Text>

          <Image
            style={styles.img}
            source={{
              uri: el.img,
            }}
          />
          <Text>{el.text}</Text>
        </View>
      ));
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#6183a6", "#163538"]}
        style={styles.background}
      />
      <Item />
      <MapView style={styles.map} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: "#246BFA",
  },
  img: {
    width: Dimensions.get("window").width,
    height: 160,
  },
  map: {
    width: Dimensions.get("window").width,
    height: 200,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get("window").height,
  },
});

export default ItemScreen;
