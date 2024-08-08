'use client'
import * as React from 'react';
import Image from "next/image";
import { Box, Button, Container, Typography } from "@mui/material";
import { useTranslation } from 'next-i18next';
import * as mConst from "utils/constants";
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { useRecoilState } from 'recoil';
import { globalOpenReservation } from '@stores/layoutStore';

import LinearProgress from '@mui/material/LinearProgress';
import MainBgImage from "@images/sungwonjung/bg_1.png";
import MainBgImage2 from "@images/sungwonjung/bg_2.png";

import MiniMiddle12F from "@images/banquet/mini_middle_12f.png";
import MiniSmall11F from "@images/banquet/mini_small_11f.png";
import MiniSmall3F from "@images/banquet/mini_small_3f.png";

import QuickRight from "components/common/QuickRight";
import Copyright from "components/home/Copyright";
import QuickPopupDetail from "components/popup/QuickPopupDetail";

export default function SungwonjungScreen() {
    const { t } = useTranslation(['common','yakwan']);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [showPopDetail, setShowPopDetail] = React.useState(9);
    const [progress, setProgress] = React.useState(0);
    const [isOpenReservation, setOpenReservation] = useRecoilState(globalOpenReservation);
    const elementRef = React.useRef(null);
    const onClickChageIndex = React.useCallback(
        (num:number,element:any) => {
            setActiveIndex(num);
            let scrollAmount = num*250;
            element.scrollLeft = scrollAmount;
               
        },
        [activeIndex]
    );

    React.useEffect(() => {
        if ( isOpenReservation == 0 ) document.body.style.overflow = "auto";
    }, [isOpenReservation]);
    
    React.useEffect(() => {
        setProgress(0);
        const timer = setInterval(() => {
          setProgress((oldProgress) => {
            
            if (oldProgress === 100) {
                if ( activeIndex == 4 ) {
                    setActiveIndex(0)
                }else{
                    setActiveIndex(activeIndex+1)
                }
                return 0;
            }
            const diff = 1;
            return oldProgress + diff;
          });
        }, 100);

        if ( showPopDetail != 9 || isOpenReservation != 0 ) {
            setProgress(0);
            setActiveIndex(9)
            clearInterval(timer);
        }else{
            setProgress(0);
            setActiveIndex(activeIndex == 9 ? 0 : activeIndex)
        }
    
        return () => {
          clearInterval(timer);
        };
    }, [activeIndex,showPopDetail,isOpenReservation]);

    const openQuickMenu = (val:number) => {
        setShowPopDetail(val);
    }

    return (
        <Box sx={styles.wrapper}>
            <Box sx={styles.outerWrap}>
                <Box sx={styles.quickWrap}>
                    <QuickRight 
                        openQuickMenu={openQuickMenu}
                        isMode={"sungwonjung"}
                    />
                </Box>
                <Image 
                    alt={"main"}
                    src={activeIndex%2 == 0 ?  MainBgImage :  MainBgImage2 }
                    placeholder="blur"
                    fill
                    className={progress < 20 ? "fade-in-image" : ""}
                    sizes="100vw"
                    style={{
                        objectFit: 'cover'
                    }}
                />
                <Box sx={styles.contentWrapper}>
                    <Typography variant="sourceHanSans" sx={{color:'#fff',fontSize:'48px',lineHeight:'3em'}}>
                        {activeIndex%2 == 0 ? '매일 신선하고 건강하게' : '정육식당 성원정'}
                    </Typography>
                    <Typography variant="sourceHanSans" sx={{color:'#fff',fontSize:'22px'}}>
                    {
                        activeIndex %2 == 0?  
                        `미슐랭 스타 레스토랑과 다양한 외식업 경험으로 숙력된 셰프의 전문성이 `
                        :
                        `정육식당 성원정만의 노하우로 14일간 정성스럽게 고기를 숙성시켜`
                    }
                    </Typography>
                    <Typography variant="sourceHanSans" sx={{color:'#fff',fontSize:'22px'}}>
                    {
                        activeIndex %2 == 0?  
                        `느껴지는 구성으로 매일 신선하고 건강한 상차림을 제공합니다.`
                        :
                        `풍부한 육즙과 부드러운 육질을 제공합니다.`
                    }
                    </Typography>
                </Box>
                <Box sx={styles.miniWrapper} ref={elementRef}>
                    <Box sx={styles.miniInsideWrapper}>
                        {
                            mConst.sungwonjungThumb.map((item:any,index:number) => {
                                return (
                                    <Box sx={{...styles.miniBoxWrapper,height: activeIndex == index ? '66px' : "56px", border : activeIndex == index ? "2px solid #fff" : "0.3px solid #ccc"}} onClick={()=> onClickChageIndex(index,elementRef.current)}>
                                        <Image 
                                            src={index%2 == 0 ? MiniSmall3F : MiniMiddle12F}  
                                            alt="slide" 
                                            style={{width:'100%', height:'100%',borderRadius:'10px',objectFit: 'cover',opacity: activeIndex == index ? 1 :  0.4}}
                                        />  
                                        <Box sx={styles.miniTextWrapper}>
                                            <Typography variant="sourceHanSans" sx={{color:'#fff',fontSize:'18px'}}>{item.name}</Typography>
                                        </Box>
                                        {activeIndex == index && (
                                            <Box sx={styles.progressBar}>
                                                <LinearProgress variant="determinate" value={progress} sx={{backgroundColor: 'transparent','& .MuiLinearProgress-bar': {backgroundColor:'#f84040'}}} />
                                            </Box>
                                        )}
                                    </Box>
                                )
                            })
                        }
                    </Box>
                </Box>
            </Box>
            
            <Box sx={{position:'absolute',left:0,top:"936px",width:'100%',heigth:"210px",backgroundColor:"#f7f7f7"}}>
                <Copyright isMobile={false} />
            </Box>
            {
                showPopDetail!= 9 && (
                    <Drawer
                        open={showPopDetail != 9}
                        onClose={() => {
                            setShowPopDetail(9);
                        }}
                        lockBackgroundScroll={true}
                        enableOverlay={true} //toggle off == flase
                        direction='right'
                        className='bla bla bla'
                        size={"470px"}
                        style={{
                            overflow: 'hidden',
                            backgroundColor:'transparent',
        
                        }}
                        zIndex={999}
                    >
                        <QuickPopupDetail
                            setShowPopDetail={setShowPopDetail}
                            isAccess={"sungwonjung"}
                            activeIndex={showPopDetail}
                        />
                    </Drawer>
                )
            }
        </Box>
    )
}

