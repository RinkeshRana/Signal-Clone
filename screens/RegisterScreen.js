import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { auth } from "../firebase/firebase-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const RegisterScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Login",
    });
  }, [navigation]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL:
            imgUrl ||
            "https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
        })
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log("ERROR", error);
          });
        navigation.replace("Login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <KeyboardAvoidingView behavior="padding" className="bg-white h-full">
      <Text className="text-center p-4 text-3xl">Create a Signal Account</Text>
      <View className="">
        <TextInput
          className="p-2 border-2 rounded-md border-gray-300 focus:border-gray-500 py-1 px-2 m-4"
          placeholder="Full Name"
          value={name}
          autoFocus
          onChangeText={(name) => setName(name)}
        />
        <TextInput
          className="p-2 border-2 rounded-md border-gray-300 focus:border-gray-500 py-1 px-2 m-4"
          placeholder="Email Address"
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          className="p-2 border-2 rounded-md border-gray-300 focus:border-gray-500 py-1 px-2 m-4"
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={(password) => setPassword(password)}
        />
        <TextInput
          className="p-2 border-2 rounded-md border-gray-300 focus:border-gray-500 py-1 px-2 m-4"
          placeholder="Profile Picture URL (Optional)"
          value={imgUrl}
          onChangeText={(imgUrl) => setImgUrl(imgUrl)}
          onSubmitEditing={() => register()}
        />
        <View className="flex-row items-center justify-center space-x-5 mt-3">
          <TouchableOpacity
            className="bg-blue-500 text-white w-1/3 rounded-md "
            onPress={register}
          >
            <Text className="text-center text-white text-lg p-2">Register</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className=" border-2 border-blue-500 shadow-lg w-1/3 rounded-md "
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text className="text-center  text-blue-500 text-lg p-2 font-bold">
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
