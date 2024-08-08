import * as React from 'react';
import Image from "next/image";
import { Box, Button, Container, Typography } from "@mui/material";
import { useTranslation } from 'next-i18next';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';


import SpeedDialAction from '@mui/material/SpeedDialAction';
import MainBgImage from "@images/banquet/middle.png";
import MainBgImage2 from "@images/banquet/small.png";
import MainBgImage3 from "@images/banquet/small2.png";

import MiniMiddle12F from "@images/banquet/mini_middle_12f.png";
import MiniSmall11F from "@images/banquet/mini_small_11f.png";
import MiniSmall3F from "@images/banquet/mini_small_3f.png";

import BanquetDetail from "components/popup/mobile/BanquetDetail";

export default function BanquetScreen() {
    const { t } = useTranslation(['common','yakwan']);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [showPopDetail, setShowPopDetail] = React.useState(9);
    
    const elementRef = React.useRef(null);
    const onClickChageIndex = React.useCallback(
        (num:number,element:any) => {
            setActiveIndex(num);
            let scrollAmount = num*250;
            element.scrollLeft = scrollAmount;
               
        },
        [activeIndex]
    );

    return (
        <Box sx={styles.outerWrap}>
            <Image 
                alt={"main"}
                src={activeIndex == 0 ?  MainBgImage :activeIndex == 1 ?  MainBgImage2 : MainBgImage3}
                placeholder="blur"
                fill
                sizes="100vw"
                style={{
                    objectFit: 'cover'
                }}
            />
            <Box sx={styles.contentWrapper}>
                <Typography variant="sourceHanSans" sx={{color:'#fff',fontSize:'2em',lineHeight:'3em'}}>
                    {activeIndex == 0 ? '중규모연회장' : '소규모연회장'}
                </Typography>
                <Typography variant="sourceHanSans" sx={{color:'#fff',fontSize:'1em'}}>
                {
                    activeIndex == 1 ?  
                    `스테이락 호텔 11층에 위치한 중규모 연회장으로 120명 규모의 파티, 세미나, 리셉션 등 목적에 따라 다양한 스타일의 행사가 가능합니다.`
                    :
                    activeIndex == 2 ?  
                    `스테이락 호텔 3층에 위치한 중규모 연회장으로 120명 규모의 파티, 세미나, 리셉션 등 목적에 따라 다양한 스타일의 행사가 가능합니다.`
                    :
                    `스테이락 호텔 12층에 위치한 중규모 연회장으로 120명 규모의 파티, 세미나, 리셉션 등 목적에 따라 다양한 스타일의 행사가 가능합니다.`
                }
                </Typography>
            </Box>
            <Box sx={styles.miniWrapper} ref={elementRef}>
                <Box sx={{...styles.miniBoxWrapper,width:activeIndex == 0 ? '100%' : "80%",height: activeIndex == 0 ? '100%' : "80%", border : activeIndex == 0 ? "2px solid #fff" : "0px"}} onClick={()=> onClickChageIndex(0,elementRef.current)}>
                    <Image 
                        src={MiniMiddle12F}  
                        alt="slide" 
                        style={{width:'250px', height:'100%',borderRadius:'10px',objectFit: 'cover',opacity: activeIndex == 0 ? 1 :  0.6}}
                    />  
                    <Box sx={styles.miniTextWrapper}>
                        <Typography variant="sourceHanSans" sx={{color:'#fff',fontSize:'1em'}}>중규모연회장 | 12F</Typography>
                        {activeIndex == 0 && (
                        <Button
                            color={'inherit'}
                            size='small'
                            variant={'outlined'}
                            sx={styles.moreBtn}
                            onClick={(e)=>{
                                e.preventDefault();
                                setShowPopDetail(0)
                            }}
                        >
                            <Typography variant="sourceHanSans" sx={{color:'#fff',fontSize:'0.9em'}}>더보기 + </Typography>
                        </Button>
                        )}
                    </Box>
                </Box>
                <Box sx={{...styles.miniBoxWrapper,width:activeIndex == 1 ? '100%' : "80%",height: activeIndex == 1 ? '100%' : "80%", border : activeIndex == 1 ? "2px solid #fff" : "0px"}} onClick={()=> onClickChageIndex(1,elementRef.current)}>
                    <Image
                        src={MiniSmall11F}  
                        alt="slide" 
                        style={{width:'250px', height:'100%',borderRadius:'10px',objectFit: 'cover',opacity: activeIndex == 1 ? 1 :  0.6}}
                    />  
                    <Box sx={styles.miniTextWrapper}>
                        <Typography variant="sourceHanSans" sx={{color:'#fff',fontSize:'1em'}}>소규모연회장 | 11F</Typography>
                        {activeIndex == 1 && (
                        <Button
                            color={'inherit'}
                            size='small'
                            variant={'outlined'}
                            sx={styles.moreBtn}
                            onClick={(e)=>{
                                e.preventDefault();
                                setShowPopDetail(1)
                            }}
                        >
                            <Typography variant="sourceHanSans" sx={{color:'#fff',fontSize:'0.9em'}}>더보기 + </Typography>
                        </Button>
                        )}
                    </Box>
                </Box>
                <Box sx={{...styles.miniBoxWrapper,width:activeIndex == 2 ? '100%' : "80%",height: activeIndex == 2 ? '100%' : "80%", border : activeIndex == 2 ? "2px solid #fff" : "0px"}} onClick={()=> onClickChageIndex(2,elementRef.current)}>
                    <Image 
                        src={MiniSmall3F}  
                        alt="slide" 
                        style={{width:'250px', height:'100%',borderRadius:'10px',objectFit: 'cover',opacity: activeIndex == 0 ? 2 :  0.6}}
                    />  
                    <Box sx={styles.miniTextWrapper}>
                        <Typography variant="sourceHanSans" sx={{color:'#fff',fontSize:'1em'}}>소규모연회장 | 3F</Typography>
                        {activeIndex == 2 && (
                        <Button
                            color={'inherit'}
                            size='small'
                            variant={'outlined'}
                            sx={styles.moreBtn}
                            onClick={(e)=>{
                                e.preventDefault();
                                setShowPopDetail(2)
                            }}
                        >
                            <Typography variant="sourceHanSans" sx={{color:'#fff',fontSize:'0.9em'}}>더보기 + </Typography>
                        </Button>
                        )}
                    </Box>
                </Box>
            </Box>
            {
                showPopDetail!= 9 && (
                    <Drawer
                        open={showPopDetail != 9}
                        onClose={() => {
                            setShowPopDetail(9);
                        }}
                        lockBackgroundScroll={false}
                        enableOverlay={true} //toggle off == flase
                        direction='bottom'
                        className='bla bla bla'
                        size={"90vh"}
                        style={{
                            overflow: 'hidden',
                            backgroundColor:'transparent',
        
                        }}
                        zIndex={999}
                    >
                        <BanquetDetail
                            setShowPopDetail={setShowPopDetail}
                            activeIndex={activeIndex}
                        />
                    </Drawer>
                )
            }
        </Box>
    )
}

const styles = {
    outerWrap : {
        padding: 4, display: "flex",flexDirection: "column",justifyContent: "center",alignItems: "center"
    },
    contentWrapper : {
        display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',position:'absolute',left:0,top:0,width:'100%',height:'calc( 100vh - 200px )',padding:'10px 25px'
    },
    miniWrapper : {
        display:'flex',flexDirection:'row',alignItems:'flex-end',position:'absolute',left:0,bottom:'10vh',width:'100vw',height:'100px',padding:'10px',overflowX:'scroll'
    },
    miniBoxWrapper : {
        position: 'relative',height:'100%',width:'100%',border:'2px solid #fff',borderRadius:'10px',marginRight:'10px'
    },
    miniTextWrapper : {
        zIndex: 2,position: 'absolute',height: '100%',width: '100%',textAlign: 'center',top:0,left:0,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'
    },
    moreBtn : {
        border:'1px solid #ffffff',borderRadius:'5px',padding:'2px',marginTop:'3px'
    }
}