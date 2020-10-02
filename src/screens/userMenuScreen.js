import React, {useRef, useState} from 'react';
import {
    Platform,
    View,
} from 'react-native';
import {ListPicker, Text, UserAvatar} from "../components"

import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import UserMenuListItem from '../components/listItems/userMenuListItem'
import Header from "../components/commonHeader"
import {ScrollView} from 'react-native-gesture-handler';
import {useActionSheet} from '@expo/react-native-action-sheet'
import t from 'strings';
import {Settings, Defaults} from 'utils';
import {Colors} from "styles";
import SimulatedModal from "components/SimulatedModal";
import userPageHook from "hooks/userPageHook";

export default function userMenuScreen({navigation}) {

    const hook = userPageHook()
    const {showActionSheetWithOptions} = useActionSheet();
    const options = [t("menuName.takePicture"), t("menuName.chooseFromGallery"), t("menuName.cancel")]
    const termsModalRef = useRef(null);
    const [currentUserImageUrl, setCurrentUserImageUrl] = useState(Defaults.currentUserImageUrl ? Defaults.currentUserImageUrl : 'https://via.placeholder.com/150');
    const [term, setTerm] = useState({description: 'აქ უნდა იყოს თერმები. რომელი და საიდან არ ვიცი'});

    const _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        //console.log(result);

        if (!result.cancelled) {
            setCurrentUserImageUrl(result.uri)
            Settings.setCurrentUserImageUrl(result.uri)
            Defaults.currentUserImageUrl = result.uri
            hook.getUploadPromise(result).then(()=> {
                //console.log("user photo has been updated....")
            })
        }
    };

    const getPermissionForGalleryAsync = async () => {
        if (Platform.OS !== 'android') {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            } else {
                _pickImage()
            }
        }
    }

    const getPermissionForCameraAsync = async () => {
        if (Platform.OS !== 'android') {
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
            if (status !== 'granted') {
                alert('Sorry, we need camera permissions to make this work!');
            } else {
                _pickImage()
            }
        }
    }

    const beginTermsModalHandler = () => {
        setTimeout(function () {
            termsModalRef.current.open()
        }, 500);
    };

    function elementOnPress(index) {
        // for navigating to the screen
        if (menuItems[index].screenName === "terms") {
            beginTermsModalHandler()
        } else {
            navigation.navigate(menuItems[index].screenName)
        }
        //alert(index)
    }

    function _callActionSheet() {
        showActionSheetWithOptions({
            options,
            cancelButtonIndex: 2,
            destructiveButtonIndex: 2,
        }, (index) => {
            switch (index) {
                case 1:
                    getPermissionForGalleryAsync();
                    break;
                case 0:
                    getPermissionForCameraAsync()
                    break;
                default:
                    break;
            }
        })
    }

    return (
        <View style={{flex: 1, backgroundColor: "#ffff"}}>
            <Header
                closeIcon={false}
                onLeftSidePress={() => {
                    navigation.pop()
                }}
                title={''}
                onRightSidePress={() => {
                    Settings.removeToken()
                    navigation.navigate('Login');
                }}
                rightText={"auth.logout"}
            />
            <ScrollView style={{flex: 1, backgroundColor: "#ffff"}}>

                <UserAvatar
                    name={Defaults.currentUsername}
                    editable={true}
                    image={currentUserImageUrl}
                    onPress={_callActionSheet}

                />

                <View style={{marginTop: 48}}/>
                {
                    menuItems.map((val, index) => (
                        <UserMenuListItem {...val} index={index} key={index}
                                          onPress={elementOnPress.bind(this, index)}/>
                    ))
                }

            </ScrollView>

            <SimulatedModal ref={termsModalRef} hasFlatCorners={true} hidesDragView={true} height={'100%'}>
                <ListPicker
                    onBackPressed={() => {
                        termsModalRef.current.close()
                    }}
                    handleOnPress={(item) => {
                    }}
                    items={[]}
                    value={''}
                    customView={
                        <View style={{width: '100%', height: '100%', alignItems: 'center', paddingTop: 40}}>
                            <Text style={{
                                marginHorizontal: 40,
                                color: Colors.placeholder,
                                fontSize: 14,
                                textAlign: 'center'
                            }}>{term && term.description ? term.description : ''}</Text>
                        </View>
                    } title={t('verify.terms')}/>
            </SimulatedModal>
        </View>
    )
}

const menuItems = [
    {
        icon: require("../../assets/menuIcon/userIcon.png"),
        title: "menuName.userAndPassword",
        backgroundColor: "#94DD34",
        screenName: "currentUserScreen"
    },
    /*{
        icon: require("../../assets/menuIcon/referral.png"),
        title: "menuName.referral",
        backgroundColor: "#9D00FF",
        screenName: "referalSystemScreen"
    },*/
    {
        icon: require("../../assets/menuIcon/security.png"),
        title: "menuName.security",
        backgroundColor: "#FFA001",
        screenName: "SecuritySettingsScreen"
    },
    {
        icon: require("../../assets/menuIcon/contactInfo.png"),
        title: "menuName.contactInformation",
        backgroundColor: "#FFDA00",
        screenName: "ContactInfoScreen"
    },
    {
        icon: require("../../assets/menuIcon/notification.png"),
        title: "menuName.notification",
        backgroundColor: "#0076FF",
        screenName: "NotificationSettingsScreen"
    },
    {
        icon: require("../../assets/menuIcon/CustomerDeal.png"),
        title: "menuName.customerDeal",
        backgroundColor: "#6B6B6B",
        screenName: "terms"
    },
]
