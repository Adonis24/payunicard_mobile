const Defaults = {
    locale: 'ka',
    token: '',
    otpToken: '',
    onBoardingWasShown: false,
    verifyFlowWasShown: false,
    alert: null,
    currentUsername: null,
    hasOtpEnabled: null,
    showsBalanceOnDashboard: true,
    currentUserImageUrl: null,

    loyaltyCardDetailScreen: null,
    loyaltyCardObject: null,

    showErrorWithErrorObject(error) {
        Defaults.alert.alertWithType('error', 'Error', error);
    },

    showErrorWithMessage(message) {
        Defaults.alert.alertWithType('error', 'Error', message);
    },
    showSuccessWithMessage(message) {
        Defaults.alert.alertWithType('success', 'Success', message);
    },
    terms: null,
    verify: null,
    newOperation: null,
    navigation: null,
}

export default Defaults;
