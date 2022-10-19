import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Image,
  Dimensions,
} from "react-native";
import { useRef, useState } from "react";
import logo from "../../assets/Logo.jpeg";
import { useNavigation } from "@react-navigation/native";
import Axios from "../Components/Axios";
import SecureStore from "@react-native-async-storage/async-storage";

const Home = ({ forms, setforms }) => {
  const navigation = useNavigation();
  const width = Dimensions.get("window").width;
  const translation = useRef(new Animated.Value(0)).current;
  const [sync, setsync] = useState(false);
  const showNav = () => {
    for (let i = 0; i < width - 40; i++) {
      setTimeout(() => {
        translation.setValue(i);
      }, i);
    }
  };
  const hideNav = () => {
    let j = 0;
    for (let i = width - 40; i > 0; i--) {
      j++;
      setTimeout(() => {
        translation.setValue(i);
      }, j);
    }
  };
  const handleSync = async () => {
    var noterr = true;
    setsync(true);
    var arr = forms.Annexure1;
    for (const form of arr) {
      const formData = new FormData();
      for (const property in form) {
        if (property === "existing_infra") {
          formData.append(property, JSON.stringify(form[property]));
        } else {
          formData.append(property, form[property]);
        }
      }
      const res = await Axios.post("/anaxure-1.php", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.status !== 1) {
        alert("Error in Syncing");
        noterr = false;
        break;
      }
      console.log(res.data);
    }
    setsync(false);
    setTimeout(() => {
      // noterr && setforms({ ...forms, Annexure1: [] });
    }, 1000);
    // Axios.post("/api/v1/annexure2", forms.Annexure2);
    // Axios.post("/api/v1/annexure3", forms.Annexure3);
    // Axios.post("/api/v1/annexure4", forms.Annexure4);
  };
  return (
    <View style={styles.container}>
      {/* Head */}
      <View style={styles.Head}>
        <View style={styles.HeadLeft}>
          <Image
            source={require("../../assets/icon.png")}
            style={styles.HeadLeftImage}
          />
          <Text style={styles.HeadLeftText}>Kalptaru Gramodyog Samiti</Text>
        </View>
        <TouchableOpacity style={styles.HeadLeft} onPress={showNav}>
          <Image
            source={require("../../assets/menu.png")}
            style={styles.HeadLeftImage}
          />
        </TouchableOpacity>
      </View>
      {/* Side Navbar */}
      <Animated.View
        style={[
          styles.SideNavbar,
          { transform: [{ translateX: translation }] },
        ]}
      >
        <View style={styles.SideNavbarHead}>
          <View style={styles.HeadLeft}>
            <Image
              source={require("../../assets/icon.png")}
              style={styles.HeadLeftImage}
            />
            <Text style={styles.HeadLeftText}>Kalptaru Gramodyog Samiti</Text>
          </View>
          <TouchableOpacity onPress={hideNav}>
            <Image
              source={require("../../assets/close.png")}
              style={styles.CloseImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.SideNavbarBody}>
          <TouchableOpacity
            style={styles.SideNavbarBodyButton}
            onPress={() => {
              hideNav();
              navigation.navigate("Annexure");
            }}
          >
            <Text style={styles.SideNavbarBodyButtonText}>Annexure 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.SideNavbarBodyButton}
            onPress={() => {
              hideNav();
              navigation.navigate("Annexure2");
            }}
          >
            <Text style={styles.SideNavbarBodyButtonText}>Annexure 2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.SideNavbarBodyButton}
            onPress={() => {
              hideNav();
              navigation.navigate("Annexure3");
            }}
          >
            <Text style={styles.SideNavbarBodyButtonText}>Annexure 3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.SideNavbarBodyButton}
            onPress={() => {
              hideNav();
              navigation.navigate("Annexure4");
            }}
          >
            <Text style={styles.SideNavbarBodyButtonText}>Annexure 4</Text>
          </TouchableOpacity>
        </View>
        {/* logout button */}
        <TouchableOpacity
          style={styles.SideNavbarLogout}
          onPress={() => {
            hideNav();
            SecureStore.removeItem("user");
            navigation.navigate("login");
          }}
        >
          <Text style={styles.SideNavbarLogoutText}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>
      {/* Dashboard */}
      <View style={styles.dashboard}>
        <TouchableOpacity
          style={styles.dashboardItem}
          onPress={() => navigation.navigate("SingleForm1")}
        >
          <Text style={styles.dashboardItemText}>Annexure 1</Text>
          <Text style={styles.dashboardItemText}>{forms.Annexure1.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dashboardItem}
          onPress={() => navigation.navigate("SingleForm2")}
        >
          <Text style={styles.dashboardItemText}>Annexure 2</Text>
          <Text style={styles.dashboardItemText}>{forms.Annexure2.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dashboardItem}
          onPress={() => navigation.navigate("SingleForm3")}
        >
          <Text style={styles.dashboardItemText}>Annexure 3</Text>
          <Text style={styles.dashboardItemText}>{forms.Annexure3.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dashboardItem}
          onPress={() => navigation.navigate("SingleForm4")}
        >
          <Text style={styles.dashboardItemText}>Annexure 4</Text>
          <Text style={styles.dashboardItemText}>{forms.Annexure4.length}</Text>
        </TouchableOpacity>
        {/* sync button */}
        <TouchableOpacity style={styles.HeadRight} onPress={handleSync}>
          <Text style={styles.HeadRightText}>
            {sync ? "Syncing..." : "Sync"}
          </Text>
          {sync ? (
            <Image
              source={{
                uri: "https://gifimage.net/wp-content/uploads/2018/04/refresh-gif-8.gif",
              }}
              style={styles.HeadRightImagegif}
            />
          ) : (
            <Image
              source={{
                uri: "http://cdn.onlinewebfonts.com/svg/img_517002.png",
              }}
              style={styles.HeadRightImage}
            />
          )}
        </TouchableOpacity>
      </View>

      {/* Logo */}
      <View style={styles.logo}>
        <Image
          source={logo}
          style={[
            styles.logoImage,
            { width: 300, height: 200, marginTop: 40, opacity: 0.5 },
          ]}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 40,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
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
    marginLeft: 10,
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
  HeadRight: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#f2faff",
    elevation: 5,
  },
  HeadRightText: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
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
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
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
  SideNavbarHeadText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  SideNavbarBody: {
    width: "100%",
  },
  SideNavbarBodyButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  SideNavbarBodyButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  dashboard: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  dashboardItem: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 5,
  },
  dashboardItemText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  SideNavbarLogout: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "red",
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignSelf: "center",
  },
  SideNavbarLogoutText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  HeadRightImage: {
    width: 15,
    height: 15,
  },
  HeadRightImagegif: {
    width: 19,
    height: 19,
  },
});
