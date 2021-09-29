import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";

export default function GithubCatch() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [repoInfoDisplay, setRepoInfoDisplay] = useState(false);
  const [repoInfoDisplayData, setRepoInfoDisplayData] = useState(null);

  const handleSubmit = (e) => {
    console.log("Searchinggggggggggggggggg");
    e.preventDefault(); // submit the form entirely, we dont want form to do the submnit,
    //we want to do it our own
    setLoading(true);
    // axios({})
    axios({
      method: "get",
      url: `https://api.github.com/users/${username}/repos`,
    }).then((response) => {
      // console.log(response.data);
      setLoading(false);
      setRepos(response.data);
    });
  };

  return (
    <View>
      <Text>Github Info Catcher 🕸</Text>
      <TextInput
        placeholder="Enter username here"
        value={username}
        onChangeText={(value) => {
          setUsername(value);
        }}
      />
      <Text>You entered: {username}</Text>
      <Button
        title={loading ? "Searching..." : "Search"}
        onPress={handleSubmit}
        // onPress={() => setLoading(!loading)}
      />

      {repoInfoDisplay ? (
        <Text style={{ padding: 10 }}>
          Repo Name : {repoInfoDisplayData.name}
          {"\n"}
          Forks Count:{repoInfoDisplayData.forks_count}
          {"\n"}
          Language used:{repoInfoDisplayData.language}
          {"\n"}
          Owner Information:{"\n"}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={{ uri: repoInfoDisplayData.owner.avatar_url }}
              style={{ width: 32, height: 32 }}
            />
            <Text>{repoInfoDisplayData.owner.login}</Text>
          </View>
          {/* forks_count, language updated_at, watchers_count, owner.avatar_url, */}
          {/* owner.login */}
        </Text>
      ) : null}

      <Text style={{ padding: 20 }}>Your Repositories 👇🏼{"\n"}</Text>
      {repos?.map((repo, index) => (
        <TouchableOpacity
          key={repo.id}
          onPress={() => {
            console.log("repo:", repo);
            setRepoInfoDisplay(!repoInfoDisplay);
            setRepoInfoDisplayData(repo);
          }}
        >
          <Text style={{ padding: 10 }}>{repo.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
