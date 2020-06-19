import React from "react";
import {
  ScrollView,
  KeyboardAvoidingView,
  View,
  StyleSheet,
  Button,
} from "react-native";

import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
const Auth = () => {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <Card style={styles.authContainer}>
        <ScrollView>
          <Input
            id="email"
            label="E-Mail"
            keyboardType="email-address"
            required
            email
            autoCapitalize="none"
            errorMessage="Please enter a valid email address"
            onInputChange={() => {}}
            // onValueChange={() => {}}
            initialValue=""
          />

          <Input
            id="password"
            label="Password"
            keyboardType="default"
            secureTextEntry
            required
            minLength={5}
            autoCapitalize="none"
            errorMessage="Please enter a valid password"
            onInputChange={() => {}}
            initialValue=""
          />
          <Button title="Login" color={Colors.PRIMARY} onPress={() => {}} />
          <Button
            title="Switch to sign up"
            color={Colors.SECONDARY}
            onPress={() => {}}
          />
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({});
export default Auth;
