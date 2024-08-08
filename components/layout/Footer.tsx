"use client"; // Use Client Components

import * as React from 'react';
import styled from 'styled-components';
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PersonIcon from '@mui/icons-material/Person';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import BookIcon from '@mui/icons-material/Book';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import { accessForceDesktop,accessEnvirmentInfo } from '@stores/envStore';
import { sidebarState } from '@stores/layoutStore';
import { useRecoilState } from "recoil";
import functions from '@utils/functions'
import theme from 'styles/theme';
import AlertDialog from 'components/mui/Alert';

export default function Footer() {
  const { t } = useTranslation(['common','yakwan']);
  const router = useRouter()
  const [navOpen, setNavOpen] = useRecoilState(sidebarState);
  const [accessInfo] = useRecoilState(accessEnvirmentInfo);
  const [forceDesktop, setForceDesktop] = useRecoilState(accessForceDesktop);
  const [value, setValue] = React.useState(0);
  const [alertOpen, setAlertOpen] = React.useState({
    isOpen : false,
    title : "",
    contents : "",
    isConfirm : false
  });


  const isGlobalDesktop = React.useMemo(() => {
    return functions.isGlobalDesktop(accessInfo.isDesktop, accessInfo.isTablet,forceDesktop)
  }, [accessInfo,forceDesktop]);

  return (
    <FooterComponent theme={theme}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction 
          label="My" 
          onClick={() => setAlertOpen({
            ...alertOpen,
            isOpen : true,
            title : 'My',
            contents : '로그인이 필요합니다.'
            })
          }
          icon={<PersonIcon  />
        } />
        <BottomNavigationAction 
         onClick={() => setAlertOpen({
            ...alertOpen,
            isOpen : true,
            title : 'Booking',
            contents : '로그인이 필요합니다.'
            })
          }
          label="Booking" 
          icon={<BookIcon />} 
        />
        <BottomNavigationAction 
          label="Information" 
          icon={<QuestionMarkIcon />} 
          onClick={() =>  router.push({pathname : "notice",query:{menu : 'notice'}})}
        />
        <BottomNavigationAction 
          label="Category"
          icon={<ViewCompactIcon />} 
          onClick={() =>  setNavOpen(true)}
        />
      </BottomNavigation>
      <AlertDialog
        open={alertOpen.isOpen}
        isConfirm={alertOpen.isConfirm}
        title={alertOpen.title}
        contents={alertOpen.contents}
        setOpen={(bool) => setAlertOpen({
          ...alertOpen,
          isOpen : bool
          })
        }
      />
    </FooterComponent>
  );
}

const FooterComponent = styled.footer`
  position: fixed;
  display:flex;
  left:0;
  bottom:0;
  justify-content: center;
  align-items: center;
  padding: 0;
  height: ${({ theme }) => theme.mobileHeaderHeight}px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-top: 1px solid #9f9f9f;
  width: 100%;
  z-index:100;
`;
