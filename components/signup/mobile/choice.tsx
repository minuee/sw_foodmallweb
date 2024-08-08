import * as React from 'react';
import { useGoogleLogin } from "@react-oauth/google";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Button, Container, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';

import useSocialCallback from "@service/signup/useCallback";
import { useKakaoCallback,useKakaoUserCallback}  from "@service/signup/useKakaoCallback";
import { useFacebookCallback,useFacebookUserCallback}  from "@service/signup/useFacebookCallback";
import { useNaverCallback,useNaverUserCallback}  from "@service/signup/useNaverCallback";

type ChoiceProps = {
    onDateChange(data:any): void;
}
const ChoiceProps: React.FC<ChoiceProps> = ({ onDateChange}) => {

    const googleLogin = useGoogleLogin({
        onSuccess: async (response) => {
            await useSocialCallback(response.access_token);
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const kakaoLogin = async() => {
        const res:any = await useKakaoCallback();
        if ( res?.state ) {
            const isMember = await useKakaoUserCallback(res?.token);
        }
    }

    const facebookLogin = async() => {
        const res:any = await useFacebookCallback();
        if ( res?.state ) {
            const isMember = await useFacebookUserCallback(res?.token);
        }
    }

    const naverLogin = async() => {
        const res:any = await useNaverCallback();
        if ( res?.state ) {
            const isMember = await useNaverUserCallback(res?.token);
        }
    }

    return (
        <List sx={{ width: '100%',bgcolor: 'background.paper' }}>
            <Box sx={{padding:'0 10px', margin:'20px 0'}}>
            <Divider textAlign="left" sx={{padding:'0px'}}><Typography>가입방법 선택</Typography></Divider>
            </Box>
            <Divider />
            <ListItem onClick={()=>onDateChange("1")}>
                <ListItemText id="switch-list-label-wifi" primary="성원으로 가입하기" />
                <ArrowForwardIosIcon />
            </ListItem>
            <Divider />
            <ListItem onClick={()=>onDateChange("1")}>
                <ListItemText id="switch-list-label-wifi" primary="푸드몰로 가입하기" />
                <ArrowForwardIosIcon />
            </ListItem>
            <Divider />
            <ListItem onClick={()=>kakaoLogin()}>
                <ListItemText id="switch-list-label-bluetooth" primary="카카오로 가입하기" />
                <ArrowForwardIosIcon />
            </ListItem>
            <Divider />
            <ListItem onClick={()=>naverLogin()}>
                <ListItemText id="switch-list-label-bluetooth" primary="네이버로 가입하기" />
                <ArrowForwardIosIcon />
            </ListItem>
            <Divider />
            <ListItem onClick={()=>facebookLogin()}>
                <ListItemText id="switch-list-label-bluetooth" primary="페이스북으로 가입하기" />
                <ArrowForwardIosIcon />
            </ListItem>
            <Divider />
            <ListItem onClick={()=>googleLogin()}>
                <ListItemText id="switch-list-label-bluetooth" primary="구글로 가입하기" />
                <ArrowForwardIosIcon />
            </ListItem>
            <Divider />
        </List>
    );
}

export default ChoiceProps;