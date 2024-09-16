import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import COLORS from '../../../utils/colors/Colors';
import Icon from 'react-native-vector-icons/AntDesign';
import {showToast, validateShowMoreFRD} from '../../../utils/constant/Constant';

interface MealInputProps {
  mealType: string;
  mealData: {
    time: string;
    options: string[];
    title: string;
    mandatory: boolean;
  };
  onAddOption: (mealType: string, index?: number, option?: string) => void;
  onChangeTime: (mealType: string, time: string) => void;
  collapsed: boolean;
  toggleCollapse: (mealType: string) => void;
  isNextCardActive: boolean; // New prop to indicate if the card is the next active card
}

const FoodRecallCollapsableCard: React.FC<MealInputProps> = ({
  mealType,
  mealData,
  onAddOption,
  onChangeTime,
  collapsed,
  toggleCollapse,
  isNextCardActive, // Determine if the card should be enabled
}) => {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());

  const handleConfirmTime = () => {
    const hours = selectedTime.getHours();
    const minutes = selectedTime.getMinutes();
    const formattedTime = `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
    onChangeTime(mealType, formattedTime);
    setShowTimePicker(false);
  };

  const isCardComplete = mealData?.time && mealData?.options[0]; // Check if current card is complete

  return (
    <View style={[styles.mealContainer, {opacity: isNextCardActive ? 1 : 0.8}]}>
      {/* Header with toggle functionality */}
      <TouchableOpacity
        style={styles.mealTitleContainer}
        onPress={() => {
          if (isNextCardActive) {
            toggleCollapse(mealType);
          } else {
            showToast('Complete the previous card first!');
          }
        }}>
        <Text
          style={[
            styles.mealTitle,
            {
              color: isNextCardActive
                ? COLORS.defaultText
                : COLORS.greyDarkPlus,
            },
          ]}>
          {mealData.mandatory ? mealData?.title + '*' : mealData?.title}
        </Text>
        {collapsed && (
          <Icon
            size={20}
            name={'downcircle'}
            color={isNextCardActive ? COLORS.primaryColor : COLORS.greyDarkPlus}
            style={{marginLeft: 8}}
          />
        )}
      </TouchableOpacity>

      {/* Conditional rendering based on collapse state */}
      {!collapsed && (
        <View>
          {/* Time Picker */}
          <View style={{flexDirection: 'row', marginTop: 8}}>
            <Text
              style={[
                styles.timePickerText,
                {
                  color: COLORS.black,
                  paddingRight: 16,
                  paddingVertical: 8,
                  fontWeight: 'bold',
                },
              ]}>
              {'Time:'}
            </Text>
            <TouchableOpacity
              style={styles.timePickerButton}
              onPress={() => setShowTimePicker(true)}>
              <Text style={styles.timePickerText}>
                {mealData.time ? ` ${mealData.time}` : 'Select Time'}
              </Text>
              <Icon
                size={14}
                name={'caretdown'}
                color={COLORS.defaultText}
                style={{marginLeft: 16, marginTop: 3}}
              />
            </TouchableOpacity>
          </View>
          {/* Modal for Date Picker */}
          <Modal
            visible={showTimePicker}
            transparent={true}
            animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.pickerContainer}>
                <DatePicker
                  date={selectedTime}
                  mode="time"
                  onDateChange={setSelectedTime}
                  is24hourSource="locale"
                  theme="light"
                />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setShowTimePicker(false)}>
                    <Text style={styles.cancelText}>CANCEL</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={handleConfirmTime}>
                    <Text style={styles.confirmText}>OK</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          {/* Meal Options Input */}
          <Text
            style={{
              color: COLORS.black,
              fontSize: 16,
              marginTop: 16,
              paddingRight: 16,
              fontWeight: 'bold',
            }}>
            {'Menu options:'}
          </Text>
          {mealData.options.map((option, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingRight: 8,
              }}>
              {mealData.mandatory && (
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  {index + 1 + '.'}
                </Text>
              )}
              <TextInput
                style={[
                  styles.input,
                  {flex: 1, marginLeft: mealData.mandatory ? 8 : 0},
                ]}
                placeholder="e.g. Upma + Apple Juice"
                value={option}
                onChangeText={text => {
                  onAddOption(mealType, index, text || '');
                }}
              />
            </View>
          ))}

          {/* Add More Button */}
          {mealData.mandatory && (
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.addMoreButton}
              onPress={() => {
                isCardComplete
                  ? onAddOption(mealType)
                  : showToast(validateShowMoreFRD);
              }}>
              <Text
                style={[
                  styles.addMoreText,
                  {
                    color: isCardComplete
                      ? COLORS.primaryColor
                      : COLORS.greyDarkPlus,
                  },
                ]}>
                Add More
              </Text>
              <Icon
                size={20}
                name={'pluscircle'}
                color={
                  isCardComplete ? COLORS.primaryColor : COLORS.greyDarkPlus
                }
                style={{marginLeft: 8}}
              />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mealContainer: {
    marginVertical: 8,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
    padding: 16,
  },
  mealTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  timePickerButton: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    flexDirection: 'row',
  },
  timePickerText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    width: '80%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 16,
  },
  cancelButton: {
    padding: 8,
  },
  confirmButton: {
    padding: 8,
    marginHorizontal: 8,
  },
  cancelText: {},
  confirmText: {
    color: COLORS.primaryColorDark,
  },
  input: {
    borderBottomColor: COLORS.defaultText,
    borderBottomWidth: 1,
  },
  addMoreButton: {
    marginTop: 16,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignContent: 'center',
  },
  addMoreText: {
    color: COLORS.greyDarkPlus,
    fontSize: 16,
  },
});

export default FoodRecallCollapsableCard;
