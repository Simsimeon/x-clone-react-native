import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/expo";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import "../constant/global.css";

// 🚀 FIX 1: Create a secure, compliant native token cache token engine
const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      return item;
    } catch (error) {
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

function RootNavigation() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === "auth";
    const inTabsGroup = segments[0] === "(tabs)";

    if (isSignedIn && inAuthGroup) {
      router.replace("/(tabs)");
    } else if (!isSignedIn && inTabsGroup) {
      router.replace("/auth");
    }
  }, [isLoaded, isSignedIn, router, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="auth" />
      <Stack.Screen name="sso-callback" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <RootNavigation />
      </ClerkLoaded>
    </ClerkProvider>
  );
}
