import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import IMG_ROOM1 from "@images/reservation/sungwon.png";

import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

import SnsPopupDetail from "components/popup/mobile/SnsDetail"

const heights = [150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 30, 50, 80];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function SNSSCreen() {

  const { t } = useTranslation(['common','yakwan']);
  const [ showPopup, setShowPopup ] = React.useState(false);
  return (
    <Box sx={{ maxWidth:'100vw',padding:'10px',bgcolor: 'background.paper',zIndex:1  }}>
      <Typography variant="sourceHanSans" sx={{color:'#555',fontSize:'1.5em',lineHeight:'2em'}}>
         {t('common.navname.sns')}
      </Typography>
      <Masonry columns={3} spacing={1}>
        {heights.map((height, index) => (
          <Item key={index} sx={{ height }} onClick={()=>setShowPopup(true)}>
            <Image 
              src={IMG_ROOM1}  
              alt="slide" 
              style={{
                width:'100%', height:'100%',
                objectFit: 'cover',
                opacity:0.9
              }}
            />
          </Item>
        ))}
      </Masonry>
      {
        showPopup && (
            <Drawer
                open={showPopup}
                onClose={() => {
                  setShowPopup(false);
                }}
                lockBackgroundScroll={false}
                enableOverlay={true} //toggle off == flase
                direction='bottom'
                className='bla bla bla'
                size={"70vh"}
                style={{
                    overflow: 'hidden',
                    backgroundColor:'transparent',

                }}
                zIndex={999}
            >
                <SnsPopupDetail
                    setPopDetailOpen={setShowPopup}
                />
            </Drawer>
        )
    }
    </Box>
  );
}