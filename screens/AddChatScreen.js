import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { ChatIcon } from "react-native-heroicons/outline";
import { db } from "../firebase/firebase-config";
import { collection, addDoc } from "firebase/firestore";

const AddChatScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a Chat",
      headerBackTitle: "Chats",
    });
  }, []);

  const [input, setInput] = useState("");

  const createChat = async () => {
    await addDoc(collection(db, "chats"), {
      ChatName: input,
    })
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <View className="bg-white h-full">
      <View className="flex-row items-center border-2 p-1  rounded-sm mt-4 mx-2  border-blue-900">
        <ChatIcon size={30} color="black" />
        <TextInput
          value={input}
          onChangeText={(text) => setInput(text)}
          placeholder="Enter a chat name"
          className="p-2 flex-1"
          onSubmitEditing={createChat}
        />
      </View>
      <TouchableOpacity
        className="bg-blue-500 p-4 m-5 rounded-md"
        onPress={createChat}
      >
        <Text className="mr-2 text-center text-white text-base">
          Create a new Chat
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddChatScreen;
