import * as React from 'react';
import { useRouter } from "next/router";
import Image from "next/image";
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from 'next-i18next';
import NoSsr from "@mui/material/NoSsr";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import functions from '@utils/functions';
import { landscapeState } from "@stores/layoutStore";
import { useWindowSize } from "@utils/useWindowSize";
import { useRecoilState } from "recoil";

import RommOptionDouble from "@images/rooms/icon-room-info-double_gray.png";
import RommOptionPersonal from "@images/rooms/icon-room-info-personnel_gray.png";
import RommOptionRSZ from "@images/rooms/icon-room-info-rsz_gray.png";
import RommOptionView from "@images/rooms/icon-room-info-view_gray.png";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import SAMPLE_IMAGE_01 from "@images/reservation/room_sample_01.png";
import SAMPLE_IMAGE_02 from "@images/rooms/studio_02.png";

import ICON_POPUP_CLOSE from "@images/reservation/icon-arrow.png";

function SampleNextArrow(props:any) {
    const { className, style, onClick } = props;
    return (
        <Box
            sx={{...styles.nextArrow,"&:hover": { background:'rgb(0,0,0,0.9)'} }}
            onClick={onClick}
        >
            <ArrowForwardIosIcon fontSize="small" sx={{color:'#fff'}} />
        </Box>
    );
  }
  
function SamplePrevArrow(props:any) {
    const { className, style, onClick } = props;
    return (
        <Box
            sx={{...styles.prevArrow,"&:hover": { background:'rgb(0,0,0,0.9)'} }}
            onClick={onClick}
        >
          <ArrowBackIosIcon fontSize="small" sx={{color:'#fff'}} />
      </Box>
    );
}

const  settings = {
    //centerMode: true,   // 중앙정렬
    //centerPadding: "0px", // 0px 하면 슬라이드 끝쪽 이미지가 안잘림
    //arrows:false,
    dots: false,
    infinite: true,
    vertical: false,
    verticalSwiping: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
};

type PopupRoomGalleryProps = {
    sendData?: any;
    setShowPopDetail: (bool: boolean) => void;
}

const RoomGallery: React.FC<PopupRoomGalleryProps> = ({sendData,setShowPopDetail}) => {
    const router = useRouter()
    const isAccessDevice =  useWindowSize();
    // 화면 가로모드 여부 확인
    const [viewLandscape, setIsLandscape] = useRecoilState(landscapeState);
    const { t } = useTranslation(['common','yakwan']);

    
    const renderRoomDescription = () => {
        if ( sendData?.code  == 'studio') {
            return t("reservation.room_gallery.room_info_desc.studio_room");
        }else if ( sendData?.code  == 'deluxe') {
            return t("reservation.room_gallery.room_info_desc.deluxe_room");
        }else if ( sendData?.code  == 'suite') {
            return t("reservation.room_gallery.room_info_desc.suite_room");
        }
    }

    return (
        <NoSsr>
            <Box sx={styles.contentWrapper}>
                <Box sx={styles.closeBoxWrap} onClick={() => setShowPopDetail(false)}>
                    <Image 
                        alt={"sub"}
                        src={ICON_POPUP_CLOSE}
                        style={{width:'10px',height:'16px'}}
                    />
                </Box>
                <Box sx={styles.contentGroupWrapper}>
                    <Box sx={styles.popupRightImageWrap}>
                        <Slider {...settings}>
                            <Image 
                                alt={"sub"}
                                src={SAMPLE_IMAGE_01}
                                placeholder="blur"
                                sizes="1020px"
                                style={{
                                    width:'1256px',
                                    height:'612px',
                                    objectFit: 'contain',
                                    objectPosition : 'bottom',
                                }}
                            />
                            <Image 
                                alt={"sub"}
                                src={SAMPLE_IMAGE_02}
                                placeholder="blur"
                                sizes="1020px"
                                style={{
                                    width:'1256px',
                                    height:'612px',
                                    objectFit: 'contain',
                                    objectPosition : 'bottom',
                                }}
                            />
                        </Slider>
                    </Box>
                    <Box sx={styles.popupDescWrap}>
                        <Box sx={{display:'flex',height:'100%',flex:1.5,flexDirection:'column',alignItems:'center',paddingTop:'50px'}}>
                            <Typography variant="sourceHanSans" sx={{...styles.menuTextStyle}}>
                                {t(sendData.localeLabel)}
                            </Typography>
                            <Box sx={{display:'flex',flexDirection:'row',alignItems:'flex-end',marginTop:"10px"}}>
                                <Typography variant="sourceHanSans" sx={{...styles.menuTextStyle2}}>
                                    180,000
                                </Typography>
                                <Typography variant="sourceHanSans" sx={{...styles.menuTextStyle2_2,paddingLeft:"5px"}}>
                                    {t("reservation.room_gallery.day_per_price")}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{display:'flex',height:'100%',flex:2.5,flexDirection:'column',alignItems:'center',paddingTop:'50px'}}>
                            <Typography variant="sourceHanSans" sx={{...styles.menuTextStyle2_2}}>
                                {renderRoomDescription()}
                            </Typography>
                        </Box>
                        <Box sx={{display:'flex',msFlexDirection:'row',height:'100%',flex:2,alignItems:'flex-start',justifyContent:'center',paddingTop:'50px'}}>
                            <Box sx={styles.roomOptionWrapper}>
                                <Image
                                    src={RommOptionDouble}  
                                    alt="slide" 
                                    style={{height:'36px',width:"50px",objectFit: 'contain'}}
                                />  
                                <Typography variant="sourceHanSans" sx={styles.miniRoomOptionText}>
                                    {t("sub.rooms_detail.room_desc.double")} or {t("sub.rooms_detail.room_desc.twin")}
                                </Typography>
                            </Box>
                            <Box sx={styles.roomOptionWrapper}>
                                <Image
                                    src={RommOptionPersonal}  
                                    alt="slide" 
                                    style={{height:'36px',width:"50px",objectFit: 'contain'}}
                                />  
                                <Typography variant="sourceHanSans" sx={styles.miniRoomOptionText}>
                                    {t("sub.rooms_detail.room_desc.max")}2{t("sub.rooms_detail.room_desc.man")} 
                                </Typography>
                            </Box>
                            <Box sx={styles.roomOptionWrapper}>
                                <Image
                                    src={RommOptionView}  
                                    alt="slide" 
                                    style={{height:'36px',width:"50px",objectFit: 'contain'}}
                                />  
                                <Typography variant="sourceHanSans" sx={styles.miniRoomOptionText}>
                                    {t("sub.rooms_detail.room_desc.namsan")} or {t("sub.rooms_detail.room_desc.city")} 
                                </Typography>
                            </Box>
                            <Box sx={styles.roomOptionWrapper}>
                                <Image
                                    src={RommOptionRSZ}  
                                    alt="slide" 
                                    style={{height:'36px',width:"50px",objectFit: 'contain'}}
                                />  
                                <Typography variant="sourceHanSans" sx={styles.miniRoomOptionText}>23㎡ </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </NoSsr>
    )
}

