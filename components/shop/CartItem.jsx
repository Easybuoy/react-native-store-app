import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const CartItem = ({ quantity, title, amount, onRemove }) => {
  return (
    <View style={styles.cardItem}>
      <Text style={styles.itemData}>
        <Text style={styles.quantity}>
          {quantity} <Text style={styles.mainText}>{title}</Text>
        </Text>
      </Text>

      <View style={styles.itemData}>
        <Text style={styles.mainText}>{amount}</Text>
        <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
          <Ionicons
            name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
            size={23}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardItem: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    fontFamily: "open-sans",
    color: Colors.GREY,
    fontSize: 16,
  },
  mainText: {
    fontFamily: "open-sans-bold",
    fontSize: 62,
  },
  deleteButton: {
    marginLeft: 20,
  },
});

export default CartItem;
