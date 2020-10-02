import {useState} from 'react';
import {httpService} from 'services';

function useForgotPassword() {

    const [username, setUsername] = useState('')
    const [pin, setPin] = useState('')
    const [tfa, setTfa] = useState(0)
    const [loading, setLoading] = useState(false);
    const [loadingMail, setLoadingMail] = useState(false);
    const [customerIsRegistered, setCustomerIsRegistered] = useState(false);
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [mask, setMask] = useState('');
    const [emailIsVerified, setEmailIsVerified] = useState(false);
    const [phoneIsVerified, setPhoneIsVerified] = useState(false);
    const [recoveryMode, setRecoveryMode] = useState('phone');
    const [otpToken, setOtpToken] = useState('');

    const checkUser = (completion) => {
        setLoading(true)
        httpService.post('/User/CheckUser', {username: username}).then((data) => {
            if (data.error == null) {
                setCustomerIsRegistered(data.data.customerIsRegistered)
                setEmailIsVerified(data.data.emailIsVerified)
                setPhoneIsVerified(data.data.phoneIsVerified)
            }
            completion(data.data)
        }).finally(() => setLoading(false))
    };

    const verifyPin = (completion) => {
        setLoading(true)
        httpService.post('/User/CheckUserPersonalId', {username: username, personalId: pin}).then((data) => {

            if (data.error == null) {
                setEmailIsVerified(data.data.emailIsVerified)
                setPhoneIsVerified(data.data.phoneIsVerified)
            }

            completion(data.data)
        }).finally(() => setLoading(false))
    };

    const generateOtp = (completion, otpOperationType, customUsr) => {
        let urlSuffix = '/User/GeneratePhoneOtpByUser'
        if (recoveryMode === 'email') {
            setLoadingMail(true)
            urlSuffix = '/User/GenerateMailOtpByUser'
        } else {
            setLoading(true)
        }

        let obj = { userName: username}

        if (customUsr && customUsr.length > 0) {
            obj = { userName: customUsr}
        }

        if (otpOperationType) {
            obj.otpOperationType = otpOperationType
        }

        httpService.post(urlSuffix, obj).then((data) => {
            if (data.error == null) {
                console.log("USER MASK - ", data.data.phoneMask)
                setMask(data.data.phoneMask)
            }
            completion(data.data)
        }).finally(() => {
            setLoading(false)
            setLoadingMail(false)
        })
    }

    const submitOtp = (completion) => {
        setLoading(true)

        let urlSuffix = '/User/SubmitPhoneOtpByUser'
        if (recoveryMode === 'email') {
            urlSuffix = '/User/SubmitMailOtpByUser'
        }
        httpService.post(urlSuffix, {username: username, otp: otp}).then((data) => {
            setOtpToken(data.data.otpToken)
            completion(data.data)
        }).finally(() => setLoading(false))
    }

    const submit = (completion) => {

        const params = {
            userName: username,
            personalId: pin,
            otpToken : otpToken,
            password: password,
            confirmPassword: repeatPassword,
            otpSource: recoveryMode
        }
        httpService.post('/User/ResetPassword', params).then((data) => {
            completion(data.result)
        }).finally(() => setLoading(false))
    };

    const changePassword = (oldPassword, password, confirmPassword, completion) => {
        const params = {
            oldPassword: oldPassword,
            password: password,
            confirmPassword: confirmPassword,
            otp: otp
        }
        httpService.post('/User/ChangeUserPassword', params).then((data) => {
            completion(data.ok)
        }).finally(() => setLoading(false))
    }

    const changeAuthStatus = (isOn, completion) => {
        const params = {
            status: isOn ? 1 : 0,
            otp: otp
        }
        httpService.post('/User/ChangeOtpAuthorizationStatus', params).then((data) => {
            console.log(data)
            completion(data.ok)
        }).finally(() => setLoading(false))
    }

    return {
        checkUser,
        verifyPin,
        generateOtp,
        submitOtp,
        changePassword,
        submit,
        changeAuthStatus,
        username,
        setUsername,
        pin,
        setPin,
        password,
        setPassword,
        repeatPassword,
        setRepeatPassword,
        otp,
        setOtp,
        customerIsRegistered,
        emailIsVerified,
        phoneIsVerified,
        recoveryMode,
        setRecoveryMode,
        mask,
        loading,
        loadingMail,
        tfa
    };
}

export default useForgotPassword
