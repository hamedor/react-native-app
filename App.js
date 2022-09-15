import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text,View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreen from './components/HomeScreen/HomeScreen';
import SearchScreen from './components/SearchScreen/SearchScreen';
import SettingsScreen from './components/SettingsScreen/SettingsScreen';
import { useFetch } from './components/useFetch/useFetch';
import {useState, useEffect} from 'react';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

  const [userInputHeading, setUserInputHeading] = useState('');
  const [userInputText, setUserInputText] = useState('');
  const [userInputTitle, setUserInputTitle] = useState('');
  const [image, setImage] = useState(null);
  
  const [selectedCathegory, setSelectedCathegory] = useState();

  const [base64, setBase64] = useState('');
  const [isEnabledAdminMode, setIsEnabledAdminMode] = useState(true);
  const [isEnabledDarkTheme, setIsEnabledDarkTheme] = useState(false);

  const url = 'http://827013-cs70445.tmweb.ru:4000/db';
  const { data, isLoading, deletePost, addPost} = useFetch(url, userInputTitle, userInputText, image, selectedCathegory, setSelectedCathegory);

  /*
  useEffect(()=>{
    if(data){
      let defaultCathegory = data.map(e=>e.title);
      setSelectedCathegory(defaultCathegory[0]);
    }
  },[data])
*/

  
  const Form = ({data, userInputHeading, setUserInputHeading, userInputText, setUserInputText, userInputImage,setUserInputImage, addPost,setSelectedCathegory, setBase64})=>{

    const userHeadingChange = (e) => setUserInputHeading(e.target.value);
    const userTextChange = (e) => setUserInputText(e.target.value);
    const userCathegoryChange = (e) => {
      setGroup(e.target.value)
    }
   
    const userImageChange = (e) => {
      setUserInputImage(e.target.value);
      const file = e.target.files[0];
      setBase64(base(file));
    }
  
    async function base(file){
      try{
          const result = await toBase64(file)
          setBase64(result);
          return result
      }catch(error){
          console.log('ошибка')
      }
    }
  
    const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
  })

   
}

  return (
    <>
   
   <NavigationContainer>
    <Tab.Navigator 
    screenOptions={({route}) =>({
      tabBarIcon: ({focused, color, size}) =>{
        let iconName;

        if(route.name === 'Главная'){
          iconName = focused
          ? 'home'
          : 'home-outline';
        }else if(route.name === 'Поиск'){
          iconName = focused
          ? 'search'
          : 'search-outline';
        }else if (route.name === 'Настройки'){
          iconName = focused 
          ? 'settings' 
          : 'settings-outline'
        }
        
        return <Ionicons name={iconName} size={size} color={color} />
      },
      tabBarActiveTintColor: '#287233',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {
          backgroundColor: '#211c13'
      },
    })}
    >



      
      <Tab.Screen name="Главная"  children={()=>
      <HomeScreen
      data={data}
      isEnabledAdminMode={isEnabledAdminMode}
      deletePost={deletePost}
      addPost={addPost}
      setUserInputTitle={setUserInputTitle}
      setUserInputText={setUserInputText}
      selectedCathegory={selectedCathegory}
      setSelectedCathegory={setSelectedCathegory}
      image={image}
      setImage={setImage}
      />} 
      />
      <Tab.Screen name="Поиск" children={()=><SearchScreen data={data}/>}
      />
      <Tab.Screen name="Настройки" children={()=>
      <SettingsScreen
      isEnabledAdminMode={isEnabledAdminMode}
      setIsEnabledAdminMode={setIsEnabledAdminMode}
      isEnabledDarkTheme={isEnabledDarkTheme}/>}
      />
    </Tab.Navigator>
   </NavigationContainer>
   </>
  );
}

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: '#211c13',
    
  },
});
