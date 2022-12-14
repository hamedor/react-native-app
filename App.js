import * as React from "react";
import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import SearchScreen from "./components/SearchScreen/SearchScreen";
import SettingsScreen from "./components/SettingsScreen/SettingsScreen";
import { useFetch } from "./components/useFetch/useFetch";
import { useState, useEffect } from "react";

import ItemsListScreen from "./components/ItemsListScreen/ItemsListScreen";
import ItemScreen from "./components/ItemScreen/ItemScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  const Map = () => {
    return (
      <YaMap
        userLocationIcon={{
          uri: "https://www.clipartmax.com/png/middle/180-1801760_pin-png.png",
        }}
        initialRegion={{
          lat: 50,
          lon: 50,
          zoom: 10,
          azimuth: 80,
          tilt: 100,
        }}
        style={{ flex: 1 }}
      />
    );
  };

  const [userInputText, setUserInputText] = useState("");
  const [userInputTitle, setUserInputTitle] = useState("");
  const [userInputLatitude, setUserInputLatitude] = useState("");
  const [userInputLongitude, setUserInputLongitude] = useState("");
  const [image, setImage] = useState(null);
  const [navCathegory, setNavCathegory] = useState("");
  const [item, setItem] = useState("");

  const [selectedCathegory, setSelectedCathegory] = useState();

  const [base64, setBase64] = useState("");
  const [isEnabledAdminMode, setIsEnabledAdminMode] = useState(true);
  const [isEnabledDarkTheme, setIsEnabledDarkTheme] = useState(false);

  const url = "http://827013-cs70445.tmweb.ru:4000/db";
  const { data, isLoading, deletePost, addPost } = useFetch(
    url,
    userInputTitle,
    userInputText,
    userInputLatitude,
    userInputLongitude,
    image,
    selectedCathegory,
    setSelectedCathegory
  );

  const HomeStack = createNativeStackNavigator();

  const HomeStackScreen = () => {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen
          options={{
            headerStyle: {
              backgroundColor: "#6183a6",
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
          }}
          name="??????????????"
          children={() => (
            <HomeScreen
              data={data}
              isEnabledAdminMode={isEnabledAdminMode}
              deletePost={deletePost}
              addPost={addPost}
              setUserInputTitle={setUserInputTitle}
              setUserInputText={setUserInputText}
              setUserInputLatitude={setUserInputLatitude}
              setUserInputLongitude={setUserInputLongitude}
              selectedCathegory={selectedCathegory}
              setSelectedCathegory={setSelectedCathegory}
              image={image}
              setImage={setImage}
              setNavCathegory={setNavCathegory}
            />
          )}
        />
        <HomeStack.Screen
          options={{
            headerStyle: {
              backgroundColor: "#6183a6",
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
          }}
          name="??????????????????"
          children={() => (
            <ItemsListScreen
              data={data}
              navCathegory={navCathegory}
              setItem={setItem}
            />
          )}
        />
        <HomeStack.Screen
          options={{
            headerStyle: {
              backgroundColor: "#6183a6",
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
          }}
          name="??????????"
          children={() => <ItemScreen data={data} item={item} />}
        />
      </HomeStack.Navigator>
    );
  };
  const SearchStack = createNativeStackNavigator();
  const SearchStackScreen = () => {
    return (
      <SearchStack.Navigator>
        <SearchStack.Screen
          options={{
            headerStyle: {
              backgroundColor: "#6183a6",
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
          }}
          name="??????????"
          children={() => <SearchScreen data={data} setItem={setItem} />}
        />
        <SearchStack.Screen
          options={{
            headerStyle: {
              backgroundColor: "#6183a6",
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
          }}
          name="??????????"
          children={() => <ItemScreen data={data} item={item} />}
        />
      </SearchStack.Navigator>
    );
  };

  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "??????????????") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "??????????") {
                iconName = focused ? "search" : "search-outline";
              } else if (route.name === "??????????????????") {
                iconName = focused ? "settings" : "settings-outline";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#fff",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: {
              backgroundColor: "#163538",
              borderTopWidth: 0,
            },
          })}
        >
          <Tab.Screen
            name="??????????????"
            component={HomeStackScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="??????????"
            component={SearchStackScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="??????????????????"
            options={{
              headerStyle: {
                backgroundColor: "#6183a6",
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
              },
            }}
            children={() => (
              <SettingsScreen
                isEnabledAdminMode={isEnabledAdminMode}
                setIsEnabledAdminMode={setIsEnabledAdminMode}
                isEnabledDarkTheme={isEnabledDarkTheme}
              />
            )}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#211c13",
  },
  topBar: {
    backgroundColor: "#211c13",
  },
});
