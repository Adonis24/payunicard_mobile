import {useState} from 'react';
import {httpService} from 'services';
import {Defaults, Settings} from 'utils';
import t from "strings";

function useRegister() {

    const [username, setUsername] = useState('')
    const [countryCode, setCountryCode] = useState('995')
    const [countryKey, setCountryKey] = useState('GE')
    const [country, setCountry] = useState(t('common.georgia'))
    const [phoneNumber, setPhoneNumber] = useState('')
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [lastStepPassword, setLastStepPassword] = useState('');
    const [lastStepRepeatPassword, setLastStepRepeatPassword] = useState('');

    const [highlightsValidations, setHighlightsValidations] = useState(false);

    const register = (completion) => {
        const fullNumber = countryCode + phoneNumber;
        setLoading(true)
        httpService.post('/OTP/SendPhoneOTP', {phone: fullNumber, otpOperationType: 0}).then((response) => {
            completion(response.ok === true)
        }).finally(() => setLoading(false))
    };

    const verifyOtp = (completion) => {

        const fullNumber = countryCode + phoneNumber;

        httpService.post('/OTP/SubmitPhoneOTP', {phone: fullNumber, otp: otp}).then((response) => {
            completion(response.ok === true)
            if (response.data) { Defaults.otpToken = response.data.otpGuid }
        })
    };

    const submitRegistration = (completion) => {

        const fullNumber = countryCode + phoneNumber;

        if (email && email !== "" &&
            lastStepPassword && lastStepPassword !== "" &&
            lastStepPassword === lastStepRepeatPassword && fullNumber && fullNumber !== "") {

            setLoading(true)

            httpService.post('/User/UserPreRegistration', {
                username: email,
                password: lastStepPassword,
                confirmPassword: lastStepRepeatPassword,
                phone: fullNumber,
                otpGuid: Defaults.otpToken,
                isApplyTerms: 'Terms'

            }).then((response) => {
                if (response.ok === true) {
                    login((ok)=> {
                        completion(ok)
                    })
                } else {
                    completion(true)
                }
            }).catch(
                () => { completion(false) }
            ).finally(() => {
                setLoading(false)
            })

        } else {
            completion(false)
        }
    };

    const login = (handler) => {

        let loginObj = new FormData();

        loginObj.append("username", email);
        loginObj.append("password", lastStepPassword);

        loginObj.append("grant_type", " password");
        loginObj.append("client_id", "clientId");
        loginObj.append("client_secret", "clientSecret");

        setLoading(true)

        httpService._fetch('/User/Authorization', loginObj, 'POST', {'Content-Type' : 'multipart/form-data'}).then((data) => {
            if (data && data.ok) {
                const token = data.access_token
                if (token) {
                    Settings.setAccessToken(token)
                    Settings.setCurrentUser(username)
                    //console.log('/User/Authorization name is ' + username)
                    Defaults.currentUsername = username
                    Defaults.token = token
                    handler(true)
                    return
                }
            }
            handler(false)
        }).finally(() => setLoading(false))
    }

    return {
        register,
        username,
        setUsername,
        countryCode,
        setCountryCode,
        phoneNumber,
        setPhoneNumber,
        countryKey,
        setCountryKey,
        country,
        setCountry,
        otp,
        setOtp,
        verifyOtp,
        submitRegistration,
        loading,
        email,
        setEmail,
        lastStepPassword,
        setLastStepPassword,
        lastStepRepeatPassword,
        setLastStepRepeatPassword,
        highlightsValidations,
        setHighlightsValidations
    };
}

export default useRegister
