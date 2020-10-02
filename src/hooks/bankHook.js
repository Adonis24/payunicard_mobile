import {httpService} from 'services';
import {useState, useEffect} from 'react';

function useBanks() {

    const [banks, setBanks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newCardResult, setNewCardResult] = useState(null);

    useEffect(() => {
        loadBanks()
    }, []);

    const loadBanks = () => {
        setLoading(true)
        httpService.get('/GetBankDictionary').then((response) => {
            if (response.ok) {
                setBanks(response.data.banks)
            }
        }).finally(() => setLoading(false))
    };

    const registerRecurringTransaction = (bankId, forFundsSPCode, completion) => {
        setLoading(true)
        httpService.post('/User/RegisterRecurringTransaction', {
            bankId: bankId,
            forFundsSPCode: forFundsSPCode
        }).then((response) => {
            if (response.ok) {
                console.log(response)
                setNewCardResult(response.data)
                completion(response.data)
            }
        }).finally(() => setLoading(false))
    };

    return {
        banks,
        setBanks,
        loading,
        setLoading,
        newCardResult,
        registerRecurringTransaction
    };
}

export default useBanks
