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
        }else {
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
}
export default new ServiceMethodService(); 