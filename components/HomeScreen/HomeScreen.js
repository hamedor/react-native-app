import { StyleSheet,Dimensions, Text,View, Image, TouchableOpacity,SectionList,Modal, TextInput, Button, FlatList, Platform } from 'react-native';
import {useEffect} from 'react';
import { useState } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import ModalWindow from '../ModalWindow/ModalWindow'



const HomeScreen = ({data, isEnabledAdminMode,deletePost, addPost, setUserInputTitle, setUserInputText,setNavCathegory, selectedCathegory, setSelectedCathegory,setUserInputLatitude,setUserInputLongitude, image, setImage}) =>{
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const ModalOpen = () => {
    if(isEnabledAdminMode){
      return <TouchableOpacity
      onPress={()=> setModalVisible(!modalVisible)}>
        <Text style={styles.postAdd}>Добавить пост</Text>
      </TouchableOpacity>
    }
  }

  const DeletePostButton = ({id, item}) =>{
    if(isEnabledAdminMode){
      return <TouchableOpacity
      onPress={()=>deletePost(id, item)}>
        <Text>Удалить</Text>
      </TouchableOpacity>
      
    }
  }


  const openItem = (e) =>{    
    if(Platform.OS === 'web'){
      setNavCathegory(e.target.textContent)
    }else{
      setNavCathegory(e._dispatchInstances.memoizedProps.children[0].props.children);
    }
      navigation.navigate('Категории');
  }

  const Item = ({ title }) => (
    <TouchableOpacity  
      onPress={(e) => openItem(e)}
      style={styles.item}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );


  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
          <FlatList 
            data={data}
            renderItem={renderItem}
            style={styles.list}
            />        
    </View>
    <ModalOpen/>
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
      setImage={setImage}/>
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor:'#246BFA',
  },
  item: {
  height:190,
  borderTopWidth: 1,
  borderBottomWidth:1,
  width: Dimensions.get('window').width,
  marginTop: 10,
  padding:10,
  
},
img:{
  width: 50,
  height:50
},
centeredView: {
  flex: 1,
  flexDirection: 'column',
  justifyContent: "center",
  alignItems: "center",
  marginTop: 22
},
title:{
  fontSize: 30
},
postAdd:{
  borderWidth:1,
  textAlign:'center',
  marginBottom:10,
  
}

});

export default HomeScreen;

