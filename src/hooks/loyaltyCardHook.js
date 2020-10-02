import { httpService } from 'services';
import { useState, useEffect } from 'react';

function loyaltyCardHook() {

    const [loading, setLoading] = useState(false);

    /** Returns array of -
     * {
     *   "imageURL": "Http://",
     *   "cardName": "UniCard",
     *   "color": "#ff0000",
     *   "loyaltyCardId": 1,
     *   "cardNumber" : "1199111401840173"
     *  }
     */
    const [loyaltyCards, setLoyaltyCards] = useState([]);

    useEffect(() => {
        fetchLoyaltyCards(true);
    }, []);

    const fetchLoyaltyCards = (IsTopCards) => {
        setLoading(true)
        const obj = { isTopCards: IsTopCards }
        httpService.get('/User/GetUserLoyaltyCards', obj).then((response) => {
            if (response.ok) {
                setLoyaltyCards(response.data.cards)
            }
            
        }).finally(() => setLoading(false))
    };

    return {
        loyaltyCards,
        setLoyaltyCards,
        loading
    };
}

export default loyaltyCardHook
