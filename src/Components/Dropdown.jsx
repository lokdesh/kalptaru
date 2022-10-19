import { StyleSheet } from "react-native";
import React from "react";
import SelectList from "react-native-dropdown-select-list";
import SecureStore from "@react-native-async-storage/async-storage";

const Dropdown = ({
  data,
  setSelected,
  name,
  selected,
  getBlock,
  getVillage,
}) => {
  const handleSelected = async (item) => {
    setSelected((prev) => ({ ...prev, [name]: item }));
    if (name === "district") {
      getBlock(item);
      setSelected((prev) => ({ ...prev, block: "", village: "" }));
    }
    if (name === "block") {
      getVillage(item);
      setSelected((prev) => ({ ...prev, village: "" }));
    }
  };

  return (
    <SelectList
      data={data}
      setSelected={handleSelected}
      inputStyle={styles.inputStyle}
      placeholder={selected}
    />
  );
};

export default Dropdown;

const styles = StyleSheet.create({});
