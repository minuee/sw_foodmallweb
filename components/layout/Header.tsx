'use client'

import * as React from 'react';
import Link from "next/link"
import Image from 'next/image';
import styled from 'styled-components';
import { styled as muistyled } from '@mui/material/styles';
import { useTranslation } from 'next-i18next';
import { Typography,Box } from "@mui/material";
import theme from 'styles/theme';
//로그인 전역상태
import { accessEnvirmentInfo,accessForceDesktop } from '@stores/envStore';
///import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRecoilState } from "recoil";
import NoSsr from "@mui/material/NoSsr";
import SpeedDial, { SpeedDialProps } from '@mui/material/SpeedDial';
import SearchIcon from '@mui/icons-material/Search';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { landscapeState } from "@stores/layoutStore";
import { useWindowSize } from "@utils/useWindowSize";
import useLocaleTransfer from "services/locale/transfer";
import functions from '@utils/functions'
import { usePathname } from 'next/navigation'
import { useRouter } from "next/router";
import LogoImage from "@images/logo.png";
import LogoImage2 from "@images/bi-color.png";
import FlagKoIcon from "@icons/svg/flag_ko.svg";
import FlagCnIcon from "@icons/svg/flag_cn.svg";
import FlagJaIcon from "@icons/svg/flag_ja.svg";
import FlagEnIcon from "@icons/svg/flag_en.svg";
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import HeaderLeft from "components/home/headerLeft";
import HeaderCenter from "components/home/headerCenter";
import HeaderRight from "components/home/headerRight"

