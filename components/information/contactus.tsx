import * as React from 'react';
import { Box, Typography,Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Divider from '@mui/material/Divider';
import ICOM_CALL from "@icons/icon_callcenter.png";
export default function ContactUs() {

  const { t } = useTranslation(['common','yakwan']);
  return (
    <Box sx={{ maxWidth:'100vw',bgcolor: 'background.paper',zIndex:1  }}>
      <Box sx={{ display:'flex',flexDirection:'column',widht:'100%',padding:'10px'}}>
        <Divider textAlign="left"><Typography sx={{color:'#555',fontSize:'1em',lineHeight:'2em',fontWeight:'bold'}}>{t('common.navname.contactus')}</Typography></Divider>
        <Box sx={{ display:'flex',flexDirection:'column',widht:'100%',alignItems:'center',padding:'15px 5px'}}>
          <Image src={ICOM_CALL} width={60} height={60} alt={'logo'} />
          <Box sx={{height:'30px'}} />
          <Typography variant="sourceHanSans" sx={{color:'#555',fontSize:'1.5em',lineHeight:'1em',fontWeight:'normal'}}>
            24시간 상담가능
          </Typography>
          <a href="tel:18111811" style={{textDecoration: "none"}}>
          <Typography variant="sourceHanSans" sx={{color:'#555',fontSize:'2em',lineHeight:'2em'}}>
            1811-1811
          </Typography>
          </a>
          <Box sx={{height:'30px'}} />
          <Typography variant="sourceHanSans" sx={{color:'#555',fontSize:'0.8em',lineHeight:'1em',fontWeight:'normal'}}>
            대표 번호를 누르고 내선을 선택시 담담자와 직접 연결됩니다.
          </Typography>
        </Box>
       </Box>

       <Box sx={{ display:'flex',flexDirection:'column',widht:'100%',padding:'10px'}}>
        <Divider textAlign="left"><Typography sx={{color:'#555',fontSize:'1em',lineHeight:'2em',fontWeight:'bold'}}>상담번호</Typography></Divider>
        <Box sx={{ display:'flex',flexDirection:'column',widht:'100%',alignItems:'center',padding:'15px 5px'}}>
          <Typography variant="sourceHanSans" sx={{color:'#555',fontSize:'1em',lineHeight:'1.5em',fontWeight:'normal'}}>
            1번 : 아뜰리에
          </Typography>
          <Typography variant="sourceHanSans" sx={{color:'#555',fontSize:'1em',lineHeight:'1.5em',fontWeight:'normal'}}>
            2번 : 성원정
          </Typography>
          <Typography variant="sourceHanSans" sx={{color:'#555',fontSize:'1em',lineHeight:'1.5em',fontWeight:'normal'}}>
            3번 : 성원뷔폐
          </Typography>
          <Typography variant="sourceHanSans" sx={{color:'#555',fontSize:'1em',lineHeight:'1.5em',fontWeight:'normal'}}>
            4번 : 레스토랑
          </Typography>
          <Typography variant="sourceHanSans" sx={{color:'#555',fontSize:'1em',lineHeight:'1.5em',fontWeight:'normal'}}>
            0번 : 상담원 연결
          </Typography>
          <Box sx={{height:'30px'}} />
          <Typography variant="sourceHanSans" sx={{color:'#555',fontSize:'0.8em',lineHeight:'1em',fontWeight:'normal'}}>
            담당자와 통화가 어려우신 경우, 1:1상담에 문의하시면 최대한 빠른 시간 내에 답변해 드립니다.
          </Typography>
          <Box sx={{height:'30px'}} />
          <Button
            color={"primary"}
            size='small'
            variant={"contained"}
          >
            1:1문의 바로가기
          </Button>
        </Box>
      </Box>
    </Box>
  );
}