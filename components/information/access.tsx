import * as React from 'react';
import { Box, Button, Container, Typography } from "@mui/material";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { accessEnvirmentInfo } from '@stores/envStore';
import { useRecoilState } from "recoil";
import Divider from '@mui/material/Divider';

declare global {
  interface Window {
    kakao:any
  }
}

export default function Access() {
  const { t } = useTranslation(['common','yakwan']);
  const [accessInfo, setAccessInfo] = useRecoilState(accessEnvirmentInfo);

  React.useEffect(() => {
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=48093f061df44e9d08fdfa5a16ed91a7&autoload=false`;
    document.head.appendChild(kakaoMapScript)
    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        let container = document.getElementById('kakaomap')
        let options = {
          center: new window.kakao.maps.LatLng(37.561747, 126.995935),
          level: 3,
        }
        let kakaomap = new window.kakao.maps.Map(container, options)
        // 마커가 표시될 위치입니다 
        let markerPosition  = new window.kakao.maps.LatLng(37.561750, 126.995095); 

        // 마커를 생성합니다
        let marker = new window.kakao.maps.Marker({
            position: markerPosition
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(kakaomap);

        let iwContent = '<div style="padding:5px;">성원정<br /><a href="https://map.kakao.com/link/map/성원정,37.561750,126.995095" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/성원정,37.561750,126.995095" style="color:blue" target="_blank">길찾기</a></div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        iwPosition = new window.kakao.maps.LatLng(37.561750, 126.995095); //인포윈도우 표시 위치입니다

        // 인포윈도우를 생성합니다
        let infowindow = new window.kakao.maps.InfoWindow({
            position : iwPosition, 
            content : iwContent 
        });
      
        // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
        infowindow.open(kakaomap, marker);

        // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
        let zoomControl = new window.kakao.maps.ZoomControl();
        kakaomap.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
      })
    }
    kakaoMapScript.addEventListener('load', onLoadKakaoAPI)
  },[])
  return (
    <Box sx={{ maxWidth:'100vw',padding:'10px',bgcolor: 'background.paper',zIndex:1  }}>
      <Box sx={{ display:'flex',flexDirection:'column',widht:'100%',padding:'10px'}}>
        <Typography variant="sourceHanSans" sx={{color:'#555',fontSize:'1em',lineHeight:'2em'}}>
          {t('common.navname.access')}
        </Typography>
        <Box id="kakaomap" sx={ accessInfo?.isDesktop ? styles.wrapperDesktop : styles.wrapperMobile } />
      </Box>
      <Typography variant="sourceHanSans" sx={{color:'#555',fontSize:'1em',lineHeight:'2em'}}>
        성원푸드몰
      </Typography>
      <Divider textAlign="left"><Typography sx={styles.popupSubTitle}>주소</Typography></Divider>
      <Box sx={styles.miniWrapper2}>
          <Typography sx={{...styles.popupTitle,fontSize:'15px'}}>서울특별시 중구 퇴계로 211-5(충무로 4가) 성원푸드몰</Typography>
      </Box>
      <Divider textAlign="left"><Typography sx={styles.popupSubTitle}>전화</Typography></Divider>
      <Box sx={styles.miniWrapper}>
          <Typography sx={{...styles.popupTitle,fontSize:'15px'}}>식당예약</Typography>
          <Typography sx={{...styles.popupSubTitle,color:'#b2b2b2',paddingLeft:"15px"}}>
            <a href="tel:18111811" style={{textDecoration: "none"}}>1811-1811</a>
          </Typography>
      </Box>
      <Box sx={styles.miniWrapper}>
          <Typography sx={{...styles.popupTitle,fontSize:'15px'}}>객실예약</Typography>
          <Typography sx={{...styles.popupSubTitle,color:'#b2b2b2',paddingLeft:"15px"}}>
            <a href="tel:18111811" style={{textDecoration: "none"}}>1811-0011</a>
          </Typography>
      </Box>
      <Divider textAlign="left"><Typography sx={styles.popupSubTitle}>교통편</Typography></Divider>
      <Box sx={styles.miniWrapper}>
          <Typography sx={{...styles.popupTitle,fontSize:'15px'}}>지하철</Typography>
          <Typography sx={{...styles.popupSubTitle,color:'#b2b2b2',paddingLeft:"15px"}}>3,4호선 충무로역 8번출구 </Typography>
      </Box>
      <Box sx={styles.miniWrapper}>
          <Typography sx={{...styles.popupTitle,fontSize:'15px'}}>버스</Typography>
          <Typography sx={{...styles.popupSubTitle,color:'#b2b2b2',paddingLeft:"15px",display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            <Typography sx={{...styles.popupTitle,fontSize:'15px',paddingRight:"10px",}}>충무로역하차</Typography>
            공항버스 6001,6015,6021
          </Typography>
      </Box>
      <Box sx={styles.miniWrapper}>
          <Typography sx={{...styles.popupTitle,fontSize:'15px'}}>인천공항</Typography>
          <Typography sx={{...styles.popupSubTitle,color:'#b2b2b2',paddingLeft:"15px",display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            <Typography sx={{...styles.popupTitle,fontSize:'15px',paddingRight:"10px",}}>충무로역하차</Typography>
            공항버스 6001,6015,6021
          </Typography>
      </Box>
    </Box>
  );
}



const styles = {
  wrapperDesktop : {
    width:"1024px",height:"400px"
  },
  wrapperMobile : {
    width:"100%",
    minHeight:"300px",
    height:'auto'
  },
  popupTitle : {
    fontSize: '1.5em',
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '-0.1px',
    color: '#22201f',
},
  popupSubTitle : {
    fontFamily: 'SourceHanSans',
    fontSize: '0.9em',
    fontWeight: '500',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: "2em",
    color: '#22201f'
  } ,
  miniWrapper : {
    display:'flex',flexDirection:'row', alignItems:'center',padding:'5px 10px'
  },
  miniWrapper2 : {
    display:'flex',flexDirection:'row',flexWrap:'wrap', alignItems:'center',padding:'5px 10px',width:'100%'
  },
}
