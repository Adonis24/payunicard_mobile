import { modalLoadingStore, useModalLoading } from './modalLoadingHook';
import { useLocale, localeStore } from './localeHook';
import useLogin from './loginHook';
import useForgotPassword from './forgotPasswordHook';
import useDashboard from './dashboardHook';
import useNotification from "./notificationHook"
import useUserAndPasswordHook from "./userAndPasswordHook"
import useLoyaltyCards from "./addLoyaltyCardHook"
import useMerchantsList from './merchantsListHook'
import usePayments from './paymentsHook'
import useTransfers from './transfersHook'

const stores = [modalLoadingStore, localeStore];

export {
    stores,
    useModalLoading,
    useLocale,
    useLogin,
    useForgotPassword,
    useDashboard,
    useNotification,
    useUserAndPasswordHook,
    useLoyaltyCards,
    useMerchantsList,
    usePayments,
    useTransfers
}
