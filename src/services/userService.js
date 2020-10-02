import axios from 'axios';

class UserService {
    API_URL = 'https://testapi.payunicard.ge:2681';

    getUserDetail = () => {
        console.log('movida')
        return axios.get(this.API_URL + '/User/GetUserDetails');
    }
}

export default new UserService();