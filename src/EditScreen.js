import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, Button, StyleSheet, View, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EditScreen = ({ route, navigation }) => {
  const { index, notes, setNotes } = route.params; 
  const [editedNote, setEditedNote] = useState(notes[index].text);
  const [errorMessage, setErrorMessage] = useState('');

  const saveChanges = () => {
    if(editedNote != '') {
      const updatedNotes = [...notes];
      updatedNotes[index].text = editedNote;
      setErrorMessage('');
      setNotes(updatedNotes); 
      navigation.goBack();
    } else {
      setErrorMessage('Fyll i något');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Edit Note</Text>

      <View style={styles.buttonContainer}>
      <Ionicons name="arrow-back-circle-outline" size={24} color="black" onPress={() => navigation.goBack()}/>
      </View>
      
      
      <ScrollView style={styles.inputContainer}>
      <TextInput 
        style={styles.input}
        value={editedNote}
        onChangeText={(text) => setEditedNote(text)}
        multiline={true} 
        numberOfLines={4}
      />
      </ScrollView>
      
      <Button title="Save" onPress={saveChanges} />
      

      {errorMessage != "" &&
        <Text>{errorMessage}</Text>
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F0E5',
    flexDirection: 'column',
    justifyContent: 'flex-start', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 25,
  },
  inputContainer: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: 'gray',
    borderWidth: 1,
  },
  input: {
    height: 700,
    width: '100%',
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center', 
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
});


export default EditScreen;
