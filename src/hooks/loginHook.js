import axios from 'axios';
import { useState } from 'react';
import userService from '../services/userService';
import ht from '../services/httpService';
import { Settings, Defaults } from 'utils';

function useLogin(_username, _password, _otp) {
    const [username, setRawUsername] = useState(_username);
    const [password, setPassword] = useState(_password);
    const [otp, setOtp] = useState(_otp);
    const [remembers, setRemembers] = useState(true);
    const [loading, setLoading] = useState(false);

    const login = (successHandler) => {
        let loginObj = new FormData();

        loginObj.append("username", 'levani1308@gmail.com');
        loginObj.append("password", 'Lo123123!a');
        if (otp) {
            loginObj.append("otp", _otp);
        }
        loginObj.append("scope", "Wallet_Api.Full offline_access");
        loginObj.append("client_id", "WalletApi");
        loginObj.append("client_secret", "abcd123");
        loginObj.append("grant_type", "password");
        setLoading(true)

        axios.post('/connect/token', loginObj).then(response => {
             console.log('********************login request*********************', response)
            if (response && response.access_token) {
                if (response?.requireOtp) {
                    //show otp confirmation
                } else {
                    const token = response.access_token
                    if (token) {
                        Settings.setAccessToken(token);
                        Defaults.token = token;
                        userService.getUserDetail().then(response => {
                            console.log(response)
                            Settings.setCurrentUser(response.username);
                            Defaults.currentUsername = response.username;
                            //successHandler();
                        }).catch((err) => {
                            setLoading(false);
                        });
                    }
                }
            }
            setLoading(false);
        }).catch((err) => {
            //console.log(JSON.parse(JSON.stringify(err)));
            setLoading(false);
        })

    }

    const setUsername = (text) => {
        setRawUsername(text.trim())
    }

    return { username, setUsername, password, setPassword, remembers, setRemembers, login, loading };
}

export default useLogin
