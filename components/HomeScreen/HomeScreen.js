import { StyleSheet, Text,View, Image, TouchableOpacity,SectionList,Modal, TextInput, Button, FlatList, Platform } from 'react-native';
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
    navigation.navigate('ItemsListScreen');
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
    <View style={{'height': '100%'}}>
      <View style={styles.centeredView}>
        <Text style={styles.title}>Выберите категорию</Text>
          <FlatList
            data={data}
            renderItem={renderItem}
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
},
item: {
padding: 10,
fontSize: 18,
height: 44,
borderWidth: 1,
marginTop: 10,
},
img:{
  width: 50,
  height:50
},
centeredView: {
  flex: 1,
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

/*
<View style={styles.container}>
        <SectionList
            renderItem={({item}) => item.map(e=>
              <View key={e.id}>
                <Text>{e.heading}</Text>
                <Text>{e.text}</Text>
                <Image
                  style={styles.img}
                  source={{
                  uri: e.img,
                  }}/>
                  <DeletePostButton item={item} id={e.id}/>
      
              </View> 
            )}
            renderSectionHeader={({section: {title}}) => (
                <Text style={{fontWeight: 'bold'}}>{title}</Text>)}
            sections={data}
        />
        */