import * as React from 'react';
import * as apiObject from '@utils/api';

const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENTID;
const NAVER_REDIRECT_URL = process.env.NEXT_PUBLIC_NAVER_REDIRECT_URL;
const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=false&redirect_uri=${NAVER_REDIRECT_URL}`


export const useNaverCallback = () => {
    try{
        fetch(NAVER_AUTH_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
            body: ``,
        })
        .then(response => response.json())
        .then(result => {
          if (result.token) {
            return {
                state : true,
                token : result.token
            }
          }
        });
       
    }catch(e:any){
        return {
            state : false
        }
    }
}


export const useNaverUserCallback = async(token : string) => {
    try{
        const url = '/sr_system_api/member/member.php?action=login';
        const payload = {
            kakaoAccessToken: token,
            nickname: '',
        };
        const res = await apiObject.post(url, payload);
        if (res.state == 'true') {
        }else{

        }
       
    }catch(e:any){
        return {
            state : false
        }
    }
}

