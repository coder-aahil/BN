import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import COLORS from '../../../utils/colors/Colors';

import FoodRecallCollapsableCard from '../../common/card/FoodRecallCollapsableCard';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {instructionTxtFRD} from '../../../utils/constant/Constant';
import SubmitButton from '../../common/button/SubmitButton';

// Define the param list for your navigation stack
type RootStackParamList = {
  FoodRecallDetails: undefined; // No params for this screen
  AnotherScreen: {id: number}; // Example of a screen with params
};

// Define the navigation prop type for this screen
type FoodRecallDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'FoodRecallDetails'
>;

type Props = {
  navigation: FoodRecallDetailsScreenNavigationProp;
  route: RouteProp<RootStackParamList, 'FoodRecallDetails'>;
};

const FoodRecallDetailsScreen: React.FC<Props> = ({navigation}) => {
  const [mealData, setMealData] = useState([
    {
      mealType: 'breakfast',
      time: '',
      options: [''],
      title: 'Breakfast',
      mandatory: true,
    },
    {
      mealType: 'midMorning',
      time: '',
      options: [''],
      title: 'Mid-morning',
      mandatory: false,
    },
    {
      mealType: 'lunch',
      time: '',
      options: [''],
      title: 'Lunch',
      mandatory: true,
    },
    {
      mealType: 'lateEvening',
      time: '',
      options: [''],
      title: 'Late evening',
      mandatory: false,
    },
    {
      mealType: 'dinner',
      time: '',
      options: [''],
      title: 'Dinner',
      mandatory: true,
    },
  ]);

  const [collapsed, setCollapsed] = useState(
    mealData.map((_, index) => index !== 0), // Only the first card is expanded initially
  );
  const [isSubmitActive, setIsSubmitActive] = useState(false);

  // Call this function each time the data changes
  useEffect(() => {
    setIsSubmitActive(areAllMandatoryFieldsFilled());
  }, [mealData]);

  // Function to update time for a meal
  const handleChangeTime = (mealType: any, time: any) => {
    setMealData(prevData =>
      prevData.map(meal =>
        meal.mealType === mealType ? {...meal, time} : meal,
      ),
    );
  };

  const handleAddOption = (
    mealType: string,
    index?: number,
    option?: string,
  ) => {
    setMealData(prevData =>
      prevData.map(meal =>
        meal.mealType === mealType
          ? {
              ...meal,
              options:
                index !== undefined
                  ? option !== undefined
                    ? meal.options.map((opt, i) => (i === index ? option : opt)) // Update option
                    : meal.options.length > 1 // Prevent removing last option
                    ? meal.options.filter((_, i) => i !== index) // Remove only if more than 1 option
                    : meal.options // Keep at least 1 option even if empty
                  : [...meal.options, ''], // Add new option if Add More is pressed
            }
          : meal,
      ),
    );
  };

  // Function to toggle collapse for a card
  const toggleCollapse = (mealType: string) => {
    setCollapsed(prev =>
      mealData.map(meal =>
        meal.mealType === mealType ? !prev[mealData.indexOf(meal)] : true,
      ),
    );
  };

  // Check if the time field is filled for mandatory cards
  const isTimeComplete = (meal: any) =>
    meal.mandatory ? meal.time !== '' : true;

  // Check if at least one option is filled for mandatory cards
  const isOptionsComplete = (meal: any) =>
    meal.mandatory ? meal.options[0] !== '' : true;

  const isNextCardActive = (index: number) => {
    if (index === 0) return true; // First card is always active

    // Check all previous meals before the current one
    for (let i = 0; i < index; i++) {
      const previousMeal = mealData[i];

      // For mandatory meals, both time and options must be filled
      if (previousMeal.mandatory) {
        if (!isTimeComplete(previousMeal) || !isOptionsComplete(previousMeal)) {
          return false; // If a mandatory meal is incomplete, stop here
        }
      } else {
        // For non-mandatory meals, only check time, options can be skipped
        if (previousMeal.time && !isOptionsComplete(previousMeal)) {
          return false; // If non-mandatory has time but no options, stop here
        }
      }
    }

    // If all previous cards pass the checks, activate the current card
    return true;
  };

  const areAllMandatoryFieldsFilled = () => {
    return mealData.every(meal => {
      // For mandatory meals, both time and options must be filled
      if (meal.mandatory) {
        return isTimeComplete(meal) && isOptionsComplete(meal);
      }
      return true; // Non-mandatory meals can be skipped
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {instructionTxtFRD && (
          <View
            style={{
              backgroundColor: COLORS.primaryColorLight,
              padding: 16,
              marginBottom: 8,
            }}>
            <Text style={styles.instructions}>{instructionTxtFRD}</Text>
          </View>
        )}
        {mealData.map((meal, index) => (
          <View key={meal.mealType}>
            <FoodRecallCollapsableCard
              mealType={meal.mealType}
              mealData={meal}
              onAddOption={handleAddOption}
              onChangeTime={handleChangeTime}
              collapsed={collapsed[index]}
              toggleCollapse={toggleCollapse}
              isNextCardActive={isNextCardActive(index)} // Control when each card is active
            />
          </View>
        ))}
      </ScrollView>
      <SubmitButton
        isActive={isSubmitActive}
        onPress={() => {
          if (isSubmitActive) {
            navigation.navigate('WorkoutMealDetailsScreen');
          }
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,

    backgroundColor: '#fff',
  },
  scrollView: {
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  mealContainer: {
    marginBottom: 30,
  },
  mealTitleContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  timePickerButton: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  timePickerText: {
    color: '#333',
  },
  addMoreButton: {
    backgroundColor: '#eee',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  addMoreText: {
    color: '#333',
  },
  submitButton: {
    backgroundColor: COLORS.greyDark,
    padding: 15,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  confirmButton: {
    marginTop: 20,

    padding: 10,
    borderRadius: 5,
  },
  confirmText: {
    fontWeight: 'bold',
    color: COLORS.accentColor,
  },
  cancelButton: {
    marginTop: 10,

    padding: 10,
    borderRadius: 5,
  },
  cancelText: {
    fontWeight: 'bold',
  },
});

export default FoodRecallDetailsScreen;
