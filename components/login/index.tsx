import * as React from 'react';
import Image from "next/image";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { sha1 } from 'js-sha1';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { usePathname } from 'next/navigation'
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next';
//로그인 전역상태
import { loginUserState } from '@stores/userStore';
import { useRecoilState } from 'recoil';

import * as apiObject from '@utils/api';
import * as Cookies from 'utils/cookies';

import ICON_LOGO from "@images/bi-color@3x.png"

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
const nowDate =  new Date()
const nowMonth = nowDate.getMonth()+1;
const nowDateString = nowDate.getFullYear() +'.'+ nowMonth +'.'+ nowDate.getDate();

import FlagKoIcon from "@icons/svg/flag_ko.svg";
import FlagCnIcon from "@icons/svg/flag_cn.svg";
import FlagJaIcon from "@icons/svg/flag_ja.svg";
import FlagEnIcon from "@icons/svg/flag_en.svg";
import functions from '@utils/functions';

const actions = [
  { icon: <Image src={FlagKoIcon} width={30} height={30} alt={'button'} />, name: '한국어',code:'ko'},
  { icon: <Image src={FlagEnIcon} width={30} height={30} alt={'button'} />, name: 'English',code:'en' },
  { icon: <Image src={FlagJaIcon} width={30} height={30} alt={'button'} />, name: '日本語',code:'ja' },
  { icon: <Image src={FlagCnIcon} width={30} height={30} alt={'button'} />, name: '中语',code:'zh-CN' },
];

export default function SignInSide() {
    const { t } = useTranslation(['common','yakwan']);
    // 로딩 여부
    const [loginUserInfo, setLoginUserInfo] = useRecoilState(loginUserState);
    const [loading, setLoading] = React.useState(true);
    const pathname = usePathname();
    const router = useRouter()
    const { locale,locales,defaultLocale } = router;

    const handleClick = (code:string) => {
      if ( code != locale ) {
        router.replace(pathname, pathname, { locale: code })
      }
    }

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const str_mem_id:any = data.get('mem_id');
      const str_password:any = data.get('password');
  
      if ( str_mem_id == '') {
        functions.toastMessage(
          t("messages.errors.required_id"), 
          {
              position: "top-right"
          }
        );
        return ;
      } else if ( str_password == '') {
        functions.toastMessage(
          t("messages.errors.required_pw"), 
          {
            position: "top-right"
          }
        );
        return ;
      } else {
        try {
          setLoading(true);
          const envData = process.env.NEXT_PUBLIC_TOKEN_EXPIRE_TIME as string;
          const envExpireTime = parseInt(envData) || 1000 * 60 * 60;
          const url = '/sr_system_api/member/member.php?action=login';
          const sha1Password = sha1.hex(str_password) as any;
          const payload = {
            mem_id: str_mem_id,
            mem_pw: sha1Password,
          };
          const res = await apiObject.post2(url, payload);
          if (res.state == 'true') {
            //서버 토큰생성시
            if ( !functions.isEmpty(res.token)) {
              Cookies.setCookie('currentUser',`{"mem_id": "${str_mem_id}","token":"${res.token}"}`);
                /* const nowDate2 =  new Date()
                const nowMonth2 = nowDate.getMonth()+1;
                const nowDateString2 = nowDate2.getFullYear() +'.'+ nowMonth2 +'.'+ nowDate2.getDate();
                let expires = new Date();
                const time = expires.getTime();
                let expireTime = time + envExpireTime; //1hour
                expires.setTime(expireTime); */
              setTimeout(() => {
                fn_getUserInfo(res.token, payload)
                /*setLoginUserInfo({
                  mem_id: str_mem_id,
                  mem_name: str_mem_id,
                  email: "",
                  mobile: "",
                  token: res.token,
                  state : res?.state
                });
                setTimeout(() => router.replace('/'), 500); */
              }, 500);
            }
          }else {
            functions.toastMessage(
              t("messages.errors.invalidCredential"), 
              {
                position: "top-right"
              }
            )
            setLoading(false);
          }
        }catch (error:any) {
          functions.toastMessage(
            t("messages.errors.et_error"), 
            {
                position: "top-right"
            }
          )
          if (error) {
            setLoading(false);
          }
        }
      }
    };

    const fn_getUserInfo = async( token : string, data : any) => {
      try {
        setLoading(true);
        const envData = process.env.NEXT_PUBLIC_TOKEN_EXPIRE_TIME as string;
        const envExpireTime = parseInt(envData) || 1000 * 60 * 60;
        const url = '/sr_system_api/member/member.php?action=info';
        const payload = {
        };
        const res = await apiObject.defaultFetch(url, payload) as any;
        console.log('setLoading 1', res);
        if (res?.state == 'true') {
          setLoginUserInfo({
            mem_id: res?.row?.mem_id,
            mem_name: res?.row?.mem_name,
            email:res?.row?.email,
            mobile: res?.row?.mobile,
            token: token,
            state : res?.state
          });
          setTimeout(() => router.replace('/'), 500);
        }else {
          
          functions.toastMessage(
            t("messages.errors.et_error"), 
            {
              position: "top-right"
            }
          );
          setLoading(false);
          setLoginUserInfo({
            mem_id: data.mem_id,
            mem_name: data.mem_id,
            email: "",
            mobile: "",
            token: token,
            state : 'true'
          });
          setTimeout(() => router.replace('/'), 500);
        }
      }catch (error:any) {
        console.log('config error', error);
        if (error) {
            setLoading(false);
        }
      }
    }

    return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box sx={styles.inputWrapper}>
            <Box sx={{display:'flex',margin:"10px 0"}}>
              <Image 
                alt={"sub"}
                src={ICON_LOGO}
                placeholder="blur"
                style={{width:'118px',height:"72px"}}
              />
            </Box>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="mem_id"
                label={t('login.input_userID')}
                name="mem_id"
                autoComplete="mem_id"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label={t('login.rememberme')}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
               {t('login.signin')}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                  {t('login.forgot_password')}
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                  {t('login.signup')}
                  </Link>
                </Grid>
              </Grid>
            </Box>
            <Box sx={styles.localeWrapper}>
              {
                actions.map((action,index) => (
                <Box onClick={()=> handleClick(action?.code)} style={styles.boxWrapper} key={index}>
                    {action.icon}
                </Box>
                ))
              }
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

const styles = {
  inputWrapper : {
    my: 8,mx: 10,display: 'flex',flexDirection: 'column',alignItems: 'center'
  },
  localeWrapper : {
    display:'flex',flexDirection:'row',width:'100%',justifyContent:'center',marginTop:"30px"
  },
  boxWrapper : {
    padding:"0 10px",cursor:'pointer'
  }
}