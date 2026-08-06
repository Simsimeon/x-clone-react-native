import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";

export default function SsoCallback() {
  const router = useRouter();

  useEffect(() => {
    const completeAuth = async () => {
      await WebBrowser.maybeCompleteAuthSession();
      router.replace("/");
    };

    void completeAuth();
  }, [router]);

  return null;
}
