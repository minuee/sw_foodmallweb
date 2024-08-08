import * as React from 'react';
import { useRouter } from "next/router";
import Image from "next/image";
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from 'next-i18next';
import NoSsr from "@mui/material/NoSsr";


import { landscapeState,globalOpenReservation } from "@stores/layoutStore";
import { useWindowSize } from "@utils/useWindowSize";
import { useRecoilState } from "recoil";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ICON_DATE from "@images/sungwonjung/icon-main-quick-reservation-on.png";
import ICON_POPUP_CLOSE from "@icons/popup-close.png";
import SAMPLE_IMAGE_01 from "@images/banquet/sample_01.png";
import SAMPLE_IMAGE_02 from "@images/banquet/sample_02.png";
import SAMPLE_IMAGE_03 from "@images/banquet/sample_03.png";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SmallIconLocation from "@images/sungwonjung/small-icon-location.png";
import SmallIconMember from "@images/sungwonjung/small-icon-member.png";



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


type PopupBanquetDetailProps = {
    activeIndex? : any,
    isAccess? : any,
    setShowPopDetail: (open: number) => void;
}

const BanquetDetail: React.FC<PopupBanquetDetailProps> = ({ activeIndex, isAccess, setShowPopDetail}) => {
    const { t } = useTranslation(['common','yakwan']);
    const router = useRouter()
    const isAccessDevice =  useWindowSize();
    // 화면 가로모드 여부 확인
    const [isOpenReservation, setOpenReservation] = useRecoilState(globalOpenReservation);
    const [viewLandscape, setIsLandscape] = useRecoilState(landscapeState);
    const [value, setValue] = React.useState(0);
    const [activeStep, setActiveStep] = React.useState(activeIndex);
    
    React.useEffect(() => {
        
    }, [activeStep]);

    return (
        <NoSsr>
            <Box sx={styles.wrapper}>
                <Box sx={styles.contentWrapper}>
                    <Box 
                        sx={styles.closeBoxWrap}
                        onClick={() => setShowPopDetail(9)}
                    >
                        <Image 
                            alt={"sub"}
                            src={ICON_POPUP_CLOSE}
                            style={{width:'20px',height:'20px'}}
                        />
                    </Box>
                    <Box sx={styles.popupDataWrap}>
                        <Box sx={styles.popupHeaderWrap}>
                            <Typography variant="sourceHanSans" sx={styles.popupSubTitle}>{t("common.navname.party")}</Typography>
                        </Box>
                        <Box sx={styles.popupBodyWrap}>
                            <Box sx={styles.popupLeftBodyWrap}>
                                <Box sx={activeStep == 0 ? styles.commonSelectWrap : styles.commonWrap} onClick={()=>setActiveStep(0)}>
                                    <Box sx={styles.commonLeftWrap}>
                                        <Typography variant="sourceHanSans" sx={styles.textStyle1}>12F</Typography>
                                    </Box>
                                    <Box sx={styles.commonRightWrap}>
                                        <Typography variant="sourceHanSans" sx={styles.textStyle1}>{t("common.banquet.floor_12")}</Typography>
                                    </Box>
                                </Box>
                                <Box sx={activeStep == 1 ? styles.commonSelectWrap : styles.commonWrap} onClick={()=>setActiveStep(1)}>
                                    <Box sx={styles.commonLeftWrap}>
                                        <Typography variant="sourceHanSans" sx={styles.textStyle1}>11F</Typography>
                                    </Box>
                                    <Box sx={styles.commonRightWrap}>
                                        <Typography variant="sourceHanSans" sx={styles.textStyle1}>{t("common.banquet.floor_11")}</Typography>
                                    </Box>
                                </Box>
                                <Box sx={activeStep == 2 ? styles.commonSelectWrap : styles.commonWrap} onClick={()=>setActiveStep(2)}>
                                    <Box sx={styles.commonLeftWrap}>
                                        <Typography variant="sourceHanSans" sx={styles.textStyle1}>3F</Typography>
                                    </Box>
                                    <Box sx={styles.commonRightWrap}>
                                        <Typography variant="sourceHanSans" sx={styles.textStyle1}>{t("common.banquet.floor_3")}</Typography>
                                    </Box>
                                </Box>
                                <Box sx={styles.buttonWrap} onClick={()=>{setOpenReservation(2);setShowPopDetail(9);}}>
                                    <Image 
                                        alt={"sub"}
                                        src={ICON_DATE}
                                        style={{width:'30px',height:'34px'}}
                                    />
                                    <Typography variant="sourceHanSans" sx={styles.textStyle2}>단체예약</Typography>
                                </Box>
                            </Box>
                            <Box sx={styles.popupRightBodyWrap}>
                                <Box sx={styles.popupRightImageWrap}>
                                    <Slider {...settings}>
                                        <Image 
                                            alt={"sub"}
                                            src={activeStep == 0 ? SAMPLE_IMAGE_01 : activeStep == 1 ? SAMPLE_IMAGE_02 : SAMPLE_IMAGE_03}
                                            placeholder="blur"
                                            sizes="1020px"
                                            style={{
                                                width:'1020px',
                                                height:'440px',
                                                objectFit: 'contain',
                                                objectPosition : 'bottom',
                                            }}
                                        />
                                        <Image 
                                            alt={"sub"}
                                            src={activeStep == 0 ? SAMPLE_IMAGE_01 : activeStep == 1 ? SAMPLE_IMAGE_02 : SAMPLE_IMAGE_03}
                                            placeholder="blur"
                                            sizes="1020px"
                                            style={{
                                                width:'1020px',
                                                height:'440px',
                                                objectFit: 'contain',
                                                objectPosition : 'bottom',
                                            }}
                                        />
                                    </Slider>
                                </Box>
                                <Box sx={styles.popupRightTextWrap}>
                                    <Box sx={styles.commonTextTitleWrap}>
                                        <Typography variant="sourceHanSans" sx={styles.textStyle3}>중규모 연회장</Typography>
                                    </Box>
                                    <Box sx={styles.commonTextWrap}>
                                        <Box sx={styles.commonTextLeftWrap}>
                                            <Box sx={styles.salesInfoWrap}>
                                                <Box sx={styles.salesTitleWrap}>
                                                    <Image src={SmallIconLocation}  alt="slide" style={{width:'18px',objectFit: 'contain'}}/>
                                                    <Typography variant="sourceHanSans" sx={styles.infoTitle}>위치</Typography>
                                                </Box>
                                                <Box sx={styles.salesDataWrap}>
                                                    <Typography variant="sourceHanSans" sx={styles.infoDataTitle}>성원푸드몰 3층,4층</Typography>
                                                </Box>
                                            </Box>
                                            <Box sx={styles.salesInfoWrap}>
                                                <Box sx={styles.salesTitleWrap}>
                                                    <Image src={SmallIconMember}  alt="slide" style={{width:'18px',objectFit: 'contain'}}/>
                                                    <Typography variant="sourceHanSans" sx={styles.infoTitle}>수용인원</Typography>
                                                </Box>
                                                <Box sx={styles.salesDataWrap}>
                                                    <Typography variant="sourceHanSans" sx={styles.infoDataTitle}>최대 120명</Typography>
                                                </Box>
                                            </Box>
                                            
                                        </Box>
                                        <Box sx={styles.commonTextRightWrap}>
                                            <Typography variant="sourceHanSans" sx={styles.infoDataTitle2}>
                                            120명 규모의 파티, 세미나, 리셉션 등 목적에 따라 다양한 스타일의 행사가 가능합니다.
                                            또한 다양한 면적으로 공간 가변이 가능하고 원활한 행사 진행을 위한 대형스크린 및 각종 최신 장비가 구비되어 있습니다.
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </NoSsr>
    )
}

