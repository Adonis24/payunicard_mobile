import { httpService } from 'services';
import { useState, useEffect } from 'react';
import * as ImageManipulator from 'expo-image-manipulator';
import String from '../utils/string'

function useLoyaltyCards() {

    const [loading, setLoading] = useState(false);
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [imageURL, setImageURL] = useState(null);
    const [color, setColor] = useState("000000");
    const [isFavorite, setIsFavorite] = useState(false);
    const [selectedMerchant, setSelectedMerchant] = useState([]);

    const [highlightsValidations, setHighlightsValidations] = useState(false);

    const addUserLoyaltyCard = async (completion) => {
        setLoading(true)
        if  (imageURL) {
            const data = await ImageManipulator.manipulateAsync(imageURL, [], {format: 'jpeg', compress: 0.1, base64: true})
            let obj = {
                type: "2",
                getColor: false,
                fileName: String.randomStr() + ".jpg",
                image: data.base64
            }

            httpService.post('/Files/UploadImage', obj).then(response => {
                if (response.ok) {
                    let result = response.data
                    _addUserLoyaltyCard(result.color, result.imageUrl, completion)
                } 
            }).finally(() => setLoading(false))
        } else {
            _addUserLoyaltyCard(null, null, completion)
        }
    } 

    const _addUserLoyaltyCard = (color, url, completion) => {
        setLoading(true)

        const obj = {
            // cardID: 0,
            loyaltyMerchantID: selectedMerchant.id.toString(),
            cardName: cardName,
            cardNumber: cardNumber,
            isFavorite: 0,
        }

        if (url) {
            obj['imageURL'] = url
        }

        if (color) {
            obj['color'] = color
        }

        httpService.put('/User/AddUserLoyaltyCard', obj).then((data) => {
            completion(data)
        }).finally(() => setLoading(false))
    };

    return {
        loading,
        cardName, setCardName,
        cardNumber, setCardNumber,
        imageURL, setImageURL,
        color, setColor,
        isFavorite, setIsFavorite,
        addUserLoyaltyCard,
        highlightsValidations, 
        setHighlightsValidations,
        selectedMerchant, 
        setSelectedMerchant
    };
}

export default useLoyaltyCards