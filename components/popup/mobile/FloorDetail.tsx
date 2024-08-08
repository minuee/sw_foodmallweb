import * as React from 'react';
import Image from "next/image";
import Link from "next/link";
import MuiLink from '@mui/material/Link';
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from 'next-i18next';
import NoSsr from "@mui/material/NoSsr";

import SUBBG_Stayrak_1 from "@images/floor/stayrka_1.png";
import ICON_POPUP_CLOSE from "@icons/popup-close.png";

import useLocaleTransfer from "services/locale/transfer";

import { landscapeState } from "@stores/layoutStore";
import { useRecoilState } from "recoil";

import ICON_LOCATION from "@icons/main/icon_location.png";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
    responsive: [
      {
        breakpoint: 1350,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
};


type PopupFloorDetailProps = {
    selectFloor? : any,
    setPopDetailOpen: (popDetailOpen: boolean) => void;
    setSelectFloor: (obj: any) => void;
    setSeq: (num: number) => void;
    direction? : string,
};
const FloorDetail: React.FC<PopupFloorDetailProps> = ({ selectFloor,setSeq, setSelectFloor,setPopDetailOpen,direction='left'}) => {
    // 화면 가로모드 여부 확인
    const [viewLandscape, setIsLandscape] = useRecoilState(landscapeState);
    const popDetailRef = React.useRef(null);

    const [height, setHeight] = React.useState(250);
    const bottomRef = React.useRef(null);
    React.useEffect(() => {
        try{
            const checkRef = bottomRef?.current as any;
            console.log("checkRef",checkRef.clientHeight)
            setHeight(checkRef?.clientHeight);
        }catch(e){
            console.log('eee',e)
        }
    },[bottomRef?.current]);

    return (
        <NoSsr>
            <Box ref={popDetailRef} sx={styles.outerWrapper}>
                <Box 
                    sx={direction == "left" ? styles.closeBoxWrap: styles.closeBoxWrap2}
                    onClick={() => {
                        setPopDetailOpen(false);
                        setSelectFloor({
                            selectData:null
                        })
                        setSeq(1)
                    }}
                >
                    <Image 
                        alt={"sub"}
                        src={ICON_POPUP_CLOSE}
                        style={{width:'20px',height:'20px'}}
                    />
                </Box>
                <Box sx={{position:'absolute',bottom:`${height-10}px`,left:0,height:'auto',width:'100%',alignItems:'flex-end'}}>
                    <Slider {...settings}>
                        <Image 
                            alt={"sub"}
                            src={selectFloor?.selectData?.bgImage ?? SUBBG_Stayrak_1}
                            placeholder="blur"
                            sizes="100%"
                            style={{
                                width:'100%',
                                objectFit: 'contain',
                                objectPosition : 'bottom',
                            }}
                        />
                        <Image 
                            alt={"sub"}
                            src={selectFloor?.selectData?.bgImage ?? SUBBG_Stayrak_1}
                            placeholder="blur"
                            sizes="100%"
                            style={{
                                width:'100%',
                                objectFit: 'contain',
                                objectPosition : 'bottom',
                            }}
                        />
                    </Slider>
                </Box>
                
                <Box sx={{...styles.popupDataWrap,height:`${height}px`}} ref={bottomRef}>
                    <Box sx={{...styles.boxWrapper,marginBottom:"10px",justifyContent:direction == "left"?"felx-start" : "flex-end"}}>
                        <Typography variant="sourceHanSans" sx={styles.popupTitle}>
                            {useLocaleTransfer(null,'common',selectFloor?.selectData?.localeName)}
                        </Typography>
                        <Image 
                            alt={"sub"}
                            src={ICON_LOCATION}
                            style={{width:'32px',height:'32px',marginLeft:"5px"}}
                        />
                    </Box>
                    <Typography variant="sourceHanSans" sx={styles.popupSubTitle}>
                        {selectFloor?.selectData?.subTtile}
                    </Typography>
                    <Typography variant="sourceHanSans" sx={styles.popupDescTitle}>
                        {selectFloor?.selectData?.desc}
                    </Typography>
                    <Box sx={{...styles.boxWrapper,marginTop:"10px"}}>
                        <Typography variant="sourceHanSans" sx={styles.popupDescTitle}>
                            위치 |
                        </Typography>
                        <Typography sx={styles.popupDescTitle} style={{paddingLeft:'5px'}}>{selectFloor?.selectData?.position}</Typography>
                    </Box>
                    <Box sx={styles.moreWrapper}>
                        <Button variant="outlined" sx={styles.popupButton}>
                            <MuiLink href={selectFloor.selectData?.mobileUrl} underline="none" rel="noopener noreferrer" target="_blank">
                                <Typography sx={styles.popupSubTitle}>
                                    자세히 보기 +
                                </Typography>
                            </MuiLink>
                        </Button>
                     </Box>
                </Box>
            </Box>
        </NoSsr>
    )
}

const styles = {
    bgImg : {
        zIndex: -10,
    },
    outerWrapper : {
        display:'flex',position:'relative',flexDirection:'column',flex:1,justifyContent:'flex-end',width:'100%',height:'100vh',maxWidth:'430px',backgroundColor:'transparent',bottom:"50px"
    },
    boxWrapper : {
        display:'flex',flexDirection:'row',alignItems:'center'
    },
    moreWrapper : {
        display:'flex',flex:1,alignItems:'center',justifyContent:'center'
    },
    mainWrap : {
        width:'100%',backgroundColor:'transparent',zIndex:9999
    },
    popupDataWrap : {
        position:'relative',display:'flex',flex:1,flexDirection:'column',width:'100%',height:'auto',maxHeight:'250px',padding:"10px",backgroundColor:'#fff',
        borderBottomLeftRadius : "20px",borderBottomRightRadius :"20px"
    },
    popupTitle : {
        fontSize: '30px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: '-0.6px',
        color: '#22201f',
    },
    popupSubTitle : {
        flexDirection:"row",
        fontSize: '16px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: "2em",
        letterSpacing: '-0.32px',
        color: '#707070'
    },
    popupDescTitle : {
        fontSize: '0.8em',
        fontWeight: '500',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: "1.5em",
        letterSpacing: '-0.28px',
        color: '#707070'
    },
    popupButton : {
        width: '176px',
        height: '50px',
        marginTop: '14px',
        border:'0px solid #fff',
        padding: '12px 17px',
        borderRadius: '10px',
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.16)',
        backgroundColor: '#fff',
    },
    closeBoxWrap : {
          position:'absolute',right:'5px',bottom:'200px',width:'30px',height:'30px',borderRadius:'15px',backgroundColor:'#f7f7f7',display:'flex',justifyContent:'center',alignItems:'center', zIndex:10,cursor:'pointer'
    },
    closeBoxWrap2 : {
        position:'absolute',left:'5px',bottom:'200px',width:'30px',height:'30px',borderRadius:'15px',backgroundColor:'#f7f7f7',display:'flex',justifyContent:'center',alignItems:'center', zIndex:10,cursor:'pointer'
  },
    nextArrow : {
        position:'absolute',right:10,bottom:'80px',width:'36px', height:'36px',display:'flex',justifyContent:'center',alignItems:'center',zIndex:10,background:'rgb(0,0,0,0.5)',borderRadius:'18px',cursor:'pointer'
    },
    prevArrow : {
        position:'absolute',left:10,bottom:'80px',width:'36px', height:'36px',display:'flex',justifyContent:'center',alignItems:'center',zIndex:10,background:'rgb(0,0,0,0.5)',borderRadius:'18px',cursor:'pointer'
    }
}

export default FloorDetail;