import { StyleSheet, Text,View, Image, TouchableOpacity,SectionList,Modal, TextInput } from 'react-native';
import {useEffect} from 'react';
import { } from 'react-native';
import { useState } from 'react';

import ModalWindow from '../ModalWindow/ModalWindow'

const HomeScreen = ({data, isEnabledAdminMode,deletePost, addPost, setUserInputTitle, setUserInputText, selectedCathegory, setSelectedCathegory, image, setImage}) =>{
  const [modalVisible, setModalVisible] = useState(true);

  const ModalOpen = () => {
    if(isEnabledAdminMode){
      return <TouchableOpacity
      onPress={()=> setModalVisible(!modalVisible)}>
        <Text>Добавить пост</Text>
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

  return (
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
        <ModalOpen/>
        <ModalWindow
          data={data}
          addPost={addPost}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setUserInputTitle={setUserInputTitle}
          setUserInputText={setUserInputText}
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
sectionHeader: {
paddingTop: 2,
paddingBottom: 2,
paddingLeft: 10,
paddingRight: 10,
fontSize: 22,
fontWeight: 'bold',
color: '#fff',
backgroundColor: '#F55145',
},

item: {
padding: 10,
fontSize: 18,
height: 44,
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

});

export default HomeScreen;

