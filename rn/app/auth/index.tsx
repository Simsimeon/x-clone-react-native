import UseSocialAuth from "@/hooks/useSocialAuth";
import { Image } from "expo-image";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
export default function MainScreen() {
  const { isLoading, onPressAuth } = UseSocialAuth();

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 px-8 justify-between">
        <View className="flex-1 justify-center">
          <View className="items-center">
            <Image
              source={require("../../assets/images/auth1.png")}
              style={{ width: 300, height: 300 }}
              // className="size-96"
              resizeMode="contain"
            />
          </View>
          <View className="flex-col gap-2">
            <TouchableOpacity
              className="mt-1 flex-row items-center justify-center bg-white border border-gray-300 rounded-full py-3 px-6"
              onPress={() => onPressAuth("oauth_apple")}
              disabled={isLoading}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <View className="flex-row items-center justify-center">
                <Image
                  source={require("../../assets/images/apple.png")}
                  style={{ width: 30, height: 30, marginRight: 12 }}
                  resizeMode="contain"
                />
                <Text className="text-black font-medium text-base">
                  Continue with Apple
                </Text>
                {isLoading && <ActivityIndicator size="small" color="#000" />}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="mt-1 flex-row items-center justify-center bg-white border border-gray-300 rounded-full py-3 px-6"
              onPress={() => onPressAuth("oauth_google")}
              disabled={isLoading}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <View className="flex-row items-center justify-center">
                <Image
                  source={require("../../assets/images/google.png")}
                  style={{ width: 30, height: 30, marginRight: 12 }}
                  resizeMode="contain"
                />
                <Text className="text-black font-medium text-base">
                  Continue with Google
                </Text>
                {isLoading && <ActivityIndicator size="small" color="#000" />}
              </View>
            </TouchableOpacity>
          </View>
          <Text className="text-center text-gray-500 text-xs mt-6 leading-4 px-2">
            By sign up, you agree to our{" "}
            <Text className="text-blue-500">Terms</Text>
            {", "}
            <Text className="text-blue-500">Privacy policy</Text>
            {", and "}
            <Text className="text-blue-500">Cookies Use</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
//   const handleSignUp = async () => {
//     const { error } = await signUp.password({ emailAddress, password });
//     if (error) {
//       // Handle the error in your app.
//       // See https://clerk.com/docs/guides/development/custom-flows/error-handling
//       return;
//     }

//     const { error: sendError } = await signUp.verifications.sendEmailCode();
//     if (sendError) {
//       // Handle the error in your app.
//       return;
//     }

//     setIsVerifying(true);
//   };

//   const handleVerify = async () => {
//     const { error } = await signUp.verifications.verifyEmailCode({ code });
//     if (error) {
//       // Handle the error in your app.
//       return;
//     }

//     const { error: finalizeError } = await signUp.finalize();
//     if (finalizeError) {
//       // Handle the error in your app.
//     }
//   };

//   if (!isLoaded) {
//     return null;
//   }

//   if (isSignedIn) {
//     return (
//       <View style={styles.container}>
//         <Text>You&apos;re signed in</Text>
//       </View>
//     );
//   }

//   if (isVerifying) {
//     return (
//       <View style={styles.container}>
//         <TextInput
//           style={styles.input}
//           value={code}
//           placeholder="Enter your verification code"
//           onChangeText={setCode}
//           keyboardType="numeric"
//         />
//         <Button title="Verify" onPress={handleVerify} />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         autoCapitalize="none"
//         value={emailAddress}
//         placeholder="Enter email"
//         onChangeText={setEmailAddress}
//         keyboardType="email-address"
//       />
//       <TextInput
//         style={styles.input}
//         value={password}
//         placeholder="Enter password"
//         secureTextEntry={true}
//         onChangeText={setPassword}
//       />
//       <Button title="Sign up" onPress={handleSignUp} />
//       {/* Required for sign-up flows on Expo web. Clerk skips the browser CAPTCHA on iOS and Android */}
//       <View nativeID="clerk-captcha" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     gap: 12,
//     justifyContent: "center",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//   },
// });
