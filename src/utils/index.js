import Defaults from './defaults';
import Consts from './consts';
import * as Settings from './settings';
import { Platform } from 'react-native';

const showErrorToast = (error) => {
    Defaults.showErrorWithErrorObject(error)
}

const showErrorWithMessage =(message) => {
    if (message && message.length > 0) {
       Defaults.showErrorWithMessage(message)
    } else {
        Defaults.showErrorWithMessage('Generic error')
    }
}

const showSuccessWithMessage =(message) => {
    Defaults.showSuccessWithMessage(message)
}

const isAndroid = () => {
    return Platform.OS === 'android';
}

export {
    Defaults,
    Consts,
    Settings,
    showErrorToast,
    showErrorWithMessage,
    showSuccessWithMessage,
    isAndroid
}
