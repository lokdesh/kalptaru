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
  });
  const { district, block, village } = data;
  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setGalleryPermition(galleryStatus.status === "granted");
    })();
    SecureStore.getItemAsync("form4").then((res) => {
      if (res) {
        setform(JSON.parse(res));
      }
    });
  }, []);
  useEffect(() => {
    SecureStore.setItemAsync("form4", JSON.stringify(form));
  }, [form]);
  const handleSubmit = async () => {
    setforms((prev) => {
      const Annexure4 = [...prev.Annexure4];
      Annexure4.push(form);
      return { ...prev, Annexure4 };
    });
    navigation.navigate("Home");
    setform({
      fieldOfficer: "",
      phoneNo: "",
      district: "",
      block: "",
      village: "",
      venue: "",
      date: "",
      image1: "",
      imageType1: "",
      image2: "",
      imageType2: "",
      image3: "",
      imageType3: "",
      image3: "",
      imageType3: "",
    });
    SecureStore.deleteItemAsync("form4");
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
      setform({ ...form, image1: result.base64, imageType1: result.type });
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
    setform({ ...form, date: result });
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
        <Text style={styles.headTxt}>ANNEXURE 4 DECLARATION OF HGJ</Text>
      </View>
      {/* Form */}
      <View style={styles.bodyCnt}>
        {/* Text */}
        <View style={[styles.box, { marginTop: 10 }]}>
          <Text style={styles.boxTxt}>NAME OF FIELD OFFICER</Text>
          <TextInput
            style={styles.txtInput}
            placeholder="Your answer"
            underlineColorAndroid="transparent"
            name="fieldOfficer"
            onChangeText={(e) =>
              setform({
                ...form,
                fieldOfficer: e,
              })
            }
            value={form.fieldOfficer}
          />
        </View>
        {/* Text */}
        <View style={[styles.box, { marginTop: 10 }]}>
          <Text style={styles.boxTxt}>Phone no</Text>
          <TextInput
            style={styles.txtInput}
            placeholder="Your answer"
            underlineColorAndroid="transparent"
            name="phoneNo"
            onChangeText={(e) => {
              if (!isNaN(e)) {
                setform({
                  ...form,
                  phoneNo: e,
                });
              }
            }}
            value={form.phoneNo}
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
          <Text style={styles.boxTxt}>VENUE OF TRAINING PROGRAMME</Text>
          <TextInput
            value={form.venue}
            style={styles.txtInput}
            placeholder="Your answer"
            underlineColorAndroid="transparent"
            name="venue"
            onChangeText={(e) => {
              setform({
                ...form,
                venue: e,
              });
            }}
          />
        </View>
        {/* Text */}
        <View style={[styles.box, { marginTop: 10 }]}>
          <Text style={styles.boxTxt}>Date of training</Text>
          <TextInput
            style={styles.txtInput}
            placeholder="DD/MM/YYYY"
            value={form.date}
            onChangeText={handleDate}
          />
        </View>
        {/* handleChoosePhoto */}
        <View style={[styles.box, { marginTop: 10 }]}>
          <Text style={styles.boxTxt}>
            UPLOAD OPERATION AND MANTENANCE TRANING FORMATE
          </Text>
          <Button title="Choose Photo" onPress={pickImage} />
          {form.image1 && (
            <Image
              source={{ uri: `data:image;base64,${form.image1}` }}
              style={{ width: 200, height: 200, marginTop: 10 }}
            />
          )}
        </View>
        {/* handleChoosePhoto */}
        <View style={[styles.box, { marginTop: 10 }]}>
          <Text style={styles.boxTxt}>UPLOAD O&M TRAINING PHOTO</Text>
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
          <Text style={styles.boxTxt}>UPLOAD attendance shee</Text>
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
          <Text style={styles.boxTxt}>UPLOAD attendance shee</Text>
          <Button title="Choose Photo" onPress={pickImage4} />
          {form.image4 && (
            <Image
              source={{ uri: `data:image;base64,${form.image4}` }}
              style={{ width: 200, height: 200, marginTop: 10 }}
            />
          )}
        </View>
        <View style={[styles.box, { marginTop: 10 }]}>
          <Text style={styles.headTxt}>DETAILS OF TRAINING</Text>
          <Text style={styles.boxTxt}>
            1) The training and mobelization activity are conducted in village
            to aware villagers objectiv of jjm har ghar jal BY training
            VILLAGERS CAN UNDERSTAND SOCIAL AND NATURAL RESOURCE MAP OF A
            VILLAGE.
          </Text>
          <Text style={styles.boxTxt}>
            2) THE VWSC AND COMMUNITY AWARE ABOUT VARIOUS ASPECTS OF WATER SUCH
            AS WATER HARVESTING, ARTIFICIAL RECHARGE, WATER BORNE DISEASES,
            WATER SAVING, WATER HANDLING, DRINKIING WATER SOURCE AUGMENTATION/
            SUSTAINABILITY ASPECTS.
          </Text>
          <Text style={styles.boxTxt}>
            3) COMMUNITY AWARE ABOUT IMPORTANCE TO TAKE FHTC AND OPERATION &
            MAINTENANCE OF IN-VILLAGE WATER INFRASTRUCTURE.
          </Text>
          <Text style={styles.boxTxt}>
            4) THE COMMUNITY CONTRIBUTE TOWARDS OPERATION AND MAINTENANCE (O&M).
          </Text>
          <Text style={styles.boxTxt}>
            5) THE COMMUNITY KNOW ABOUT NEED OF WATER CONSERVATION.
          </Text>
          <Text style={styles.boxTxt}>
            6) THE VILLAGERS UNDERSTAND THE OBJECTIVSE OF JJM PHED.
          </Text>
          <Text style={styles.boxTxt}>
            7) THE COMMUNITY PARTICIPATE IN DECISION MAKING, WILLINGNESS FOR
            FHTCS, MONITORING OF WORKS, INVOLVEMENT OF RURAL WOMEN.
          </Text>
          <Text style={styles.boxTxt}>
            8) THE VWSC MEMBERS AWARE ON BOOK-KEEPING FOR MAINTAINING OF BANK
            ACCOUNT FOR WATER SUPPLY (CREATION AND MAINTENANCE OF REGISTER FOR
            ACCOUNTS).
          </Text>
        </View>
      </View>
      {/* Buttons */}
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