const styles = {
    wrapper : {
        display:'flex',alignItems:'center',justifyContent:'center',width:'100%',height:'100vh',zIndex:100,overflow:'hidden'
    },
    contentWrapper : {
        position:'absolute',top:"93px",left:"calc(100vw - 1625px)",display:'flex',width:'1330px',height:'750px',backgroundColor:'#fff',
        borderRadius:'15px'
    },
    closeBoxWrap : {
        position:'absolute',right:'30px',top:'30px',width:'30px',height:'30px',display:'flex',justifyContent:'center',alignItems:'center', zIndex:10000,cursor:'pointer'
    },
    popupDataWrap : {
        display:'flex',width:'1330px',height:'750px',zIndex:100,overflow:'hidden',flexDirection:'column'
    },
    popupHeaderWrap : {
        display:'flex',alignItems:'center',justifyContent:'center',width:'100%',height:'98px',borderBottom:"1px solid #dcdcdc"
    },
    popupBodyWrap : {
        display:'flex',alignItems:'center',justifyContent:'center',width:'100%',height:'662px',
    },
    popupLeftBodyWrap : {
        display:'flex',flexDirection:'column',width:'310px',height:'100%',borderRight:"1px solid #dcdcdc",paddingTop:"10px"
    },
    popupRightBodyWrap : {
        width:'1020px',height:'100%',display:'flex',flexDirection:'column',
    },
    popupRightImageWrap : {
       width:'1020px',height:'520px',overflow:'hidden',cursor:'grab'
    },
    commonTextTitleWrap : {
        width:'100%', display:'flex',alignItems:'center',margin : "24px"
    },
    popupRightTextWrap : {
        width:'100%', display:'flex',flexDirection:'column',top:'440px',height:"260px",padding:"0 50px"
    },
    commonTextWrap : {
        display:'flex',width:'100%',height:'52px',justifyContent:'center',alignItems:'center',flexDirection:'row',
        margin:'25px 10px'
    },
    commonTextLeftWrap : {
        display:'flex',flex:2,justifyContent:'center',flexDirection:'column',minWidth:'295px',borderRight:"1px solid #dcdcdc"
    },
    commonTextRightWrap : {
        display:'flex',flex:5,alignItems:'center',padding:"0 30px"
    },
    popupSubTitle : {
        fontSize: '28px',fontWeight: 'bold',fontStretch: 'normal',fontStyle: 'normal',lineHeight: "2em",color: '#22201f'
    },
    nextArrow : {
        position:'absolute',right:10,top:'200px',width:'36px', height:'36px',display:'flex',justifyContent:'center',alignItems:'center',zIndex:10,background:'rgb(0,0,0,0.3)',borderRadius:'18px',cursor:'pointer'
    },
    prevArrow : {
        position:'absolute',left:10,top:'200px',width:'36px', height:'36px',display:'flex',justifyContent:'center',alignItems:'center',zIndex:10,background:'rgb(0,0,0,0.3)',borderRadius:'18px',cursor:'pointer'
    },
    commonWrap : {
        display:'flex',width:'calc( 100% - 20px)',height:'52px',justifyContent:'center',alignItems:'center',flexDirection:'row',cursor:'pointer',
        margin:'5px 10px',"&:hover": { background:'#f6f5f5',borderRadius:'26px'}
    },
    commonSelectWrap : {
        display:'flex',width:'calc( 100% - 20px)',height:'52px',justifyContent:'center',alignItems:'center',flexDirection:'row',cursor:'pointer',
        margin:'5px 10px',backgroundColor:'#f6f5f5',borderRadius:'26px',"&:hover": { background:'#f6f5f5',borderRadius:'26px'}
    },
    commonLeftWrap : {
        display:'flex',flex:1,alignItems:'center',paddingLeft:'20px'
    },
    commonRightWrap : {
        display:'flex',flex:2,alignItems:'center',paddingLeft:'5px'
    },
    textStyle1 : {
        fontSize: "18px",fontWeight: "bold",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.36px",textAlign: "left",color: "#474747",
    },
    buttonWrap : {
        position:'absolute',left:"40px", bottom:'30px', width:"230px",height:"77px", borderRadius:"38px",display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:"#f84040",flexDirection:'row',cursor:"pointer"
    },
    textStyle2 : {
        fontSize: "26px",fontWeight: "bold",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.52px",color: "#fff",marginLeft:"10px"
    },
    textStyle3 : {
        fontSize: "38px",fontWeight: "bold",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.76px",color: "#22201f"
    },
    salesTitleWrap : {
        display:'flex',flex:1,alignItems : 'center',flexDirection:'row'
    },
    salesDataWrap : {
        display:'flex',flex:2,alignItems : 'center'
    },
    menuOuterWrapper : {
        display:'flex',flexDirection:'row', alignItems:'center',justifyContent:'space-around'
    },
    menuWrapper : {
        display:'flex',flex:1,flexDirection:'column',alignItems:'center',justifyContent:'flex-start',marginBottom:'5px',maxHeight:"250px"
    },
    salesInfoWrap : {
        display:'flex',flexDirection:'row',widht:'100%',height:'24px',padding:"10px",margin:"5px"
    },
    infoTitle : {
        color:'#474747',
        fontSize:'16px',
        fontWeight: "500",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "normal",
        letterSpacing: "-0.32px",
        marginLeft:"5px"
    },
    infoDataTitle : {
        color:'#474747',
        fontSize:'16px',
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "normal",
        letterSpacing: "-0.32px",
        marginLeft:"5px"
    },
    infoDataTitle2 : {
        color:'#474747',
        fontSize:'16px',
        fontWeight: "500",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "1.63",
        letterSpacing: "-0.32px",
    },
}

export default BanquetDetail;