import {httpService} from 'services';
import {useState, useEffect} from 'react';
import t from 'strings';
import String from '../utils/string'

function useVerify() {

    const [documentTypes, setDocumentTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDocType, setSelectedDocType] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState({name: t('common.georgia')});
    const [address, setAddress] = useState('');
    const [selectedCity, setSelectedCity] = useState({id: 1, name: t('common.tbilisi')});
    const [cities, setCities] = useState([]);
    const [countries, setCountries] = useState([]);
    const [pin, setPin] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [name, setName] = useState('');
    const [cardPrice, setCardPrice] = useState(0);
    const [surname, setSurname] = useState('');
    const [selectedCard, setSelectedCard] = useState(null);
    const [cardTypes, setCardTypes] = useState([]);
    const [termId, setTermId] = useState([]);
    const [term, setTerm] = useState(null);

    const [frontSideData, setFrontSideData] = useState({ uri: null });
    const [backSideData, setBackSideData] = useState({ uri: null });
    const [selfieData, setSelfieData] = useState({ uri: null });
    const [highlightsValidations, setHighlightsValidations] = useState(false);

    const orderCardNoCardTitle = t('verify.order_card_no_card')

    useEffect(() => {
        fetchDocumentTypes();
        getCardTypes();
        fetchCities();
        fetchCountries();
        getTerms();
        setBirthDateDefaultValue();
    }, []);

    const setBirthDateDefaultValue = () => {
        const date = new Date()
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear() - 16;
        setBirthDate(year + '/' + month + '/' + day);
    };

    const fetchDocumentTypes = () => {
        setLoading(true)
        httpService.post('/User/Registration/GetDocumentTypes', {}).then((response) => {
            if (response.ok) {
                setDocumentTypes(response.data.documentTypes)
            }

        }).finally(() => setLoading(false))
    };

    const getCardTypes = () => {
        setLoading(true)
        httpService.get('/GetCardTypes').then((response) => {
            if (response.ok) {
                let cardTypes = response.data.cardTypes
                cardTypes.push({
                    name: orderCardNoCardTitle,
                    typeId: 4
                })
                setCardTypes(cardTypes)
            }

        }).finally(() => setLoading(false))
    };

    const fetchUserInfo = (pin) => {

        setLoading(true)
        httpService.get('/User/GetCustomerDetailsByPersonalId', {personalId: pin}).then((response) => {
            if (response.ok) {
                let body = response.data
                if (body.firstName) {
                    setName(body.firstName)
                    setSurname(body.lastName)
                    setBirthDate(body.birthDate)
                }
            }
        }).finally(() => setLoading(false))
    };

    const fetchCities = (pin) => {
        setLoading(true)
        httpService.get('/GetCities').then((response) => {

            if (response.ok) {
                let body = response.data.cities
                setCities(body)
                if (body.length > 0) {
                    setSelectedCity(body[0])
                }
            }

        }).finally(() => setLoading(false))
    };

    const fetchCountries = () => {
        setLoading(true)
        httpService.get('/GetCountries').then((response) => {
            if (response.ok) {
                let body = response.data.countries
                setCountries(body)
                if (body.length > 0) {
                    setSelectedCountry(body[0])
                }
            }
        }).finally(() => setLoading(false))
    };

    const genericError = () => {
        return {
            error : {
                "code": 1000,
                "displayText": "Something wrong happened",
                "message": "Something wrong happened"
            }
        }
    }

    const validateValues = (values, handler) => {

        if (!values || values.length != 3) {
            logVerify('validateValues - !values || values.length != 3', values)
            handler(genericError())
            return false
        }

        for (let i = 0; i < values.length; i ++) {
            if (values[i].error != null) {
                logVerify('values[0].error || values[0].error !== null', values)
                handler(genericError())
                return false
            }
        }

        logVerify('values validated', values)
        return true
    }

    const logVerify = (title, data) => {
        console.log(" \r\n\r\n >>>>>>>>>>>>>>>> VERIFICATION STARTED >>>>>>>>>>>>>>>> ", title, data, " \r\n\r\n ")
    }

    const verify = (handler) => {
        setLoading(true)

        //here we need to upload all the images together....
        const frontSidePromise = getUploadPromise(frontSideData, handler)
        const backSidePromise = getUploadPromise(backSideData, handler)
        const selfiePromise = getUploadPromise(selfieData, handler)

        logVerify(" >>>>>>>>>>>>>>>> IMAGE URLs >>>>>>>>>>>>>>>> ", [frontSidePromise, backSidePromise, selfiePromise])

        Promise.all([frontSidePromise, backSidePromise, selfiePromise]).then(function(values) {

            logVerify(" >>>>>>>>>>>>>>>> Promise.all >>>>>>>>>>>>>>>> ", values)

            if (validateValues(values, handler) === false) {

                logVerify(" >>>>>>>>>>>>>>>> validateValues >>>>>>>>>>>>>>>> COULD NOT VALIDATE", "")

                setLoading(false)
                return
            }

            let cityId = selectedCity.cityId

            if (!cityId || typeof cityId  === "undefined") {
                cityId = 1
            }

            const obj = {
                documentType: selectedDocType.type,
                personalId: pin,
                name: name,
                surname: surname,
                birthDate: birthDate,
                cardDeliveryCountryID: selectedCountry.countryId,
                cardDeliveryCityID: cityId,
                cardDeliveryAddress: address,
                termID: termId,
                documentFrontSide: values[0].data.imageUrl,
                documentBackSide: values[1].data.imageUrl,
                customerSelf: values[2].data.imageUrl
            }

            if (selectedCard.typeId !== 4) {
                obj['cardTypeID'] = selectedCard.typeId
            }

            logVerify(" >>>>>>>>>>>>>>>> VERIFY OBJECT >>>>>>>>>>>>>>>> ", obj)

            httpService.post('/User/Registration/CustomerRegistration', obj).then((response) => {
                logVerify(" >>>>>>>>>>>>>>>> CustomerRegistration >>>>>>>>>>>>>>>> ", response)
                handler(response)
            }).catch(err => console.log(' >>>>>>>>>>>>>>>> CustomerRegistration >>>>>>>>>>>>>>>> ', err)).finally(() => {
                setLoading(false)
            })
        })
    };

    const getUploadPromise = (imageData, handler) => {

        return new Promise(function(resolve, reject) {

            let obj = {
                type: "1",
                getColor: false,
                fileName: String.randomStr() + ".jpg",
                image: (imageData ? imageData.base64 : '')
            }

            logVerify(" >>>>>>>>>>>>>>>> getUploadPromise >>>>>>>>>>>>>>>> ", obj)

            httpService.post('/Files/UploadImage', obj).then(response => {
                if (response.ok) {

                    logVerify(" >>>>>>>>>>>>>>>> IMAGE UPLOADED SUCCESSFULLY >>>>>>>>>>>>>>>> ", response.data)

                    resolve(response)
                } else {
                    reject(response)
                    handler(response)
                    setLoading(false)
                }
            }).catch(err => {
                logVerify(" >>>>>>>>>>>>>>>> logVerify catch >>>>>>>>>>>>>>>> ", err)
                setLoading(false)
                handler({ errors: [ err ]})
                reject(err)
            })
        });
    };

    const getTerms = () => {
        httpService.get('/GetTerm').then(response => {
            if (response.ok) {
                setTerm(response.data.terms[0])
                setTermId(response.data.terms[0].termId)
            }
        })
    }

    return {
        loading,
        documentTypes,
        fetchDocumentTypes,
        fetchUserInfo,
        selectedDocType,
        setSelectedDocType,
        selectedCountry,
        setSelectedCountry,
        countries,
        setCountries,
        pin,
        setPin,
        birthDate,
        setBirthDate,
        surname,
        setSurname,
        name,
        setName,

        cardTypes,
        selectedCard,
        setSelectedCard,

        cardPrice,
        setCardPrice,

        selectedCity,
        setSelectedCity,

        cities,
        address,
        setAddress,

        frontSideData,
        setFrontSideData,
        backSideData,
        setBackSideData,
        selfieData,
        setSelfieData,

        termId,
        highlightsValidations,
        setHighlightsValidations,
        getTerms,
        term,
        setTerm,
        verify
    };
}

export default useVerify
