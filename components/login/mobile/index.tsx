import * as React from 'react';
import Image from 'next/image';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { usePathname } from 'next/navigation'
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next';

import FlagKoIcon from "@icons/svg/flag_ko.svg";
import FlagCnIcon from "@icons/svg/flag_cn.svg";
import FlagJaIcon from "@icons/svg/flag_ja.svg";
import FlagEnIcon from "@icons/svg/flag_en.svg";

const actions = [
  { icon: <Image src={FlagKoIcon} width={30} height={30} alt={'button'} />, name: '한국어',code:'ko'},
  { icon: <Image src={FlagEnIcon} width={30} height={30} alt={'button'} />, name: 'English',code:'en' },
  { icon: <Image src={FlagJaIcon} width={30} height={30} alt={'button'} />, name: '日本語',code:'ja' },
  { icon: <Image src={FlagCnIcon} width={30} height={30} alt={'button'} />, name: '中语',code:'zh-CN' },
];

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
       FoodMall. all rights reserved.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignIn() {
  const { t } = useTranslation(['common','yakwan']);
  const pathname = usePathname();
  const router = useRouter()
  const {
    locale, // current locale
    locales, // all configured locales
    defaultLocale,
  } = router;
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  const handleClick = (code:string) => {
    
    if ( code != locale ) {
      /* if ( code == "ko" ) {
        window.open(pathname);
      }else{
        window.open(`${code}${pathname}`);
      } */
      router.replace(pathname, pathname, { locale: code })
    }

  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={{paddingTop: 10,display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('login.signin')}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            label={t('login.input_password')}
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
          <Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'center',margin:"10px 0"}}>
            {actions.map((action,index) => (
              <Box onClick={()=> handleClick(action?.code)} style={{padding:"0 10px"}}>
                {action.icon}
              </Box>
            ))}
          </Box>
          <Grid container>
            <Grid item xs>
              <Link href="/" variant="body2">
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
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}