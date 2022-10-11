import {
  ImageBackground,
  StyleSheet,
  Dimensions,
  Text,
  View,
  Image,
  TouchableOpacity,
  SectionList,
  Modal,
  TextInput,
  Button,
  FlatList,
  Platform,
} from "react-native";
import { useEffect } from "react";
import { useState } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import ModalWindow from "../ModalWindow/ModalWindow";

import ekatImage from "../../assets/ekat.jpg";

const HomeScreen = ({
  data,
  isEnabledAdminMode,
  deletePost,
  addPost,
  setUserInputTitle,
  setUserInputText,
  setNavCathegory,
  selectedCathegory,
  setSelectedCathegory,
  setUserInputLatitude,
  setUserInputLongitude,
  image,
  setImage,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const ModalOpen = () => {
    if (isEnabledAdminMode) {
      return (
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <Text style={styles.postAdd}>Добавить пост</Text>
        </TouchableOpacity>
      );
    }
  };

  const DeletePostButton = ({ id, item }) => {
    if (isEnabledAdminMode) {
      return (
        <TouchableOpacity onPress={() => deletePost(id, item)}>
          <Text>Удалить</Text>
        </TouchableOpacity>
      );
    }
  };

  const openItem = (title) => {
    setNavCathegory(title);

    navigation.navigate("Категории");
  };

  const Item = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => openItem(item.title)}>
      <Text style={styles.text}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={ekatImage}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.centeredView}>
          <FlatList data={data} renderItem={Item} style={styles.list} />
        </View>
        <ModalOpen />
        <ModalWindow
          data={data}
          addPost={addPost}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setUserInputTitle={setUserInputTitle}
          setUserInputText={setUserInputText}
          setUserInputLatitude={setUserInputLatitude}
          setUserInputLongitude={setUserInputLongitude}
          selectedCathegory={selectedCathegory}
          setSelectedCathegory={setSelectedCathegory}
          image={image}
          setImage={setImage}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    marginTop: 20,
    height: 50,
    width: Dimensions.get("window").width - 30,
    padding: 10,
    fontWeight: "bold",
    backgroundColor: "#000000c0",
  },
  text: {
    color: "#fff",
    fontSize: 22,
    textAlign: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  img: {
    width: 50,
    height: 50,
  },
  centeredView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  title: {
    fontSize: 30,
  },
  postAdd: {
    borderWidth: 1,
    textAlign: "center",
    marginBottom: 10,
  },
});

export default HomeScreen;
