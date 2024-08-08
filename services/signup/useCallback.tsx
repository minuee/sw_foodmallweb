import * as React from 'react';
import * as apiObject from '@utils/api';

const useSocialCallback = (access_token:any) => {
    //여기서 백엔드서버랑 통신한다
    try{
        return true;
    }catch(e:any){
        return false;
    }
}

export default useSocialCallback;
