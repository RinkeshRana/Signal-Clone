import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import CustomListItem from "../components/CustomListItem";
import { auth, db } from "../firebase/firebase-config";
import { CameraIcon, PencilIcon } from "react-native-heroicons/outline";
import { collection, getDocs } from "firebase/firestore";

const HomeScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Signal",
      headerTitleAlign: "center",
      headerTintColor: "black",
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTintStyle: {
        color: "black",
      },
      headerLeft: () => (
        <TouchableOpacity onPress={signOut}>
          <Image
            className="w-11 h-11 rounded-full"
            source={{
              uri: auth?.currentUser?.providerData[0]?.photoURL,
            }}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View className="flex-row space-x-3">
          <TouchableOpacity>
            <CameraIcon
              className="w-7 h-4 text-black"
              size={30}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AddChat");
            }}
          >
            <PencilIcon
              className="w-7 h-4 text-black"
              size={30}
              color="black"
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [chats, setChats] = useState();

  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      await getDocs(collection(db, "chats")).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // set all chats to state
          isMounted &&
            setChats((prevState) => ({
              ...prevState,
              [doc.id]: doc.data(),
            }));
        });
      });
    };
    getData();
    return () => {
      isMounted = true;
      getData();
    };
  }, []);
  console.log(chats);
  return (
    <ScrollView>
      {chats
        ? Object.keys(chats).map((key) => {
            return (
              <CustomListItem
                key={key}
                id={key}
                chatName={chats[key].ChatName}
                enterChat={() => {
                  navigation.navigate("Chat", {
                    chatId: key,
                    chatName: chats[key].ChatName,
                  });
                }}
              />
            );
          })
        : null}
    </ScrollView>
  );
};

export default HomeScreen;
