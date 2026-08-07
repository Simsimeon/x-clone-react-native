import useSignOut from "@/hooks/useSignOut";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";

const SignoutButton = () => {
  const { handleSignOut } = useSignOut();
  return (
    <TouchableOpacity className="h-10 w-10" onPress={handleSignOut}>
      <Feather name="log-out" size={24} color={"#0245E"} />
    </TouchableOpacity>
  );
};

export default SignoutButton;
