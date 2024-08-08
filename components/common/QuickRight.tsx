'use client'

import * as React from 'react';
import Link from "next/link"
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { Typography,Box } from "@mui/material";

import NoSsr from "@mui/material/NoSsr";
import BgImage from "@images/sungwonjung/sub-quick-bar-box.png";

import IconInfo from "@images/sungwonjung/icon-sub-quick-info.png";
import IconEvent from "@images/sungwonjung/icon-sub-quick-event.png";
import IconReservation from "@images/sungwonjung/icon-sub-quick-reservation.png";
type QuickRightProps = {
  isMode? : string;
  openQuickMenu: (num: number) => void;
};
const QuickRight : React.FC<QuickRightProps> = ({isMode,openQuickMenu}) => {
  const { t } = useTranslation(['common','yakwan']);

  const renderMenuText = () => {
    if ( isMode == 'sungwonjung') {
      return t("sub.quickmenu.sungwonjung");
    }else if ( isMode == 'banquet') {
      return t("sub.quickmenu.banquet");
    }else{
      return t("sub.quickmenu.room");
    }
  }

  return (
    <NoSsr>
      <Box sx={styles.mainWrapper}>
        <Image 
          src={BgImage}  
          alt="slide" 
          style={{width:'90px', height:'286px',objectFit: 'cover',zIndex:1}}
        />  
        <Box sx={styles.topWrapper} onClick={() => openQuickMenu(1)}>
          <Image 
            src={IconInfo}  
            alt="slide" 
            style={{width:'25px',objectFit: 'contain',marginBottom:'3px'}}
          />  
          <Typography variant="sourceHanSans" sx={styles.titleStyle}>
            {renderMenuText()}
          </Typography>
        </Box>
        <Box sx={styles.middleWrapper} onClick={() => openQuickMenu(2)}>
          <Image 
            src={IconEvent}  
            alt="slide" 
            style={{width:'25px',objectFit: 'contain',marginBottom:'3px'}}
          />  
          <Typography variant="sourceHanSans" sx={styles.titleStyle}>
            {t("sub.quickmenu.event")}
          </Typography>
        </Box>
        <Box sx={styles.bottomWrapper} onClick={() => openQuickMenu(3)}>
          <Image 
            src={IconReservation}  
            alt="slide" 
            style={{width:'25px',objectFit: 'contain',marginBottom:'3px'}}
          />  
          <Typography variant="sourceHanSans" sx={styles.titleStyle}>
            {t("sub.quickmenu.reservation")}
          </Typography>
        </Box>
      </Box>
    </NoSsr>
  );
}

const styles = {
  mainWrapper : {
    display:'flex',width:'90px',height:'286px',flexDirection:'column',backgroundColor:'transparent'
  },
  topWrapper : {
    position:'absolute',left:0,top:0,display:'flex',width:'100%',height:'110px',justifyContent:'center',alignItems:'center',flexDirection:'column',zIndex:2,cursor:'pointer'
  },
  middleWrapper : {
    position:'absolute',left:0,top:85,display:'flex',width:'100%',height:'110px',justifyContent:'center',alignItems:'center',flexDirection:'column',zIndex:2,cursor:'pointer'
  },
  bottomWrapper : {
    position:'absolute',left:0,top:170,display:'flex',width:'100%',height:'110px',justifyContent:'center',alignItems:'center',flexDirection:'column',zIndex:2,cursor:'pointer'
  },
  titleStyle : {
    color:'#fff',fontSize:'13px',lineHeight:'normal',letterSpacing:"-0.28px",opacity:0.8,fontWeight:'500'
  }
}

export default QuickRight;