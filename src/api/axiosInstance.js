import axios from "axios";
import { redirect } from "react-router-dom";


export const baseURL = process.env.REACT_APP_URL_BASE;
export const appTokenLabel = process.env.REACT_APP_TOKEN_LABEL;
export const auditValue = "lanfia_0501AO2";

export const instance = axios.create({
  baseURL: `${baseURL}/api/`,
  validateStatus: function (status) {
    return status >= 200 && status < 300;
  },
});

export const attacheImageUrl = (url)=>{
  return `${baseURL}${url}`
}


 instance.interceptors.response.use(
   (response) => response,
   (error) => {
     if (error.response && error.response.status === 401) {
       localStorage.removeItem(appTokenLabel);
       redirect("/"); 
     }
     return Promise.reject(error);
   }
 );

export const configHeadersToken = () => {
  const token = localStorage.getItem(appTokenLabel);
    return {
          headers:{
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + token 
      }
    }
}
  
export const configHeadersFormDataToken = () => {
  const token = localStorage.getItem(appTokenLabel)
  return {
          headers:{
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}` 
    }
  }
}













