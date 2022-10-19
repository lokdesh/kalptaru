import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/Screens/Login";
import Form from "./src/Screens/Form1";
import Form2 from "./src/Screens/Form2";
import Form3 from "./src/Screens/Form3";
import Form4 from "./src/Screens/Form4";
import SingleForm1 from "./src/Screens/SingleForm1";
import SingleForm2 from "./src/Screens/SingleForm2";
import SingleForm3 from "./src/Screens/SingleForm3";
import SingleForm4 from "./src/Screens/SingleForm4";
import Home from "./src/Screens/Home";
import Methods from "./src/Screens/Methods";
import SecureStore from "@react-native-async-storage/async-storage";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [userId, setuserId] = useState(0);
  const [form, setform] = useState({
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
    image: [],
    long: "",
    lat: "",
  });
  const [form2, setform2] = useState({
    nameOfOfficer: "",
    phoneOfOfficer: "",
    district: "",
    block: "",
    village: "",
    dateOfTraning: "",
    villageScheme: "",
    checkbox: [
      {
        value: "ROLE AND RESPONSIBILITY OF GP/VWSC FUNCTIONARIES ON JJM",
        checked: false,
      },
      { value: "COMMUNITY CONTRIBUTION AND O&M", checked: false },
      { value: "VWSCS COORDINATION WITH REGARDS TO MVS/SVS", checked: false },
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
  const [form3, setform3] = useState({
    fieldOfficer: "",
    district: "",
    block: "",
    village: "",
    dateOfCommunity: "",
    namePumpOperator: "",
    numberOfPumpOperator: "",
    image1: "",
    imageType1: "",
    image2: "",
    imageType2: "",
    image3: "",
    imageType3: "",
  });
  const [form4, setform4] = useState({
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
  const [forms, setforms] = useState({
    Annexure1: [],
    Annexure2: [],
    Annexure3: [],
    Annexure4: [],
  });
  if (forms === null) {
    setforms({
      Annexure1: [],
      Annexure2: [],
      Annexure3: [],
      Annexure4: [],
    });
  }
  useEffect(() => {
    (async () => {
      const getforms = await SecureStore.getItem("forms");
      const getUser = await SecureStore.getItem("user");
      getforms && setforms(JSON.parse(getforms));
      getUser && setuserId(JSON.parse(getUser));
    })();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      (async () => {
        await SecureStore.setItem("forms", JSON.stringify(forms));
      })();
    }, 500);
  }, [forms]);

  const saveForms = async () => {
    await SecureStore.setItem("forms", JSON.stringify(forms));
  };
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" options={{ headerShown: false }}>
          {(props) => (
            <Login setform={setform} setuserId={setuserId} userId={userId} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {(props) => <Home forms={forms} setforms={setforms} />}
        </Stack.Screen>
        <Stack.Screen name="SingleForm1" options={{ headerShown: false }}>
          {(props) => (
            <Form
              form={form}
              setform={setform}
              setforms={setforms}
              saveForms={saveForms}
              userId={userId}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="SingleForm2" options={{ headerShown: false }}>
          {(props) => (
            <Form2
              form={form2}
              setform={setform2}
              setforms={setforms}
              saveForms={saveForms}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="SingleForm3" options={{ headerShown: false }}>
          {(props) => (
            <Form3
              form={form3}
              setform={setform3}
              setforms={setforms}
              saveForms={saveForms}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="SingleForm4" options={{ headerShown: false }}>
          {(props) => (
            <Form4
              form={form4}
              setform={setform4}
              setforms={setforms}
              saveForms={saveForms}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Annexure" options={{ headerShown: false }}>
          {(props) => <SingleForm1 forms={forms.Annexure1} userId={userId} />}
        </Stack.Screen>
        <Stack.Screen name="Annexure2" options={{ headerShown: false }}>
          {(props) => <SingleForm2 forms={forms.Annexure2} />}
        </Stack.Screen>
        <Stack.Screen name="Annexure3" options={{ headerShown: false }}>
          {(props) => <SingleForm3 forms={forms.Annexure3} />}
        </Stack.Screen>
        <Stack.Screen name="Annexure4" options={{ headerShown: false }}>
          {(props) => <SingleForm4 forms={forms.Annexure4} />}
        </Stack.Screen>
        <Stack.Screen name="Methods" options={{ headerShown: false }}>
          {(props) => <Methods />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create();
