import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
  Image,
} from "react-native";
import SecureStore from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import Dropdown from "../Components/Dropdown";
import Radio from "../Components/Radio";
import Checkbox from "../Components/Checkbox";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import Axios from "../Components/Axios";

const Annexure = ({ form, setform, setforms, saveForms, userId }) => {
  const navigation = useNavigation();
  const [slide, setslide] = useState(0);
  const [locationLoading, setlocationLoading] = useState(false);
  const [GalleryPermition, setGalleryPermition] = useState(false);
  const [data, setdata] = useState({
    district: [{ value: "East Garo Hills" }, { value: "South Garo Hills" }],
    block: [
      // { value: "Dambo Rongjeng" },
      // { value: "Samanda" },
      // { value: "Songsak" },
    ],
    village: [{ label: "", value: "" }],
    available_sources: [
      { label: "River", value: "River" },
      { label: "Well", value: "Well" },
      { label: "Hand Pump", value: "Hand Pump" },
      { label: "Piped Line", value: "Piped Line" },
      { label: "Tube well", value: "Tube well" },
    ],
    type_of_sources: [
      { label: "River", value: "River" },
      { label: "Well", value: "Well" },
      { label: "Hand Pump", value: "Hand Pump" },
      { label: "Piped Line", value: "Piped Line" },
      { label: "Tube well", value: "Tube well" },
    ],
    location_of_source: [
      { label: "River", value: "River" },
      { label: "Well", value: "Well" },
      { label: "Hand Pump", value: "Hand Pump" },
      { label: "Piped Line", value: "Piped Line" },
      { label: "Tube well", value: "Tube well" },
    ],
    dry_weather_discharge: [
      { label: "River", value: "River" },
      { label: "Well", value: "Well" },
      { label: "Hand Pump", value: "Hand Pump" },
      { label: "Piped Line", value: "Piped Line" },
      { label: "Tube well", value: "Tube well" },
    ],
    s2Radio: [{ value: "Yes" }, { value: "No" }],
    water_conservation: [
      { label: "Water harvesting", value: "Water harvesting" },
      { label: "Check dam", value: "Check dam" },
      { label: "Step dam", value: "Step dam" },
      { label: "Pond", value: "Pond" },
    ],
    completed_ongoing: [{ value: "Complete" }, { value: "Ongoing" }],
    contribution_type: [
      { value: "Cash" },
      { value: "Kind" },
      { value: "Labour" },
    ],
    checkbox: [
      { value: "OHT", checked: false },
      { value: "Pump House", checked: false },
      { value: "Sump Well", checked: false },
      { value: "Stand Post", checked: false },
      { value: "Transformer", checked: false },
    ],
  });
  const {
    district,
    block,
    village,
    available_sources,
    type_of_sources,
    location_of_source,
    dry_weather_discharge,
    s2Radio,
    completed_ongoing,
    contribution_type,
    checkbox,
    water_conservation,
  } = data;
  useEffect(() => {
    handleUseEffect();
    getDistrict();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      (async () => {
        await SecureStore.setItem("form", JSON.stringify(form));
      })();
    }, 500);
  }, [form]);
  const handleUseEffect = async () => {
    const galleryStatus =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    setGalleryPermition(galleryStatus.status === "granted");
    if (galleryStatus.status === "denied") {
      alert("Please allow gallery access to continue");
      navigation.goBack();
    }
    try {
      const slide = await SecureStore.getItem("slide");
      const form = await SecureStore.getItem("form");
      setslide(+slide);
      setform(JSON.parse(form));
    } catch (e) {
      console.log(e);
    }
  };
  const getLocation = async () => {
    setlocationLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setform({
      ...form,
      long: JSON.stringify(location.coords.longitude),
      lat: JSON.stringify(location.coords.latitude),
    });
    setlocationLoading(false);
  };
  const getDistrict = async () => {
    const res = await Axios.get("/fetch_dist.php");
    let district = [];
    res.data.forEach((item) => {
      district.push({ value: item.district });
    });
    setdata({ ...data, district });
  };
  const getBlock = async (item) => {
    const res = await Axios.post(
      "/fetch_block.php",
      { dist: item },
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    let block = [];
    res.data.forEach((item) => {
      block.push({ value: item });
    });
    setdata({ ...data, block });
  };
  const getVillage = async (item) => {
    const res = await Axios.post(
      "/fetch_village.php",
      { dist: form.district, block: item },
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    let village = [];
    res.data.forEach((item) => {
      village.push({ value: item });
    });
    setdata({ ...data, village });
  };
  const handleSubmit = async () => {
    if (form.long && form.lat) {
      SecureStore.setItem("slide", "0");
      setforms((prev) => {
        const Annexure1 = [...prev.Annexure1];
        Annexure1.push(form);
        return { ...prev, Annexure1 };
      });
      saveForms();
      setform({
        created_by: userId,
        district: "",
        block: "",
        village: "",
        available_sources: "",
        type_of_sources: "",
        location_of_source: "",
        dry_weather_discharge: "",
        date_of_measurement: "",
        community_aware: "",
        water_conservation: "",
        funds_for_water_conservation: "",
        name_of_dept: "",
        type_of_work: "",
        amount: "",
        completed_ongoing: "",
        have_a_vpa: "",
        vpa_uploaded: "",
        community_aware_vpa: "",
        copy_of_vpa: "",
        bank_of_vwsc: "",
        copy_of_passbook: "",
        ac_holder: "",
        community_contribution: "",
        contribution_type: "",
        contributed_amt: "",
        much_utilized: "",
        remaining_balance: "",
        village_collected_cost: "",
        amount_collected: "",
        collection_amt_deposited: "",
        total_collected_amt: "",
        utilized_collected_amt: "",
        alance_collected_amt: "",
        technological_solutions: "",
        skilled_human_no: "",
        trained_human_no: "",
        existing_infra: [0, 0, 0, 0, 0],
        details_of_assets: "",
        geo_tagged: "",
        image: "",
        long: "",
        lat: "",
      });
      await SecureStore.removeItem("form");
      await SecureStore.removeItem("slide");
      navigation.navigate("Home");
    } else {
      alert("Please fill all fields");
    }
  };
  const NextSlide = async () => {
    setslide(slide + 1);
    await SecureStore.setItem("slide", JSON.stringify(slide + 1));
  };
  const PrevSlide = async () => {
    setslide(slide - 1);
    await SecureStore.setItem("slide", JSON.stringify(slide - 1));
  };
  const pickImage = async () => {
    // reduce image quality
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 0.3,
      base64: true,
    });
    if (!result.cancelled) {
      setform({ ...form, copy_of_vpa: result.base64 });
    }
  };
  const pickImage2 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 0.3,
      base64: true,
    });
    if (!result.cancelled) {
      setform({ ...form, copy_of_passbook: result.base64 });
    }
  };
  const pickImage3 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 0.3,
      base64: true,
    });
    if (!result.cancelled) {
      setform((prev) => ({
        ...prev,
        image: [...prev.image, result.base64],
      }));
    }
  };
  const cancelForm = () => {
    navigation.navigate("Home");
  };
  const handleDate = (date) => {
    let result = "";
    if (date.length < 2) {
      result = date;
    } else if (date.length < 5) {
      result = date.slice(0, 2) + "/" + date.slice(3, 5);
    } else {
      result =
        date.slice(0, 2) + "/" + date.slice(3, 5) + "/" + date.slice(6, 10);
    }
    setform({ ...form, date_of_measurement: result });
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.SideNavbarHead}>
        <View style={styles.HeadLeft}>
          <Image
            source={require("../../assets/icon.png")}
            style={styles.HeadLeftImage}
          />
          <Text style={styles.HeadLeftText}>Kalptaru Gramodyog Samiti</Text>
        </View>
      </View>
      <View style={styles.headCnt}>
        <View style={styles.horRow}></View>
        <Text style={styles.headTxt}>Annexure 1 Secondary Data Collection</Text>
        <Text style={styles.subheadTxt}>Phase - II</Text>
      </View>
      {slide === 0 && (
        <View style={styles.bodyCnt}>
          <View style={[styles.box, { marginTop: 10 }]}>
            <Text style={styles.boxTxt}>District *</Text>
            <Dropdown
              getBlock={getBlock}
              getVillage={getVillage}
              data={district}
              setSelected={setform}
              selected={form.district}
              name="district"
            />
          </View>
          <View style={[styles.box, { marginTop: 10 }]}>
            <Text style={styles.boxTxt}>Block *</Text>
            <Dropdown
              getBlock={getBlock}
              getVillage={getVillage}
              data={block}
              setSelected={setform}
              selected={form.block}
              name="block"
            />
          </View>
          <View style={[styles.box, { marginTop: 10 }]}>
            <Text style={styles.boxTxt}>Village</Text>
            <Dropdown
              getBlock={getBlock}
              getVillage={getVillage}
              data={village}
              setSelected={setform}
              selected={form.village}
              name="village"
            />
          </View>
        </View>
      )}
      {slide === 1 && (
        <View style={styles.bodyCnt}>
          <View style={[styles.box, { marginTop: 10 }]}>
            <Text style={styles.boxTxt}>Name of Available Sources *</Text>
            <Dropdown
              getBlock={getBlock}
              getVillage={getVillage}
              data={available_sources}
              setSelected={setform}
              selected={form.available_sources}
              name="available_sources"
            />
          </View>
          <View style={[styles.box, { marginTop: 10 }]}>
            <Text style={styles.boxTxt}>Types of Sources *</Text>
            <Dropdown
              getBlock={getBlock}
              getVillage={getVillage}
              data={type_of_sources}
              setSelected={setform}
              selected={form.type_of_sources}
              name="type_of_sources"
            />
          </View>
          <View style={[styles.box, { marginTop: 10 }]}>
            <Text style={styles.boxTxt}>Location of Sources</Text>
            <Dropdown
              getBlock={getBlock}
              getVillage={getVillage}
              data={location_of_source}
              setSelected={setform}
              selected={form.location_of_source}
              name="location_of_source"
            />
          </View>
          <View style={[styles.box, { marginTop: 10 }]}>
            <Text style={styles.boxTxt}>
              Dry Weather Discharge of Available Source
            </Text>
            <Dropdown
              getBlock={getBlock}
              getVillage={getVillage}
              data={dry_weather_discharge}
              setSelected={setform}
              selected={form.dry_weather_discharge}
              name="dry_weather_discharge"
            />
          </View>
          <View style={[styles.box, { marginTop: 10 }]}>
            <Text style={styles.boxTxt}>Date of Measurement</Text>
            <TextInput
              style={styles.txtInput}
              placeholder="DD/MM/YYYY"
              value={form.date_of_measurement}
              onChangeText={handleDate}
              keyboardType="numeric"
            />
          </View>
        </View>
      )}
      {slide === 2 && (
        <View style={styles.bodyCnt}>
          {/* Radio */}
          <View style={[styles.box, { marginTop: 10 }]}>
            <Text style={styles.boxTxt}>
              1. Is the Community aware about the need to undertake water
              coonservation activities ?
            </Text>
            <Radio
              data={s2Radio}
              name="community_aware"
              setSelected={setform}
              selected={form.community_aware}
            />
          </View>
          {/* Text */}
          <View style={[styles.box, { marginTop: 10 }]}>
            <Text style={styles.boxTxt}>
              2. How will the village address water conservation ?
            </Text>
            <Dropdown
              getBlock={getBlock}
              getVillage={getVillage}
              data={water_conservation}
              setSelected={setform}
              selected={form.water_conservation}
              name="water_conservation"
            />
          </View>
          {/* Radio */}
          <View style={[styles.box, { marginTop: 10 }]}>
            <Text style={styles.boxTxt}>
              3. Is the village receiving funds from other Departments for
              conservation & sustainability of water sources ?
            </Text>
            <Radio
              data={s2Radio}
              name="funds_for_water_conservation"
              setSelected={setform}
              selected={form.funds_for_water_conservation}
            />
          </View>
          {/* Text */}
          {form.funds_for_water_conservation === "Yes" && (
            <View style={[styles.box, { marginTop: 10 }]}>
              <Text style={styles.boxTxt}>4. Name of Dept.</Text>
              <TextInput
                style={styles.txtInput}
                placeholder="Your answer"
                underlineColorAndroid="transparent"
                name="name_of_dept"
                onChangeText={(e) =>
                  setform({
                    ...form,
                    name_of_dept: e,
                  })
                }
                value={form.name_of_dept}
              />
            </View>
          )}
          {/* Text */}
          {form.funds_for_water_conservation === "Yes" && (
            <View style={[styles.box, { marginTop: 10 }]}>
              <Text style={styles.boxTxt}>5. Type of Work</Text>
              <TextInput
                value={form.type_of_work}
                style={styles.txtInput}
                placeholder="Your answer"
                underlineColorAndroid="transparent"
                name="type_of_work"
                onChangeText={(e) =>
                  setform({
                    ...form,
                    type_of_work: e,
                  })
                }
              />
            </View>
          )}
          {/* Text */}
          {form.funds_for_water_conservation === "Yes" && (
            <View style={[styles.box, { marginTop: 10 }]}>
              <Text style={styles.boxTxt}>6. Amount</Text>
              <TextInput
                value={form.amount}
                style={styles.txtInput}
                placeholder="Your answer"
                underlineColorAndroid="transparent"
                name="amount"
                onChangeText={(e) => {
                  if (!isNaN(e)) {
                    setform({
                      ...form,
                      amount: e,
                    });
                  }
                }}
                keyboardType="numeric"
              />
            </View>
          )}
          {/* Radio */}
          <View style={[styles.box, { marginTop: 10 }]}>
            <Text style={styles.boxTxt}>
              {form.funds_for_water_conservation === "Yes" ? "7" : "4"}.
              Completed/ongoing
            </Text>
            <Radio
              data={completed_ongoing}
              name="completed_ongoing"
              setSelected={setform}
              selected={form.completed_ongoing}
            />
          </View>
        </View>
      )}
      {slide === 3 && (
        <View style={styles.bodyCnt}>
          {/* Radio */}
          <View style={[styles.box, { marginTop: 10 }]}>
            <Text style={styles.boxTxt}>1. Does the Village have a VAP ?</Text>
            <Radio
              data={s2Radio}
              name="have_a_vpa"
              setSelected={setform}
              selected={form.have_a_vpa}
            />
          </View>
          {/* Radio */}
          <View style={[styles.box, { marginTop: 10 }]}>
            <Text style={styles.boxTxt}>
              2. Whether the VAP has been uploaded in IMIS ?
            </Text>
            <Radio
              data={s2Radio}
              name="vpa_uploaded"
              setSelected={setform}
              selected={form.vpa_uploaded}
            />
          </View>
          {/* Radio */}
          <View style={[styles.box, { marginTop: 10 }]}>
            <Text style={styles.boxTxt}>
              3. Is the community aware of the contents of the VAP ?
            </Text>
            <Radio
              data={s2Radio}
              name="community_aware_vpa"
              setSelected={setform}
              selected={form.community_aware_vpa}
            />
          </View>
          {/* handleChoosePhoto  */}
          <View style={[styles.box, { marginTop: 10 }]}>
            <Text style={styles.boxTxt}>
              4.(Collect and submit a Copy of VAP along with Gram Sabha
              Resolution)*
            </Text>
            <Button title="Choose Photo" onPress={pickImage} />
            {form.copy_of_vpa && (
              <Image
                source={{ uri: `data:image;base64,${form.copy_of_vpa}` }}
                style={{ width: 200, height: 200, marginTop: 10 }}
              />
            )}
          </View>
        </View>
      )}
      {slide === 4 && (
        <View style={styles.bodyCnt}>
          {/* Text */}
          <View style={[styles.box, { marginTop: 10 }]}>
            <Text style={styles.boxTxt}>1. Name of Bank</Text>
            <TextInput
              value={form.bank_of_vwsc}
              style={styles.txtInput}
              placeholder="Your answer"
              underlineColorAndroid="transparent"
              name="bank_of_vwsc"
              onChangeText={(e) =>
                setform({
                  ...form,
                  bank_of_vwsc: e,
                })
              }
            />
          </View>
          {/* handleChoosePhoto  */}
          <View style={[styles.box, { marginTop: 10 }]}>
            <Text style={styles.boxTxt}>
              2.Opening balance ( with copy of passbook )
            </Text>
            <Button title="Choose Photo" onPress={pickImage2} />
            {form.copy_of_passbook && (
              <Image
                source={{ uri: `data:image;base64,${form.copy_of_passbook}` }}
                style={{ width: 200, height: 200, marginTop: 10 }}
              />
            )}
          </View>
          {/* Text */}
          <View style={[styles.box, { marginTop: 10 }]}>
            <Text style={styles.boxTxt}>3. Name of account holders</Text>
            <TextInput
              value={form.ac_holder}
              style={styles.txtInput}
              placeholder="Your answer"
              underlineColorAndroid="transparent"
              name="ac_holder"
              onChangeText={(e) =>
                setform({
                  ...form,
                  ac_holder: e,
                })
              }
            />
          </View>
        </View>
      )}
      {slide === 5 && (
        <View style={styles.bodyCnt}>
          {/* Radio */}
          <View style={[styles.box, { marginTop: 10 }]}>
            <Text style={styles.boxTxt}>
              1. Whether the Village collected community contribution
            </Text>
            <Radio
              data={s2Radio}
              name="community_contribution"
              setSelected={setform}
              selected={form.community_contribution}
            />
          </View>
          {/* Radio */}
          {form.community_contribution === "Yes" && (
            <View style={[styles.box, { marginTop: 10 }]}>
              <Text style={styles.boxTxt}>
                2. If yes, specify whether in cash/kind/labour
              </Text>
              <Radio
                data={contribution_type}
                name="contribution_type"
                setSelected={setform}
                selected={form.contribution_type}
              />
            </View>
          )}
          {/* Text */}
          <View style={[styles.box, { marginTop: 10 }]}>
            <Text style={styles.boxTxt}>
              {" "}
              {form.community_contribution === "Yes" ? "3" : "2"}. Amount
              contributed
            </Text>
            <TextInput
              value={form.contributed_amt}
              style={styles.txtInput}
              placeholder="Your answer"
              underlineColorAndroid="transparent"
              name="contributed_amt"
              keyboardType="numeric"
              onChangeText={(e) =>
                !isNaN(e) &&
                setform({
                  ...form,
                  contributed_amt: e,
                })
              }
            />
          </View>
          {/* Text */}
          <View style={[styles.box, { marginTop: 10 }]}>
            <Text style={styles.boxTxt}>
              {form.community_contribution === "Yes" ? "4" : "3"}. How much
              utilized in the scheme
            </Text>
            <TextInput
              value={form.much_utilized}
              style={styles.txtInput}
              placeholder="Your answer"
              underlineColorAndroid="transparent"
              name="much_utilized"
              onChangeText={(e) =>
                setform({
                  ...form,
                  much_utilized: e,
                })
              }
            />
          </View>
          {/* Text */}
          <View style={[styles.box, { marginTop: 10 }]}>
            <Text style={styles.boxTxt}>
              {form.community_contribution === "Yes" ? "5" : "4"}. Is there any
              remaining balance? if yes mention amount and details on where the
              balance is deposited.
            </Text>
            <TextInput
              value={form.remaining_balance}
              style={styles.txtInput}
              placeholder="Your answer"
              underlineColorAndroid="transparent"
              name="remaining_balance"
              onChangeText={(e) =>
                setform({
                  ...form,
                  remaining_balance: e,
                })
              }
            />
          </View>
        </View>
      )}
      {slide === 6 && (
        <View style={styles.bodyCnt}>
          {/* Radio */}
          <View style={[styles.box, { marginTop: 10 }]}>
            <Text style={styles.boxTxt}>
              1. Has the Village collected cost towards O&M ?
            </Text>
            <Radio
              data={s2Radio}
              name="village_collected_cost"
              setSelected={setform}
              selected={form.village_collected_cost}
            />
          </View>
          {/* Text */}
          {form.village_collected_cost === "Yes" && (
            <View style={[styles.box, { marginTop: 10 }]}>
              <Text style={styles.boxTxt}>
                2. If yes,what is amount collected per household ?
              </Text>
              <TextInput
                value={form.amount_collected}
                style={styles.txtInput}
                placeholder="Your answer"
                underlineColorAndroid="transparent"
                name="amount_collected"
                onChangeText={(e) =>
                  setform({
                    ...form,
                    amount_collected: e,
                  })
                }
                keyboardType="numeric"
              />
            </View>
          )}
          {/* Radio */}
          <View style={[styles.box, { marginTop: 10 }]}>
            <Text style={styles.boxTxt}>
              {form.village_collected_cost === "Yes" ? "3" : "2"}. Whether this
              amount has been deposited in the VWSC bank account?
            </Text>
            <Radio
              data={s2Radio}
              name="collection_amt_deposited"
              setSelected={setform}
              selected={form.collection_amt_deposited}
            />
          </View>
          {/* Text */}
          <View style={[styles.box, { marginTop: 10 }]}>
            <Text style={styles.boxTxt}>
              {form.village_collected_cost === "Yes" ? "4" : "3"}.Total Amount
              collected till date
            </Text>
            <TextInput
              value={form.total_collected_amt}
              style={styles.txtInput}
              placeholder="Your answer"
              underlineColorAndroid="transparent"
              name="total_collected_amt"
              keyboardType="numeric"
              onChangeText={(e) =>
                !isNaN(e) &&
                setform({
                  ...form,
                  total_collected_amt: e,
                })
              }
            />
          </View>
          {/* Text */}
          <View style={[styles.box, { marginTop: 10 }]}>
            <Text style={styles.boxTxt}>
              {form.village_collected_cost === "Yes" ? "5" : "4"}. Amount
              utilized for O & M
            </Text>
            <TextInput
              value={form.utilized_collected_amt}
              style={styles.txtInput}
              placeholder="Your answer"
              underlineColorAndroid="transparent"
              keyboardType="numeric"
              name="utilized_collected_amt"
              onChangeText={(e) =>
                !isNaN(e) &&
                setform({
                  ...form,
                  utilized_collected_amt: e,
                })
              }
            />
          </View>
          {/* Text */}
          <View style={[styles.box, { marginTop: 10 }]}>
            <Text style={styles.boxTxt}>
              {form.village_collected_cost === "Yes" ? "6" : "5"}. Balance
            </Text>
            <TextInput
              value={form.alance_collected_amt}
              style={styles.txtInput}
              placeholder="Your answer"
              keyboardType="numeric"
              underlineColorAndroid="transparent"
              name="alance_collected_amt"
              onChangeText={(e) =>
                !isNaN(e) &&
                setform({
                  ...form,
                  alance_collected_amt: e,
                })
              }
            />
          </View>
        </View>
      )}
      {slide === 7 && (
        <View style={styles.bodyCnt}>
          {/* Text */}
          <View style={[styles.box, { marginTop: 10 }]}>
            <Text style={styles.boxTxt}>
              1. Local Technological solutions identified in the village
            </Text>
            <TextInput
              value={form.technological_solutions}
              style={styles.txtInput}
              placeholder="Your answer"
              underlineColorAndroid="transparent"
              name="technological_solutions"
              onChangeText={(e) =>
                setform({
                  ...form,
                  technological_solutions: e,
                })
              }
            />
          </View>
          {/* Text */}
          <View style={[styles.box, { marginTop: 10 }]}>
            <Text style={styles.boxTxt}>
              2. Skilled human resources available in the village (Total Number
              and Trade)
            </Text>
            <TextInput
              value={form.skilled_human_no}
              style={styles.txtInput}
              placeholder="Your answer"
              underlineColorAndroid="transparent"
              name="skilled_human_no"
              keyboardType="numeric"
              onChangeText={(e) =>
                setform({
                  ...form,
                  skilled_human_no: e,
                })
              }
            />
          </View>
          {/* Text */}
          <View style={[styles.box, { marginTop: 10 }]}>
            <Text style={styles.boxTxt}>
              3. Skilled human resouces trained by programmes other than JJM
              (Total Number and Trade)
            </Text>
            <TextInput
              value={form.trained_human_no}
              style={styles.txtInput}
              placeholder="Your answer"
              underlineColorAndroid="transparent"
              name="trained_human_no"
              keyboardType="numeric"
              onChangeText={(e) =>
                setform({
                  ...form,
                  trained_human_no: e,
                })
              }
            />
          </View>
        </View>
      )}
      {slide === 8 && (
        <View style={styles.bodyCnt}>
          {/* Checkbox */}
          <View style={[styles.box, { marginTop: 10 }]}>
            <Text style={styles.boxTxt}>
              1. Local Technological solutions identified in the village
            </Text>
            <Checkbox
              selected={checkbox}
              setform={setform}
              form={form.existing_infra}
            />
          </View>
          {/* Text */}
          <View style={[styles.box, { marginTop: 10 }]}>
            <Text style={styles.boxTxt}>2. Details of assets</Text>
            <TextInput
              value={form.details_of_assets}
              style={styles.txtInput}
              placeholder="Your answer"
              underlineColorAndroid="transparent"
              name="details_of_assets"
              onChangeText={(e) =>
                setform({
                  ...form,
                  details_of_assets: e,
                })
              }
            />
          </View>
          {/* Radio */}
          <View style={[styles.box, { marginTop: 10 }]}>
            <Text style={styles.boxTxt}>
              3. Whether asset geo-tagged? (yes/no)
            </Text>
            <Radio
              data={s2Radio}
              name="geo_tagged"
              setSelected={setform}
              selected={form.geo_tagged}
            />
          </View>
          {/* handleChoosePhoto */}
          <View style={[styles.box, { marginTop: 10 }]}>
            <Text style={styles.boxTxt}>4. Upoad Geo Tagged photos</Text>
            <Button title="Choose Photo" onPress={pickImage3} />
            {form.image.length > 0 &&
              form.image.map((item, index) => (
                <View key={index}>
                  <Image
                    source={{ uri: `data:image;base64,${item}` }}
                    style={{ width: 200, height: 200, marginTop: 10 }}
                  />
                  {/* delete image */}
                  <TouchableOpacity
                    onPress={() => {
                      let arr = form.image;
                      arr.splice(index, 1);
                      setform({ ...form, image: arr });
                    }}
                  >
                    <Text style={{ color: "red" }}>Delete</Text>
                  </TouchableOpacity>
                </View>
              ))}
          </View>
          {/* longitude and latitude access */}
          <View style={[styles.box, { marginTop: 10 }]}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.boxTxt}>5. Longitude and Latitude </Text>
              {/* get Button */}
              <TouchableOpacity
                style={styles.button}
                onPress={getLocation}
                title="Get Location"
              >
                <Text style={styles.buttonText}>
                  {locationLoading ? "Loading..." : "Get Location"}
                </Text>
              </TouchableOpacity>
            </View>
            <TextInput
              value={form.long}
              style={styles.txtInput}
              placeholder="Longitude"
              underlineColorAndroid="transparent"
              name="long"
              onChangeText={(e) =>
                setform({
                  ...form,
                  long: e,
                })
              }
            />
            <TextInput
              value={form.lat}
              style={styles.txtInput}
              placeholder="Latitude"
              underlineColorAndroid="transparent"
              name="lat"
              onChangeText={(e) =>
                setform({
                  ...form,
                  lat: e,
                })
              }
            />
          </View>
        </View>
      )}
      <View style={styles.btnCnt}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            cancelForm();
          }}
        >
          <Text style={styles.btnTxt}>Cancel</Text>
        </TouchableOpacity>
        {slide !== 0 && (
          <TouchableOpacity style={styles.btn}>
            <Text style={[styles.btnTxt, { color: "red" }]} onPress={PrevSlide}>
              Previous
            </Text>
          </TouchableOpacity>
        )}
        {slide !== 8 && (
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnTxt} onPress={NextSlide}>
              Next
            </Text>
          </TouchableOpacity>
        )}
        {slide === 8 && (
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: "skyblue" }]}
          >
            <Text style={styles.btnTxt} onPress={handleSubmit}>
              Submit
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default Annexure;

