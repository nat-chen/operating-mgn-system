import axios from 'axios';
import domain from '@config/domain';
import qs from 'qs';
import { useHistory } from 'react-router-dom';

const enhancedAxios = axios.create({
  baseURL: `${domain.requestRoot}`,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
  }
});

// enhancedAxios.interceptors.request.use(
//   function(config) {
//     if (config.method === "post" || config.method === "put" || config.method === "delete") {
//       config.data = qs.stringify(config.data);
//     }
//     if (config.method === "get" && config.params) {
//       Object.keys(config.params).forEach((key) => {
//         let value = config.params[key]
//         if (typeof value === 'string') {
//           config.params[key] = config.params[key].trim()
//         }
//       })
//     }
//     store.commit('network/changeNetworkState', true)
//     return config
//   },
//   function(error) {
//     return Promise.reject(error)
//   }
// )

enhancedAxios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const history = useHistory();
      console.log(history);
      history.push('/login');
    if (!error.response) {
      console.log(error)
    } else if (403 === error.response.status) {
      const history = useHistory();
      console.log(history);
      history.push('/login');
    } else {
      return Promise.reject(error)
    }
  }
)

export default async function(method, url, data) {
  let params = data;
  if (method !== 'post' && method !== 'put') {
    params = {
      params: data,
    }
  } else {
    params = qs.stringify(data)
  }

  try {
    return await enhancedAxios[method](url, params);
  } catch(error) {
    return error;
  }
}