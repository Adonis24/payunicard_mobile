import axios from 'axios';
import { useState } from 'react';
import userService from '../services/userService';
import ht from '../services/httpService';
import { Settings, Defaults } from 'utils';
// import {API_URL} from 'react-native-dotenv'

function useLogin(_username, _password, _otp) {
    const [username, setRawUsername] = useState(_username);
    const [password, setPassword] = useState(_password);
    const [otp, setOtp] = useState(_otp);
    const [remembers, setRemembers] = useState(true);
    const [loading, setLoading] = useState(false);

    const login = (successHandler) => {
        const API_URL = 'https://testidentity.payunicard.ge:444';
        let loginObj = new FormData();

        loginObj.append("username", 'gigo@gigoi.com');
        loginObj.append("password", 'Gi123123!');
        if (otp) {
            loginObj.append("otp", _otp);
        }
        loginObj.append("IsRemember", remembers);
        loginObj.append("scope", " Wallet_Api.Full");
        loginObj.append("client_id", "WalletApi");
        loginObj.append("client_secret", "abcd123");
        loginObj.append("grant_type", "password");
        setLoading(true)
        // ht._fetch(API_URL + '/connect/token', loginObj, 'post').then(response => { 
        //     console.log('********************login request*********************', response)
        // }).catch(err=> {
        //     console.log('********************login error*********************', err, loginObj)
        // })
        axios.post(API_URL + '/connect/token', loginObj).then(response => {
            console.log('********************login request*********************', response)
            if (response && response.access_token) {
                if (response?.requireOtp) {
                    //show otp confirmation
                } else {
                    const token = response.access_token
                    if (token) {
                        Settings.setAccessToken(token);
                        Defaults.token = token;
                        axios.defaults.headers.Authorization = `Bearer ${token}`;
                        userService.getUserDetail().then(response => {
                            console.log(response)
                            Settings.setCurrentUser(response.username);
                            Defaults.currentUsername = response.username;
                            setLoading(false);
                            //successHandler();
                        }).catch((err) => {
                            setLoading(false);
                        });
                    }
                }
            }
        }).catch((err) => {
            console.log('********************login error*********************', err, loginObj)
            setLoading(false);
        })

    }

    const setUsername = (text) => {
        setRawUsername(text.trim())
    }

    return { username, setUsername, password, setPassword, remembers, setRemembers, login, loading };
}

export default useLogin
