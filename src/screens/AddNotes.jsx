import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useNavigation} from '@react-navigation/native';

const AddNotes = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  //Navigation
  const navigation = useNavigation();
  //   Save Note Function
  const SaveNote = async () => {
    // getData
    let loadData = [];
    let rawData = await EncryptedStorage.getItem('notes');
    let data = JSON.parse(rawData);
    data.data.map(item => {
      loadData.push(item);
    });
    //setData
    loadData.push({title: title, desc: desc});
    await EncryptedStorage.setItem('notes', JSON.stringify({data: loadData}));
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Note Title"
        keyboardType="default"
        value={title}
        onChangeText={txt => setTitle(txt)}
        placeholderTextColor={'#DCD7C9'}
        maxLength={40}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Note Description"
        keyboardType="default"
        value={desc}
        onChangeText={txt => setDesc(txt)}
        placeholderTextColor={'#DCD7C9'}
        maxLength={100}
      />
      <TouchableOpacity style={styles.btn} onPressIn={() => SaveNote()}>
        <Text style={styles.btnText}>Add Note</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddNotes;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    width: '90%',
    borderWidth: 1,
    borderRadius: 10,
    borderRightColor: '#09122C',
    height: 50,
    alignSelf: 'center',
    paddingHorizontal: 10,
    marginTop: 20,
    color: '#FFF',
    fontWeight: '700',
    backgroundColor: '#021526',
  },
  btn: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#021526',
    marginTop: 50,
    height: 50,
    borderRadius: 15,
    alignSelf: 'center',
  },
  btnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
