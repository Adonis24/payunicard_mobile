import {useState} from 'react';

function useTransfers() {

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

    const fetchTransferTypes = () => {

        const items = [
            {
                id: 1,
                name: 'transfers.internal',
                image: require("../../assets/transfers/transfer-internal.png")
            },
            {
                id: 2,
                name: 'transfers.external',
                image: require("../../assets/transfers/transfer-external.png")
            },
            {
                id: 3,
                name: 'transfers.iban',
                image: require("../../assets/transfers/transfer-iban.png")
            },
            {
                id: 4,
                name: 'transfers.paypal',
                image: require("../../assets/transfers/transfer-paypal.png")
            },
            {
                id: 5,
                name: 'transfers.crypto',
                image: require("../../assets/transfers/transfer-crypto.png")
            },

        ]
        setItems(items)
    };

    const fetchTemplates = () => {
        setTemplates([
            {
                id: 1,
                name: 'Zinedine',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Zinedine_Zidane_by_Tasnim_03.jpg'
            },
            {
                id: 2,
                name: 'Leo',
                imageUrl: 'https://pbs.twimg.com/profile_images/3577703021/498a60681bea3b182f9ac73b8070b3ce.jpeg'
            },
            {
                id: 3,
                name: 'Cristiano',
                imageUrl: 'https://specials-images.forbesimg.com/imageserve/5d2388f14c687b00085c0f91/416x416.jpg'
            },
            {
                id: 4,
                name: 'Luca',
                imageUrl: 'https://tmssl.akamaized.net//images/foto/normal/luka-modric-real-madrid-1571213383-26597.jpg'
            },
            {
                id: 5,
                name: 'Zinedine',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Zinedine_Zidane_by_Tasnim_03.jpg'
            },
            {
                id: 6,
                name: 'Leo',
                imageUrl: 'https://pbs.twimg.com/profile_images/3577703021/498a60681bea3b182f9ac73b8070b3ce.jpeg'
            },
            {
                id: 7,
                name: 'Cristiano',
                imageUrl: 'https://specials-images.forbesimg.com/imageserve/5d2388f14c687b00085c0f91/416x416.jpg'
            },
            {
                id: 8,
                name: 'Luca',
                imageUrl: 'https://tmssl.akamaized.net//images/foto/normal/luka-modric-real-madrid-1571213383-26597.jpg'
            }
        ])
    };
    return {
        loading,
        items,
        fetchTransferTypes,
        fetchTemplates,
        templates
    };
}

export default useTransfers
