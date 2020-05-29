import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

import Colors from "../../constants/Colors";

const Spinner = () => {
  return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color={Colors.PRIMARY} />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Spinner;
