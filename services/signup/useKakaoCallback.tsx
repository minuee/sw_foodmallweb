import * as React from 'react';
import * as apiObject from '@utils/api';

const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENTID;
const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;


export const useKakaoCallback = () => {
    try{
        fetch(KAKAO_AUTH_URL, {
            method: 'GET',
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


export const useKakaoUserCallback = async(token : string) => {
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

