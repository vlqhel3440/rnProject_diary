import React from "react";
import Container from "../components/Container";
import Contents from "../components/Contents";
import { styled } from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Text = styled.Text`
  font-size : 20px;
  line-height : 28px;
`;

function Detail({navigation, route}) {
  navigation.setOptions({title: route.params.id});
  const [text, setText] = React.useState("");
  React.useEffect(()=>{
    AsyncStorage.getItem('list').then(data=>{
      const list = JSON.parse(data);
      const diary = list.find(element => element.id === route.params.id);
      setText(diary.text);
    })
  }, []);
  return(
    <Container>
      <Contents>
        <Text>{text}</Text>
      </Contents>
    </Container>
  );
}

export default Detail;