type HeaderProps = {
  isVisible? : boolean,
  handleNavOpen(isOpen:boolean): void;
};
const Header: React.FC<HeaderProps> = ({ isVisible = false,handleNavOpen}) => {
  const { t } = useTranslation(['common','yakwan']);
  const isAccessDevice =  useWindowSize();
  // 화면 가로모드 여부 확인
  const [viewLandscape, setIsLandscape] = useRecoilState(landscapeState);
  const pathname = usePathname();
  const router = useRouter()
  const {
    locale, // current locale
    locales, // all configured locales
    defaultLocale,
  } = router;
  const [accessInfo] = useRecoilState(accessEnvirmentInfo);
  const [forceDesktop] = useRecoilState(accessForceDesktop);


  const getViewLandscape = React.useMemo(() => {
    return viewLandscape;
  }, [viewLandscape]);
  
  React.useEffect(() => {
  }, [getViewLandscape]);

  const isGlobalDesktop = React.useMemo(() => {
    return functions.isGlobalDesktop(accessInfo.isDesktop, accessInfo.isTablet,forceDesktop)
  }, [accessInfo,forceDesktop]);

  const isShowHeaderTab = React.useMemo(() => {
    return pathname == "/" ? true : false;
  }, [accessInfo,forceDesktop]);

  const isShowCenterHeaderTab = React.useMemo(() => {
    return ( pathname == "/sungwonjung" || pathname == "/banquet" || pathname == "/rooms" ) ? true : false;
  }, [accessInfo,forceDesktop]);


  if ( isGlobalDesktop ) {

    const handleLocaleClick = (code:string) => {
      if ( code != locale ) {
        if ( code == "ko" ) {
          window.open(pathname);
        }else{
          window.open(`/${code}${pathname}`);
        }
        //router.replace(pathname, pathname, { locale: code })
        //router.push(`${locale}${pathname}`, `${locale}${pathname}`, { locale: false })
      }
    }

    return (
      <NoSsr>
        <HeaderComponent theme={theme} isDesktop={true} isVisible={isVisible}>
          <HeaderLeft 
            locale={locale}
          />
          {
            isShowCenterHeaderTab && (
              <HeaderCenter locale={locale} />
            )
          }
          <HeaderRight 
            locale={locale}
            handleLocaleChange={handleLocaleClick}
          />
        </HeaderComponent>
      </NoSsr>
    )
  }else{
    const [direction, setDirection] = React.useState<SpeedDialProps['direction']>('down');
    const [open, setOpen] = React.useState(false);
    const actions = [
      { icon: <Image src={FlagKoIcon} width={30} height={30} alt={'button'} />, name: '한국어',code:'ko'},
      { icon: <Image src={FlagEnIcon} width={30} height={30} alt={'button'} />, name: 'English',code:'en' },
      { icon: <Image src={FlagJaIcon} width={30} height={30} alt={'button'} />, name: '日本語',code:'ja' },
      { icon: <Image src={FlagCnIcon} width={30} height={30} alt={'button'} />, name: '中语',code:'zh-CN' },
    ];
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleLocaleClick = (code:string) => {
      if ( code != locale ) {
        /* if ( code == "ko" ) {
          window.open(pathname);
        }else{
          window.open(`${code}${pathname}`);
        } */
        router.replace(pathname, pathname, { locale: code })
        //router.push(`${locale}${pathname}`, `${locale}${pathname}`, { locale: false })
      }
      setOpen(!open)
    }
  
    const renderFlagIcon = ( lo:any ) => {
      let localeFlag = <Image src={FlagKoIcon} width={30} height={30} alt={'button'} />;
      switch(lo) {
        case "en" : localeFlag = <Image src={FlagEnIcon} width={30} height={30} alt={'button'} />;break;
        case "ja" : localeFlag = <Image src={FlagJaIcon} width={30} height={30} alt={'button'} />;break;
        case "zh-CN" : localeFlag = <Image src={FlagCnIcon} width={30} height={30} alt={'button'} />;break;
        default : localeFlag = <Image src={FlagKoIcon} width={30} height={30} alt={'button'} />;
       }
      return localeFlag;
    }
    return (
      <NoSsr>
        <HeaderComponent theme={theme} isDesktop={false} isVisible={isVisible}>
          {
          isShowHeaderTab 
          ?
          <Link href={"/"} locale={locale}>
            <Image src={LogoImage} width={59} height={36} alt={'logo'} />
          </Link>
          :
          <Box onClick={() => router.back()}>
            <ArrowBackIcon fontSize="large" sx={{color:'#fff'}} />
          </Box>
         }
          <Box sx={{flex:1,display:'flex',flexDirection:'row',alignItems:'center',paddingLeft:'20px'}}>
            <Typography variant="h6" component="h6" color={"#fff"}>
              {useLocaleTransfer(t,'common',functions.getNaviname(pathname))}
            </Typography>
          </Box>
          <Box sx={{display: "flex",flexDirection: "row",justifyContent: "center",alignItems: "center"}}>
            
            {
              isShowHeaderTab && 
              (
                <Link href={{pathname:"/search"}} style={{color:'#fff',textDecoration: "none" }}>
                  <Box sx={{display: "flex",flexDirection: "row",justifyContent: "center",alignItems: "center"}}>
                    <SearchIcon fontSize="large" sx={{color:'#fff'}} />
                  </Box>
                </Link>
              )
            }
            {
              isShowHeaderTab && 
              (
                <Box 
                  sx={{display: "flex",flexDirection: "row",justifyContent: "center",alignItems: "center", marginRight : '50px'}}
                  onClick={() => handleNavOpen(true)}
                >
                  <MenuIcon fontSize="large" sx={{color:'#fff'}} />
                </Box>
              )
            }
  
            <StyledSpeedDial
              color="primary"
              ariaLabel="SpeedDial playground example"
              open={open}
              icon={renderFlagIcon(locale)}
              direction={direction}
              onClose={handleClose}
              onOpen={handleOpen}
              sx={{ '& .MuiFab-primary': { backgroundColor: '#fff', color: '#fff', width: 40, height: 30 } }}
            >
              {actions.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  tooltipOpen={false}
                  onClick={()=> handleLocaleClick(action?.code)}
                />
              ))}
            </StyledSpeedDial>
          </Box>
        </HeaderComponent>
      </NoSsr>
    );
  }
}

export interface headerStyled {
  isDesktop? : boolean,
  isVisible? :boolean
}

const HeaderComponent = styled.header`
  display: flex;
  position: fixed;
  left:0,
  top:0,
  justify-content: flex-start;
  align-items: center;
  height: ${(props: headerStyled) => props.isDesktop ? '80px' : '65px'};
  background: ;
  background: ${(props: headerStyled) => props.isDesktop ? !props.isVisible ? 'rgba( 0, 0, 0, 0.5 )' : 'rgba( 0, 0, 0, 0 )' : 'rgba( 0, 0, 0, 0.6 )'};
  border-bottom: ${(props: headerStyled) => props.isDesktop ? '0px' : '1px solid #9f9f9f'};
  width: 100%;
  min-width: ${(props: headerStyled) => props.isDesktop ? '1000px' : '300px'};
  padding: ${(props: headerStyled) => props.isDesktop ? '0 25px' : '10px'};
  z-index:100;
`;

const StyledSpeedDial = muistyled(SpeedDial)(({ theme }) => ({
  position: 'absolute',
  '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
    bottom: theme.spacing(1),
    right: theme.spacing(2),
  },
  '&.MuiSpeedDial-fab' :{
    backgroundColor: "#fff"
  },
  '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
    top: theme.spacing(1.5),
    right: theme.spacing(0.5),
  },
}));

export default Header;