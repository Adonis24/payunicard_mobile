import axios from 'axios';
import {Defaults, isAndroid, Settings, showErrorWithMessage} from 'utils';
import Constants from 'expo-constants';
import Config from '../../config';

class AuthServices {

    
    registerAuthInterceptor() {
        const setAuthToken = (config) => {
            config.headers = config.headers || {};
            let headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Accept": "application/json",
                'device': 'APN UUID',
                'appSource': 'Mobile',
                'os': isAndroid() ? 'Android' : 'iOS',
                'osVersion': isAndroid() ? Constants.platform.android.versionCode : Constants.platform.ios.systemVersion, //TODO: Sandrik - Handle Android
                'deviceCurrentTime': (new Date).getTime(),
                'langCode': Defaults.locale === 'ka' ? 'ka-GE' : 'en-US',
                'appVersion': Constants.nativeAppVersion,
                'deviceTimeZone': 'timezone' //Localization.timezone
            };
            config.headers = {...config.headers, ...headers}
           // config.url = Config.API_URL_TEST + config.url.replace(Config.AUTH_URL_TEST, '');
            if (Defaults.token) {
                config.headers['Authorization'] = `Bearer ${Defaults.token}`;
            }
        }

        const waitForRefresh = (config) => {
            return new Promise((resolve) => {
                let interval = setInterval(() => {
                    if (this.refreshStarted) return;

                    clearInterval(interval);
                    resolve(config);
                }, 500);
            });
        }

        //add auth header
        let requestInterceptor = axios.interceptors.request.use((config) => {
            if (Defaults.token) {
                setAuthToken(config);
            }
             console.log('********************auth interceptor request*********************', config.headers)
            return config;
        });

        // if unauthorized refetch
        let responseInterceptor = axios.interceptors.response.use(
            response => response,
            error => {
                console.log('********************auth interceptor error*********************',error)
                error.response = error.response || {};

                // Reject promise if usual error
                if (error.response.status !== 401) {
                    return Promise.reject(error);
                }
                const originalRequest = error.config;
                //if refresh already started wait and retry with new token
                if (this.refreshStarted) {
                    return waitForRefresh().then(_ => {
                        if (!this.getToken()) return Promise.reject({ status: 401 });
                        setAuthToken(originalRequest);
                        return axios(originalRequest);
                    });
                }

                // //refresh token
                // this.refreshStarted = true;
                // return axios.get(`${globalConfig.api_URL}/authentication/refreshAccessToken `, { anonymous: true, headers: { "refresh_token": this.getRefreshToken() } }).then(response => {
                //     if (!response.data.success || !response.data.data.access_token) throw response;
                //     this.setToken(response.data.data.access_token, response.data.data.refresh_token);
                //     this.refreshStarted = false;

                //     setAuthToken(originalRequest);
                //     return axios(originalRequest);
                // }).catch(err => {
                //     this.signOut(false);
                //     this.refreshStarted = false;

                //     //redirect to login
                //     routingService.push(defaults.notAuthRoute);
                //     return Promise.reject(err);
                // });
            });

        return {
            unsubscribe: () => {
                axios.interceptors.request.eject(requestInterceptor);
                axios.interceptors.response.eject(responseInterceptor);
            }
        };
    }

}

export default new AuthServices();