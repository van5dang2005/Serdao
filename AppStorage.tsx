import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFIX_SECURE = "secure_";
const PREFIX_NORMAL = "normal_";
const APP_PREFIX = "serdao_";

type StorageType = 'secure' | 'normal' | 'all';

const determinePrefix = (type: StorageType) => {
    return type === 'secure' ? PREFIX_SECURE : PREFIX_NORMAL;
};

export const storeDataAsync = async (type: StorageType, key: string, value: any) => {
    const prefixedKey = APP_PREFIX + determinePrefix(type) + key;
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(prefixedKey, jsonValue);

};

export const getDataAsync = async (type: StorageType, key: string) => {
    const prefixedKey = APP_PREFIX + determinePrefix(type);

    const jsonValue = await AsyncStorage.getItem(prefixedKey + key);
    if (jsonValue !== null) {
        return JSON.parse(jsonValue);
    }
};


export const deleteDataAsync = async (type: StorageType, keys: string[]) => {
    const prefixedKeys = keys.map(key => APP_PREFIX + determinePrefix(type) + key);
    if (type === 'normal') {
        await AsyncStorage.multiRemove(prefixedKeys);
    } else if (type === 'all'){
        await AsyncStorage.clear();
    }
};
