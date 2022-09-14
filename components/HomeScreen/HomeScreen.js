import { StyleSheet, Text,View, Image, TouchableOpacity } from 'react-native';
import {useEffect} from 'react';
import { SectionList } from 'react-native';
import { useState } from 'react';

const HomeScreen = ({data}) =>{

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
        }}
      />
              </View> 
            )}
            renderSectionHeader={({section: {title}}) => (
                <Text style={{fontWeight: 'bold'}}>{title}</Text>)}
            sections={data}
        />
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
}
});

export default HomeScreen;

