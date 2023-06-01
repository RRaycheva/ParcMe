import AsyncStorage from '@react-native-async-storage/async-storage';

export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/;
  if (!email) {
    return "Email can't be empty.";
  }
  if (!re.test(email)) {
    return 'Ooops! We need a valid email address.';
  }
  return '';
}

export function nameValidator(name) {
  if (!name) {
    return "Name can't be empty.";
  }
  return '';
}

export function passwordValidator(password) {
  if (!password) {
    return "Password can't be empty.";
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters long.';
  }
  return '';
}

export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};
export const getData = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

export const clearData = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
};
