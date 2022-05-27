import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView, Button, FlatList, TouchableOpacity, Image, SafeAreaView } from "react-native"
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
// import { Video, AVPlaybackStatus } from 'expo-av';
import moment from "moment";

export default function Home({ navigation }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState("Home") //Home, Hot, Top, New

  useEffect(() => {
    getSubredditInfos("Home");
  }, []);

  useEffect(() => {
    getSubredditInfos(page);
  }, [page]);

  async function getSubredditInfos(page) {

    let url = ""
    switch (page) {
      case "Home":
        url += 'https://oauth.reddit.com?raw_json=1';
        break;
      case "Hot":
        url += 'https://www.reddit.com/r/all/hot.json';
        break;
      case "Top":
        url += 'https://www.reddit.com/r/all/top.json';
        break;
      case "New":
        url += 'https://www.reddit.com/r/all/new.json';
        break;
    }
    console.log(url)
    let config = {
      method: 'GET',
      url: url,
    };
    if (page == "Home") {
      let BearerToken = await SecureStore.getItemAsync('secure_token');
      console.log(BearerToken)
      config.headers = {
        'Authorization': 'Bearer ' + BearerToken,
      }
    }

    axios(config)
      .then(function (response) {
        let data = response["data"]["data"]["children"];
        setData(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <View style={styles.global}>
      <View style={styles.filters}>
        <TouchableOpacity style={styles.button} onPress={() => setPage("Home")}>
          <Image source={require('../assets/navbar/home.png')} style={styles.buttonImageIconStyle} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setPage("Hot")} >
          <Image source={require('../assets/hot.png')} style={styles.buttonImageIconStyle} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setPage("New")} >
          <Image source={require('../assets/new.png')} style={styles.buttonImageIconStyle} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setPage("Top")}>
          <Image source={require('../assets/top.png')} style={styles.buttonImageIconStyle} />
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ marginBottom: 75 }}
        data={data}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        renderItem={({ item }) => {
          item.data.created = moment(item.data.created * 1000).format(
            "DD/MM/YYYY"
          );
          return (
            <View style={styles.bloc2}>
              <View style={styles.bcontainer}>
                <Text
                  style={{ fontWeight: "bold", fontSize: 15 }}
                  onPress={() =>
                    navigation.navigate("AddPage", {
                      message: item.data.subreddit_name_prefixed,
                    })
                  }
                >
                  {item.data.subreddit_name_prefixed}
                </Text>
                <Text>
                  u/{item.data.author} ⚈ {item.data.created}
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    marginTop: 10,
                    marginBottom: 10,
                    fontSize: 15,
                  }}
                  onPress={() =>
                    navigation.navigate("AddPage", { message: item.data.title })
                  }
                >
                  {item.data.title.length > 250
                    ? item.data.title.slice(0, 250) + " ..."
                    : item.data.title}
                </Text>
                {/* <ScrollView style={{height: 230, marginTop: 20}}>
                                        <Text style={{fontSize: 15}}>{item.data.selftext}</Text>
                                    </ScrollView> */}
                {/* {item.data.url ? ( */}
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "contain",
                  }}
                  source={{ uri: item.data.url }}
                />
                {/* ) : (
                  <Image
                    style={{
                      width: "100%",
                      height: "100%",
                      resizeMode: "contain",
                    }}
                    source={{ uri: item.data.thumbnail }}
                  />
                )} */}
                <Text style={{ marginTop: 10 }}>
                  Comments : {item.data.num_comments}
                </Text>
                <Text>Upvotes : {item.data.ups}</Text>
                {/* <Video
                                        ref={video}
                                        source={{
                                            uri: item.data.secure_media.reddit_video.fallback_url,
                                        }}
                                        useNativeControls
                                        resizeMode="contain"
                                        style={{ width: '100%', aspectRatio: 16/9, backgroundColor: '#000' }}
                                        isLooping
                                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                                    /> */}
              </View>
            </View>
          );
        }}
      />
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

const styles = StyleSheet.create({
  global: {
    marginTop: 0,
    backgroundColor: "#E5E5E5",
    width: "100%",
    height: "100%",
  },
  filters: {
    backgroundColor: "#ffFFFF",
    width: "100%",
    height: 50,
    marginTop: 25,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderWidth: 1,
  },
  buttonImageIconStyle: {
    padding: 10,
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
  button: {
    flex: 1,
    direction: "row",
    justifyContent: "center",
    alignItems: "center",

  },
  bloc2: {
    marginTop: 30,
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: 400,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
  },
  container: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 40,
    height: 400,
  },
  bcontainer: {
    marginLeft: 10,
    marginRight: 20,
    display: "flex",
    height: "60%",
    alignItems: "center",
  },
});

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
