import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather, Entypo } from '@expo/vector-icons';

const NoteApp = ({ navigation }) => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState('');
  const [filter, setFilter] = useState('all'); 


  useEffect(() => {
    loadNotes();
  }, []);

  const addNote = () => {
    if (note.trim() !== '') {
      setNotes([...notes, { text: note, completed: false }]);
      setNote('');
      saveNotes([...notes, { text: note, completed: false }]); 
    }
  };

  const updateNotes = (updatedNotes) => {
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };
  

   
    const saveNotes = async (notes) => {
      try {
        await AsyncStorage.setItem('notes', JSON.stringify(notes));
      } catch (error) {
        console.error('Error saving notes: ', error);
      }
    };
  
    const loadNotes = async () => {
      try {
        const savedNotes = await AsyncStorage.getItem('notes');
        if (savedNotes !== null) {
          setNotes(JSON.parse(savedNotes));
        }
      } catch (error) {
        console.error('Error loading notes: ', error);
      }
    };

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
    saveNotes(updatedNotes); 
  };


  const editNote = (index) => {
    navigation.navigate('Edit', { index, onEditNote: updateNotes, notes });
  };
  
  

  const toggleComplete = (index) => {
    const updatedNotes = [...notes];
    updatedNotes[index].completed = !updatedNotes[index].completed;
    setNotes(updatedNotes);
  };

  const filterNotes = () => {
    if (filter === 'all') {
      return notes;
    } else if (filter === 'done') {
      return notes.filter((note) => note.completed);
    } else {
      return notes.filter((note) => !note.completed);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Note App</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new note"
          value={note}
          onChangeText={(text) => setNote(text)}
        />
        <Entypo name="add-to-list" size={38} color="black" onPress={addNote} />
      </View>
      <View style={styles.filterContainer}>
        <Button title="All" onPress={() => setFilter('all')} />
        <Button title="Done" onPress={() => setFilter('done')} />
        <Button title="Not Done" onPress={() => setFilter('notDone')} />
      </View>
      <FlatList
        data={filterNotes()}
        style={styles.list}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.note}>
            <TouchableOpacity onPress={() => toggleComplete(index)}>
              <Text style={item.completed ? styles.completedText : {}}>
                {item.text.substring(0, 20)}
              </Text>
            </TouchableOpacity>

            <View style={styles.button}>
            <Feather name="edit" size={25} color="black" onPress={() => editNote(index)}/>
            <Feather name="trash-2" size={25} color="black" onPress={() => deleteNote(index)}/>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F8F0E5',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  note: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    width: '95%',
    margin: 10,
    padding: 15,

    
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  button: {
    flexDirection: 'row',
    marginRight: 1,
    width: '18%',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});

export default NoteApp;