import { useState } from "react";
import { StyleSheet, Text, View, Switch, TouchableOpacity, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const SettingsScreen = ({
  isEnabledAdminMode,
  isEnabledDarkTheme,
  setIsEnabledAdminMode,
}) => {
  const toggleSwitch = () =>
    setIsEnabledAdminMode((previousState) => !previousState);

  return (
    <View style={styles.container}>
          <LinearGradient
          // Background Linear Gradient
          colors={["#6183a6", "#163538"]}
          style={styles.background}
        />
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabledAdminMode ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabledAdminMode}
      />
      <Text>Режим администратора</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: "#246BFA",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get("window").height,
  },
});

export default SettingsScreen;
