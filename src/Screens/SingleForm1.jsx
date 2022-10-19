import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Axios from "../Components/Axios";

const SingleForm = ({ forms, userId }) => {
  const navigation = useNavigation();
  const [checkbox, setcheckbox] = useState([
    { value: "OHT" },
    { value: "Pump House" },
    { value: "Sump Well" },
    { value: "Stand Post" },
    { value: "Transformer" },
  ]);
  const [syncedForm, setsyncedForm] = useState([]);
  const [anx_images, setanx_images] = useState([]);
  useEffect(() => {
    getFormData();
  }, []);
  const getFormData = async () => {
    const formdata = new FormData();
    formdata.append("user_id", userId);
    const res = await Axios.post("/fetch_form.php", formdata, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.data) {
      setsyncedForm(res.data.data);
      const formdata2 = new FormData();
      res.data.data.map(async (item) => {
        formdata2.append("anx_id", item["0"]);
        const res = await Axios.post("/geo_image.php", formdata2, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        res.data.img_arr &&
          setanx_images((prev) => [...prev, res.data.img_arr]);
      });
    }
  };
  // console.log(anx_images.flat(Infinity));
  return (
    <ScrollView style={styles.container}>
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
        <Text style={styles.headingText}>Annexure 1 </Text>
      </View>
      <ScrollView horizontal={true} style={styles.table}>
        <View>
          {/* table head */}
          <View style={styles.tableHead}>
            <Text style={styles.tableHeadText}>S no.</Text>
            <Text style={styles.tableHeadText}>District</Text>
            <Text style={styles.tableHeadText}>Block</Text>
            <Text style={styles.tableHeadText}>Village</Text>
            <Text style={styles.tableHeadText}>Available sources Sources</Text>
            <Text style={styles.tableHeadText}>Type of sources of Sources</Text>
            <Text style={styles.tableHeadText}>
              Location of source of Sources
            </Text>
            <Text style={styles.tableHeadText}>
              Dry weather discharge Weather
            </Text>
            <Text style={styles.tableHeadText}>Date of measurement</Text>
            <Text style={styles.tableHeadText}>Community aware</Text>
            <Text style={styles.tableHeadText}>Water conservation</Text>
            <Text style={styles.tableHeadText}>
              Funds for water conservation
            </Text>
            <Text style={styles.tableHeadText}>Name of dept</Text>
            <Text style={styles.tableHeadText}>Type of work</Text>
            <Text style={styles.tableHeadText}>Amount</Text>
            <Text style={styles.tableHeadText}>Completed ongoing</Text>
            <Text style={styles.tableHeadText}>Have a vpa</Text>
            <Text style={styles.tableHeadText}>Vpa uploaded</Text>
            <Text style={styles.tableHeadText}>Community aware vpa</Text>
            <Text style={styles.tableHeadText}>Copy of vpa</Text>
            <Text style={styles.tableHeadText}>Bank of vwsc</Text>
            <Text style={styles.tableHeadText}>Copy of passbook</Text>
            <Text style={styles.tableHeadText}>Ac holder</Text>
            <Text style={styles.tableHeadText}>Community contribution</Text>
            <Text style={styles.tableHeadText}>Contribution type</Text>
            <Text style={styles.tableHeadText}>Contributed amt</Text>
            <Text style={styles.tableHeadText}>Much utilized</Text>
            <Text style={styles.tableHeadText}>Remaining balance</Text>
            <Text style={styles.tableHeadText}>Village collected cost</Text>
            <Text style={styles.tableHeadText}>Amount collected</Text>
            <Text style={styles.tableHeadText}>Collection amt deposited</Text>
            <Text style={styles.tableHeadText}>Total collected amt</Text>
            <Text style={styles.tableHeadText}>Utilized collected amt</Text>
            <Text style={styles.tableHeadText}>Alance collected amt</Text>
            <Text style={styles.tableHeadText}>Technological solutions</Text>
            <Text style={styles.tableHeadText}>Skilled human no</Text>
            <Text style={styles.tableHeadText}>Trained human no</Text>
            <Text style={styles.tableHeadText}>Existing infra</Text>
            <Text style={styles.tableHeadText}>Details of assets</Text>
            <Text style={styles.tableHeadText}>Geo tagged</Text>
            <Text style={styles.tableHeadText}>Image</Text>
            <Text style={styles.tableHeadText}>Long</Text>
            <Text style={styles.tableHeadText}>Lat</Text>
          </View>
          {forms.map((item, index) => {
            return (
              <View style={styles.tableBody} key={index}>
                {/* <Text style={styles.tableHeadText}>{item.created_by}.</Text> */}
                <Text style={styles.tableHeadText}>{index + 1}.</Text>
                <Text style={styles.tableHeadText}>{item.district}</Text>
                <Text style={styles.tableHeadText}>{item.block}</Text>
                <Text style={styles.tableHeadText}>{item.village}</Text>
                <Text style={styles.tableHeadText}>
                  {item.available_sources}
                </Text>
                <Text style={styles.tableHeadText}>{item.type_of_sources}</Text>
                <Text style={styles.tableHeadText}>
                  {item.location_of_source}
                </Text>
                <Text style={styles.tableHeadText}>
                  {item.dry_weather_discharge}
                </Text>
                <Text style={styles.tableHeadText}>
                  {item.date_of_measurement}
                </Text>
                <Text style={styles.tableHeadText}>{item.community_aware}</Text>
                <Text style={styles.tableHeadText}>
                  {item.water_conservation}
                </Text>
                <Text style={styles.tableHeadText}>
                  {item.funds_for_water_conservation}
                </Text>
                <Text style={styles.tableHeadText}>{item.name_of_dept}</Text>
                <Text style={styles.tableHeadText}>{item.type_of_work}</Text>
                <Text style={styles.tableHeadText}>{item.amount}</Text>
                <Text style={styles.tableHeadText}>
                  {item.completed_ongoing}
                </Text>
                <Text style={styles.tableHeadText}>{item.have_a_vpa}</Text>
                <Text style={styles.tableHeadText}>{item.vpa_uploaded}</Text>
                <Text style={styles.tableHeadText}>
                  {item.community_aware_vpa}
                </Text>
                {item.copy_of_vpa ? (
                  <View style={styles.tableHeadText}>
                    <Image
                      source={{ uri: `data:image;base64,${item.copy_of_vpa}` }}
                      style={styles.tableHeadImage}
                    />
                  </View>
                ) : (
                  <Text style={styles.tableHeadText}>Empty</Text>
                )}
                <Text style={styles.tableHeadText}>{item.bank_of_vwsc}</Text>
                {item.copy_of_passbook ? (
                  <View style={styles.tableHeadText}>
                    <Image
                      source={{
                        uri: `data:image;base64,${item.copy_of_passbook}`,
                      }}
                      style={styles.tableHeadImage}
                    />
                  </View>
                ) : (
                  <Text style={styles.tableHeadText}>Empty</Text>
                )}
                <Text style={styles.tableHeadText}>{item.ac_holder}</Text>
                <Text style={styles.tableHeadText}>
                  {item.community_contribution}
                </Text>
                <Text style={styles.tableHeadText}>
                  {item.contribution_type}
                </Text>
                <Text style={styles.tableHeadText}>{item.contributed_amt}</Text>
                <Text style={styles.tableHeadText}>{item.much_utilized}</Text>
                <Text style={styles.tableHeadText}>
                  {item.remaining_balance}
                </Text>
                <Text style={styles.tableHeadText}>
                  {item.village_collected_cost}
                </Text>
                <Text style={styles.tableHeadText}>
                  {item.amount_collected}
                </Text>
                <Text style={styles.tableHeadText}>
                  {item.collection_amt_deposited}
                </Text>
                <Text style={styles.tableHeadText}>
                  {item.total_collected_amt}
                </Text>
                <Text style={styles.tableHeadText}>
                  {item.utilized_collected_amt}
                </Text>
                <Text style={styles.tableHeadText}>
                  {item.alance_collected_amt}
                </Text>
                <Text style={styles.tableHeadText}>
                  {item.technological_solutions}
                </Text>
                <Text style={styles.tableHeadText}>
                  {item.skilled_human_no}
                </Text>
                <Text style={styles.tableHeadText}>
                  {item.trained_human_no}
                </Text>
                <Text style={styles.tableHeadText}>
                  {item.existing_infra.map((data, i) => {
                    return (
                      <Text key={i}>
                        {data == 1 && checkbox[i].value + ","}
                      </Text>
                    );
                  })}
                </Text>
                <Text style={styles.tableHeadText}>
                  {item.details_of_assets}
                </Text>
                <Text style={styles.tableHeadText}>{item.geo_tagged}</Text>
                <View style={styles.tableHeadText}>
                  {item.image.length > 0 ? (
                    item.image.map((img, i) => {
                      return (
                        <Image
                          key={i}
                          source={{ uri: `data:image;base64,${img}` }}
                          style={styles.tableHeadImage}
                        />
                      );
                    })
                  ) : (
                    <Text
                      style={{
                        fontWeight: "bold",
                        alignSelf: "center",
                        fontSize: 12,
                      }}
                    >
                      Empty
                    </Text>
                  )}
                </View>
                <Text style={styles.tableHeadText}>{item.long}</Text>
                <Text style={styles.tableHeadText}>{item.lat}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <Text style={[styles.headingText, { alignSelf: "center" }]}>
        Synced ✅
      </Text>
      <ScrollView horizontal={true} style={styles.table}>
        <View>
          {/* table head */}
          <View style={styles.tableHead2}>
            <Text style={styles.tableHeadText2}>S no.</Text>
            <Text style={styles.tableHeadText2}>District</Text>
            <Text style={styles.tableHeadText2}>Block</Text>
            <Text style={styles.tableHeadText2}>Village</Text>
            <Text style={styles.tableHeadText2}>Available sources Sources</Text>
            <Text style={styles.tableHeadText2}>
              Type of sources of Sources
            </Text>
            <Text style={styles.tableHeadText2}>
              Location of source of Sources
            </Text>
            <Text style={styles.tableHeadText2}>
              Dry weather discharge Weather
            </Text>
            <Text style={styles.tableHeadText2}>Date of measurement</Text>
            <Text style={styles.tableHeadText2}>Community aware</Text>
            <Text style={styles.tableHeadText2}>Water conservation</Text>
            <Text style={styles.tableHeadText2}>
              Funds for water conservation
            </Text>
            <Text style={styles.tableHeadText2}>Name of dept</Text>
            <Text style={styles.tableHeadText2}>Type of work</Text>
            <Text style={styles.tableHeadText2}>Amount</Text>
            <Text style={styles.tableHeadText2}>Completed ongoing</Text>
            <Text style={styles.tableHeadText2}>Have a vpa</Text>
            <Text style={styles.tableHeadText2}>Vpa uploaded</Text>
            <Text style={styles.tableHeadText2}>Community aware vpa</Text>
            <Text style={styles.tableHeadText2}>Copy of vpa</Text>
            <Text style={styles.tableHeadText2}>Bank of vwsc</Text>
            <Text style={styles.tableHeadText2}>Copy of passbook</Text>
            <Text style={styles.tableHeadText2}>Ac holder</Text>
            <Text style={styles.tableHeadText2}>Community contribution</Text>
            <Text style={styles.tableHeadText2}>Contribution type</Text>
            <Text style={styles.tableHeadText2}>Contributed amt</Text>
            <Text style={styles.tableHeadText2}>Much utilized</Text>
            <Text style={styles.tableHeadText2}>Remaining balance</Text>
            <Text style={styles.tableHeadText2}>Village collected cost</Text>
            <Text style={styles.tableHeadText2}>Amount collected</Text>
            <Text style={styles.tableHeadText2}>Collection amt deposited</Text>
            <Text style={styles.tableHeadText2}>Total collected amt</Text>
            <Text style={styles.tableHeadText2}>Utilized collected amt</Text>
            <Text style={styles.tableHeadText2}>Alance collected amt</Text>
            <Text style={styles.tableHeadText2}>Technological solutions</Text>
            <Text style={styles.tableHeadText2}>Skilled human no</Text>
            <Text style={styles.tableHeadText2}>Trained human no</Text>
            <Text style={styles.tableHeadText2}>Existing infra</Text>
            <Text style={styles.tableHeadText2}>Details of assets</Text>
            <Text style={styles.tableHeadText2}>Geo tagged</Text>
            <Text style={styles.tableHeadText2}>Image</Text>
            <Text style={styles.tableHeadText2}>Long</Text>
            <Text style={styles.tableHeadText2}>Lat</Text>
          </View>
          {syncedForm.length > 0 &&
            syncedForm.map((item, index) => {
              return (
                <View style={styles.tableBody} key={index}>
                  <Text style={styles.tableHeadText2}>{index + 1}.</Text>
                  <Text style={styles.tableHeadText2}>{item.district}</Text>
                  <Text style={styles.tableHeadText2}>{item.block}</Text>
                  <Text style={styles.tableHeadText2}>{item.village}</Text>
                  <Text style={styles.tableHeadText2}>
                    {item.available_sources}
                  </Text>
                  <Text style={styles.tableHeadText2}>
                    {item.type_of_sources}
                  </Text>
                  <Text style={styles.tableHeadText2}>
                    {item.location_of_source}
                  </Text>
                  <Text style={styles.tableHeadText2}>
                    {item.dry_weather_discharge}
                  </Text>
                  <Text style={styles.tableHeadText2}>
                    {item.date_of_measurement}
                  </Text>
                  <Text style={styles.tableHeadText2}>
                    {item.community_aware}
                  </Text>
                  <Text style={styles.tableHeadText2}>
                    {item.water_conservation}
                  </Text>
                  <Text style={styles.tableHeadText2}>
                    {item.funds_for_water_conservation}
                  </Text>
                  <Text style={styles.tableHeadText2}>{item.name_of_dept}</Text>
                  <Text style={styles.tableHeadText2}>{item.type_of_work}</Text>
                  <Text style={styles.tableHeadText2}>{item.amount}</Text>
                  <Text style={styles.tableHeadText2}>
                    {item.completed_ongoing}
                  </Text>
                  <Text style={styles.tableHeadText2}>{item.have_a_vpa}</Text>
                  <Text style={styles.tableHeadText2}>{item.vpa_uploaded}</Text>
                  <Text style={styles.tableHeadText2}>
                    {item.community_aware_vpa}
                  </Text>
                  {item.copy_of_vpa ? (
                    <View style={styles.tableHeadText2}>
                      <Image
                        source={{
                          uri: `data:image;base64,${item.copy_of_vpa}`,
                        }}
                        style={styles.tableHeadImage}
                      />
                    </View>
                  ) : (
                    <Text style={styles.tableHeadText2}>Empty</Text>
                  )}
                  <Text style={styles.tableHeadText2}>{item.bank_of_vwsc}</Text>
                  {item.copy_of_passbook ? (
                    <View style={styles.tableHeadText2}>
                      <Image
                        source={{
                          uri: `data:image;base64,${item.copy_of_passbook}`,
                        }}
                        style={styles.tableHeadImage}
                      />
                    </View>
                  ) : (
                    <Text style={styles.tableHeadText2}>Empty</Text>
                  )}
                  <Text style={styles.tableHeadText2}>{item.ac_holder}</Text>
                  <Text style={styles.tableHeadText2}>
                    {item.community_contribution}
                  </Text>
                  <Text style={styles.tableHeadText2}>
                    {item.contribution_type}
                  </Text>
                  <Text style={styles.tableHeadText2}>
                    {item.contributed_amt}
                  </Text>
                  <Text style={styles.tableHeadText2}>
                    {item.much_utilized}
                  </Text>
                  <Text style={styles.tableHeadText2}>
                    {item.remaining_balance}
                  </Text>
                  <Text style={styles.tableHeadText2}>
                    {item.village_collected_cost}
                  </Text>
                  <Text style={styles.tableHeadText2}>
                    {item.amount_collected}
                  </Text>
                  <Text style={styles.tableHeadText2}>
                    {item.collection_amt_deposited}
                  </Text>
                  <Text style={styles.tableHeadText2}>
                    {item.total_collected_amt}
                  </Text>
                  <Text style={styles.tableHeadText2}>
                    {item.utilized_collected_amt}
                  </Text>
                  <Text style={styles.tableHeadText2}>
                    {item.alance_collected_amt}
                  </Text>
                  <Text style={styles.tableHeadText2}>
                    {item.technological_solutions}
                  </Text>
                  <Text style={styles.tableHeadText2}>
                    {item.skilled_human_no}
                  </Text>
                  <Text style={styles.tableHeadText2}>
                    {item.trained_human_no}
                  </Text>
                  <Text style={styles.tableHeadText2}>
                    {typeof item.existing_infra === "string" &&
                      item.existing_infra.split(",").map((data, i) => {
                        return (
                          <Text key={i}>
                            {data == 1 && checkbox[i].value + ","}
                          </Text>
                        );
                      })}
                  </Text>
                  <Text style={styles.tableHeadText2}>
                    {item.details_of_assets}
                  </Text>
                  <Text style={styles.tableHeadText2}>{item.geo_tagged}</Text>
                  <View style={styles.tableHeadText2}>
                    <Image
                      // key={i}
                      source={{ uri: `data:image;base64,${anx_images[index]}` }}
                      style={styles.tableHeadImage}
                    />
                    {/* {anx_images.length > 0 && anx_images[index].length > 0 ? (
                      anx_images[index].map((img, i) => {
                        return (
                        );
                      })
                    ) : (
                      <Text
                        style={{
                          fontWeight: "bold",
                          alignSelf: "center",
                          fontSize: 12,
                        }}
                      >
                        Empty
                      </Text>
                    )} */}
                  </View>
                  <Text style={styles.tableHeadText2}>{item.long}</Text>
                  <Text style={styles.tableHeadText2}>{item.lat}</Text>
                </View>
              );
            })}
        </View>
      </ScrollView>
    </ScrollView>
  );
};

export default SingleForm;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    // marginTop: 40,
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
  tableHead2: {
    flexDirection: "row",
    backgroundColor: "#fffbe8",
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
  tableHeadText2: {
    width: 90,
    padding: 5,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#ffdf5e",
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
    width: 80,
    height: 80,
    marginBottom: 5,
  },
});
