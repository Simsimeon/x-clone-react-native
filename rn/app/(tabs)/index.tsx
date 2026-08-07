import SignoutButton from "@/component/signoutButton";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white px-4 py-4">
      <View className="flex justify-center items-center gap-4">
        <Text className="text-2xl font-bold text-gray-700">Welcome Home</Text>
        <Text className="text-center text-gray-500">
          You are now signed in. Use the tabs below to navigate the app.
        </Text>
        <SignoutButton />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
