import {httpService} from 'services';
import {useState} from 'react';
import String from "utils/string";

function usePayments() {

    //wss://api.unicard.ge/WebSocket/WebSocket.ashx?id=

    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [merchants, setMerchants] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [items, setItems] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [merchantParams, setMerchantParams] = useState([]);
    const [paymentDetails, setPaymentDetails] = useState(null);
    const [debtResponse, setDebtResponse] = useState([]);
    const [paymentResponse, setPaymentResponse] = useState(null);
    const [abonentCode, setAbonentCode] = useState(null);

    const fetchCategories = (parentID = 0) => {
        setLoading(true)
        httpService.get('/GetCategories?ParentID=' + parentID).then(response => {
            if (response.ok) {
                const result = response.data.categories
                setCategories(result)
                const _items = []
                for (let i = 0; i < result.length; i++) {
                    const current = result[i];
                    if (((current.categoryID == parentID && !current.isService) && (current.parentID == 0 && current.isService)) || (current.parentID = parentID && current.isParent && current.hasChildren)) {
                        continue
                    }
                    const item = {
                        key: current.id + "_" + String.randomStr() + "_" + current.categoryID,
                        id: current.categoryID,
                        name: current.name,
                        isCategory: true,
                        imageUrl: current.imageUrl,
                        hasChildren: current.hasChildren,
                        parentID: parentID,
                        isService: current.isService ?? false,
                        isParent: current.isParent//TODO: this should be used in detail page in order to remove the same category from the list
                    };
                    _items.push(item)
                    setItems(_items)
                    console.log(_items)
                }
            }
        }).finally(() => setLoading(false))
    };

    const fetchTemplates = () => {
        setTemplates([
            {
                id: 1,
                name: 'Telasi',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Telasi_logo.png'
            },
            {
                id: 2,
                name: 'Yaztransgaz',
                imageUrl: 'https://te.ge/uploads/1_yvavili_1.png'
            },
            {
                id: 3,
                name: 'CleanUp',
                imageUrl: 'https://mm.ge/image2.php?id=26&size=300'
            },
            {
                id: 4,
                name: 'GWP',
                imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEoQxlRZbVbqsQDrPcFFLrp4fLQBqhVghfwHINoSGerthIZZRp&s'
            },
            {
                id: 5,
                name: 'Adjarabet',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/ka/a/a1/Adjarabet.jpg'
            },
            {
                id: 6,
                name: 'Usa2Georgia',
                imageUrl: 'https://media.licdn.com/dms/image/C4D0BAQFH18UVPrKKog/company-logo_200_200/0?e=2159024400&v=beta&t=2nvR55IWisCEWc6PZd4FHcGpAJ8vMdeSc240dSldkFk'
            },
            {
                id: 7,
                name: 'BOG',
                imageUrl: 'https://media.licdn.com/dms/image/C4D0BAQHQJtyDlx7Jcg/company-logo_200_200/0?e=2159024400&v=beta&t=o0YpB1_KGfUFgrk4jBFWOgfitD5Ezh7JkulJtp1MTlE'
            }
        ])
    };

    const fetchMerchantServices = (categoryID = 0) => {
        setLoading(true)
        httpService.get('/GetMerchantServices?CategoryID=' + categoryID).then(response => {
            if (response.ok) {
                const result = response.data.merchants
                setMerchants(result)
                const _items = []
                for (let i = 0; i < result.length; i++) {
                    const item = {
                        id: result[i].merchantServiceID,
                        name: result[i].name,
                        isCategory: false,
                        imageUrl: result[i].merchantServiceURL,
                        hasChildren: false,
                        merchantCode: result[i].merchantCode,
                        merchantServiceCode: result[i].merchantServiceCode,
                        merchantServiceID: result[i].merchantServiceID,
                        value: ''
                    }
                    _items.push(item)
                    setItems(_items)
                }
            }
        }).finally(() => setLoading(false))
    }

    const fetchMerchantParams = (merchantCode, merchantServiceCode) => {
        setLoading(true)
        httpService.get('/GetMerchantParams?MerchantCode=' + merchantCode + '&MerchantServiceCode=' + merchantServiceCode).then(response => {
            if (response.ok) {
                const result = response.data.params
                setMerchantParams(result)
            }
        }).finally(() => setLoading(false))
    }

    const fetchPaymentDetails = (merchantCode, merchantServiceCode) => {
        setLoading(true)
        httpService.get('/GetPaymentDetails?ForMerchantCode=' + merchantCode + '&ForMerchantServiceCode=' + merchantServiceCode).then(response => {
            if (response.ok) {
                const result = response.data
                setPaymentDetails(result)
            }
        }).finally(() => setLoading(false))
    }

    const checkDebt = (code) => {
        setLoading(true)
        if (paymentDetails) {
            setAbonentCode(code)
            const body = {
                serviceId: paymentDetails.debtCode,
                abonentCode: code,
                forPaySPCode: paymentDetails.forPaySPCode,
                forMerchantCode: paymentDetails.forMerchantCode,
                forMerchantServiceCode: paymentDetails.forMerchantServiceCode
            };

            //console.log('executing check debt with body: ', body)
            httpService.post('/Transaction/checkdept', body).then(response => {
                if (response.ok) {
                    const result = response.data.structures
                    setDebtResponse(result)
                }
            }).finally(() => setLoading(false))
        } else {
            //console.log('Failed to fetch payment details for body: ', body)
            setAbonentCode(null)
        }
    };

    const getdeptstructure = (completion) => {
        setLoading(true)
        if (paymentDetails) {
            const body = {
                serviceId: paymentDetails.debtCode,
                forPaySPCode: paymentDetails.forPaySPCode,
                forMerchantCode: paymentDetails.forMerchantCode,
                forMerchantServiceCode: paymentDetails.forMerchantServiceCode
            };

            httpService.post('/Transaction/getdeptstructure', body).then(response => {
                if (response.ok) {
                    completion(response.data.structures && response.data.structures.length > 0)
                } else {
                    completion(false)
                }
            }).finally(() => setLoading(false))
        } else {
            completion(false)
        }
    };

    const pay = (amount, abonentCode, merchantCode, merchantServiceCode, debtCode, bankId, accountId, forFundsSPCode, completion) => {
        setLoading(true)
        const body = {
            forMerchantCode: merchantCode,
            forMerchantServiceCode: merchantServiceCode,
            amount: 3,
            abonentCode: abonentCode,
            forPaySPCode: "UCC",

            bankId: bankId,
            accountId: accountId,//195 = wallet

            forFundsSPCode: forFundsSPCode,
            serviceId: debtCode
        };

        let data = null;

        //console.log('executing payment with body: ', body)
        httpService.post('/Transaction/registerpaytransaction', body).then(response => {
            //console.log('payment log: ', response)
            if (response.ok) {
                setPaymentResponse(response.data)
                data = response.data;
            }
        }).finally(() => {
            setLoading(false)
            completion(data)
        })
    };

    return {
        loading,
        items,
        fetchCategories,
        fetchMerchantServices,
        selectedItem,
        setSelectedItem,
        fetchTemplates,
        templates,
        fetchMerchantParams,
        merchantParams,
        fetchPaymentDetails,
        paymentDetails,
        checkDebt,
        debtResponse,
        paymentResponse,
        pay,
        abonentCode,
        getdeptstructure
    };
}

export default usePayments
