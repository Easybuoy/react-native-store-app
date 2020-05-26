import React from "react";
import { View, StyleSheet } from "react-native";

import Colors from "../../constants/Colors";

const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    shadowColor: Colors.BLACK,
    backgroundColor: Colors.WHITE,
  },
});
export default Card;
