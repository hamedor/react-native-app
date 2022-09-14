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
  const [userInputImage, setUserInputImage] = useState('');
  const [group, setGroup] = useState('museums');
  const [base64, setBase64] = useState('');

  const url = 'http://827013-cs70445.tmweb.ru:4000/db';
  const { data, isLoading, deletePost, addPost} = useFetch(url, userInputHeading, userInputText, base64, group);

  
  const Form = ({data, userInputHeading, setUserInputHeading, userInputText, setUserInputText, userInputImage,setUserInputImage, addPost,setGroup, setBase64})=>{

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

    return(
        <div className='modal'>
            <form  className='form'> 
                <select onChange={userCathegoryChange}>
                    {Object.keys(data).map(key =>
                        <option key={key} value={key}>{key}</option> 
                    )}
                </select>
                <input type='text'
                    value={userInputHeading}
                    onChange={userHeadingChange}
                    placeholder='Заголовок'
                    className='form__input'>
                </input>
                <input type='text'
                    value={userInputText}
                    onChange={userTextChange}
                    placeholder='Текст'
                    className='form__input form__input-large'>
                </input>
                <input 
                    value={userInputImage}
                    onChange={userImageChange}      
                    type='file'
                    placeholder='Загрузить изображение'
                    className='form__input'>
                </input>
                <div className='form__buttonContainer'>
                    <button className='btn' onClick={(e) =>addPost(e)}>Добавить запись</button>
                </div>
            </form>
        </div>
    )
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



      
      <Tab.Screen name="Главная"  children={()=><HomeScreen data={data}/>} 
      />
      <Tab.Screen name="Поиск" children={()=><SearchScreen data={data}/>}
      />
      <Tab.Screen name="Настройки" component={SettingsScreen} />
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
