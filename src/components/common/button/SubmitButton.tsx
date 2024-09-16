import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import COLORS from '../../../utils/colors/Colors';

interface SubmitButtonProps {
  isActive: boolean;
  onPress: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({isActive, onPress}) => {
  return (
    <TouchableOpacity
      style={[
        styles.submitButton,
        {
          backgroundColor: isActive ? COLORS.primaryColor : COLORS.greyDarkPlus,
        },
      ]}
      onPress={onPress}
      disabled={!isActive}>
      <Text style={styles.submitText}>Submit</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    padding: 15,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SubmitButton;
