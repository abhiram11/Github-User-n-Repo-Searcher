import * as React from "react";
import { View, Text, ScrollView } from "react-native";
import GithubCatch from "./GithubCatch";

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Github info catcher!</Text>
      <ScrollView vertical>
        <GithubCatch />
      </ScrollView>
    </View>
  );
}
