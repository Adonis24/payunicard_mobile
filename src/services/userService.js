import axios from 'axios';

class UserService {

    getUserDetail = () => {
        return axios.get('/User/GetUserDetails');
    }
}

export default new UserService();