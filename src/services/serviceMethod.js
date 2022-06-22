import axios from 'axios';
import authHeader from './authHeader';
import store from "../store/index"
// import jsonp from "fetch-jsonp";
import qs from "qs";
import { errorSwal } from '@/commonMethods/commonMethod';
import router from '@/router';

const API_URL = process.env.VUE_APP_API_URL
let timeout;
let currentValue = "";
let request = "";
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

    common(method, endPoint, id, data,clearLast=null) {
        
        
        let axiosMethod = this.checkMethod(method)
        if(clearLast){
            if(request!=""){

                request.cancel();
            }
            const axiosSource = axios.CancelToken.source();
            request = { cancel: axiosSource.cancel, msg: "Loading..." };
             if (id && !data) {

                return axiosMethod(API_URL + endPoint + '/' + id, { cancelToken: axiosSource.token,headers: authHeader() }).catch((error)=>{
                    if(error.response.status === 401){
                        this.removeStorage()
                      }
                })
            } else if (id && data) {

                return axiosMethod(API_URL + endPoint + '/' + id, data, { cancelToken: axiosSource.token,headers: authHeader() }).catch((error)=>{
                    if(error.response.status === 401){
                        this.removeStorage()
                      }
                })

            } else if (!id && data) {
                return axiosMethod(API_URL + endPoint, data, { cancelToken: axiosSource.token,headers: authHeader() }).catch((error)=>{
                    if(error.response.status === 401){
                        this.removeStorage()
                      }
                })
            }
            else {

                return axiosMethod(API_URL + endPoint, { cancelToken: axiosSource.token,headers: authHeader() }).catch((error)=>{
                    if(error.response.status === 401){
                        this.removeStorage()
                      }
                })
            }
        }else{

            if (id && !data) {

                return axiosMethod(API_URL + endPoint + '/' + id, { headers: authHeader() }).catch((error)=>{
                    if(error.response.status === 401){
                        this.removeStorage()
                      }
                })
            } else if (id && data) {

                return axiosMethod(API_URL + endPoint + '/' + id, data, { headers: authHeader() }).catch((error)=>{
                    if(error.response.status === 401){
                        this.removeStorage()
                      }
                })

            } else if (!id && data) {
                return axiosMethod(API_URL + endPoint, data, { headers: authHeader() }).catch((error)=>{
                    if(error.response.status === 401){
                        this.removeStorage()
                      }
                })
            }
            else {

                return axiosMethod(API_URL + endPoint, { headers: authHeader() }).catch((error)=>{
                    if(error.response.status === 401){
                        this.removeStorage()
                      }
                })
            }
        }


    }
    //login method
    login(data) {
        data={
        email: data.email,
        password: data.password,
        deviceType:'web',
        deviceToken:localStorage.getItem('fireBaseToken')
        }
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
            axios.get(API_URL + `${endpoint}` + '?' + `${str.trim()}`, { headers: authHeader() })
                .then((response) => response)
                .then((d) => {
                    store.commit('dropdownLoadingStatus', false)
                    if (currentValue === value) {
                        // console.log('=>',d.data.data)
                        const result = d.data.data.map(item=>{
                            if(item.abbr){
                                item.fullName = item.abbr
                            }
                            if(item.code && item.description){
                                item.fullName = item.code+' - '+item.description
                            }
                            return item
                        });
                        // console.log("rewwa", result);
                        const data = [];
                        result.forEach((item) => {
                            data.push({
                                value: item.udid?item.udid:item.id,
                                label: item.fullName?item.fullName:item.name,
                            });
                        });
                        // console.log('object', data);
                       
                        callback(data);

                    }

                }).catch((error) => {
                    if (error.response.status === 422) {
                        store.commit('errorMsg', error.response.data)
                        store.commit('dropdownLoadingStatus', false)
                    } else if (error.response.status === 500) {
                        errorSwal(error.response.data.message)
                        store.commit('dropdownLoadingStatus', false)
                    } else if (error.response.status === 401) {
                        this.removeStorage()
                        errorSwal(error.response.data.message)
                        store.commit('dropdownLoadingStatus', false)

                    }
                });
        }
        timeout = setTimeout(fake, 300);
    }


    headerSearch(value, callback, endpoint) {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
            callback('');
        }
        
        currentValue = value;
        if(value == ''){
            callback(null);
            return;
        }
        function fake() {
            const str = qs.stringify({
                code: "utf-8",
                search: value,
            });
            // async function  groupArrayOfObjects(list, key) {
            //     return list.reduce(function(rv, x) {
            //       (rv[x[key]] = rv[x[key]] || []).push(x)
            //       return rv;
            //     }, {})
            //   }
            axios.get(API_URL + `${endpoint}` + '?' + `${str}`, { headers: authHeader() })
                .then((response) => response)
                .then(async (d) => {
                    store.commit('dropdownLoadingStatus', false)
                    if (currentValue === value) {
                        const response = d.data.data;
                        let result = response;
                        if(response.lenght>0){
                          return result.reduce(function(data, item) {
                                (data[item["type"]] = data[item["type"]] || []).push(item)
                                return data;
                              }, []);
                            
                        }else{
                            result
                        }
                         
                        
                           
                            callback(result); 
            

                    }

                }).catch((error) => {
                    if (error.response.status === 422) {
                        store.commit('errorMsg', error.response.data)
                        store.commit('dropdownLoadingStatus', false)
                    } else if (error.response.status === 500) {
                        errorSwal(error.response.data.message)
                        store.commit('dropdownLoadingStatus', false)
                    } else if (error.response.status === 401) {
                        this.removeStorage()
                        errorSwal(error.response.data.message)
                        store.commit('dropdownLoadingStatus', false)
                    }
                });
        }

        timeout = setTimeout(fake, 300);

    }
    
removeStorage(){
    localStorage.removeItem('user');
    localStorage.removeItem('barmenu');
    localStorage.removeItem('staff');
    localStorage.removeItem('token');
    localStorage.removeItem('auth');
    localStorage.removeItem('roleAuth');
    localStorage.removeItem('access');
    localStorage.removeItem('accessPermission');
    localStorage.removeItem('permission');
    localStorage.removeItem('screensPermission');
    localStorage.removeItem('widgetsPermission');
    localStorage.removeItem('fireBaseToken');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('checkLogin');
    router.go();
}

}

export default new ServiceMethodService(); 