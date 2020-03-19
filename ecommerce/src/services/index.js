import axios from 'axios';
import * as constants from '../constants';

const API = {
    getProducts : () => {
        return axios
            .get(constants.url + 'products')
            .then(response => {
                return Promise.resolve(response.data);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    },
    configuration : () => {
        return axios
            .get(constants.url)
            .then(response => {
                return Promise.resolve(response.data);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }
}

export default API;