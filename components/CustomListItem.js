import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

const CustomListItem = ({ id, chatName, enterChat }) => {
  return (
    <TouchableOpacity>
      <View className="bg-white flex-row items-center p-2 space-x-3">
        <Image
          className="h-10 w-10 rounded-full"
          source={{
            uri: "https://picsum.photos/200/300",
          }}
        />
        <View>
          <Text className="font-extrabold text-base">{chatName}</Text>
          <Text className="font-light truncate w-5/6 " numberOfLines={1}>
            Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet..
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CustomListItem;
