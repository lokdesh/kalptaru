import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const Radio = ({ data, name, setSelected, selected }) => {
  return (
    <View style={styles.radioCnt}>
      {data.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={styles.radio}
            onPress={() => setSelected((prev) => ({ ...prev, [name]: item.value }))}
          >
            <View
              style={[
                styles.radioBtn,
                selected === item.value && styles.radioBtnActive,
              ]}
            >
              {selected === item.value && <View style={styles.radioBtnInner} />}
            </View>
            <Text style={styles.radioLabel}>{item.value}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Radio;

const styles = StyleSheet.create({
  radioCnt: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  radio: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    marginBottom: 10,
  },
  radioBtn: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
    marginRight: 10,
  },
  radioBtnActive: {
    justifyContent: "center",
    alignItems: "center",
  },
  radioBtnInner: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: "#5151ff",
    margin: 2,
  },
  radioLabel: {
    fontSize: 16,
  },
});
