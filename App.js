import "./global.css";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screen/LoginScreen";
import RegisterScreen from "./screen/RegisterScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import SewaTourGuideTahapStart from "./screen/SewaTourGuideTahapStart";
import { useFonts } from "expo-font";
import SewaTourGuideTigaTahap from "./screen/SewaTourGuideTigaTahap";

export default function App() {
  const [fontsLoaded] = useFonts({
    'Inter-Thin': require('./assets/fonts/Inter-Thin.otf'),
    'Inter-ExtraLight': require('./assets/fonts/Inter-ExtraLight.otf'),
    'Inter-Light': require('./assets/fonts/Inter-Light.otf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.otf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.otf'),
    'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.otf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.otf'),
    'Inter-ExtraBold': require('./assets/fonts/Inter-ExtraBold.otf'),
    'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
  })

  if(!fontsLoaded){
    return null;
  }
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaView className='flex-1'>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SewaTourGuide"
            options={{ headerShown: false }}
            component={SewaTourGuideTahapStart}
          />
          <Stack.Screen 
            name="SewaTourGuideTigaTahap"
            options={{ headerShown: false }}
            component={SewaTourGuideTigaTahap}
          />
          <Stack.Screen
            name='Login'
            options={{ headerShown: false }}
            component={LoginScreen}
          />
          <Stack.Screen
            name='Register'
            options={{ headerShown: false }}
            component={RegisterScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
