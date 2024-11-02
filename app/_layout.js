import { Stack } from "expo-router";
import { useFonts } from "expo-font";

import "../global.css";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Inter-Thin": require("./../assets/fonts/Inter-Thin.otf"),
    "Inter-ExtraLight": require("./../assets/fonts/Inter-ExtraLight.otf"),
    "Inter-Light": require("./../assets/fonts/Inter-Light.otf"),
    "Inter-Regular": require("./../assets/fonts/Inter-Regular.otf"),
    "Inter-Medium": require("./../assets/fonts/Inter-Medium.otf"),
    "Inter-SemiBold": require("./../assets/fonts/Inter-SemiBold.otf"),
    "Inter-Bold": require("./../assets/fonts/Inter-Bold.otf"),
    "Inter-ExtraBold": require("./../assets/fonts/Inter-ExtraBold.otf"),
    "Inter-Black": require("./../assets/fonts/Inter-Black.otf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='(dashboard)' />
    </Stack>
  );
}