import axios from 'axios';
import {Defaults, isAndroid, Settings, showErrorWithMessage} from 'utils';
import Constants from 'expo-constants';
import Config from '../../config';

var instance = axios.create({
    baseURL: 'https://some-domain.com/api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });