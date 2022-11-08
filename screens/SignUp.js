import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from "react-native";
import axios from "axios";
import { RadioButton } from "react-native-paper";

import * as ImagePicker from "expo-image-picker";
import Header from "../components/Header";

//ENV
//import { HOST_NAME } from "@env";

import { HOST_NAME } from "../CONSTANTS";

//fonts
import { Poppins_600SemiBold, useFonts } from "@expo-google-fonts/poppins";

import AppLoading from "expo-app-loading";
const SignUp = () => {
  let { fontLoad } = useFonts({ Poppins_600SemiBold });
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [checked, setChecked] = useState("male");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,

      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const submitForm = async () => {
    if (name.length <= 5 || phone.length != 11 || !image) {
      ToastAndroid.show("Please fill out the form first", ToastAndroid.SHORT);
      return;
    }

    //do the api call here

    const formData = new FormData();

    formData.append("image", {
      name: "test.jpg",
      uri: image,
      type: "image/jpg",
    });
    formData.append("phone", phone);
    formData.append("name", name);
    formData.append("gender", checked);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    };

    //CALLING THE API END POINT HERE
    const { data } = await axios.post(
      `${HOST_NAME}/uploadForm`,
      formData,
      config
    );
    if (data.success) {
      ToastAndroid.show("data uploaded sucessfully", ToastAndroid.TOP);
    } else {
      ToastAndroid.show(
        "Oops!! there appears to be some error",
        ToastAndroid.SHORT
      );
    }
  };

  if (fontLoad) return <AppLoading />;
  return (
    <>
      {/* //header */}

      <Header text={"Complete Profile"} />
      {/* DIVIDER */}

      <View
        style={{
          borderBottomColor: "rgba(154, 154, 154, 0.5)",
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <View style={styles.mainView}>
        {/* IMAGE INPUT  */}

        <View style={styles.imageButton}>
          <View style={styles.nestedImageView}>
            <TouchableOpacity onPress={pickImage}>
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{ height: 120, width: 120, borderRadius: 100 }}
                />
              ) : (
                <Image source={require("../assets/cam.png")} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* INPUTS */}
        <TextInput
          keyboardType="number-pad"
          style={styles.textInput}
          placeholder={"Phone Number"}
          onChangeText={(text) => setPhone(text)}
        ></TextInput>

        <TextInput
          style={styles.textInput}
          placeholder={"Full Name"}
          onChangeText={(text) => setName(text)}
        ></TextInput>

        {/* //RADIO BUTTON HERE  */}

        <View style={styles.radioButtonContainer}>
          <View style={[styles.radioBtn, { marginRight: 6 }]}>
            <Text style={styles.textInsideRadio}>Male</Text>
            <RadioButton
              value="first"
              color="#707070"
              status={checked === "male" ? "checked" : "unchecked"}
              onPress={() => setChecked("male")}
            />
          </View>
          <View style={[styles.radioBtn, { marginLeft: 6 }]}>
            <Text style={styles.textInsideRadio}>Female</Text>
            <RadioButton
              value="second"
              color="#707070"
              status={checked === "female" ? "checked" : "unchecked"}
              onPress={() => setChecked("female")}
            />
          </View>
        </View>

        {/* //SEND  */}
        <TouchableOpacity style={styles.sendBtn} onPress={submitForm}>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 18,
              lineHeight: 21,
              textAlign: "center",
              paddingVertical: 13,
              color: "white",
            }}
          >
            SEND
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
  },
  headerText: {
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 21,
    paddingLeft: 29,
    paddingTop: 48,
    paddingBottom: 13,
  },
  imageButton: {
    paddingTop: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 27,
  },
  nestedImageView: {
    backgroundColor: "#EAEAEA",
    width: 120,
    height: 120,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  textInput: {
    width: 318,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    paddingLeft: 15,
    elevation: 5,
    marginBottom: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  radioBtn: {
    width: 153,
    height: 50,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    elevation: 5,
  },
  textInsideRadio: {
    paddingLeft: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#636464",
  },
  sendBtn: {
    backgroundColor: "#4582C3",
    width: 180,
    marginTop: 42,
    borderRadius: 8,
  },
});
