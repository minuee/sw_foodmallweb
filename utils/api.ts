import axios,{AxiosResponse} from 'axios';
import * as Cookies from "utils/cookies";
import customfetch from 'utils/customfetch';
axios.defaults.withCredentials = false;
axios.defaults.timeout = 5000; //5s
const API_SERVER_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const API_PUBLIC_CLIENT_BASE_URL = process.env.NEXT_PUBLIC_CLIENT_BASE_URL;
axios.interceptors.request.use(
  async function (config) {
    config.baseURL = API_SERVER_BASE_URL;
    config.withCredentials = true;
    const strToken = Cookies.getCookie("currentUser");
    const obj = {
        "mem_id" : strToken?.mem_id,
        "token" : strToken?.token
    } as any;
    config.headers["Cookie"] = `currentUser=${JSON.stringify(obj)}`;
   const customCookie = `{"mem_id":"${strToken?.mem_id}"},token=${strToken?.token};`;
    await Cookies.setCookie("currentUser", customCookie, {
      path: "/",
      httpOnly: false
    }); 
    config = {...config, withCredentials: true}
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export type ApiResponse<T> = Promise<AxiosResponse<T>>;
type State = 'true' | 'false';
export type ServiceResponse<T> = {
  state: State;
} & T;

export const get = async (url:string) => {
  const data = await axios
    .get(`${API_SERVER_BASE_URL}${url}`)
    .then((response) => response.data);
  return data;
};

export const fullUrlGet = async (url:string) => {
  const TMP_API_SERVER_BASE_URL = "";
  const data = await axios
    .get(`${TMP_API_SERVER_BASE_URL}${url}`)
    .then((response) => response.data);
  return data;
};

const createAxiosInstance = (withCredentials = false) => {
  const strToken = Cookies.getCookie("currentUser");
  console.log('setLoading strToken', strToken);
  let obj = null 
  
  let headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    'Authorization' : ''
  };
  if ( strToken != null ) {
    obj = {
        "mem_id" : strToken?.mem_id,
        "token" : strToken?.token
    } as any; 
    headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization' : `currentUser=${JSON.stringify(obj)}`
    };
  }else{
    
  }

  const instance = axios.create({
    withCredentials,
    headers,
    timeout : 50000
  })
  return instance;
}

//insert
export const post = async (url:string, payload : any, options? : any) => {

  let response;
  const baseURL = `${url}`;
  const axiosInstance = createAxiosInstance(true);
  response = await axiosInstance.post(baseURL, payload);
  
  return response?.data;

};

export const customPost = async (url:string, payload : any, options? : any) => {
  const TMP_API_SERVER_BASE_URL = API_SERVER_BASE_URL;//API_SERVER_BASE_URL;//"http://127.0.0.1:3000";
  const strToken = await Cookies.getCookie("currentUser");
  console.log('setLoading strToken', strToken);
  const customCookie = `currentUser={"mem_id":"${strToken?.mem_id}"},token=${strToken?.token};`;

  let returnCode = {code:'9999'} as any;
  const data = await customfetch.callAPI( 
    `${TMP_API_SERVER_BASE_URL}${url}`,
    {
      method: 'POST', 
      headers: new Headers({
          'Accept': 'application/json',                
          'Content-Type': 'application/json; charset=UTF-8',
          'Cookie' : JSON.stringify(customCookie)
      }),
      body: JSON.stringify(payload)
    },10000).then(response => {
      console.log('setLoading response',response, );  
        if ( response?.state == true || response?.state == 'true' || response?.result == 'success' || response?.result == 'true' ) {
            returnCode = {code:'0000',data:{...response, state : ( response?.state == true || response?.state == 'true' ) ? 'true' : 'false' }}
        }else if ( response?.statusCode == '401' && response?.error == 'Unauthorized' ) {
            returnCode = {code:'4001',state:false}
        }else{
            returnCode = {code:'9999',msg:response?.message,state:false}
        }
      return response
  })
  .catch(err => {
      return {
        state :false,
        message : err
      }
  });
  return data;
};

export const defaultFetch = async(url:string, payload : any, options? : any) => {
  const TMP_API_SERVER_BASE_URL = "";//API_SERVER_BASE_URL;//API_SERVER_BASE_URL;//"http://127.0.0.1:3000";
  const strToken = await Cookies.getCookie("currentUser");
  console.log('setLoading strToken', strToken);
  const customCookie = `currentUser={"mem_id":"${strToken?.mem_id}"},token=${strToken?.token};`;


  const res = await fetch(`${TMP_API_SERVER_BASE_URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Cookie' : JSON.stringify(customCookie)
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json());

  return res;
}

//insert
export const post2 = async (url:string, payload : any, options? : any) => {
  //임시로 staff_id : msk2417
  let repayload = {
    ...payload
  }

  const data = await axios
    .post(
      `${API_SERVER_BASE_URL}${url}`,
      repayload
    )
    .then((response) => response.data);
  return data;

};

//full rul insert
export const fullUrlPost = async (url:string, payload : any, options? : any) => {
  let repayload = {...payload,staff_id : 'nsn'}
  const TMP_API_SERVER_BASE_URL = "";
  const data = await axios
    .post(`${TMP_API_SERVER_BASE_URL}${url}`, repayload, options)
    .then((response) => response.data);
  return data;
};
//update
export const put = async (url:string, payload : any, options? : any) => {

  const data = await axios
    .put(`${API_SERVER_BASE_URL}${url}`, payload, options)
    .then((response) => response.data);
  return data;
};

//update for one
export const patch = async (url:string, payload : any, options? : any) => {
  const data = await axios
    .patch(`${API_SERVER_BASE_URL}${url}`, payload, options)
    .then((response) => response.data);
  return data;
};

//delete
export const removeOne = async (url:string) => {
  const data = await axios
    .delete(`${API_SERVER_BASE_URL}${url}`)
    .then((response) => response.data);
  return data;
};

export const removeMany = async (url:string, payload : any) => {
  const data = await axios
    .post(`${API_SERVER_BASE_URL}${url}`, payload)
    .then((response) => response.data);
  return data;
};
