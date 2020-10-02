import { useState, useEffect } from 'react';
import {httpService} from "services";

export default function notificationSettingsHook() {

    useEffect(() =>{
        getNotificationSettings()
    },[])

    const [notificationStatuses, setNotificationStatuses] = useState([]);
    const [loading, setLoading] = useState(false);

    const getNotificationSettings = () => {
        setLoading(true)
        httpService.get('/User/GetUserNotificationStatuses').then((response) => {
            console.log(response)
            if (response.ok) {
                setNotificationStatuses(response.data.notificationStatuses)
            }
        }).finally(() => setLoading(false))
    };

    const updateNotificationStatuses = (id, state) => {
        setLoading(true)
        httpService.post('/User/EditUserNotificationEnabledStatus', {
            notificationTypeId: id,
            isActive: state
        }).then((response) => {

        }).finally(() => setLoading(false))
    }

    return {
        notificationStatuses,
        setNotificationStatuses,
        updateNotificationStatuses,
        loading
    }

}
