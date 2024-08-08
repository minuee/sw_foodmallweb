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
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useTranslation } from 'next-i18next';
//로그인 전역상태
import { loginUserState } from '@stores/userStore';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import * as apiObject from '@utils/api';
import * as Cookies from 'utils/cookies';

import ICON_LOGO from "@images/bi-color@3x.png"

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
const nowDate =  new Date()
const nowMonth = nowDate.getMonth()+1;
const nowDateString = nowDate.getFullYear() +'.'+ nowMonth +'.'+ nowDate.getDate();

export default function SignInSide() {

  const { t } = useTranslation(['common','yakwan']);
    // 로딩 여부
    const [loginUserInfo, setLoginUserInfo] = useRecoilState(loginUserState);
    const [loading, setLoading] = React.useState(true);
    const router = useRouter();
    
    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });

        if ( data.get('email') == '') {
            return ;
        } else if ( data.get('password') == '') {
            return ;
        
        } else {
        }
    };
    

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
            backgroundPosition: 'center',
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
                id="email"
                label={t('login.input_email')}
                name="email"
                autoComplete="email"
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
                  <Link href="#" variant="body2">
                  {t('login.signup')}
                  </Link>
                </Grid>
              </Grid>
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
  }
}