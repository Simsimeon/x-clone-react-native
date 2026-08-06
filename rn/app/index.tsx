import { useAuth } from "@clerk/expo";
import { useRouter } from "expo-router";
import { Alert, Pressable, Text, View } from "react-native";

export default function HomeScreen() {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/(auth)");
    } catch (err) {
      console.error("Error signing out:", err);
      Alert.alert(
        "Sign Out Error",
        "Could not complete sign out. Please try again.",
      );
    }
  };

  return (
    <View>
      <Text>HomeScreen</Text>
      <Pressable onPress={handleSignOut} className="mt-5 ">
        <Text>Sign out now</Text>
      </Pressable>
    </View>
  );
}
