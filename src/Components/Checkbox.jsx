import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import Tick from "../../assets/Tick.png";
const Checkbox = ({ selected, setform, form }) => {
  const handleSelect = (item, i) => {
    setform((prev) => {
      const existing_infra = [...prev.existing_infra];
      existing_infra[i] === 0
        ? (existing_infra[i] = 1)
        : (existing_infra[i] = 0);
      return { ...prev, existing_infra: existing_infra };
    });
  };
  return (
    <View>
      {form.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={styles.checkbox}
            onPress={() => handleSelect(item, index)}
          >
            {/* [0,1,0,1,0] */}
            <View
              style={[
                styles.checkboxBtn,
                item.checked && styles.checkboxBtnActive,
              ]}
            >
              {item == 1 && (
                <Image style={styles.checkboxBtnInner} source={Tick} />
              )}
            </View>
            <Text style={styles.checkboxLabel}>{selected[index].value}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    marginBottom: 10,
  },
  checkboxBtn: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#000",
    marginRight: 10,
    borderRadius: 3,
  },
  checkboxBtnActive: {
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxBtnInner: {
    width: 15,
    height: 15,
  },
  checkboxLabel: {
    fontSize: 16,
  },
});
export default Checkbox;
