import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }: {navigation: any}) => {

  return (
    <View style={styles.container}>
      <Button
        title="Add Transaction"
        onPress={() => navigation.navigate('Transaction')}
      />
    
    </View>
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

export default HomeScreen;
