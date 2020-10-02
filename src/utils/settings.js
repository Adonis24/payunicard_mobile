import { AsyncStorage } from 'react-native';

const LOCALE = 'LOCALE';
const ONBOARDING = 'ONBOARDING';
const TOKEN = 'TOKEN';
const CURRENT_USER = 'CURRENT_USER';
const USER_IMAGE_URL = 'USER_IMAGE_URL';

const getLocale = () => {
    return AsyncStorage.getItem(LOCALE);
}

const setLocale = (locale) => {
    AsyncStorage.setItem(LOCALE, locale);
}

const onboardingWasShown = () => {
    return AsyncStorage.getItem(ONBOARDING)
}

const setOnboardingWasShown = (shown) => {
    AsyncStorage.setItem(ONBOARDING, shown.toString());
}

const setAccessToken = (token) => {
    AsyncStorage.setItem(TOKEN, token);
}

const setCurrentUser = (user) => {
    AsyncStorage.setItem(CURRENT_USER, user);
}

const currentUser = () => {
    AsyncStorage.getItem(CURRENT_USER);
}

const setCurrentUserImageUrl = (user) => {
    AsyncStorage.setItem(USER_IMAGE_URL, user);
}

const currentUserImageUrl = () => {
    return AsyncStorage.getItem(USER_IMAGE_URL);
}

const removeToken = () => {
    AsyncStorage.removeItem(TOKEN);
}

const token = () => {
    return AsyncStorage.getItem(TOKEN)
}

export {
    getLocale,
    setLocale,
    onboardingWasShown,
    setOnboardingWasShown,
    token,
    setAccessToken,
    removeToken,
    currentUser,
    setCurrentUser,
    setCurrentUserImageUrl,
    currentUserImageUrl
}
