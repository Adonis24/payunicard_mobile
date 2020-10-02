import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import Root from './src/root';
import { Provider } from 'outstated';
import { stores } from 'hooks';
import { Settings, Consts, Defaults } from 'utils';
import { AppLoading } from 'expo';
import DropdownAlert from 'react-native-dropdownalert'
import * as Font from 'expo-font';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import commonServices from './src/services/commonServices';
import authService from './src/services/authService';

Text.defaultProps = Text.defaultProps || {};
TextInput.defaultProps = TextInput.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps.allowFontScaling = false;

console.disableYellowBox = true;

const { en } = Consts.locale;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialized: false,
      fontsLoaded: false,
      settingsLoaded: false
    }

    this.subscriptions = [
      commonServices.registerInterceptor(),
      // authService.registerAuthInterceptor()
    ];
  }


  componentDidMount() {

    let initialize = () => {
      this.loadLocale().then(lang => {
        this.loadAssets();
        this.loadSettings().then((value) => {
          this.setState({ initialized: true });
        })
      })
    };

    initialize();
  }

  componentWillUnmount() {
    for (let sub of this.subscriptions) {
      sub.unsubscribe && sub.unsubscribe();
    }
    this.subscriptions = [];
  }


  loadSettings = async () => {
    return Promise.all([this.loadOnboardingWasShown, this.loadToken, this.loadCurrentUsername, this.loadAssets]);
  }

  loadAssets = async () => {
    await Font.loadAsync({
      'Bold': require('./assets/fonts/FiraGO-Bold.ttf'),
      'Book': require('./assets/fonts/FiraGO-Book.ttf'),
      'Eight': require('./assets/fonts/FiraGO-Eight.ttf'),
      'ExtraBold': require('./assets/fonts/FiraGO-ExtraBold.ttf'),
      'ExtraLight': require('./assets/fonts/FiraGO-ExtraLight.ttf'),
      'Four': require('./assets/fonts/FiraGO-Four.ttf'),
      'Hair': require('./assets/fonts/FiraGO-Hair.ttf'),
      'Heavy': require('./assets/fonts/FiraGO-Heavy.ttf'),
      'Light': require('./assets/fonts/FiraGO-Light.ttf'),
      'Medium': require('./assets/fonts/FiraGO-Medium.ttf'),
      'Regular': require('./assets/fonts/FiraGO-Regular.ttf'),
      'SemiBold': require('./assets/fonts/FiraGO-SemiBold.ttf'),
      'Thin': require('./assets/fonts/FiraGO-Thin.ttf'),
      'Two': require('./assets/fonts/FiraGO-Two.ttf'),
      'UltraLight': require('./assets/fonts/FiraGO-UltraLight.ttf'),
    }).then(_ => {
      this.setState({fontsLoaded: true})
    });
  }

  loadLocale = async () => {
    let locale = await Settings.getLocale();
    if (!locale) {
      locale = en;
    }
    Defaults.locale = locale;
    return locale;
  }

  loadCurrentUsername = async () => {
    let userImageUrl = await Settings.currentUserImageUrl()
    Defaults.currentUserImageUrl = userImageUrl;
    return true;
  }

  loadOnboardingWasShown = async () => {
    Defaults.onBoardingWasShown = (await Settings.onboardingWasShown()) === 'true';
    return true;
  }

  loadToken = async () => {
    Defaults.token = (await Settings.token());
    return true;
  }

  render() {
    console.disableYellowBox = true;

    if (!this.state.settingsLoaded || !this.state.fontsLoaded || !this.state.initialized) {
      return (
        <AppLoading
          startAsync={this.loadSettings}
          onFinish={() => {
            this.setState({ settingsLoaded: true });
          }}
          onError={(err) => {
            console.log(err)
            alert('Please restart the app')
          }} />)
    }

    return (
      <ActionSheetProvider>
        <View style={{ flex: 1 }}>
          <Provider stores={stores}>
            <Root />
          </Provider>
          <DropdownAlert
            zIndex={200}
            ref={ref => Defaults.alert = ref}
          />
        </View>
      </ActionSheetProvider>
    )
  }
}

export default App;
