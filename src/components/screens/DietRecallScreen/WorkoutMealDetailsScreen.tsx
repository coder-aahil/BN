import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import SubmitButton from '../../common/button/SubmitButton';
import {
  instructionTxtWMD,
  selectTxtWMD,
} from '../../../utils/constant/Constant';
import COLORS from '../../../utils/colors/Colors';
import FoodRecallCollapsableCard from '../../common/card/FoodRecallCollapsableCard';

const WorkoutMealDetailsScreen: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const [mealData, setMealData] = useState([
    {
      mealType: 'breakfast',
      time: '',
      options: [''],
      title: 'What is your usual pre-workout meal?',
      mandatory: false,
    },
  ]);
  const [collapsed, setCollapsed] = useState(
    mealData.map((_, index) => index !== 0), // Only the first card is expanded initially
  );
  const options = [
    {label: 'None', value: 'none'},
    {label: 'Pre-workout', value: 'pre-workout'},
    {label: 'Post-workout', value: 'post-workout'},
    {label: 'Both', value: 'both'},
  ];

  const handleSubmit = () => {
    // Handle submit action
    console.log('Selected Value:', selectedValue);
  };

  const toggleCollapse = (mealType: string) => {
    setCollapsed(prev =>
      mealData.map(meal =>
        meal.mealType === mealType ? !prev[mealData.indexOf(meal)] : true,
      ),
    );
  };
  const handleChangeTime = (mealType: any, time: any) => {
    setMealData(prevData =>
      prevData.map(meal =>
        meal.mealType === mealType ? {...meal, time} : meal,
      ),
    );
  };

  // Function to add options or update existing options
  const handleAddOption = (mealType: any, index: number, option: any) => {
    setMealData(prevData =>
      prevData.map(meal =>
        meal.mealType === mealType
          ? {
              ...meal,
              options: option
                ? meal.options.map((opt, i) => (i === index ? option : opt))
                : [...meal.options, ''],
            }
          : meal,
      ),
    );
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={styles.container}>
          {instructionTxtWMD && (
            <View
              style={{
                backgroundColor: COLORS.primaryColorLight,
                marginHorizontal: -16,
                marginVertical: -16,
                padding: 16,
              }}>
              <Text style={styles.instructions}>{instructionTxtWMD}</Text>
            </View>
          )}
          <Text style={styles.description}></Text>

          <View style={styles.dropdownContainer}>
            <Text style={styles.questionText}>{selectTxtWMD}</Text>

            <Dropdown
              style={styles.dropdown}
              data={options}
              labelField="label"
              valueField="value"
              placeholder="Please select"
              value={selectedValue}
              onChange={item => {
                setSelectedValue(item.value);
              }}
            />
          </View>

          {selectedValue &&
            selectedValue != 'none' &&
            mealData.map((meal, index) => (
              <View key={meal.mealType} style={{marginHorizontal: -16}}>
                <FoodRecallCollapsableCard
                  mealType={meal.mealType}
                  mealData={meal}
                  onAddOption={handleAddOption}
                  onChangeTime={handleChangeTime}
                  collapsed={collapsed[index]}
                  toggleCollapse={toggleCollapse}
                  isNextCardActive={true} // Control when each card is active
                />
              </View>
            ))}
        </View>
      </ScrollView>
      <SubmitButton isActive={true} onPress={() => {}} />
    </View>
  );
};

export default WorkoutMealDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5', // Light background color to match the design
  },
  instructions: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
    color: '#666',
  },
  dropdownContainer: {
    marginVertical: 8,
    backgroundColor: 'white',

    borderRadius: 5,
    paddingBottom: 8,
  },
  questionText: {
    fontSize: 16,
    marginBottom: 8,
    color: 'black',
    fontWeight: 'bold',
    marginHorizontal: 14,
    marginTop: 16,
  },
  dropdown: {
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderBottomColor: COLORS.grey500,
    borderBottomWidth: 1,
    marginHorizontal: 16,
  },
  submitButton: {
    marginTop: 40,
    backgroundColor: '#1E6091',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
