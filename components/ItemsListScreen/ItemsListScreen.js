import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import ekatImage from "../../assets/ekat.jpg";

import CachedImage from "react-native-expo-cached-image";

const ItemsListScreen = ({ data, setNavCathegory, navCathegory, setItem }) => {
  const navigation = useNavigation();

  const openDetails = (id) => {
    setItem(id);
    navigation.navigate("Итемы");
  };

  const Item = () => {
    return (
      <>
        <LinearGradient
          // Background Linear Gradient
          colors={["#6183a6", "#163538"]}
          style={styles.background}
        />

        {data
          .filter((e) => e.title === navCathegory)
          .map((el) => el.data)
          .flat(2)
          .map((el) => (
            <View style={styles.item} key={el.id}>
              <ImageBackground
                style={styles.img}
                imageStyle={{ borderRadius: 15 }}
                source={{
                  uri: el.img,
                }}
              >
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{el.heading}</Text>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => openDetails(el.id)}
                  >
                    <Text style={styles.text}>Подробнее</Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
          ))}
      </>
    );
  };
  return (
    <View style={styles.container}>
      <Item />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get("window").height,
  },
  img: {
    width: "100%",
    height: "100%",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  image: {
    flex: 1,
  },
  item: {
    width: Dimensions.get("window").width / 2.4,
    height: 200,
  },
  textContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    backgroundColor: "#000000c0",
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  text: {
    color: "#fff",
    textAlign: "center",
  },
});

export default ItemsListScreen;

/*


*/
