import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import moment from "moment";
import Modal from "react-native-modal";
import axios from "axios";
import { GestureHandlerRootView, PinchGestureHandler ,ScrollView} from 'react-native-gesture-handler';
import { useZoomContext} from "../context/ZoomContext";
import { useVoiceNavigation } from '../context/VoiceNavigationContext'; // Import the context


LocaleConfig.locales["en"] = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec.",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  today: "Today",
};
LocaleConfig.defaultLocale = "en";

const CalendarScreen = () => {
  const { isZoomEnabled } = useZoomContext();
  const [selectedDate, setSelectedDate] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [events, setEvents] = useState([]);
  const [scale, setScale] = React.useState(1);
  const { speakText } = useVoiceNavigation();

  const fetchEvents = async () => {
    try {
      const response = await axios.get("/user/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
    speakText("Welcome to the calendar. You can select a date to add events.");
  }, [speakText]);

  const handleDayPress = (day) => {
    const selected = moment(day.dateString);
    const today = moment();

    if (selected.isBefore(today, "day")) {
      Alert.alert("Cannot select past dates.");
      speakText("You cannot select past dates.");
    } else {
      setSelectedDate(day.dateString);
      setModalVisible(true);
      speakText(`Selected date is ${selected.format("MMMM D, YYYY")}.`);
    }
  };

  const handleModalClose = () => {
    setEventTitle("");
    setEventDescription("");
    setModalVisible(false);
  };

  const renderEventItem = ({ item }) => (
    <TouchableOpacity style={styles.eventItem}>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text>{moment(item.date).format("MMMM DD, YYYY")}</Text>
    </TouchableOpacity>
  );

  const handleSaveEvent = async () => {
    try {
      const response = await axios.post("/user/events", {
        title: eventTitle,
        description: eventDescription,
        date: selectedDate,
      });
      Alert.alert("Event Saved!");
      speakText(`Event titled "${eventTitle}" has been saved for ${moment(selectedDate).format("MMMM D, YYYY")}.`);
      fetchEvents(); // Refresh events list
      handleModalClose();
    } catch (error) {
      console.error("Error saving event:", error);
      Alert.alert("Failed to save event. Please try again.");
      speakText("Failed to save the event. Please try again.");
    }
  };

  const onPinchEvent = (event) => {
    if (isZoomEnabled) {
      setScale(event.nativeEvent.scale);
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <PinchGestureHandler onGestureEvent={onPinchEvent}>
        <ScrollView
          contentContainerStyle={{ transform: [{ scale }] }}
          scrollEnabled={isZoomEnabled}
        >
          <Calendar
            onDayPress={handleDayPress}
            markedDates={{
              [selectedDate]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: "blue",
                selectedTextColor: "white",
              },
            }}
          />
          <Modal
            isVisible={modalVisible}
            onBackdropPress={handleModalClose}
            onBackButtonPress={handleModalClose}
            backdropOpacity={0.5}
          >
            <View style={styles.modalContainer}>
              <TextInput
                style={styles.input}
                placeholder="Event Title"
                value={eventTitle}
                onChangeText={setEventTitle}
              />
              <TextInput
                style={styles.input}
                placeholder="Event Description"
                multiline
                numberOfLines={4}
                value={eventDescription}
                onChangeText={setEventDescription}
              />
              <Button title="Save Event" onPress={handleSaveEvent} />
            </View>
          </Modal>
          <FlatList
            style={styles.eventList}
            data={events}
            keyExtractor={(item) => item._id}
            renderItem={renderEventItem}
          />
        </ScrollView>
      </PinchGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 10,
  },
  modalContainer: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  eventList: {
    marginTop: 20,
  },
  eventItem: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  eventTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default CalendarScreen;
