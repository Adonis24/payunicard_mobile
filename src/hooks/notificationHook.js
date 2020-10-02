import { useState, useEffect } from 'react';
import {httpService} from "services";

export default function notificationHook() {

    useEffect(() =>{
        getNotifications()
    },[])

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0);

    const getNotifications = () => {
        setLoading(true)
        httpService.get('/User/GetUserNotifications').then((response) => {
            if (response.ok) {
                setNotifications(response.data.notifications)
                setNotificationCount(response.data.notifications.filter(val => val.isRead === false).length);
            }
        }).finally(() => setLoading(false))
    };

    return {
        notificationCount,
        notifications,
        loading
    }

}