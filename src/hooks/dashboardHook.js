import { httpService } from 'services';
import React, { useState, useEffect } from 'react';
import {Defaults, Settings} from "utils";

const VerificationStatus = {
    notVerified: 'Enum_NotVerified',
    verified: 'Enum_Verified',
    verificationStopped: 'Enum_VerificationStoped',
    inReview: 'Enum_VerificationReview',
    cancelled: 'Enum_VerificationCanceled'
}

function useDashboard() {

    const [userProducts, setUserProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [userHeaderTitle, setUserHeaderTitle] = useState('');
    const [userImageUrl, setUserImageUrl] = useState(null);

    /**
     *  Enum_NotVerified            - Not Verified
     *  Enum_Verified               - Verified
     *  Enum_VerificationStopped     - Verification Stopped
     *  Enum_VerificationReview     - In Review
     *  Enum_VerificationCanceled   - Verification Canceled
     */
    const [userIsVerified, setUserIsVerified] = useState(false);

    /** Returns array of :
     * {
     *  "date": "2017-07-05T13:02:29.1489936",
     *  "description": "გადახდა, მერჩანტიSILK სერვისი: SILK_IP, თანხა:33.000000"
     * }
     */
    const [statements, setStatements] = useState([]);

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

    /** Returns array of -
     * {
     *   "ccy": "GEL",
     *   "cardAcct": "UF02MC00000000015888",
     *   "cardID": 9,
     *   "cardType": 1,
     *   "cardTypeCode": "BlueCard",
     *   "cardUrl": "http:1",
     *   "color": "#ff0000",
     *   "maskedCard": "1199*******5566",
     *   "status": 1,
     *   "ufcCardID": "1125"
     *  }
     */
    const [cards, setCards] = useState([]);

    /**
     * Returns number
     */
    const [totalBalance, setTotalBalance] = useState(null);

    const fetchAll = () => {
        loadUserInfo();
        fetchUserStatement();
        fetchTotalBalance();
        fetchCards();
        fetchLoyaltyCards(false);
        fetchProducts();
    }

    const loadUserInfo = () => {
        setLoading(true)

        const getClaimByKey = (claims, key) => {
            for (let i = 0; i < claims.length; i++) {
                if (claims[i].claimType === key) {
                    return claims[i].claimValue
                }
            }
            return null;
        }

        /**
         *
         * /User/SetUserClaims იუზერის ქლაიმების დასეტვისთვის გამოიძახეთ ეს მეთოდი
            "claimType": "BalVisible",
            "claimValue": "1"
         *
         */

        httpService.get('/User/GetUserDetails').then((response) => {
            if (response.ok) {
                const _userInfo = response.data;
                setUserInfo(_userInfo)

                if (_userInfo && _userInfo.name != null) {
                    setUserHeaderTitle(', ' + _userInfo.name)
                    setUserImageUrl(_userInfo.imageUrl)

                    Settings.setCurrentUserImageUrl(_userInfo.imageUrl)
                    Defaults.currentUsername = _userInfo.username
                    Defaults.hasOtpEnabled = _userInfo.isOtpAuthorization
                    Settings.setCurrentUser(_userInfo.username)

                    if (_userInfo.claims && _userInfo.claims.length > 0) {
                        let balIsVisible = getClaimByKey(_userInfo.claims, 'BalVisible');
                        Defaults.showsBalanceOnDashboard = !(balIsVisible === "0")
                    } else {
                        Defaults.showsBalanceOnDashboard = true
                    }

                }

                setUserIsVerified(_userInfo &&
                    _userInfo.customerVerificationStatusCode === VerificationStatus.verified &&
                    _userInfo.phoneVerificationStatusCode ===  VerificationStatus.verified)
            }

        }).finally(() => setLoading(false))
    };

    const fetchUserStatement = () => {
        setLoading(true)
        const obj = { isTopActivity: true }
        httpService.get('/User/GetUserActivity', obj).then((response) => {
            if (response.ok) {
                setStatements(response.data.activities.length === 0 ? [{empty : true , transactionDate : 1}] : response.data.activities)
            }

        }).finally(() => setLoading(false))
    };

    const fetchTotalBalance = () => {
        setLoading(true)
        httpService.get('/User/GetUserTotalBalance', {}).then((response) => {
            if (response.ok) {
                //TODO: this needs to be removed
                //when GOGA will fix this on his side
                let data = response.data
                data.points = 3565
                setTotalBalance(data)
            }
        }).finally(() => setLoading(false))
    };

    const fetchLoyaltyCards = (topCards) => {
        setLoading(true)

        httpService.get('/User/GetUserLoyaltyCards', { isTopCards: topCards }).then((response) => {
            if (response.ok) {
                setLoyaltyCards(response.data.cards)
            }

        }).finally(() => setLoading(false))
    };

    const fetchProducts = (isTop = 1) => {
        setLoading(true)
        httpService.get('/User/GetUserProducts', { isTop: isTop }).then((response) => {

            if (response.ok) {
                setUserProducts(response.data.products)
            }

        }).finally(() => setLoading(false))
    };

    const fetchCards = () => {
        setLoading(true)
        httpService.get('/User/GetUserCards?isTopCard=true').then((response) => {
            if (response.ok) {
                setCards(response.data.userCards)
            }
        }).finally(() => setLoading(false))
    };

    return {
        loyaltyCards,
        setLoyaltyCards,
        cards,
        statements,
        totalBalance,
        loading,
        userInfo,
        userIsVerified,
        setUserIsVerified,
        userProducts,
        fetchAll,
        userHeaderTitle,
        userImageUrl,
        fetchUserStatement,
        loadUserInfo
    };
}

export default useDashboard
