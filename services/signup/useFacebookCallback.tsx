import * as React from 'react';
import * as apiObject from '@utils/api';

const FACEBOOK_CLIENT_ID = process.env.NEXT_PUBLIC_FACEBOOK_CLIENTID;
const FACEBOOK_REDIRECT_URI = process.env.NEXT_PUBLIC_FACEBOOK_REDIRECT_URL;
const FACEBOOK_AUTH_URL = `https://www.facebook.com/v16.0/dialog/oauth?client_id=${FACEBOOK_CLIENT_ID}&redirect_uri=${FACEBOOK_REDIRECT_URI}&state=${Math.random().toString(36).substring(3, 14)}&scope=public_profile,email`;

const FACEBOOK_TOKEN_URL = `https://graph.facebook.com/v16.0/oauth/access_token`;

export const useFacebookCallback = () => {
    try{
        fetch(FACEBOOK_AUTH_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
            body: ``,
        })
        .then(response => response.json())
        .then(result => {
          if (result?.data?.access_token) {
            return {
                state : true,
                token : result?.data?.access_token
            }
          }
        });
       
    }catch(e:any){
        return {
            state : false
        }
    }
}


export const useFacebookUserCallback = async(token : string) => {
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

