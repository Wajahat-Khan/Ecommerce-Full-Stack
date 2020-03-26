import axios from 'axios';
import * as constants from '../constants';

const API = {
    getProducts : load => {

        return axios
            .get(constants.url + 'products',{params:load})
            .then(response => {
                return Promise.resolve(response.data);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    },
    searchProducts : load => {
        console.log("payload")
        console.log(load)
        return axios
            .get(constants.url,{params:load})
            .then(response => {
                return Promise.resolve(response.data);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    },
    ProductById : id => {
        console.log(id)
        return axios
            .get(constants.url +`products/${id}`)
            .then(response => {
                return Promise.resolve(response.data);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    },
    getProductsByCategory : load => {
        let id = load.categoryId;
        delete load.categoryId;
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
        console.log(post)
        return axios
            .post(constants.url + 'login',{
                email: post.email,
                password: post.password
            })
            .then(response => {
                return Promise.resolve(response.data);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    },
    createUser : post => {
        return axios
            .post(constants.url + 'signup',{
                name: post.name,
                email: post.email,
                password:post.password
            })
            .then(response => {
                return Promise.resolve(response.data);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    },
    addOrder: post=>{
        console.log(post)
        return axios
            .post(constants.url + 'order',{
                customer_id:post.customer_id,
                first_name:post.first_name,
                last_name:post.last_name,
                address:post.address ,
                city:post.city, 
                state:post.state, 
                zip_code:post.zip_code, 
                region:post.region, 
                order_date:post.order_date, 
                total_price:post.total_price
            })
            .then(response => {
                return Promise.resolve(response.data);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    },
    deleteOrder : post =>{
        let id = post.id;
        return axios
            .delete(constants.url + 'order/'+`${id}`)
            .then(response => {
                return Promise.resolve(response.data);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    },
    addOrderedItems : load => {
        let id = load.order_id;
        return axios
            .post(constants.url + 'order/'+`${id}`,{
                order_id:load.order_id,
                product_id:load.product_id,
                size:load.size,
                color:load.color,
                quantity:load.quantity,
                total_price:load.total_price
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