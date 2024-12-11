import React, { useState,useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useTransactions } from './TransactionContext';
import { getDataAsync } from './AppStorage';

const TransactionScreen = ({ navigation }) => {
  const [listIBANs, setListIBANs] = useState<[]>([]);
  const [amount, setAmount] = useState('');
  const [IBAN_Name, setIBAN_Name] = useState('');
  const [IBAN_ID, setIBAN_ID] = useState('');
  const { addTransaction } = useTransactions();

  const handleTransaction = () => {
    const accountDetails = { IBAN_Name, IBAN_ID };
    addTransaction(amount, accountDetails);
    navigation.goBack();
  };
  const handleSelectedIBAN = async (value, index) =>{
    if(index > 0){
      setIBAN_ID(value);
      setIBAN_Name(listIBANs[index-1]['label']);
    }
    else{
      setIBAN_ID(null);
      setIBAN_Name(null);
    }
  }
  useEffect(() => {
    const fetch = async () => {
      const lstIBANData = await getDataAsync('normal', 'ListIBAN');
      if(lstIBANData){
        let IBANMap:any = [];
        lstIBANData.map((item,i)=>{
          IBANMap.push({ label: item.firstName + item.lastName, value: item.Id });
        });
        if(IBANMap){
          setListIBANs(IBANMap);
        }
      } 
    };
    fetch();
  }, []);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginVertical: 8 }}
        onChangeText={setAmount}
        value={amount}
        keyboardType="numeric"
        placeholder="Enter amount"
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginVertical: 8 }}
        value={IBAN_ID}
        placeholder="Recipient Name"
      />
      <View style={{width: '80%'}}>
        <RNPickerSelect
              onValueChange={(value,index) => { handleSelectedIBAN(value,index)}}
              value={IBAN_ID}
              style={pickerSelectStyles}
              items={listIBANs}
            />
      </View>
    
      <Button title="Submit Transaction" onPress={handleTransaction} />
    </View>
  );
};
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
export default TransactionScreen;