const styles = {
    contentWrapper : {
        position:'relative',display:'flex',width:'1668px',height:'766px',backgroundColor:'transparent',borderRadius:'15px',
        alignItems:'center',justifyContent:'flex-end',zIndex:1000
    },
    contentGroupWrapper : {
       display:'flex',width:'1308px',height:'100%',backgroundColor:'#fff',borderRadius:'15px',flexDirection:'column',alignItems:'flex-end',justifyContent:'flex-start',padding:"24px 34px",zIndex:1000
    },
    popupRightImageWrap : {
        width:'1256px',height:'642px',overflow:'hidden',cursor:'grab',borderRadius:"15px",paddingLeft:"15px"
    },
    popupDescWrap : {
        display:'flex',width:'1256px',height:'200px',overflow:'hidden',alignItems:'center',justifyContent:'center',padding:"0 20px"
    },
    closeBoxWrap : {
        position:'absolute',left:'330px',top:'300px',width:'30px',height:'130px',display:'flex',justifyContent:'center',alignItems:'center', zIndex:999,cursor:'pointer',backgroundColor:'#fff',borderTopLeftRadius: "30px", borderBottomLeftRadius: "30px",boxShadow: "-10px 0 6px 0 rgba(0, 0, 0, 0.16)"
    },
    nextArrow : {
        position:'absolute',right:20,top:'300px',width:'36px', height:'36px',display:'flex',justifyContent:'center',alignItems:'center',zIndex:10,background:'rgb(0,0,0,0.3)',borderRadius:'18px',cursor:'pointer'
    },
    prevArrow : {
        position:'absolute',left:20,top:'300px',width:'36px', height:'36px',display:'flex',justifyContent:'center',alignItems:'center',zIndex:10,background:'rgb(0,0,0,0.3)',borderRadius:'18px',cursor:'pointer'
    },
    menuTextStyle : {
        fontSize: "30px",fontWeight: "bold",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-1px",color: "#22201f",
    },
    menuTextStyle2 : {
        fontSize: "20px",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-1px",color: "#707070",
    },
    menuTextStyle2_2 : {
        fontSize: "14px",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-1px",color: "#707070",
    },
    miniCurrentDescBox : {
        display:'flex',position:'absolute',top:"-1px",left:"211px",width:"420px",height:'96px',flexDirection:'row',alignItems:'center',justifyContent:'space-evenly'
    },
    roomOptionWrapper : {
        display:'flex',flex:1,flexDirection:'column',alignItems:'center',justifyContent:'center',maxWidth:"90px"
    },
    miniRoomOptionText : {
        fontSize: "13px",
        fontWeight: "normal",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "normal",
        letterSpacing: "-1px",
        color: "#22201f",
        marginTop:"5px"
    },
}

export default RoomGallery;