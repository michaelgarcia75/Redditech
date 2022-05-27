import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  FlatList,
} from "react-native";
import { SearchBar } from "react-native-elements";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

export default function Search({ navigation }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const test = async (search) => {
    let BearerToken = await SecureStore.getItemAsync("secure_token");
    let url =
      "https://oauth.reddit.com/api/subreddit_autocomplete_v2?query=" + search;
    console.log(url);
    console.log(BearerToken);
    var config = {
      method: "GET",
      url: url,
      headers: {
        Authorization: "Bearer " + BearerToken,
      },
    };
    try {
      const response = await axios(config);
      setData(response["data"]["data"]["children"]);
      console.log("data", response["data"]["data"]["children"]);
    } catch (error) {
      console.log(error);
    }
  };

  const updateSearch = (search) => {
    setSearch(search);
    test(search);
  };

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <SearchBar
        style={{ marginTop: 30 }}
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
      />
      <ScrollView>
        <FlatList
          data={data}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          renderItem={({ item }) => {
            return (
              <View>
                {/* {console.log("BGGGT", item.data.id)} */}
                <Text
                  style={{ fontWeight: "bold" }}
                  onPress={() =>
                    navigation.navigate("AddPage", {
                      message: item.data.display_name_prefixed,
                    })
                  }
                >
                  {item.data.display_name_prefixed}
                </Text>
              </View>
            );
          }}
        />
      </ScrollView>
      <View style={navbar.container}>
        <View style={navbar.container_flex}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("HomePage")}
          >
            <Image
              source={require("../assets/navbar/home.png")}
              style={navbar.image}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("SearchPage")}
          >
            <Image
              source={require("../assets/navbar/search.png")}
              style={navbar.image}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("WorksPage")}
          >
            <Image
              source={require("../assets/navbar/add.png")}
              style={navbar.image}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("ChatPage")}
          >
            <Image
              source={require("../assets/navbar/chat.png")}
              style={navbar.image}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("ProfilPage")}
          >
            <Image
              source={require("../assets/navbar/notifications.png")}
              style={navbar.image}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const navbar = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  container_flex: {
    marginLeft: 30,
    marginRight: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "90%",
  },
  image: {
    width: 30,
    height: 30,
  },
});
