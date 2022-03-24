import axios from 'axios';
import authHeader from './authHeader';
import store from "../store/index"
// import jsonp from "fetch-jsonp";
import qs from "qs";
import { errorSwal } from '@/commonMethods/commonMethod';


const API_URL = process.env.VUE_APP_API_URL
let timeout;
let currentValue = "";
class ServiceMethodService {

    checkMethod(method) {
        if (method == 'get') {
            return axios.get
        } else if (method == 'post') {
            return axios.post
        } else if (method == 'put') {
            return axios.put
        } else if (method == 'patch') {
            return axios.patch
        } else {
            return axios.delete
        }
    }

    common(method, endPoint, id, data) {

        let axiosMethod = this.checkMethod(method)

        if (id && !data) {

            return axiosMethod(API_URL + endPoint + '/' + id, { headers: authHeader() })
        } else if (id && data) {

            return axiosMethod(API_URL + endPoint + '/' + id, data, { headers: authHeader() })

        } else if (!id && data) {
            return axiosMethod(API_URL + endPoint, data, { headers: authHeader() })
        }
        else {

            return axiosMethod(API_URL + endPoint, { headers: authHeader() })
        }


    }
    //login method
    login(data) {
        return axios.post(API_URL + "login", data, { headers: authHeader() })
    }

    //search method for dropdown
    singleDropdownSearch(value, callback, endpoint) {
        if (timeout && value!='') {
            clearTimeout(timeout);
            timeout = null;
        }
        currentValue = value;
        function fake() {
            const str = qs.stringify({
                code: "utf-8",
                search: value,
            });
            axios.get(API_URL + `${endpoint}` + '?' + `${str}`, { headers: authHeader() })
                .then((response) => response)
                .then((d) => {
                    //   console.log("data", d.data.data);
                    if (d.data.data.length > 0) {
                        store.commit('loadingStatus', false)
                    }
                    if (currentValue === value) {
                        const result = d.data.data;
                        // console.log("rewwa", result);
                        const data = [];
                        result.forEach((item) => {
                            data.push({
                                value: item.id?item.id:item.udid,
                                label: item.fullName?item.fullName:item.name,
                            });
                        });
                        // console.log('object', data);
                        callback(data);

                    }

                }).catch((error) => {
                    if (error.response.status === 422) {
                        store.commit('errorMsg', error.response.data)
                        store.commit('loadingStatus', false)
                    } else if (error.response.status === 500) {
                        errorSwal(error.response.data.message)
                        store.commit('loadingStatus', false)
                    } else if (error.response.status === 401) {
                        errorSwal(error.response.data.message)
                        store.commit('loadingStatus', false)
                    }
                });
        }

        timeout = setTimeout(fake, 300);

    }
    


}
export default new ServiceMethodService(); 