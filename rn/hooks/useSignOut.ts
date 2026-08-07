import { useClerk } from "@clerk/expo";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

const useSignOut = () => {
  // 🚀 FIX 2: Change to camelCase naming convention
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        // 🚀 FIX 1: Make this function async and add error handling
        onPress: async () => {
          try {
            await signOut();
            router.replace("/auth");
          } catch (error) {
            console.error("Sign out error:", error);
            Alert.alert(
              "Error",
              "Failed to log out cleanly. Please try again.",
            );
          }
        },
      },
    ]);
  };

  return { handleSignOut };
};

export default useSignOut;
