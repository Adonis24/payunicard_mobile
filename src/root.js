import React from 'react';
import { View, Dimensions, Modal } from 'react-native';
import { Common } from 'styles';
import { Route } from './navigator';
import { SimulatedModal } from 'components';
import Terms from './screens/terms';
import Verify from './screens/verify/verify';
import NewOperation from './screens/newOperation';
import { Defaults } from 'utils';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import LoyaltyCardsDetail from "./screens/loyaltyCards/loyaltyCardDetail";

const { height } = Dimensions.get('window');

function Root() {

    const Navigator = Route()

    return (
        <View style={Common.fill}>
            <Navigator ref={ref => Defaults.navigation = ref}/>

            <SimulatedModal
                height={height - getStatusBarHeight()}
                ref={ref => Defaults.terms = ref}>
                <Terms close={() => Defaults.terms.close()} />
            </SimulatedModal>

            <SimulatedModal
                height={350}
                ref={ref => Defaults.loyaltyCardDetailScreen = ref}>
                <LoyaltyCardsDetail/>
            </SimulatedModal>

            <SimulatedModal
                height={height - getStatusBarHeight()}
                ref={ref => Defaults.verify = ref}>
                <Verify/>
            </SimulatedModal>

            <SimulatedModal
                height={height * 0.6}
                ref={ref => Defaults.newOperation = ref}>
                <NewOperation onSelect={(item)=>{
                    if (item) {
                        Defaults.newOperation.close()
                        setTimeout(function () {
                            Defaults.navigation.navigate('MerchantsList')
                        }, 300);

                    }
                }}/>
            </SimulatedModal>

        </View>
    )
}

export default Root;
