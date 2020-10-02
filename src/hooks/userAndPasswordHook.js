import { useState } from 'react';
import { httpService } from 'services';
import { Defaults } from 'utils';

function useUserAndPassword(_username) {
    const [username, setUsername] = useState(_username);
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const sendData = (successHandler) => {

        if(oldPassword === "" || password === "" || password !== confirmPassword || password <=6){
            alert("error")
            return
        }

        alert("success");

        const obj = { username: username, password: password, oldPassword : oldPassword, }


        // setLoading(true)
        // httpService.post('/User/Authorization', obj).then((data) => {
        //     if (data.result) {
        //         console.log('Result: ', data.result)
        //         Defaults.token = data.data.token.accessToken
        //         successHandler()
        //     } else {
        //         console.log('Auth failed')
        //     }
        // }).finally(() => setLoading(false))
    }
    return { username, setUsername, oldPassword,setOldPassword,password, setPassword,confirmPassword, setConfirmPassword,sendData, loading };
}

export default useUserAndPassword;
