import axios from "axios";
import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

export default function GithubCatch() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);

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
      console.log(response.data);
      setLoading(false);
      setRepos(response.data);
    });
  };

  return (
    <View>
      <Text>Github info catcher!!!!!!</Text>
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

      <Text style={{ padding: 20 }}>Repos : </Text>
      {repos?.map((repo, index) => (
        <Text key={repo.id} style={{ padding: 10 }}>
          {repo.name}
        </Text>
      ))}
    </View>
  );
}
