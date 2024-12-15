import React from "react";
import Container from "../components/Container";
import Contents from "../components/Contents";
import Button from "../components/Button";
import { styled } from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import _ from 'lodash';

const ListItem = styled.TouchableOpacity`
  width : 100%;
  padding : 12px 0;
  border-bottom-color : #aaaaaa;
  border-bottom-width : 1px;
`;
const Label = styled.Text`
  font-size : 20px;
`;

const DeleteButton = styled.TouchableOpacity`
  padding : 5px 10px;
  background-color : #ff6b6b;
  border-radius : 5px;
`;



function List({navigation}) {
  const [list, setList] = React.useState([]);
  const load = async () => {
    const data = await AsyncStorage.getItem('list');
    if(data !== null){
      setList(JSON.parse(data));
    }
  }
  const removeItem = async (id) => {
    const updatedList = list.filter((item) => item.id !== id);
    setList(updatedList);
    await AsyncStorage.setItem('list', JSON.stringify(updatedList));
  };
  React.useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', ()=>{
      load();
    });
    load();
    return unsubscribe;
  }, [navigation]);

  return(
    <Container>
      <Contents>
        {
          _.sortBy(list, 'id').map(item => {
            return (
              <ListItem key={item.id} onPress={()=> navigation.navigate('Detail', {id:item.id})} >
              <Label>{item.date} {item.title}</Label>
              <DeleteButton onPress={()=> removeItem(item.id)}>
                삭제
              </DeleteButton>
              </ListItem>
            );
          })
        }
      </Contents>
      <Button onPress={()=>{ navigation.navigate('Form')}}>
        새 일기 작성
      </Button>
    </Container>
  );
}

export default List;