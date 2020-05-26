import React from "react";
import { View, ScrollView, Text, TextInput, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
const EditProduct = () => {
  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput style={styles.input} />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Image Url</Text>
          <TextInput style={styles.input} />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Price</Text>
          <TextInput style={styles.input} />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput style={styles.input} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: Colors.LIGHT_GREY,
    borderBottomWidth: 1,
  },
});

export default EditProduct;
