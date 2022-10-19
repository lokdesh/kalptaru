import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Button,
} from "react-native";
import { useEffect, useState } from "react";
import Dropdown from "../Components/Dropdown";
import Radio from "../Components/Radio";
import Checkbox from "../Components/Checkbox";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";

const Annexure = ({ form, setform, setforms, saveForms }) => {
  const navigation = useNavigation();
  const [GalleryPermition, setGalleryPermition] = useState(false);
  const [data, setdata] = useState({
    district: [
      { label: "East Garo Hills", value: "East Garo Hills" },
      { label: "South Garo Hills", value: "South Garo Hills" },
    ],
    block: [
      { label: "Dambo Rongjeng", value: "Dambo Rongjeng" },
      { label: "Samanda", value: "Samanda" },
      { label: "Songsak", value: "Songsak" },
    ],
    village: [{ label: "Option1", value: "Option1" }],
    villageScheme: [
      { value: "Single village scheme" },
      { value: "Multi village scheme" },
    ],
  });
  const { district, block, village, villageScheme } = data;
  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setGalleryPermition(galleryStatus.status === "granted");
    })();
    SecureStore.getItemAsync("form2").then((res) => {
      if (res) {
        setform(JSON.parse(res));
      }
    });
  }, []);
  useEffect(() => {
    SecureStore.setItemAsync("form2", JSON.stringify(form));
  }, [form]);
  const handleSubmit = async () => {
    setforms((prev) => {
      const Annexure2 = [...prev.Annexure2];
      Annexure2.push(form);
      return { ...prev, Annexure2 };
    });
    navigation.navigate("Home");
    setform({
      nameOfOfficer: "",
      phoneOfOfficer: "",
      district: "",
      block: "",
      village: "",
      dateOfTraning: "",
      checkbox: [
        {
          value: "ROLE AND RESPONSIBILITY OF GP/VWSC FUNCTIONARIES ON JJM",
          checked: false,
        },
        { value: "COMMUNITY CONTRIBUTION AND O&M", checked: false },
        {
          value: "VWSCS COORDINATION WITH REGARDS TO MVS/SVS",
          checked: false,
        },
        { value: "WATER CONSERVATION", checked: false },
        { value: "VWSC MAINTENANCE OF ACCOUNT", checked: false },
        { value: "PREPARATION OF VAP", checked: false },
        { value: "AVAILABILITY OF BANK ACCOUNT", checked: false },
      ],
      NumberOfParticipants: "",
      image1: "",
      imageType1: "",
      image2: "",
      imageType2: "",
      image3: "",
      imageType3: "",
      image4: "",
      imageType4: "",
    });
    SecureStore.deleteItemAsync("form2");
    saveForms();
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
      base64: true,
    });
    if (!result.cancelled) {
      setform({ ...form, image: result.base64, imageType: result.type });
    }
  };
  const pickImage2 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
      base64: true,
    });
    if (!result.cancelled) {
      setform({ ...form, image2: result.base64, imageType2: result.type });
    }
  };
  const pickImage3 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
      base64: true,
    });
    if (!result.cancelled) {
      setform({ ...form, image3: result.base64, imageType3: result.type });
    }
  };
  const pickImage4 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
      base64: true,
    });
    if (!result.cancelled) {
      setform({ ...form, image4: result.base64, imageType4: result.type });
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
    setform({ ...form, dateOfTraning: result });
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
      {/* Main Image */}
      <View style={styles.headCnt}>
        <View style={styles.MainImage}>
          <Image
            source={{
              uri: "https://lh4.googleusercontent.com/TupYQVU2YaZlHvP2qoi6QaguxehkRFcKl3q0oMUVztO1I4W1iFepVVGl6Fdsz7g3k8uhmGv9Q2sEQjLwntty9_eYYYMU3hHejWv-b-Z8uSc8GprqBuqagvit9Mungd4MHw=w1200",
            }}
            style={styles.MainImageImage}
          />
        </View>
        <Text style={styles.headTxt}>
          Annexure 2 TRAINING OF GP AND VWSc on PRA /O&M
        </Text>
      </View>
      {/* Form */}
      <View style={styles.bodyCnt}>
        {/* Text */}
        <View style={[styles.box, { marginTop: 10 }]}>
          <Text style={styles.boxTxt}>NAME OF FIELD OFFICER KALPATARU</Text>
          <TextInput
            style={styles.txtInput}
            placeholder="Your answer"
            underlineColorAndroid="transparent"
            name="nameOfOfficer"
            onChangeText={(e) =>
              setform({
                ...form,
                nameOfOfficer: e,
              })
            }
            value={form.nameOfOfficer}
          />
        </View>
        {/* Text */}
        <View style={[styles.box, { marginTop: 10 }]}>
          <Text style={styles.boxTxt}>PHONE NO OF OFFICER</Text>
          <TextInput
            value={form.phoneOfOfficer}
            style={styles.txtInput}
            placeholder="Your answer"
            underlineColorAndroid="transparent"
            name="phoneOfOfficer"
            onChangeText={(e) => {
              if (!isNaN(e)) {
                setform({
                  ...form,
                  phoneOfOfficer: e,
                });
              }
            }}
          />
        </View>
        {/* Dropdown */}
        <View style={[styles.box, { marginTop: 10 }]}>
          <Text style={styles.boxTxt}>District *</Text>
          <Dropdown
            data={district}
            setSelected={setform}
            selected={form.district}
            name="district"
          />
        </View>
        {/* Dropdown */}
        <View style={[styles.box, { marginTop: 10 }]}>
          <Text style={styles.boxTxt}>Block *</Text>
          <Dropdown
            data={block}
            setSelected={setform}
            selected={form.block}
            name="block"
          />
        </View>
        {/* Dropdown */}
        <View style={[styles.box, { marginTop: 10 }]}>
          <Text style={styles.boxTxt}>Name of village</Text>
          <Dropdown
            data={village}
            setSelected={setform}
            selected={form.village}
            name="village"
          />
        </View>
        {/* Text */}
        <View style={[styles.box, { marginTop: 10 }]}>
          <Text style={styles.boxTxt}>Date of training</Text>
          <TextInput
            style={styles.txtInput}
            placeholder="DD/MM/YYYY"
            value={form.dateOfTraning}
            onChangeText={handleDate}
          />
        </View>
        {/* Radio */}
        <View style={[styles.box, { marginTop: 10 }]}>
          <Text style={styles.boxTxt}>Village have SVS/MVS *</Text>
          <Radio
            data={villageScheme}
            name="villageScheme"
            setSelected={setform}
            selected={form.villageScheme}
          />
        </View>
        {/* Checkbox */}
        <View style={[styles.box, { marginTop: 10 }]}>
          <Text style={styles.boxTxt}>
            Topic covered training of GP AND VWSc *
          </Text>
          <Checkbox selected={form.checkbox} setSelected={setform} />
          {/* Select All button */}
          <TouchableOpacity
            style={styles.selectAllBtn}
            onPress={() => {
              setform({
                ...form,
                checkbox: [
                  {
                    value:
                      "ROLE AND RESPONSIBILITY OF GP/VWSC FUNCTIONARIES ON JJM",
                    checked: true,
                  },
                  { value: "COMMUNITY CONTRIBUTION AND O&M", checked: true },
                  {
                    value: "VWSCS COORDINATION WITH REGARDS TO MVS/SVS",
                    checked: true,
                  },
                  { value: "WATER CONSERVATION", checked: true },
                  { value: "VWSC MAINTENANCE OF ACCOUNT", checked: true },
                  { value: "PREPARATION OF VAP", checked: true },
                  { value: "AVAILABILITY OF BANK ACCOUNT", checked: true },
                ],
              });
            }}
          >
            <Text style={styles.selectAllBtnTxt}>Select All</Text>
          </TouchableOpacity>
        </View>
        {/* Text */}
        <View style={[styles.box, { marginTop: 10 }]}>
          <Text style={styles.boxTxt}>Number of Participants</Text>
          <TextInput
            value={form.NumberOfParticipants}
            style={styles.txtInput}
            placeholder="Your answer"
            underlineColorAndroid="transparent"
            name="NumberOfParticipants"
            onChangeText={(e) => {
              if (!isNaN(e)) {
                setform({
                  ...form,
                  NumberOfParticipants: e,
                });
              }
            }}
          />
        </View>
        {/* handleChoosePhoto */}
        <View style={[styles.box, { marginTop: 10 }]}>
          <Text style={styles.boxTxt}>PHOTO OF VILLAGE MAP IN PRA</Text>
          <Button title="Choose Photo" onPress={pickImage} />
          {form.image && (
            <Image
              source={{ uri: `data:image;base64,${form.image}` }}
              style={{ width: 200, height: 200, marginTop: 10 }}
            />
          )}
        </View>
        {/* handleChoosePhoto */}
        <View style={[styles.box, { marginTop: 10 }]}>
          <Text style={styles.boxTxt}>PRA TRAINING PHOTO</Text>
          <Button title="Choose Photo" onPress={pickImage2} />
          {form.image2 && (
            <Image
              source={{ uri: `data:image;base64,${form.image2}` }}
              style={{ width: 200, height: 200, marginTop: 10 }}
            />
          )}
        </View>
        {/* handleChoosePhoto */}
        <View style={[styles.box, { marginTop: 10 }]}>
          <Text style={styles.boxTxt}>PRA SIGNED FORMET</Text>
          <Button title="Choose Photo" onPress={pickImage3} />
          {form.image3 && (
            <Image
              source={{ uri: `data:image;base64,${form.image3}` }}
              style={{ width: 200, height: 200, marginTop: 10 }}
            />
          )}
        </View>
        {/* handleChoosePhoto */}
        <View style={[styles.box, { marginTop: 10 }]}>
          <Text style={styles.boxTxt}>Upload attendance sheet</Text>
          <Button title="Choose Photo" onPress={pickImage4} />
          {form.image4 && (
            <Image
              source={{ uri: `data:image;base64,${form.image4}` }}
              style={{ width: 200, height: 200, marginTop: 10 }}
            />
          )}
        </View>
        {/* link for guidance */}
        <TouchableOpacity
          style={{ marginTop: 10 }}
          onPress={() => {
            navigation.navigate("Methods");
          }}
        >
          <Text style={styles.link}>Click here for Method / Activity</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.btnCnt}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            cancelForm();
          }}
        >
          <Text style={[styles.btnTxt, { color: "red" }]}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, { backgroundColor: "skyblue" }]}>
          <Text style={styles.btnTxt} onPress={handleSubmit}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Annexure;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#ede7ff",
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
  MainImage: {
    width: "100%",
    height: 80,
    marginTop: 10,
    marginBottom: 10,
  },
  MainImageImage: {
    width: "100%",
    height: "100%",
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
  headCnt: {
    padding: 10,
    backgroundColor: "#fff",
  },
  headTxt: {
    fontSize: 20,
    fontWeight: "bold",
  },
  horRow: {
    backgroundColor: "#dadada",
    height: 2,
    marginBottom: 10,
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
  selectAllBtn: {
    padding: 10,
    marginTop: 10,
    borderWidth: 2,
    borderColor: "white",
    borderBottomColor: "#dadada",
    backgroundColor: "skyblue",
    borderRadius: 10,
  },
  selectAllBtnTxt: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  link: {
    fontSize: 15,
    fontWeight: "bold",
    color: "blue",
    textAlign: "center",
    marginTop: 10,
  },
});
