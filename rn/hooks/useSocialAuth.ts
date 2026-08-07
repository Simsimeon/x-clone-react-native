import { useSSO } from "@clerk/expo";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
WebBrowser.maybeCompleteAuthSession();
const UseSocialAuth = () => {
  const { startSSOFlow } = useSSO();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Pre-warm the browser when the hook mounts
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);

  const onPressAuth = async (strategy: "oauth_google" | "oauth_apple") => {
    try {
      setIsLoading(true);
      const redirectUrl = Linking.createURL("/sso-callback");
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
        // Must match the scheme configured in app.json and Clerk Dashboard
        redirectUrl,
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      }
    } catch (err: any) {
      const provider = strategy === "oauth_google" ? "Google" : "Apple";
      console.error("OAuth error", JSON.stringify(err, null, 2));
      console.error("❌ Real Error Message:", err.message);
      console.error(
        "📋 Clerk Error Array:",
        JSON.stringify(err.errors, null, 2),
      );
      Alert.alert(
        "Error",
        `Failed to sign in with ${provider}. Please try again.`,
      );
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, onPressAuth };
};

export default UseSocialAuth;
