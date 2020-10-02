// import {API_URL} from 'react-native-dotenv';
import {Defaults, isAndroid, Settings, showErrorWithMessage} from 'utils';
import axios from 'axios';
import Constants from 'expo-constants'

class httpService {

    headers(contentType = 'application/json') {
        API_URL = 'https://test.payunicard.ge:2680';
        let headers = {
            'Content-Type': contentType,
            'device': 'APN UUID',
            'appSource': 'Mobile',
            'os': isAndroid() ? 'Android' : 'iOS',
            'osVersion': isAndroid() ? Constants.platform.android.versionCode : Constants.platform.ios.systemVersion, //TODO: Sandrik - Handle Android
            'deviceCurrentTime': (new Date).getTime(),
            'langCode': Defaults.locale === 'ka' ? 'ka-GE' : 'en-US',
            'appVersion': Constants.nativeAppVersion,
            'deviceTimeZone': 'timezone' //Localization.timezone
        };

        if (Defaults.token && Defaults.token.length > 5) {
            headers.Authorization = `Bearer ${Defaults.token}`;
        }

        return headers
    }

    get(uri) {
        return this._fetch(uri, null, 'get');
    }

    post(uri, payload) {
        return this._fetch(uri, payload, 'post');
    }

    upload(data) {
        return fetch(API_URL + '/Files/UploadImage', {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json',
            }
        })
    }

    delete(uri, payload) {
        return this._fetch(uri, payload, 'delete');
    }

    patch(uri, payload) {
        return this._fetch(uri, payload, 'patch');
    }

    put(uri, payload) {
        return this._fetch(uri, payload, 'put');
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

    getErrorText(error) {
        if (error.displayText !== null && error.displayText.length > 0) { return error.displayText }
        if (error.message !== null && error.message.length > 0) { return error.message }
        return 'Exception occurred'
    }

    _fetch(uri, data, method, otherHeaders) {
        return new Promise((resolve, reject) => {
            const headers = this.headers();
            if (otherHeaders) {
                Object.keys(otherHeaders).forEach(function (key) {
                    headers[key] = otherHeaders[key]
                });
            }
            const url = API_URL + uri;
console.log('apiuriuriuriuriuriuriuriuriuriuriuriuriuriuriuriuriuriuriuriuriuriuriuriuriuriuriuri', uri)
            //this.logRequest(method, url, headers, data);

            axios({method, url, headers, data}).then(response => {

                //console.log("response status = ", response.status)
                //this.logResponse(method, url, headers, data, this.JSONSyntaxHighlight(response), response.status);

                if (response.status == 401) {
                    Settings.removeToken()
                    Defaults.navigation.navigate('login')
                    return
                }

                if (uri.indexOf('/User/Authorization') > -1 && response.data.data){
                    resolve(response.data.data)
                } else if (response.data.ok) {
                    resolve(response.data)
                } else {
                    this._handleIntErrorIfNeeded(uri, response.data)
                    reject(response.data);
                }

            }).catch(error => {
                //console.log('Error has been generated for ', url, error)
                if (error && error.response && error.response.status == 401) {
                    Settings.removeToken()
                    Defaults.navigation.navigate('login')
                }
                showErrorWithMessage(error.toString() + '\n' + uri);
                this._handleIntErrorIfNeeded(uri, error)
                reject(error);
            });
        });
    }


    static getParams(payload, request) {
        return payload ? '\n' + (request ? '>>>>>' : '<<<<<') + ' Body Param: ' + JSON.stringify(payload, null, 2) : '';
    }

    logRequest(method, url, headers, payload = '') {
        console.log('REQUEST SENT FROM MOBILE >>>>>>>>>>>>>>>>\n' +
            '>>>>> Headers: ' + this.JSONSyntaxHighlight(headers) + '\n' +
            '>>>>> ' + method + ' ' + url +
            httpService.getParams(payload, true) + '\n' +
            '>>>>>>>>>>>>>>>>');
    }

    logResponse(method, url, headers, payload = '', response) {
        console.log(
            'RESPONSE RECEIVED FROM MOBILE <<<<<<<<<<<<<<<<\n' +
            '<<<<< Headers: ' + this.JSONSyntaxHighlight(headers) + '\n' +
            '<<<<< ' + method + ' ' + url +
            // '\n' +
            // '<<<<< Status Code: ' + status +
            httpService.getParams(payload, false) + '\n' +
            '<<<<< ' + response + '\n' +
            '<<<<<<<<<<<<<<<<');
    }

    JSONSyntaxHighlight = (json) => {
        return JSON.stringify(json, undefined, 2);

        /*if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });*/
    }
}

export default new httpService();
