import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import icon from "../../assets/icon.png";
import logo from "../../assets/Logo.jpeg";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Axios from "../Components/Axios";
import SecureStore from "@react-native-async-storage/async-storage";

const Login = ({ setform, setuserId, userId }) => {
  const navigation = useNavigation();
  const [login, setlogin] = useState({
    // unum: "7011609898",
    // cpwd: "ajit1972",
    unum: "",
    cpwd: "",
    errMessage: "",
    errMessage2: "",
  });
  const { unum, cpwd, errMessage, errMessage2 } = login;
  useEffect(() => {
    // console.log(login);
  }, [login]);
  useEffect(() => {
    if (userId !== 0) {
      setform((prev) => ({ ...prev, created_by: userId }));
      navigation.navigate("Home");
    }
  }, [userId]);
  const onSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("unum", unum);
      formData.append("cpwd", cpwd);
      const response = await Axios.post("/user_verify.php", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.status === 400) {
        setform((prev) => ({ ...prev, created_by: response.data.msg }));
        setuserId(response.data.msg);
        await SecureStore.setItem("user", JSON.stringify(response.data.msg));
        navigation.navigate("Home");
      } else {
        if (response.data.msg === "401 Wrong User Id") {
          setlogin({
            ...login,
            errMessage: "Wrong User Id",
            errMessage2: "",
          });
        } else if (response.data.msg === "Wrong password 401") {
          setlogin({
            ...login,
            errMessage: "",
            errMessage2: "Wrong Password",
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={styles.main}>
      <View style={styles.logo}>
        <Image source={icon} style={styles.logoImage} />
        <Text style={styles.heading}>Kalptaru Gramodyog Samiti</Text>
      </View>
      <Text style={styles.formTitle}>Login</Text>
      {/* unum */}
      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Mobile Number</Text>
        <View style={styles.formInput}>
          <TextInput
            style={styles.formInputText}
            placeholder="Mobile Number"
            onChangeText={(text) => {
              setlogin({ ...login, unum: text });
            }}
            defaultValue={unum}
            keyboardType="numeric"
          />
        </View>
        {errMessage && <Text style={styles.errMessage}>{errMessage}</Text>}
      </View>
      {/* upwd */}
      <View style={styles.formGroup}>
        <Text style={styles.formLabel}>Password</Text>
        <View style={styles.formInput}>
          <TextInput
            style={styles.formInputText}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => setlogin({ ...login, cpwd: text })}
            defaultValue={cpwd}
          />
        </View>
        {errMessage2 && <Text style={styles.errMessage}>{errMessage2}</Text>}
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
        <Text style={styles.submitButtonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.logo}>
        <Image
          source={logo}
          style={[
            styles.logoImage,
            { width: 250, height: 160, marginTop: 40, opacity: 0.5 },
          ]}
        />
      </View>
      <View style={styles.bottomText}>
        <Text style={styles.bottomText1}>
          © 2022 Developed by Web Soft Valley
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    // marginTop: 40,
    padding: 20,
    marginBottom: 20,
    justifyContent: "flex-start",
    backgroundColor: "white",
    height: "100%",
  },
  logo: {
    alignItems: "center",
    marginBottom: 20,
  },
  logoImage: {
    width: 100,
    height: 100,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 15,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  formInput: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    padding: 10,
  },
  formInputText: {
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  bottomText: {
    position: "absolute",
    alignSelf: "center",
    top: 720,
  },
  bottomText1: {
    color: "grey",
    fontSize: 12,
  },
  errMessage: {
    marginTop: 5,
    color: "red",
    fontSize: 16,
  },
});

export default Login;
