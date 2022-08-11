import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        navigation.replace("Home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  return (
    <KeyboardAvoidingView behavior="padding">
      <Image
        className="self-center rounded-2xl"
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/600px-Signal-Logo.svg.png?20201126050550",
        }}
        style={{ width: 200, height: 200, margin: 20 }}
      />

      <View className="">
        <TextInput
          placeholder="Email Address"
          className="border-2 rounded-md border-gray-300 focus:border-gray-500 py-1 px-2 mx-4"
          keyboardType="email-address"
          type="email"
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
        <TextInput
          placeholder="Password"
          className="border-2 rounded-md border-gray-300 focus:border-gray-500 py-1 px-2 m-4"
          value={password}
          secureTextEntry
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <View className="flex-row items-center justify-center space-x-5 mt-3">
        <TouchableOpacity
          className="bg-blue-500 text-white w-1/3 rounded-md "
          onPress={() => {
            loginUser();
          }}
        >
          <Text className="text-center text-white text-lg p-2">Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="border-2 border-blue-500 shadow-lg w-1/3 text-white rounded-md "
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text className="text-center text-blue-500 text-lg p-2">
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
