"use client"; // Use Client Components

import * as React from 'react';
import Image from "next/image";
import { makeStyles } from "@mui/styles";
import { Box, Button, Typography, LinearProgress } from "@mui/material";


// import required modules
import  Pagination  from "swiper";

import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import Logomage from "@images/bi-color.png";

import IRVideo from "components/IRVideo";

const useStyles = makeStyles((theme) => ({
  swiper_wrapper: {
    width: "100%",
    paddingBottom: "40px",

    "& .swiper-pagination": {
      bottom: 10,
      transform: "translateY(50%)",
    },

    "& .swiper-pagination-bullet-active": {
      backgroundColor: "#000",
    },
  },
}));

export const OnBoarding: React.FC = () => {

  const classes = useStyles();
  const [currentIndex, setCurrentIndex] = React.useState<any>(0);
  const [sddOnboarding, setSddOnboarding] = React.useState<any>('false');

  React.useEffect(() => {
    const sdd_onboarding = window.localStorage.getItem("sdd_onboarding2"); 
    setSddOnboarding(sdd_onboarding);
  },[])

  const disableOnBoarding = () => {
    window.localStorage.setItem("sdd_onboarding2", "false");
    window.location.reload();
  }

  return (
    <Box 
      sx={{minHeight:"calc(100vh - 180px)",display:"flex",flexDirection:"column",justifyContent:"center",bgcolor:"#fff",paddingTop:"80px",zIndex:1}}
    >
      <Box px={1} textAlign="right">
        <Typography variant="body2">당신의 삷의 스타일을 행복하게 해 드립니다.</Typography>
        <Typography variant="h4" fontWeight={700} fontFamily="Arial-black">
          성원 Foodmall
        </Typography>
        <Typography color="textSecondary">Shop your style, Food your style</Typography>
      </Box>

      <Box my={4}>
        <SwiperComponent 
          spaceBetween={10} 
          slidesPerView={1}
          onSlideChange={(val) => {
            setCurrentIndex(val.activeIndex);
          }}
          onSwiper={(swiper) => console.log(swiper)}
          pagination={true}
          className={classes.swiper_wrapper}
        >
          <SwiperSlide>
            <OnBoardStart />
          </SwiperSlide>

          <SwiperSlide>
            <OnBoardVideo />
          </SwiperSlide>

          {[...Array(4)].map((tmp, index) => (
            <SwiperSlide key={index}>
              <OnBoardPage index={index} />
            </SwiperSlide>
          ))}
        </SwiperComponent>
        <LinearProgress variant={'determinate'} value={100*(parseInt(currentIndex+1)/6)} />
      </Box>
      {
        sddOnboarding != 'false' && (
        <Box px={2}>
          <Button variant="contained"  onClick={() => disableOnBoarding()}>
            <Typography variant="h6" fontWeight={700}>
              START
            </Typography>
          </Button>
        </Box>
        )
      }
    </Box>
  );
};

const OnBoardStart: React.FC = () => {
  return (
    <Box display="flex" flexDirection={'column'} justifyContent="center" alignItems="center">
      
      <Image src={Logomage} width={59} height={36} alt={'logo'} />
      
      <Box display="table" position="relative" mt={5}>
        <Typography pr={2} fontWeight={700} whiteSpace="pre-wrap">
          {`당신의 삷의 스타일을 
행복하게 해 드립니다.`}
        </Typography>
      </Box>
    </Box>
  );
};

const OnBoardVideo: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
       <IRVideo />
    </Box>
  );
};

const OnBoardPage: React.FC<{ index: number }> = ({ index }) => {
  const page_data = [
    {
      title: "Home Styling",
      desc: `공간에 디자인을 담아 드리는
      홈스타일링 컨시어지 서비스입니다.`,
    },
    {
      title: "Personal Shopper Service",
      desc: `디자인이 필요한 공간 
      가구, 가전, 소품,  패브릭을 쇼핑해 드립니다.`,
    },
    {
      title: "Group Purchasing",
      desc: `(해외)가구,가전,소품, 패브릭,식기 등 리빙 관련 상품을
      합리적인 가격으로 공동 구매 해드리는 서비스입니다.`,
    },
    {
      title: `Personal Stylist Group 
Purchasing for luxury goods`,
      desc: `패션 트랜드 스타일링, 해외 명품, 의류 잡화
      공동구매를 해드립니다.`,
    },
  ];

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography mt={4} variant="h5" fontWeight={700} textAlign="center" whiteSpace="pre-line">
        {page_data[index]?.title}
      </Typography>
      <Box my={2} width="20px" height="3px" bgcolor="#cfcfcf" />
      <Typography textAlign="center" whiteSpace="pre-line">
        {page_data[index]?.desc}
      </Typography>
    </Box>
  );
};
