import { httpService } from 'services';
import { useState, useEffect } from 'react';
import t from 'strings';
function useProducts() {

    const [userProducts, setUserProducts] = useState([]);
    const [userCards, setUserCards] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAll()
    }, []);

    const fetchAll = () => {
        fetchProducts()
        fetchCards()
    }

    const fetchProducts = (isTop = 1) => {
        setLoading(true)
        httpService.get('/User/GetUserProducts', { istop: isTop }).then((response) => {

            if (response.ok) {
                setUserProducts(response.data.products)
            }

        }).finally(() => setLoading(false))
    };

    const fetchCards = () => {
        setLoading(true)
        const obj = { isTopCard: true }
        httpService.get('/User/GetUserBankCards', obj).then((response) => {
            if (response.ok) {
                setUserCards(response.data.bankCards)
            }
        }).finally(() => setLoading(false))
    };

    return {
        userProducts,
        setUserProducts,
        userCards,
        setUserCards,
        loading,
        setLoading,
        fetchAll
    };
}

export default useProducts
