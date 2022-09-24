import { useState } from 'react';
import { StyleSheet, Text,View, Switch, TouchableOpacity } from 'react-native';

const SettingsScreen = ({isEnabledAdminMode, isEnabledDarkTheme, setIsEnabledAdminMode}) =>{
  
  const toggleSwitch = () => setIsEnabledAdminMode(previousState => !previousState);

    return(
      <View style = {styles.container}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabledAdminMode ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabledAdminMode}
        />
      </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 22,
      backgroundColor:'#246BFA',
    },
  });

export default SettingsScreen;