'use client'
import * as React from 'react';
import Image from "next/image";
import { Box, Button, Container, Typography } from "@mui/material";
import { useTranslation } from 'next-i18next';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { useRecoilState } from 'recoil';
import { globalOpenReservation } from '@stores/layoutStore';

import LinearProgress from '@mui/material/LinearProgress';
import MainBgImage from "@images/banquet/middle.png";
import MainBgImage2 from "@images/banquet/small.png";
import MainBgImage3 from "@images/banquet/small2.png";

import MiniMiddle12F from "@images/banquet/mini_middle_12f.png";
import MiniSmall11F from "@images/banquet/mini_small_11f.png";
import MiniSmall3F from "@images/banquet/mini_small_3f.png";

import QuickPopupDetail from "components/popup/QuickPopupDetail";
import BanquetDetail from "components/popup/BanquetDetail";
import Copyright from "components/home/Copyright";
import QuickRight from "components/common/QuickRight";


export default function BanquetScreen() {
    const { t } = useTranslation(['common','yakwan']);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [showPopDetail, setShowPopDetail] = React.useState(9);
    const [isShowPopDetail, setIsShowPopDetail] = React.useState(9);
    const [isOpenReservation, setOpenReservation] = useRecoilState(globalOpenReservation);
    const [progress, setProgress] = React.useState(0);
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
                if ( activeIndex == 2 ) {
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
        if ( showPopDetail != 9 || isShowPopDetail != 9 || isOpenReservation != 0) {
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
    }, [activeIndex,showPopDetail,isShowPopDetail,isOpenReservation]);

    const openQuickMenu = (val:number) => {
        setShowPopDetail(val);
    }

    return (
        <Box sx={styles.wrapper}>
            <Box sx={styles.outerWrap}>
                <Box sx={styles.quickWrap}>
                    <QuickRight 
                        openQuickMenu={openQuickMenu}
                        isMode={"banquet"}
                    />
                </Box>
                <Image 
                    alt={"main"}
                    src={activeIndex == 0 ?  MainBgImage :activeIndex == 1 ?  MainBgImage2 : MainBgImage3}
                    placeholder="blur"
                    fill
                    className={progress < 20 ? "fade-in-image" : ""}
                    sizes="100vw"
                    style={{
                        objectFit: 'cover',
                    }}
                />
                <Box sx={styles.contentWrapper}>
                    <Typography variant="sourceHanSans" sx={{color:'#fff',fontSize:'48px',lineHeight:'3em'}}>
                        {activeIndex == 0 ? t("common.banquet.floor_12") : t("common.banquet.floor_11")}
                    </Typography>
                    <Typography variant="sourceHanSans" sx={{color:'#fff',fontSize:'22px'}}>
                    {
                        activeIndex == 1 ?  t("sub.banquet_detail.small_11_desc_1")
                        :
                        activeIndex == 2 ?  t("sub.banquet_detail.small_3_desc_1")
                        :
                        t("sub.banquet_detail.middle_12_desc_1")
                    }
                    </Typography>
                    <Typography variant="sourceHanSans" sx={{color:'#fff',fontSize:'22px'}}>
                    {
                        activeIndex == 1 ?  t("sub.banquet_detail.small_11_desc_2")
                        :
                        activeIndex == 2 ?  t("sub.banquet_detail.small_3_desc_2")
                        :
                        t("sub.banquet_detail.middle_12_desc_2")
                    }
                    </Typography>
                </Box>
                <Box sx={styles.miniWrapper} ref={elementRef}>
                    <Box sx={styles.miniInsideWrapper}>
                        <Box sx={{...styles.miniBoxWrapper,height: activeIndex == 0 ? '100px' : "80px", border : activeIndex == 0 ? "2px solid #fff" : "0.3px solid #ccc"}} onClick={()=> onClickChageIndex(0,elementRef.current)}>
                            <Image 
                                src={MiniMiddle12F}  
                                alt="slide" 
                                style={{width:'100%', height:'100%',borderRadius:'10px',objectFit: 'cover',opacity: activeIndex == 0 ? 1 :  0.4}}
                            />  
                            <Box sx={styles.miniTextWrapper}>
                                <Typography variant="sourceHanSans" sx={{color:'#fff',fontSize:'24px'}}>{t("common.banquet.floor_12")} | 12F</Typography>
                                {activeIndex == 0 && (
                                <Button
                                    color={'inherit'}
                                    size='small'
                                    variant={'outlined'}
                                    sx={styles.moreBtn}
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        setIsShowPopDetail(0)
                                    }}
                                >
                                    <Typography variant="sourceHanSans" sx={{color:'#fff',fontSize:'0.9em'}}>더보기 + </Typography>
                                </Button>
                                )}
                            </Box>
                            {activeIndex == 0 && (
                                <Box sx={styles.progressBar}>
                                    <LinearProgress variant="determinate" value={progress} sx={{backgroundColor: 'transparent','& .MuiLinearProgress-bar': {backgroundColor:'#f84040'}}} />
                                </Box>
                            )}
                        </Box>
                        <Box sx={{...styles.miniBoxWrapper,height: activeIndex == 1 ? '100px' : "80px",  border : activeIndex == 1 ? "2px solid #fff" : "0.3px solid #ccc"}} onClick={()=> onClickChageIndex(1,elementRef.current)}>
                            <Image
                                src={MiniSmall11F}  
                                alt="slide" 
                                style={{width:'100%', height:'100%',borderRadius:'10px',objectFit: 'cover',opacity: activeIndex == 1 ? 1 :  0.4}}
                            />  
                            <Box sx={styles.miniTextWrapper}>
                                <Typography variant="sourceHanSans" sx={{color:'#fff',fontSize:'24px'}}>{t("common.banquet.floor_11") } | 11F</Typography>
                                {activeIndex == 1 && (
                                <Button
                                    color={'inherit'}
                                    size='small'
                                    variant={'outlined'}
                                    sx={styles.moreBtn}
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        setIsShowPopDetail(1)
                                    }}
                                >
                                    <Typography variant="sourceHanSans" sx={{color:'#fff',fontSize:'0.9em'}}>더보기 + </Typography>
                                </Button>
                                )}
                            </Box>
                            {activeIndex == 1 && (
                                <Box sx={styles.progressBar}>
                                    <LinearProgress variant="determinate" value={progress} sx={{backgroundColor: 'transparent','& .MuiLinearProgress-bar': {backgroundColor:'#f84040'}}} />
                                </Box>
                            )}
                        </Box>
                        <Box sx={{...styles.miniBoxWrapper,height: activeIndex == 2 ? '100px' : "80px", border : activeIndex == 2 ? "2px solid #fff" : "0.3px solid #ccc"}} onClick={()=> onClickChageIndex(2,elementRef.current)}>
                            <Image 
                                src={MiniSmall3F}  
                                alt="slide" 
                                style={{width:'100%', height:'100%',borderRadius:'10px',objectFit: 'cover',opacity: activeIndex == 2 ? 2 :  0.4}}
                            />  
                            <Box sx={styles.miniTextWrapper}>
                                <Typography variant="sourceHanSans" sx={{color:'#fff',fontSize:'24px'}}>{t("common.banquet.floor_11")} | 3F</Typography>
                                {activeIndex == 2 && (
                                <Button
                                    color={'inherit'}
                                    size='small'
                                    variant={'outlined'}
                                    sx={styles.moreBtn}
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        setIsShowPopDetail(2)
                                    }}
                                >
                                    <Typography variant="sourceHanSans" sx={{color:'#fff',fontSize:'0.9em'}}>더보기 + </Typography>
                                </Button>
                                )}
                            </Box>
                            {activeIndex == 2 && (
                                <Box sx={styles.progressBar}>
                                    <LinearProgress variant="determinate" value={progress} sx={{backgroundColor: 'transparent','& .MuiLinearProgress-bar': {backgroundColor:'#f84040'}}} />
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box sx={{position:'absolute',left:0,top:"936px",width:'100%',heigth:"210px",backgroundColor:"#f7f7f7"}}>
                <Copyright isMobile={false} />
            </Box>
            {
                showPopDetail != 9 && (
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
                            isAccess={"banquet"}
                            activeIndex={showPopDetail}
                        />
                    </Drawer>
                )
            }
            {
                isShowPopDetail != 9 && (
                <Box sx={{ 
                    position:'absolute',
                    left:0,
                    top:0,
                    width:'100%',
                    height:'100%',
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundColor:'transparent'
                }}
                >
                    <Drawer
                        open={isShowPopDetail != 9}
                        onClose={() => {
                            setIsShowPopDetail(9);
                        }}
                        lockBackgroundScroll={true}
                        enableOverlay={true} //toggle off == flase
                        direction='top'
                        className='bla bla bla'
                        size={"100vw"}
                        style={{
                            display:'flex',
                            justifyContent:'center',
                            alignItems:'center',
                            backgroundColor:'transparent'
                        }}
                        zIndex={999}
                    >
                        <BanquetDetail
                            setShowPopDetail={setIsShowPopDetail}
                            isAccess={"banquet"}
                            activeIndex={isShowPopDetail}
                        />
                    </Drawer>
                    </Box>
                )
            }

        </Box>
    )
}

const styles = {
    wrapper : {
        display:'flex',flexDirection:'column',minWidth:'1600px',width:'100%',minHeight:"900px",justifyContent:'flex-start',backgroundColor : "#f7f7f7"
    },
    outerWrap : {
        display:'flex',minHeight:'900px',backgroundColor:'transparent',minWidth:'1600px',width:'100%'
    },
    contentWrapper : {
        display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',position:'absolute',left:0,top:0,minWidth:'1600px', width:'100%',height:'calc( 100vh - 200px )'
    },
    miniWrapper : {
        display:'flex',flexDirection:'colomn',alignItems:'center',justifyContent:'center',position:'absolute',left:0,bottom:'40px',minWidth:'1600px', width:'100%',height:'100px',
    },
    miniInsideWrapper : {
        display:'flex',flexDirection:'row',alignItems:'flex-end',justifyContent:'space-between',width:'1100px',height:'100%'
    },
    miniBoxWrapper : {
        position: 'relative',height:'100%',width:'360px',border:'2px solid #fff',borderRadius:'10px',cursor:"pointer"
    },
    miniTextWrapper : {
        zIndex: 2,position: 'absolute',height: '100%',width: '360px',textAlign: 'center',top:0,left:0,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'
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