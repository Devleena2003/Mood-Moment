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
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook

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

const Calender = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [events, setEvents] = useState([]);
  const navigation = useNavigation(); // Initialize navigation

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "http://192.168.29.3:5000/api/v1/user/events"
      );
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDayPress = (day) => {
    const selected = moment(day.dateString);
    const today = moment();

    if (selected.isBefore(today, "day")) {
      // If selected date is before today
      Alert.alert("Cannot select past dates.");
    } else {
      setSelectedDate(day.dateString);
      setModalVisible(true);
    }
  };

  const handleEventPress = async (event) => {
    try {
      const response = await axios.post(
        "http://192.168.29.3:8000/event-dresses/",
        {
          event_name: event.title,
        }
      );
      if (response.data.dresses.length > 0) {
        navigation.navigate("eventDress", { dresses: response.data.dresses });
      } else {
        Alert.alert("No dresses found for this event.");
      }
    } catch (error) {
      console.error("Error fetching dresses:", error);
      Alert.alert("Failed to fetch dresses. Please try again.");
    }
  };

  const handleModalClose = () => {
    setEventTitle("");
    setEventDescription("");
    setModalVisible(false);
  };

  const renderEventItem = ({ item }) => (
    <TouchableOpacity
      style={styles.eventItem}
      onPress={() => handleEventPress(item)}
    >
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text>{moment(item.date).format("MMMM DD, YYYY")}</Text>
    </TouchableOpacity>
  );

  const handleSaveEvent = async () => {
    try {
      const response = await axios.post(
        "http://192.168.29.3:5000/api/v1/user/events",
        {
          title: eventTitle,
          description: eventDescription,
          date: selectedDate,
        }
      );
      Alert.alert("Event Saved!");
      fetchEvents(); // Refresh events list
      setEventTitle("");
      setEventDescription("");
      setModalVisible(false);
    } catch (error) {
      console.error("Error saving event:", error);
      Alert.alert("Failed to save event. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
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
    </View>
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

export default Calender;
