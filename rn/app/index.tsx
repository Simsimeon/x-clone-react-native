import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import "../constant/global.css";
export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to NativeWind!
      </Text>
      <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />
    </View>
  );
}
