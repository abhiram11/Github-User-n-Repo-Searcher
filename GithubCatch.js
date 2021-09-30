import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function GithubCatch() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [repoInfoDisplay, setRepoInfoDisplay] = useState(false);
  const [repoClickedKey, setRepoClickedKey] = useState(null);
  const [repoInfoDisplayData, setRepoInfoDisplayData] = useState(null);
  const [textInputFocus, setTextInputFocus] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTextInputFocus(false);
    // console.log("Value of e:", e);
    if (username.length < 1) {
      console.log("Enter a username first");
      return Alert.alert("Enter a username first!");
    }

    // console.log("Searching");
    // submit the form entirely, we dont want form to do the submnit,
    //we want to do it our own
    setLoading(true);
    // axios({})
    axios({
      method: "get",
      url: `https://api.github.com/users/${username.toLowerCase()}/repos`,
    }).then((response) => {
      // console.log(response.data);
      setLoading(false);
      setRepos(response.data);
    });
  };

  return (
    <>
      <View>
        <Text style={{ margin: 10, fontSize: 24, fontWeight: 600 }}>
          🕸 Github Info Catcher 🕸
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
            marginHorizontal: 10,
            padding: 6,
            borderWidth: 1,
            borderRadius: 4,
            borderColor: textInputFocus ? "#4169E1" : "black",
          }}
        >
          <AntDesign
            name="user"
            size={24}
            style={{
              marginRight: 4,
              color: textInputFocus ? "#4169E1" : "black",
            }}
          />
          <TextInput
            placeholder="Enter username here"
            value={username}
            onFocus={() => setTextInputFocus(true)}
            onChangeText={(value) => {
              setUsername(value);
            }}
            style={{
              fontSize: 16,
              outline: "none",
            }}
          />
        </View>
        {/* <Text>You entered: "{username}"</Text> */}

        <TouchableOpacity onPress={handleSubmit} style={{ marginVertical: 6 }}>
          <Text
            style={{
              paddingVertical: 8,
              paddingHorizontal: 14,
              color: "white",
              backgroundColor: "green",
              borderRadius: 4,
              alignSelf: "center",
            }}
          >
            {loading ? "Searching..." : "Search"}
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {repoInfoDisplay ? (
          <RepoCard repoInfoDisplayData={repoInfoDisplayData} />
        ) : null}

        {repos.length > 0 ? (
          <Text
            style={{
              padding: 20,
              alignSelf: "center",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Your Repositories 👇🏼{"\n"}
          </Text>
        ) : null}
        {repos?.map((repo, index) => (
          <TouchableOpacity
            key={repo.id}
            onPress={() => {
              setRepoInfoDisplay(!repoInfoDisplay);
              setRepoInfoDisplayData(repo);
              setRepoClickedKey(repo.id);
            }}
            style={{
              borderWidth: 1,
              backgroundColor:
                repo.id === repoClickedKey && repoInfoDisplay
                  ? "black"
                  : "white",
              borderColor: "whitesmoke",
              borderRadius: 4,
              marginTop: 2,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color:
                  repo.id === repoClickedKey && repoInfoDisplay
                    ? "white"
                    : "black",

                padding: 10,
                fontWeight: 600,
              }}
            >
              {repo?.name.length > 32
                ? `${repo.name.slice(0, 32)}...`
                : repo.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}

const RepoCard = ({ repoInfoDisplayData }) => {
  return (
    <View
      style={{
        padding: 10,
        borderWidth: 2,
        borderRadius: 6,
        borderColor: "gray",
        backgroundColor: "whitesmoke",
      }}
    >
      <Text>
        Repo Name :{" "}
        <Text onPress={() => Linking.openURL(repoInfoDisplayData.clone_url)}>
          {repoInfoDisplayData.name.length > 32
            ? `${repoInfoDisplayData.name.slice(0, 32)}...`
            : repoInfoDisplayData.name}{" "}
          <Ionicons name="open-outline" size={16} />
        </Text>
        {"\n"}
        Forks Count: {repoInfoDisplayData.forks_count}
        {"\n"}
        Tech Stack used: {repoInfoDisplayData.language}
        {"\n\n"}
        <Text style={{ fontWeight: 600 }}>Owned by:{"\n"}</Text>
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={{ uri: repoInfoDisplayData.owner.avatar_url }}
          style={{ width: 32, height: 32, borderRadius: 99, marginRight: 6 }}
        />
        <Text
          style={{ marginLeft: 6, fontWeight: 600 }}
          onPress={() => Linking.openURL(repoInfoDisplayData.owner.html_url)}
        >
          {repoInfoDisplayData.owner.login}
          {"\n"}
        </Text>
      </View>
    </View>
  );
};
