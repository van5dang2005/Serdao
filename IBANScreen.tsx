import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, Alert, FlatList, StyleSheet, ScrollView } from 'react-native';
import { storeDataAsync, getDataAsync } from './AppStorage';

interface IBAN {
  firstName: string;
  lastName: string;
  Id: number;
}
const IBANScreen = ({ navigation }) => {
  const [listIBANs, setListIBANs] = useState<IBAN[]>([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleAddIBAN = async () => {
    const IBAN: IBAN = {
      firstName: firstName,
      lastName: lastName,
      Id: Date.now()
    };
    const updatedList = [...listIBANs, IBAN];
    setListIBANs(updatedList);
    await storeDataAsync('normal', 'ListIBAN', updatedList);
    Alert.alert('Add IBAN Successfully!');
  };
  useEffect(() => {
    const getData = async () => {
      const lstIBANData = await getDataAsync('normal', 'ListIBAN');
      setListIBANs(lstIBANData)
      console.log(lstIBANData);
    };
    getData();
  }, []);
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>ID: {item.Id}</Text>
      <Text style={styles.itemText}>FName: {item.firstName}</Text>
      <Text style={styles.itemText}>LName: {item.lastName}</Text>
    </View>
  );
  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <FlatList
          data={listIBANs}
          scrollEnabled={false}
          nestedScrollEnabled={true}
          keyExtractor={(item) => item.Id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginVertical: 1 }}
          onChangeText={setFirstName}
          value={firstName}
          placeholder="Enter First Name"
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginVertical: 1 }}
          onChangeText={setLastName}
          value={lastName}
          placeholder="Enter First Name"
        />
        <Button title="Add IBAN" onPress={handleAddIBAN} />
      </View>
    </ScrollView>


  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  balanceText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
  listContainer: {
    flexGrow: 1,
    width: '100%',
  },
});

export default IBANScreen;
