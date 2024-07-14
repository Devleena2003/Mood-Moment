import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useZoomContext } from '../context/ZoomContext';
import { GestureHandlerRootView, ScrollView, PinchGestureHandler } from 'react-native-gesture-handler';

const OtherScreen = () => {
  const { isZoomEnabled } = useZoomContext();
  const [scale, setScale] = React.useState(1);

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
          <View style={styles.innerContainer}>
            <Text>Content of the Other Screen</Text>
          </View>
        </ScrollView>
      </PinchGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: 20,
  },
});

export default OtherScreen;
