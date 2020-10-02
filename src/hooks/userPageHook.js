import {useEffect, useState} from "react";
import String from "utils/string";
import {httpService} from "services";
import * as ImageManipulator from "expo-image-manipulator";

function userPageHook() {

    const [loading, setLoading] = useState(false);

    useEffect(() => {

    }, []);

    const updateUserImageUrl = (url) => {
        setLoading(true)
        let obj = {imageUrl: url}
        httpService.post('/User/UpdateUserProfileImage', obj).then((response) => {
        }).finally(() => setLoading(false))
    }

    const getUploadPromise = async (imageData) => {

        const data = await ImageManipulator.manipulateAsync(imageData.uri, [], {format: 'jpeg', compress: 0.1, base64: true})

        return new Promise(function(resolve, reject) {

            let obj = {
                type: "3",
                fileName: String.randomStr() + ".jpg",
                image: (data ? data.base64 : '')
            };
            httpService.post('/Files/UploadImage', obj).then(response => {
                if (response.ok && response.data.imageUrl) {
                    updateUserImageUrl(response.data.imageUrl)
                    resolve(response)
                } else {
                    reject(response)
                }
            }).catch(err => {
                reject(err)
            })
        });
    };

    return {
        getUploadPromise,
        loading
    };
}
export default userPageHook;
