import axios from 'axios';
import {Defaults, isAndroid, Settings, showErrorWithMessage} from 'utils';
import Constants from 'expo-constants';


class CommonService {

    getErrorText(error) {
        if (error.displayText !== null && error.displayText.length > 0) { return error.displayText }
        if (error.message !== null && error.message.length > 0) { return error.message }
        return 'Exception occurred'
    }

    _handleIntErrorIfNeeded(uri, response) {

        let message = '';
        if (response.displayText) {
            message = this.getErrorText(response)
        } else if (response.errors && response.errors.length > 0) {
            const list = response.errors;
            for (let i = 0; i < list.length; i++) {
                const obj = list[i];
                const msg = obj.displayText !== null ? obj.displayText : obj.errorMessage;
                message += (msg && msg.length > 0 ? msg : 'Unknown') + '\n'
            }
        } else if (response.data && response.data.errors && response.data.errors.length > 0) {
            const list = response.data.errors;
            for (let i = 0; i < list.length; i++) {
                const obj = list[i];
                const msg = obj.displayText !== null ? obj.displayText : obj.errorMessage;
                message += (msg && msg.length > 0 ? msg : 'Unknown') + '\n'
            }
        }

        if (message.length > 0) {

            message += '\n' + uri

            showErrorWithMessage(message);
        }
    }

    registerInterceptor = () => {
        let requestInterceptor = axios.interceptors.request.use(config => {
            config.headers = config.headers || {};
            let headers = {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'device': 'APN UUID',
                'appSource': 'Mobile',
                'os': isAndroid() ? 'Android' : 'iOS',
                'osVersion': isAndroid() ? Constants.platform.android.versionCode : Constants.platform.ios.systemVersion, //TODO: Sandrik - Handle Android
                'deviceCurrentTime': (new Date).getTime(),
                'langCode': Defaults.locale === 'ka' ? 'ka-GE' : 'en-US',
                'appVersion': Constants.nativeAppVersion,
                'deviceTimeZone': 'timezone' //Localization.timezone
            };
            // config.headers = {...config.headers, ...headers}
            console.log('********************common interceptor request*********************', config)
            return config;
        });

        let responseInterceptor = axios.interceptors.response.use(response => {
            console.log('********************common interceptor*********************',response)
            let data = response.data || {};
            if (data.errors) {
                response.displayText = data.errors || "validation.error";
                response.customError = true;
                return Promise.reject(response);
            }
            return Promise.resolve(data);
        },
            error => {
                console.log('********************common interceptor error*********************',JSON.stringify(error))
                
                if (navigator && !navigator.onLine) {
                    console.log("No internet connection");
                    error.displayText = "No internet connection";
                }
                else error.displayText = "error";
                this._handleIntErrorIfNeeded('uri', error)
                return Promise.reject(error);
            }
        );

        return {
            unsubscribe: () => {
                axios.interceptors.request.eject(requestInterceptor);
                axios.interceptors.response.eject(responseInterceptor);
            }
        };
    }
}

export default new CommonService();