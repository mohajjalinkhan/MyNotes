import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';

const AllNotes = () => {
  //Navigation
  const navigation = useNavigation();
  //allNotes State
  const [allNotes, setAllNotes] = useState([]);
  const isFocused = useIsFocused();
  //loadData
  useEffect(() => {
    getAllNotes();
  }, [isFocused]);
  //getData
  const getAllNotes = async () => {
    let loadData = [];
    let rawData = await EncryptedStorage.getItem('notes');
    let data = JSON.parse(rawData);
    data.data.map(item => {
      loadData.push(item);
    });
    setAllNotes(loadData);
  };
  // Delete Notes
  const deleteNote = async index => {
    let temp = allNotes;
    let loadData = [];
    temp.map((item, ind) => {
      if (ind !== index) {
        loadData.push(item);
      }
    });
    await EncryptedStorage.setItem('notes', JSON.stringify({data: loadData}));
    getAllNotes();
  };
  return (
    <View style={styles.container}>
      {/* using conditional rendering */}
      {allNotes == '' ? (
        <Text style={styles.headingText}>Add Notes</Text>
      ) : (
        <FlatList
          data={allNotes}
          renderItem={({item, index}) => {
            return (
              <SafeAreaView>
                <View style={[styles.notesCard, styles.noteContainer]}>
                  <View style={{width: 300, margin: 2}}>
                    <Text style={styles.noteTitle}>{item.title}</Text>
                    <Text style={styles.noteText}>{item.desc}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.delete}
                    onPress={() => {
                      deleteNote(index);
                    }}>
                    <Text style={styles.deleteTesxt}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </SafeAreaView>
            );
          }}
        />
      )}
      <TouchableOpacity
        style={styles.Addbtn}
        onPress={() => navigation.navigate('AddNotes')}>
        <Text style={styles.btnText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};
export default AllNotes;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  headingText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 200,
  },
  Addbtn: {
    backgroundColor: '#021526',
    width: 60,
    height: 60,
    borderRadius: 20,
    position: 'absolute',
    right: 20,
    bottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 35,
  },
  noteContainer: {
    flexDirection: 'row',
    marginHorizontal: 8,
  },
  notesCard: {
    width: '95%',
    height: 120,
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#021526',
  },
  noteTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 8,
    margin: 1,
    marginBottom: 4,
  },
  noteText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '400',
    paddingHorizontal: 8,
  },
  delete: {
    height: 40,
    width: 65,
    position: 'absolute',
    right: 12,
    top: 15,
    borderWidth: 0.5,
    borderColor: 'red',
    borderRadius: 10,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    marginVertical: 2,
    marginHorizontal: 2,
  },
  deleteTesxt: {
    color: 'red',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
});
