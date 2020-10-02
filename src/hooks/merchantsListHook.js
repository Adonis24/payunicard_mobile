import { httpService } from 'services';
import { useState, useEffect } from 'react';

function useMerchantsList() {

    const [selectedItem, setSelectedItem] = useState(null);
    const [merchants, setMerchants] = useState([]);
    
    useEffect(() => {
        fetchMerchants()
    }, [])

    const fetchMerchants = () => {
        httpService.get('/User/GetLoyaltyMerchantList', {}).then((response) => {
            if (response.data) {
                setMerchants(response.data.loyaltyMerchants)
            }
        })
    };

    return {
        merchants,
        selectedItem, 
        setSelectedItem
    };
}

export default useMerchantsList