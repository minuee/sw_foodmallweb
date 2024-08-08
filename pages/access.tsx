import * as React from 'react';
import Link from "../extra/Link";
import { Box, Button, Container, Typography } from "@mui/material";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { accessEnvirmentInfo } from '@stores/envStore';
import { useRecoilState } from "recoil";
import Layout from "components/layout/index";

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
      <Layout>
      <Box
        sx={{
          py:2,
          px:1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ maxWidth: "sm",mb:10 }}>
          <Button variant="contained" component={Link} noLinkStyle href="/">
          {t('gotohome')}
          </Button>
        </Box>
        <Box id="kakaomap" sx={ accessInfo?.isDesktop ? styles.wrapperDesktop : styles.wrapperMobile } />
      </Box>
      </Layout>
  );
}

export async function getStaticProps({locale = 'ko'}) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common','yakwan'])),
    },
  }
}

const styles = {
  wrapperDesktop : {
    width:"1024px",height:"400px"
  },
  wrapperMobile : {
    width:"100%",
    minHeight:"300px",
    height:'auto'
  }
}
