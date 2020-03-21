import axios from 'axios';
import * as constants from '../constants';

const API = {
    getProducts : load => {
        console.log("payload")
        console.log(load)
        return axios
            .get(constants.url + 'products',{params:load})
            .then(response => {
                return Promise.resolve(response.data);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    },
    getProductsByCategory : load => {
        console.log(load)
        let id = load.categoryId;
        delete load.categoryId;
        console.log("new load")
        console.log(load)
        return axios
            .get(constants.url + 'category/'+`${id}`,{params:load})
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
    },
    login : post => {
        return axios
            .post(constants.url + 'login',{
                username: post.username,
                password: post.password
            })
            .then(response => {
                return Promise.resolve(response.data);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }
}

export default API;