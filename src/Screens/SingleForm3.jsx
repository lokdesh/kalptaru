import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const SingleForm = ({ forms }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <TouchableOpacity
          style={styles.BackButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Image
            source={require("../../assets/back.png")}
            style={styles.BackButtonImage}
          />
        </TouchableOpacity>
        <Text style={styles.headingText}>Annexure 3 </Text>
      </View>
      <ScrollView horizontal={true} style={styles.table}>
        <View>
          {/* table head */}
          <View style={styles.tableHead}>
            <Text style={styles.tableHeadText}>S no.</Text>
            <Text style={styles.tableHeadText}>Field Officer</Text>
            <Text style={styles.tableHeadText}>District</Text>
            <Text style={styles.tableHeadText}>Block</Text>
            <Text style={styles.tableHeadText}>Village</Text>
            <Text style={styles.tableHeadText}>Date Of Community</Text>
            <Text style={styles.tableHeadText}>Name Pump Operator</Text>
            <Text style={styles.tableHeadText}>Number Of Pump Operator</Text>
            <Text style={styles.tableHeadText}>image 1</Text>
            <Text style={styles.tableHeadText}>imageType 1</Text>
            <Text style={styles.tableHeadText}>image 2</Text>
            <Text style={styles.tableHeadText}>imageType 2</Text>
            <Text style={styles.tableHeadText}>image 3</Text>
            <Text style={styles.tableHeadText}>imageType 3</Text>
          </View>
          {/* table body */}
          {forms.map((item, index) => {
            return (
              <View style={styles.tableBody} key={index}>
                <Text style={styles.tableHeadText}>{index + 1}.</Text>
                <Text style={styles.tableHeadText}>{item.fieldOfficer}</Text>
                <Text style={styles.tableHeadText}>{item.district}</Text>
                <Text style={styles.tableHeadText}>{item.block}</Text>
                <Text style={styles.tableHeadText}>{item.village}</Text>
                <Text style={styles.tableHeadText}>{item.dateOfCommunity}</Text>
                <Text style={styles.tableHeadText}>
                  {item.namePumpOperator}
                </Text>
                <Text style={styles.tableHeadText}>
                  {item.numberOfPumpOperator}
                </Text>
                {item.image1 ? (
                  <Image
                  source={{ uri: `data:image;base64,${item.image1}` }}
                    style={styles.tableHeadImage}
                  />
                ) : (
                  <Text style={styles.tableHeadText}>empty</Text>
                )}
                <Text style={styles.tableHeadText}>{item.imageType}</Text>
                {item.image2 ? (
                  <Image
                  source={{ uri: `data:image;base64,${item.image2}` }}
                    style={styles.tableHeadImage}
                  />
                ) : (
                  <Text style={styles.tableHeadText}>empty</Text>
                )}
                <Text style={styles.tableHeadText}>{item.imageType2}</Text>
                {item.image3 ? (
                  <Image
                  source={{ uri: `data:image;base64,${item.image3}` }}
                    style={styles.tableHeadImage}
                  />
                ) : (
                  <Text style={styles.tableHeadText}>empty</Text>
                )}
                <Text style={styles.tableHeadText}>{item.imageType3}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default SingleForm;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    marginTop: 40,
    padding: 10,
    backgroundColor: "#fff",
  },
  BackButton: {
    backgroundColor: "#fff",
    width: 60,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  BackButtonImage: {
    width: 25,
    height: 20,
  },
  heading: {
    width: "65%",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headingText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  table: {
    marginBottom: 10,
  },
  tableHead: {
    flexDirection: "row",
    backgroundColor: "#f1f8ff",
  },
  tableHeadText: {
    width: 90,
    padding: 5,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#c8e1ff",
  },
  tableBody: {
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  tableBodyText: {
    padding: 5,
    fontSize: 12,
  },
  tableHeadImage: {
    width: 90,
    height: 90,
    padding: 5,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#c8e1ff",
  },
});
