// App.tsx
import * as React from 'react';
import {
  Button,
  Text,
  View,
  TouchableOpacity,
  StyleProp,
  TextStyle,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationProp, RouteProp} from '@react-navigation/native'; // For typing navigation and routes
import COLORS from './src/utils/colors/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FoodRecallDetailsScreen from './src/components/screens/DietRecallScreen/FoodRecallDetailsScreen';
import WorkoutMealDetailsScreen from './src/components/screens/DietRecallScreen/WorkoutMealDetailsScreen';

// Define the types for the routes in the navigator
type RootStackParamList = {
  FoodRecallDetailsScreen: undefined;
  WorkoutMealDetailsScreen: undefined;
  Details: {itemId: number; otherParam?: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Define props for HeaderBackButtonWithTitle
type HeaderBackButtonWithTitleProps = {
  navigation: NavigationProp<any>;
  title: string;
  textcolor?: string;
};

const HeaderBackButtonWithTitle: React.FC<HeaderBackButtonWithTitleProps> = ({
  navigation,
  title,
  textcolor,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon
          size={24}
          name="arrow-back"
          color={textcolor || COLORS.defaultText}
        />
      </TouchableOpacity>
      <View>
        <Text
          style={[styles.title, {color: textcolor || COLORS.defaultText}]}
          numberOfLines={1}>
          {title}
        </Text>
      </View>
      <TouchableOpacity activeOpacity={0.8} style={{}} onPress={() => {}}>
        <Icon
          size={24}
          name="headset-mic"
          color={textcolor || COLORS.defaultText}
        />
      </TouchableOpacity>
    </View>
  );
};

// Define the main App component
const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FoodRecallDetailsScreen">
        <Stack.Screen
          name="FoodRecallDetailsScreen"
          component={FoodRecallDetailsScreen}
          options={({navigation}) => ({
            title: '',

            headerShadowVisible: false,
            headerLeft: () => (
              <HeaderBackButtonWithTitle
                navigation={navigation}
                title={'Food Recall Details'}
              />
            ),
          })}
        />
        <Stack.Screen
          name="WorkoutMealDetailsScreen"
          component={WorkoutMealDetailsScreen}
          options={({navigation}) => ({
            title: '',

            headerShadowVisible: false,
            headerLeft: () => (
              <HeaderBackButtonWithTitle
                navigation={navigation}
                title={'Workout Meal Details'}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    flex: 1,
    marginLeft: -16,
    marginRight: 16,
  },
  backButton: {},

  title: {
    fontSize: 18,
    marginHorizontal: 5,
  },
});