const styles = {
    wrapper : {
        display:'flex',flexDirection:'column',minWidth:'1600px',width:'100%',minHeight:"900px",justifyContent:'flex-start',backgroundColor : "#f7f7f7",
    },
    outerWrap : {
        display:'flex',minHeight:'936px',backgroundColor:'transparent',minWidth:'1600px',width:'100%'
    },
    contentWrapper : {
        display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',position:'absolute',left:0,top:0,minWidth:'1600px', width:'100%',height:'calc( 100vh - 200px )'
    },
    miniWrapper : {
        display:'flex',flexDirection:'colomn',alignItems:'center',justifyContent:'center',position:'absolute',left:0,bottom:'40px',minWidth:'1600px', width:'100%',height:'100px'
    },
    miniInsideWrapper : {
        display:'flex',flexDirection:'row',alignItems:'flex-end',justifyContent:'space-between',width:'1100px',height:'100%'
    },
    miniBoxWrapper : {
        position: 'relative',height:'100%',width:'204px',border:'2px solid #fff',borderRadius:'10px',cursor:"pointer"
    },
    miniTextWrapper : {
        zIndex: 2,position: 'absolute',height: '100%',width: '204px',textAlign: 'center',top:0,left:0,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'
    },
    moreBtn : {
        border:'1px solid #ffffff',borderRadius:'5px',padding:'2px',marginTop:'3px'
    },
    progressBar : {
        position:'absolute',left:5,bottom:-3,width:'calc( 100% - 10px)',height:'5px'
    },
    quickWrap : {
        position:'fixed',display:'flex',justifyContent:'center',alignItems:'center',right:"-12px",top:"300px",width:'90px',heigth:"286px",zIndex:100
    }
}