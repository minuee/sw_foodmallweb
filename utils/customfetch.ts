
// 하단 how to use 참고
class CustomAPiFetch {

    // '', null, undefinded, 빈객체{} 체크
    isEmpty = (str:string) => {
        return str === null || str === undefined || str === '' || (typeof str === 'object' && Array.isArray(str) === false && Object.keys(str).length === 0);
    };

    // call API with timeout Function, default limit = 30 seconds
    callAPI = async (url:string, options:any = null, FETCH_TIMEOUT:any = 30000, signal:any = null) => {
        const myTimeout = this.isEmpty(FETCH_TIMEOUT) ? 30000 : FETCH_TIMEOUT;
        return this.requestAPI(url, options, myTimeout, signal);
    };

    requestAPI = async (url:string, options:any = null, FETCH_TIMEOUT = 30000, signal = null) => {
        const apiKey = null;
        try {
          if (options === null) {
            options = {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=UTF-8'
              },
            };
          } else {
            const tmpHeaders = options.headers
              ? typeof options.headers.map !== 'undefined'
                ? options.headers.map
                : options.headers
              : {
                  Accept: 'application/json',
                  'Content-Type': 'multipart/form-data',
                };
            let arrHeaders = [] as any;
            let arrHeaderKeys = [] as any;
            Object.keys(tmpHeaders).forEach(item => {
              arrHeaders[item.toLowerCase()] = tmpHeaders[item];
              arrHeaderKeys.push(item.toLowerCase());
            });
            let newHeaders = {} as any;
            arrHeaderKeys.forEach((value:any, index:any) => {
              let objKey = '';
              if (value === 'accept') {
                objKey = 'Accept';
              } else if (value === 'content-type') {
                objKey = 'Content-Type';
              } else if (value === 'apikey') {
                objKey = 'ApiKey';
              } else {
                objKey = value;
              }
              const obj = {[objKey]: arrHeaders[value]};
              newHeaders = {...newHeaders, ...obj};
            });
            const contentType =
            //options.method && options.method.toUpperCase() === 'POST'
            //? 'multipart/form-data'
            options.method && options.method.toUpperCase() === 'PUT' || options.method && options.method.toUpperCase() === 'DELETE'
            ? 'application/x-www-form-urlencoded'
            : 'application/json; charset=UTF-8';
            const receivedApiKey = newHeaders.ApiKey ? newHeaders.ApiKey : newHeaders.apiKey;
            options.headers = {
              ...newHeaders,
              'Content-Type': contentType, 
              ApiKey: receivedApiKey ? receivedApiKey : apiKey,
            };
          }
          const response = await this.fetchWithTimout(url, options, FETCH_TIMEOUT, signal) as any;
      
          ///const responseJson = await response.json();
      
          return response.json();
        } catch (error:any) {
            throw new Error(error);
        }
      };

    // fetch with timeout
    fetchWithTimout = async (url:string, options:any = null, FETCH_TIMEOUT:number = 30000, signal:any) => {
        return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('timeout')), FETCH_TIMEOUT),
        ),
        ]);
    };
}

const CustomFetch = new CustomAPiFetch();
export default CustomFetch;

