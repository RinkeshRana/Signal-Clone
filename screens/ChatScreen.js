import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { PhoneIcon, VideoCameraIcon } from "react-native-heroicons/solid";
import { db, auth } from "../firebase/firebase-config";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

const ChatScreen = ({ navigation, route }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View className="flex-row items-center space-x-3">
          <Image
            className="h-8 w-8 rounded-full"
            source={{
              uri: "https://picsum.photos/200/300",
            }}
          />
          <Text className="text-white font-bold">{route.params.chatName}</Text>
        </View>
      ),
      headerLeft: () => (
        <View className="mr-3">
          <TouchableOpacity onPress={navigation.goBack}>
            <ArrowLeftIcon size={25} color="white" />
          </TouchableOpacity>
        </View>
      ),
      headerBackVisible: false,
      headerTitleAlign: "left",
      headerRight: () => (
        <View className="flex-row space-x-3">
          <TouchableOpacity>
            <VideoCameraIcon size={25} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <PhoneIcon size={25} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  const sendMessage = async () => {
    Keyboard.dismiss();
    setInput("");
    await addDoc(collection(db, `chats/${route.params.chatId}/messages`), {
      message: input,
      displayName: auth.currentUser.displayName,
      timestamp: serverTimestamp(),
      email: auth.currentUser.email,
      photoUrl: auth.currentUser.photoURL,
    });
  };

  const [messages, setMessages] = useState();

  useLayoutEffect(() => {
    const unsub = onSnapshot(
      collection(db, `chats/${route.params.chatId}/messages`),
      orderBy("timestamp", "asc"),
      (doc) => {
        doc.docs.map((doc) => {
          setMessages((prev) => ({
            ...prev,
            [doc.id]: doc.data(),
          }));
        });
      }
    );

    return unsub;
  }, [route]);

  const [input, setInput] = useState("");
  return (
    <View className="bg-white">
      <KeyboardAvoidingView className="h-full">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <View className="flex-1">
              <ScrollView className="">
                {messages &&
                  Object?.keys(messages)?.map((key) =>
                    messages[key].email === auth.currentUser.email ? (
                      <View className="flex-row relative justify-between items-center space-x-3 rounded-full m-2 bg-green-300 my-3   max-w-[80%] self-end">
                        <Text className="text-black p-4">
                          {messages[key].message}
                        </Text>
                      </View>
                    ) : (
                      <View>
                        <View className=" bg-gray-300 rounded-full mx-2 items-center space-x-3 my-3 max-w-[80%] self-start">
                          <Text className="text-black font-bold p-4">
                            {messages[key].message}
                          </Text>
                        </View>
                        <Image
                          className="h-8 w-8 rounded-full absolute self-start top-12"
                          source={{
                            uri: "https://picsum.photos/200/300",
                          }}
                        />
                        <Text className="text-gray-400 font-light text-sm absolute top-14 left-9 ">
                          {messages[key].displayName}
                        </Text>
                      </View>
                    )
                  )}
              </ScrollView>
            </View>
            <View className="flex-row  items-center">
              <TextInput
                onSubmitEditing={sendMessage}
                className="flex-1 p-3 bg-[#ECECEC]  rounded-full my-2 ml-2"
                value={input}
                onChangeText={(text) => {
                  setInput(text);
                }}
                placeholder="Signal message"
              />
              <TouchableOpacity onPress={sendMessage} className="p-2">
                <Text className="font-bold">SEND</Text>
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;