const styles = StyleSheet.create({
  container: {
    // marginTop: 40,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#ede7ff",
  },
  Head: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
    padding: 10,
    borderBottomColor: "#dadada",
    borderBottomWidth: 1,
  },
  HeadLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  HeadLeftImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  HeadLeftText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  SideNavbar: {
    width: "100%",
    height: "100%",
    backgroundColor: "#dadada",
    position: "absolute",
    left: "-100%",
    zIndex: 1,
    padding: 20,
    transform: [{ translateX: 0 }],
    // display: "none",
  },
  SideNavbarHead: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  SideNavbarHeadImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  CloseImage: {
    marginLeft: 10,
    width: 20,
    height: 20,
  },
  headCnt: {
    padding: 10,
    backgroundColor: "#fff",
  },
  headTxt: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subheadTxt: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  horRow: {
    backgroundColor: "#dadada",
    height: 2,
    marginBottom: 10,
  },
  emailCnt: {
    marginTop: 10,
  },
  emailTxt: {
    fontSize: 15,
    fontWeight: "bold",
  },
  emailInput: {
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#dadada",
  },
  box: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#dadada",
    backgroundColor: "#fff",
    marginTop: 25,
  },
  boxTxt: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
  },
  btnCnt: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    marginBottom: 25,
  },
  btn: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#dadada",
  },
  btnTxt: {
    fontSize: 15,
    fontWeight: "bold",
    color: "blue",
  },
  txtInput: {
    padding: 10,
    marginTop: 10,
    borderWidth: 2,
    borderColor: "white",
    borderBottomColor: "#dadada",
  },
  button: {
    backgroundColor: "skyblue",
    padding: 7,
    borderRadius: 10,
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
