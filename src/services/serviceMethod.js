import axios from 'axios';
import authHeader from './authHeader';


const API_URL = process.env.VUE_APP_API_URL

class ServiceMethodService {

    checkMethod(method) {
        if (method == 'get') {
            return axios.get
        } else if (method == 'post') {
            return axios.post
        } else if (method == 'put'){
            return axios.put
        } else if (method == 'patch') {
            return axios.patch
        } else{
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
    login(data){
        return axios.post(API_URL + "/login", {
            email: data.email,
            password: data.password,
          }, { headers: authHeader() })
    }
}
export default new ServiceMethodService(); 