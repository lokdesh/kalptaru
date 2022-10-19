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

const Methods = () => {
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
        <Text style={styles.headingText}>METHOD /ACTIVITY </Text>
      </View>
      <ScrollView style={styles.body}>
        {/* First Point */}
        <View style={styles.headContainer}>
          <Text style={styles.head}>
            1) PARTICIPATORY RURAL APPRAISAL (PRA) FOR WILLINGNESS TO TAKE FHTC-
            AIMS TO INCORPORATE THE KNOWLEDGE AND OPINIONS OF RURAL PEOPLE IN
            THE PLANNING AND MANAGEMENT OF JJM SCHEME.
          </Text>
          <Text style={styles.subHead}>
            A. TEAM WILL EXPLAIN THE SOCIAL AND NATURAL RESOURCE MAP OF VILLAGE
            BY USING CHALK POWDER, CHALK ON THE GROUND OR ON A CONCRETE FLOOR TO
            EXPLAIN THE LAYOUT OF VILLAGE. MAIN FEATURES SUCH AS HOUSING,
            TEMPLES, STORES, DRINKING WATER SOURCE AND OTHER INFRASTRUCTURES
            LIKE FOREST SANITATION FACILITIES ETC ARE EXPLAINED TO VILLAGERS.
          </Text>
          <Text style={styles.subHead}>
            B. TRANSACT WALK- A TANSACT WALK IS UNDERTAKEN BY TEAM ALONG WITH
            VILLAGERS TO OBSERVE AND SEND IN MINUTES DETAILS IN THE DIFFERENCES
            OF PARTICULAR PLACE.
          </Text>
          <Text style={styles.subHead}>
            C. TIMELINE- REFER TO CALENDER OF HISTORICAL EVENTS FROM AS FOR BACK
            AS ONE CAN REMEMBER UPTO PRESENT (LAST 20 YEARS.)
          </Text>
          <Text style={styles.subHead}>
            D. MATRIX RANKING- TO UNDERSTAND VILLAGERS CHOICE AND PRIORITIES
            AREA IT HELPS US TO UNDERSTAND FARMERS CROP PRIORITY, WATER
            CONSERVATION TECHNIQUES, IRRIGATION METHODS ETC. BY THIS WE KNOW THE
            VILLAGER’S PREFERENCE AND ATTITUDE TOWARDS A PARTICULAR TOPIC OF
            INTEREST.
          </Text>
          <Text style={styles.subHead}>
            E. SEASONAL MAPPING- IT IS IMPORTANT AND USEFUL TOOL TO DETERMINE
            SEASONAL PATTERNS IN RURAL AREA AS RELATED TO RAINFALL, FARMING
            PRACTICE, EMPLOYMENT ETC. IN SEASON ABILITY AN ATTEMP IS MADE TO
            DETEMINE THE SEASONAL CALENDAR AS UNDERSTOOD AND PRACTICED BY
            VILLAGERS.
          </Text>
          <Text style={styles.subHead}>
            F. VENN DIAGRAM- TO GET VILLAGERS PERSPECTIVES ON IMPACT INFLUENCE
            OF LOCAL AND OUTSIDERS INSTITUTIONS IN A PARTICULAR AREA
          </Text>
          <Text style={styles.subHead}>
            G. WEALTH RANKING- MEMBER OF COMMUNITY JOINTLY DETERMINE THE
            RELATIVE WEALTH OF ALL ITS MEMBERS BY TAKING INTO ACCOUNTS ALL
            ASSETS, SOURCES OF INCOME AND HABILITY OF AN INDIVIDUAL FAMILY.{" "}
          </Text>
          <Text style={styles.head}>
            2) COMMUNITY MOBELIZATION- VWSC TRAINING BY EXPLANING JJM OBJECTIVE
            ON RECORD KEEPING.
          </Text>
          <Text style={styles.head}>
            3) OPERATION AND MAINTENANCE TRAINING FOR PUMP OPERATOR AND OTHER
            MEMBERS OF VWSC WITH THE HELP OF BANNER, PHAMPHLET, AUDIO-VISUAL
            TOOLS.
          </Text>
          <Text style={styles.head}>
            4) SECONDARY DATA IS COLLECTED ONLINE TO OUR APP AND WEBSITE FOR
            AUTHENTICATION OF DATA IN PRESCRIBED FORMAT.
          </Text>
          <Text style={styles.head}>
            5) THE TOPIC WILL BE EXPLAIN TO VILLAGERS IN FORM OF FOLK SONG FORM
            IN LOCAL LANGUAGE FOR UNDERSTANDING THE OBJETIVES OF JJM.
          </Text>
          <Text style={styles.head}>
            6) IPC - INTERPERSONAL COMMUNICATION BY HOME VISIT OF PANCHAYAT
            MEMBERS, RURAL WOMEN AND OTHER LOCAL OFFICERS TO CREATE AWARENESS
            ABOUT FHTC.
          </Text>
          <Text style={styles.head}>
            7) SELFIE POINT WITH JJM BANNER FOR AWARENESS OF SCHEME.
          </Text>
          <Text style={styles.head}>
            8) FLIP CHART- SHOWING JJM OBJECTIVES IN THE FORM OF PICTURES OR
            FLIP CHART FOR ILLITERATE PEOPLE TO UNDERSTAND THEIR ROLES AND
            RESPONSIBILITIES IN JJM.
          </Text>
          {/* Main heading */}
          <Text style={[styles.headingText, { alignSelf: "center" }]}>
            OUTCOME
          </Text>
          <View style={styles.horRow}></View>
          <Text style={styles.head}>
            1) BY NEED ASSESSMENT (PRA), VILLAGERS CAN UNDERSTAND SOCIAL AND
            NATURAL RESOURCE MAP OF A VILLAGE.
          </Text>
          <Text style={styles.head}>
            2) THE VWSC AND COMMUNITY AWARE ABOUT VARIOUS ASPECTS OF WATER SUCH
            AS WATER HARVESTING, ARTIFICIAL RECHARGE, WATER BORNE DISEASES,
            WATER SAVING, WATER HANDLING, DRINKIING WATER SOURCE AUGMENTATION/
            SUSTAINABILITY ASPECTS.
          </Text>
          <Text style={styles.head}>
            3) COMMUNITY AWARE ABOUT IMPORTANCE TO TAKE FHTC AND OPERATION &
            MAINTENANCE OF IN-VILLAGE WATER INFRASTRUCTURE.
          </Text>
          <Text style={styles.head}>
            4) THE COMMUNITY CONTRIBUTE TOWARDS OPERATION AND MAINTENANCE (O&M).
          </Text>
          <Text style={styles.head}>
            5) THE COMMUNITY KNOW ABOUT NEED OF WATER CONSERVATION.
          </Text>
          <Text style={styles.head}>
            6) THE VILLAGERS UNDERSTAND THE OBJECTIVSE OF JJM PHED.
          </Text>
          <Text style={styles.head}>
            7) THE COMMUNITY PARTICIPATE IN DECISION MAKING, WILLINGNESS FOR
            FHTCS, MONITORING OF WORKS, INVOLVEMENT OF RURAL WOMEN.
          </Text>
          <Text style={styles.head}>
            8) THE VWSC MEMBERS AWARE ON BOOK-KEEPING FOR MAINTAINING OF BANK
            ACCOUNT FOR WATER SUPPLY (CREATION AND MAINTENANCE OF REGISTER FOR
            ACCOUNTS).
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Methods;

const styles = StyleSheet.create({
  container: {
    height: "95%",
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
    width: "85%",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  horRow: {
    backgroundColor: "#dadada",
    height: 2,
    marginBottom: 10,
  },
  headingText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  body: {
    width: "100%",
    height: "100%",
  },
  headContainer: {
    width: "100%",
    height: "100%",
    padding: 10,
  },
  head: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHead: {
    fontSize: 14,
    marginBottom: 10,
  },
});
