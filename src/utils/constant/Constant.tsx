// instructionTxtFRD.tsx

import {Alert, Platform, ToastAndroid} from 'react-native';

//------------------add all static string---------------------------------------
export const instructionTxtFRD: string =
  'Please tell us about the meals that you eat on a day-to-day basis. Mention a variety of options & not just one.';
export const instructionTxtWMD: string =
  'Please describe the meals you eat before or after your workouts, if any.';
export const selectTxtWMD: string =
  'Besides the recall you shared, are there any additional pre-workout or post-workout meals you consume?';
export const validateShowMoreFRD: string =
  "Please select time and input field can't be empty";
//---------------add resusable function------------------------------
export const showToast = (message: string) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    // Use Alert for iOS, as Toast is not available
    Alert.alert('Notification', message);
  }
};
