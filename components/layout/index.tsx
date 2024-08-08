import * as React from 'react';
import { ComponentProps, useEffect } from 'react';
import { globalScrollPostion,sidebarState,globalOpenReservation,globalDropDownLocale,loadingState } from '@stores/layoutStore';
import { accessEnvirmentInfo,accessForceDesktop  } from '@stores/envStore';
import Box from '@mui/material/Box';
import { useRecoilState } from 'recoil';
import { usePathname } from 'next/navigation'
import Skeleton from '@mui/material/Skeleton';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
import functions from '@utils/functions';
import theme from 'styles/theme';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import * as localStorage from '@utils/localStorage';

import PopReservation from "components/popup/Reservation";

import * as apiObject from '@utils/api';
import codeService from 'services/commonCode';



type LayoutProps = ComponentProps<'main'>;
  
export default function Layout({ children }: LayoutProps) {

  const pathname = usePathname();
  const [globalLoading, setGlobalLoading] = useRecoilState(loadingState);
  const [scrollPosition, setScrollPosition] = useRecoilState(globalScrollPostion);
  const [isOpenReservation, setOpenReservation] = useRecoilState(globalOpenReservation);
  const [isDropDownLocale, setDropDownLocale] = useRecoilState(globalDropDownLocale);
  const [accessInfo] = useRecoilState(accessEnvirmentInfo);
  const [forceDesktop, setForceDesktop] = useRecoilState(accessForceDesktop);
  const [navOpen, setNavOpen] = useRecoilState(sidebarState);
  const [visible, setVisible] = React.useState(true);

  useEffect(() => {
    async function getCommonCode() {
      const localCommonCode:any = await localStorage.getItem("commonCode");
      if ( functions.isEmpty(JSON.parse(localCommonCode))) {
        setupCommonCode();
      }else{
        setGlobalLoading(false)
      }
    }
    getCommonCode()
  }, []);

  const setupCommonCode = async() => {
    try {
      const url = '/sr_system_api/common/init.php?action=getCodeInfo';
      const res = await apiObject.get(url);
      if (res.state == 'true') {
          localStorage.setItem("commonCode", JSON.stringify(res?.row));
          setGlobalLoading(false)
      }else {

      }
  }catch (error:any) {
      console.log('config error', error);
      if (error) {

      }
  }
  }

  const isGlobalDesktop = React.useMemo(() => {
    return functions.isGlobalDesktop(accessInfo.isDesktop, accessInfo.isTablet,)
  }, [accessInfo,forceDesktop]);

  const isShowBottomTab = React.useMemo(() => {
    return functions.isShowBottomTab(pathname)
  }, [accessInfo,forceDesktop]);
  const isShowHeaderTab = React.useMemo(() => {
    return ( pathname.includes("signup") || pathname.includes("login") ) ? false : true;
  }, [accessInfo,forceDesktop]);
  


  useEffect(() => {
    const handleScroll = () => {
      const moving = window.pageYOffset;
      setVisible(scrollPosition > moving);
      setScrollPosition(moving);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  const onHandleNavOpen = (bool:boolean) => {
    setNavOpen(bool)
  };
  const sideBarClose = () => {
    if ( navOpen ) setNavOpen(false);
    setDropDownLocale(false)
  };

  if ( globalLoading ) {
    return (
      <Skeleton
        animation="wave"
        height={"100vh"}
        width="100%"
        style={{ padding: "0" }}
      />
    )
  }
    
  return (
    <>
      {
        !isGlobalDesktop 
        ?
        <Header handleNavOpen={() => onHandleNavOpen(!navOpen)} isVisible={visible} />
        : 
        isShowHeaderTab  
        ?
        <Header handleNavOpen={() => onHandleNavOpen(!navOpen)} isVisible={visible} />
        :
        null  
      }
      {
        isGlobalDesktop ?
        <MainDesktop  onClick={() => sideBarClose()}   theme={theme}>
          {children}
        </MainDesktop>
        :
        <Main  onClick={() => sideBarClose()}   theme={theme}>
          {children}
        </Main>
      }

      { ( !isGlobalDesktop && isShowBottomTab && visible ) && <Footer />}
      { ( !isGlobalDesktop && isShowHeaderTab ) && <Nav isOpen={navOpen} handleOpen={setNavOpen} />}
      {
        isOpenReservation != 0 && (
          <Box sx={styles.bookingWrapper}>
            <Drawer
              open={isOpenReservation != 9}
              onClose={() => {
                setOpenReservation(0);
              }}
              lockBackgroundScroll={true}
              overlayColor={"#000"}
              overlayOpacity={0.7}
              enableOverlay={true} //toggle off == flase
              direction='bottom'
              className='bla bla bla'
              size={"100vw"}
              style={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                width:'100%',
                height:'100vh',
                backgroundColor:'transparent',
                zIndex:99999
              }}
              zIndex={999}
            >
              <PopReservation
                  setShowPopDetail={setOpenReservation}
                  activeIndex={isOpenReservation}
              />
            </Drawer>
          </Box>
        )
      }
    </>
  );
}

const styles = {
  bookingWrapper : {
    position:'absolute',left:0,top:0,width:'100%',height:'100vh',display:'flex',justifyContent:'center',alignItems:'center', backgroundColor:'transparent',zIndex:100
  }
}
  
const Main = styled.main`
  padding-top: ${({ theme }) => theme.mobileHeaderHeight}px;
  padding-bottom: ${({ theme }) => theme.mobileHeaderHeight}px;
  min-height: calc(100vh - ${({ theme }) => theme.mobileHeaderHeight}px);
  width: 100%;
  background: #ffffff 0% 0% no-repeat padding-box;
`;

const MainDesktop = styled.main`
  min-height: calc(100vh - ${({ theme }) => theme.mobileHeaderHeight}px);
  width: 100%;
  background: #ffffff 0% 0% no-repeat padding-box;
`;
  