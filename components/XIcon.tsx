import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const XIcon = ({ size = 24, color = 'black' }) => {
  return (
    <View style={[styles.icon, { width: size, height: size }]}>
      <Text style={{ color, fontSize: size, fontWeight: 'bold' }}>×</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -6,
  },
});

export default XIcon;