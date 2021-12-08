import React, { useState } from "react";
import { Button, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { windowHeight, windowWidth } from '../../Dimensions';


const TimeInput = (props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (timeInput) => {
    // const dayName = props.date.toString().split(' ');
    props.onChange(timeInput.toString().split(' ')[4].slice(0, 5));
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showDatePicker} >
        <Text style={props.timer === "Choose Time" ? styles.input : styles.timer}>{props.timer}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    height: windowHeight / 15,
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  timer: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    color: '#666',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default TimeInput;