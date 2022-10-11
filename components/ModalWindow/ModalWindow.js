import {
  StyleSheet,
  Modal,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";

const ModalWindow = ({
  modalVisible,
  setModalVisible,
  data,
  addPost,
  setUserInputText,
  setUserInputTitle,
  selectedCathegory,
  setSelectedCathegory,
  setUserInputLatitude,
  setUserInputLongitude,
  image,
  setImage,
}) => {
  const handlePickerChoose = (e) => {
    setSelectedCathegory(e);
  };
  //КАК ВЫБРАТЬ КАТЕГОРИЮ ПО ДЕФОЛТУ, НО ТАК, ЧТОБЫ ПОСЛЕ ДОБАВЛЕНИЯ, КОГДА ПРОИСХОДИЛ РЕРЕНДЕРИНГ, СЕЛЕКТ НЕ УСТАНАВЛИВАЛСЯ В ЭТО ДЕФОЛТНОЕ ПОЛОЖЕНИЕ

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Hello World!</Text>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Hide Modal</Text>
          </TouchableOpacity>
          <Picker
            style={{ height: 40, width: 200 }}
            selectedValue={selectedCathegory}
            onValueChange={(e) => handlePickerChoose(e)}
          >
            {data.map((e) => (
              <Picker.Item key={e.title} label={e.title} value={e.title} />
            ))}
          </Picker>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setUserInputTitle(text.toLowerCase())}
            placeholder="Название"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setUserInputText(text.toLowerCase())}
            placeholder="Описание"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setUserInputLatitude(text.toLowerCase())}
            placeholder="Широта"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setUserInputLongitude(text.toLowerCase())}
            placeholder="Долгота"
          />
          <Button title="Выберите изображение" onPress={pickImage} />
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
          <TouchableOpacity onPress={addPost}>
            <Text>Добавить</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: 400,
    height: 800,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ModalWindow;
