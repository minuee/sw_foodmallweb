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


import MainStudioBg01 from "@images/rooms/studio_01.png";
import MainStudioBg02 from "@images/rooms/studio_02.png";
import MainStudioBg03 from "@images/rooms/studio_03.png";
import MainDeluxeBg01 from "@images/rooms/deluxe_01.png";
import MainSuiteBg01 from "@images/rooms/suite_01.png";

import MiniMiddleStudio from "@images/rooms/mini_small_studio.png";
import MiniSmallDeluxe from "@images/rooms/mini_small_deluxe.png";
import MiniSmallSuite from "@images/rooms/mini_small_suite.png";

import RommOptionDouble from "@images/rooms/icon-room-info-double.png";
import RommOptionPersonal from "@images/rooms/icon-room-info-personnel.png";
import RommOptionRSZ from "@images/rooms/icon-room-info-rsz.png";
import RommOptionView from "@images/rooms/icon-room-info-view.png";

import RommView01 from "@images/rooms/room_view_01.png";
import RommView02 from "@images/rooms/room_view_02.png";
import RommView03 from "@images/rooms/room_view_03.png";
import RommView04 from "@images/rooms/room_view_04.png";
import RommView05 from "@images/rooms/room_view_05.png";


import QuickPopupDetail from "components/popup/QuickPopupDetail";
import BanquetDetail from "components/popup/BanquetDetail";
import Copyright from "components/home/Copyright";
import QuickRight from "components/common/QuickRight";


export default function RoomsScreen() {
    const { t } = useTranslation(['common','yakwan']);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [showPopDetail, setShowPopDetail] = React.useState(9);
    const [isShowPopDetail, setIsShowPopDetail] = React.useState(9);
    const [roomView, setRoomView] = React.useState(1);
    const [isOpenReservation, setOpenReservation] = useRecoilState(globalOpenReservation);
    const [progress, setProgress] = React.useState(0);
    const elementRef = React.useRef(null);
    const onClickChageIndex = React.useCallback(
        (num:number,element:any) => {
            setActiveIndex(num);
            setRoomView(1);
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
        }, roomView > 1 ? 10000 :100);
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
    }, [activeIndex,showPopDetail,isShowPopDetail,isOpenReservation,roomView]);

    const openQuickMenu = (val:number) => {
        setShowPopDetail(val);
    }

    const _renderBgImage = () => {
        if ( activeIndex == 1 ) {
            return MainDeluxeBg01;
        }else if ( activeIndex == 2 ) {
            return MainSuiteBg01;
        }else{
            if ( roomView == 2 ) {
                return MainStudioBg02;
            }else if ( roomView == 3 ) {
                    return MainStudioBg03;
            }else{
                return MainStudioBg01;
            }
        }
    }

    return (
        <Box sx={styles.wrapper}>
            <Box sx={styles.outerWrap}>
                <Box sx={styles.quickWrap}>
                    <QuickRight 
                        openQuickMenu={openQuickMenu}
                        isMode={"rooms"}
                    />
                </Box>
                <Image 
                    alt={"main"}
                    src={_renderBgImage()}
                    placeholder="blur"
                    fill
                   //className={progress < 20 ? "fade-in-image" : ""}
                    sizes="100vw"
                    style={{
                        objectFit: 'cover',
                    }}
                />
                <Box sx={styles.contentWrapper}>
                    <Typography variant="futura" sx={styles.mainTitleText}>
                        {activeIndex == 2 ? 'SUITE ROOM' : activeIndex == 1 ? 'DELUXE ROOM' : 'STUDIO ROOM'}
                    </Typography>
                    <Typography variant="sourceHanSans" sx={styles.mainTitleSubText}>
                    {
                        activeIndex == 1 ?  
                        t("sub.rooms_detail.room_info_title.studio_room")
                        :
                        activeIndex == 2 ?  
                        t("sub.rooms_detail.room_info_title.deluxe_room")
                        :
                        t("sub.rooms_detail.room_info_title.suite_room")
                    }
                    </Typography>
                </Box>
                <Box sx={styles.miniWrapper} ref={elementRef}>
                    <Box sx={styles.miniInsideWrapper}>
                        <Box sx={activeIndex == 0 ? styles.miniCurrentBoxWrapper : styles.miniBoxWrapper} >
                            {activeIndex == 0 ?
                                <Box sx={styles.roomViewWrapper}>
                                    <Box sx={roomView == 1 ? styles.roomViewSelectedtBox : styles.roomViewDefaultBox} onClick={(e)=>{e.preventDefault();setRoomView(1);}}>
                                        <Image
                                            src={RommView01}  
                                            alt="slide" 
                                            style={{width:'58px',objectFit: 'contain'}}
                                        />  
                                    </Box>
                                    <Box sx={roomView == 2 ? styles.roomViewSelectedtBox : styles.roomViewDefaultBox} onClick={(e)=>{setRoomView(2);e.preventDefault();}}>
                                        <Image
                                            src={RommView02}  
                                            alt="slide" 
                                            style={{width:'58px',objectFit: 'contain'}}
                                        />  
                                    </Box>
                                    <Box sx={roomView == 3? styles.roomViewSelectedtBox : styles.roomViewDefaultBox}  onClick={(e)=>{e.preventDefault();setRoomView(3);}}>
                                        <Image
                                            src={RommView03}  
                                            alt="slide" 
                                            style={{width:'58px',objectFit: 'contain'}}
                                        />  
                                    </Box>
                                    <Box sx={roomView == 4 ? styles.roomViewSelectedtBox : styles.roomViewDefaultBox}  onClick={(e)=>{e.preventDefault();setRoomView(4);}}>
                                        <Image
                                            src={RommView04}  
                                            alt="slide" 
                                            style={{width:'58px',objectFit: 'contain'}}
                                        />  
                                    </Box>
                                    <Box sx={roomView == 5 ? styles.roomViewSelectedtBox : styles.roomViewDefaultBox}  onClick={(e)=>{e.preventDefault();setRoomView(5);}}>
                                        <Image
                                            src={RommView05}  
                                            alt="slide" 
                                            style={{width:'58px',objectFit: 'contain'}}
                                        />  
                                    </Box>
                                </Box>
                            :
                            (
                                <Image 
                                    src={MiniMiddleStudio}  
                                    alt="slide" 
                                    style={{width:'100%', height:'100%',borderRadius:'10px',objectFit: 'cover',opacity: activeIndex == 0 ? 1 :  0.4}}
                                />  
                            )}
                            {activeIndex == 0 ? 
                                <Box sx={styles.miniCurrentTitleBox}>
                                    <Typography variant="manrope" sx={styles.miniRoomText}>STUDIO ROOM</Typography>
                                    <Typography variant="sourceHanSans" sx={styles.miniRoomSubText}>{t("sub.rooms_detail.room_type.studio_room")}</Typography>
                                </Box>
                            :
                                <Box sx={styles.miniTextWrapper} onClick={()=> onClickChageIndex(0,elementRef.current)}>
                                    <Typography variant="manrope" sx={styles.miniRoomText}>STUDIO ROOM</Typography>
                                    <Typography variant="sourceHanSans" sx={styles.miniRoomSubText}>{t("sub.rooms_detail.room_type.studio_room")}</Typography>
                                </Box>
                            }
                            {activeIndex == 0 && (
                                <Box sx={styles.miniCurrentDescBox}>
                                    <Box sx={styles.roomOptionWrapper}>
                                        <Image
                                            src={RommOptionDouble}  
                                            alt="slide" 
                                            style={{width:'50px',objectFit: 'contain'}}
                                        />  
                                        <Typography variant="sourceHanSans" sx={styles.miniRoomOptionText}>
                                            {t("sub.rooms_detail.room_desc.double")} or {t("sub.rooms_detail.room_desc.twin")}
                                        </Typography>
                                    </Box>
                                    <Box sx={styles.roomOptionWrapper}>
                                        <Image
                                            src={RommOptionPersonal}  
                                            alt="slide" 
                                            style={{width:'50px',objectFit: 'contain'}}
                                        />  
                                        <Typography variant="sourceHanSans" sx={styles.miniRoomOptionText}>
                                            {t("sub.rooms_detail.room_desc.max")}2{t("sub.rooms_detail.room_desc.man")} 
                                        </Typography>
                                    </Box>
                                    <Box sx={styles.roomOptionWrapper}>
                                        <Image
                                            src={RommOptionView}  
                                            alt="slide" 
                                            style={{width:'50px',objectFit: 'contain'}}
                                        />  
                                        <Typography variant="sourceHanSans" sx={styles.miniRoomOptionText}>
                                            {t("sub.rooms_detail.room_desc.namsan")} or {t("sub.rooms_detail.room_desc.city")} 
                                        </Typography>
                                    </Box>
                                    <Box sx={styles.roomOptionWrapper}>
                                        <Image
                                            src={RommOptionRSZ}  
                                            alt="slide" 
                                            style={{width:'50px',objectFit: 'contain'}}
                                        />  
                                        <Typography variant="sourceHanSans" sx={styles.miniRoomOptionText}>23㎡ </Typography>
                                    </Box>
                                </Box>
                            )}
                            {activeIndex == 0 && (
                                <Box sx={styles.progressBar}>
                                    <LinearProgress variant="determinate" value={progress} sx={{backgroundColor: 'transparent','& .MuiLinearProgress-bar': {backgroundColor:'#ffffff'}}} />
                                </Box>
                            )}
                        </Box>
                        <Box sx={activeIndex == 1 ? styles.miniCurrentBoxWrapper : styles.miniBoxWrapper} >
                            {   activeIndex == 1 ?
                                <Box sx={styles.roomViewWrapper}>
                                    <Box sx={roomView == 1 ? styles.roomViewSelectedtBox : styles.roomViewDefaultBox} onClick={(e)=>{e.preventDefault();setRoomView(1);}}>
                                        <Image
                                            src={RommView01}  
                                            alt="slide" 
                                            style={{width:'58px',objectFit: 'contain'}}
                                        />  
                                    </Box>
                                    <Box sx={roomView == 2 ? styles.roomViewSelectedtBox : styles.roomViewDefaultBox} onClick={(e)=>{setRoomView(2);e.preventDefault();}}>
                                        <Image
                                            src={RommView02}  
                                            alt="slide" 
                                            style={{width:'58px',objectFit: 'contain'}}
                                        />  
                                    </Box>
                                    <Box sx={roomView == 3? styles.roomViewSelectedtBox : styles.roomViewDefaultBox}  onClick={(e)=>{e.preventDefault();setRoomView(3);}}>
                                        <Image
                                            src={RommView03}  
                                            alt="slide" 
                                            style={{width:'58px',objectFit: 'contain'}}
                                        />  
                                    </Box>
                                    <Box sx={roomView == 4 ? styles.roomViewSelectedtBox : styles.roomViewDefaultBox}  onClick={(e)=>{e.preventDefault();setRoomView(4);}}>
                                        <Image
                                            src={RommView04}  
                                            alt="slide" 
                                            style={{width:'58px',objectFit: 'contain'}}
                                        />  
                                    </Box>
                                    <Box sx={roomView == 5 ? styles.roomViewSelectedtBox : styles.roomViewDefaultBox}  onClick={(e)=>{e.preventDefault();setRoomView(5);}}>
                                        <Image
                                            src={RommView05}  
                                            alt="slide" 
                                            style={{width:'58px',objectFit: 'contain'}}
                                        />  
                                    </Box>
                                </Box>
                                :
                                <Image
                                    src={MiniSmallDeluxe}  
                                    alt="slide" 
                                    style={{width:'100%', height:'100%',borderRadius:'10px',objectFit: 'cover',opacity: activeIndex == 1 ? 1 :  0.4}}
                                />  
                            }
                            {activeIndex == 1 ? 
                                <Box sx={styles.miniCurrentTitleBox}>
                                    <Typography variant="manrope" sx={styles.miniRoomText}>DELUXE ROOM</Typography>
                                    <Typography variant="sourceHanSans" sx={styles.miniRoomSubText}>{t("sub.rooms_detail.room_type.deluxe_room")}</Typography>
                                </Box>
                            :
                                <Box sx={styles.miniTextWrapper} onClick={()=> onClickChageIndex(1,elementRef.current)}>
                                    <Typography variant="manrope" sx={styles.miniRoomText}>DELUXE ROOM</Typography>
                                    <Typography variant="sourceHanSans" sx={styles.miniRoomSubText}>{t("sub.rooms_detail.room_type.deluxe_room")} </Typography>
                                </Box>
                            }
                            {activeIndex == 1 && (
                                <Box sx={styles.miniCurrentDescBox}>
                                    <Box sx={styles.roomOptionWrapper}>
                                        <Image
                                            src={RommOptionDouble}  
                                            alt="slide" 
                                            style={{width:'50px',objectFit: 'contain'}}
                                        />  
                                        <Typography variant="sourceHanSans" sx={styles.miniRoomOptionText}>
                                            {t("sub.rooms_detail.room_desc.double")} or {t("sub.rooms_detail.room_desc.triple")}
                                        </Typography>
                                    </Box>
                                    <Box sx={styles.roomOptionWrapper}>
                                        <Image
                                            src={RommOptionPersonal}  
                                            alt="slide" 
                                            style={{width:'50px',objectFit: 'contain'}}
                                        />  
                                        <Typography variant="sourceHanSans" sx={styles.miniRoomOptionText}>
                                        {t("sub.rooms_detail.room_desc.max")}3{t("sub.rooms_detail.room_desc.man")} 
                                        </Typography>
                                    </Box>
                                    <Box sx={styles.roomOptionWrapper}>
                                        <Image
                                            src={RommOptionView}  
                                            alt="slide" 
                                            style={{width:'50px',objectFit: 'contain'}}
                                        />  
                                        <Typography variant="sourceHanSans" sx={styles.miniRoomOptionText}>
                                        {t("sub.rooms_detail.room_desc.namsan")} or {t("sub.rooms_detail.room_desc.city")} 
                                        </Typography>
                                    </Box>
                                    <Box sx={styles.roomOptionWrapper}>
                                        <Image
                                            src={RommOptionRSZ}  
                                            alt="slide" 
                                            style={{width:'50px',objectFit: 'contain'}}
                                        />  
                                        <Typography variant="sourceHanSans" sx={styles.miniRoomOptionText}>28㎡ </Typography>
                                    </Box>
                                </Box>
                            )}
                            {activeIndex == 1 && (
                                <Box sx={styles.progressBar}>
                                    <LinearProgress variant="determinate" value={progress} sx={{backgroundColor: 'transparent','& .MuiLinearProgress-bar': {backgroundColor:'#ffffff'}}} />
                                </Box>
                            )}
                        </Box>
                        <Box sx={activeIndex == 2 ? styles.miniCurrentBoxWrapper : styles.miniBoxWrapper}>
                            {   activeIndex == 2 ?
                                <Box sx={styles.roomViewWrapper}>
                                    <Box sx={roomView == 1 ? styles.roomViewSelectedtBox : styles.roomViewDefaultBox} onClick={(e)=>{e.preventDefault();setRoomView(1);}}>
                                        <Image
                                            src={RommView01}  
                                            alt="slide" 
                                            style={{width:'58px',objectFit: 'contain'}}
                                        />  
                                    </Box>
                                    <Box sx={roomView == 2 ? styles.roomViewSelectedtBox : styles.roomViewDefaultBox} onClick={(e)=>{setRoomView(2);e.preventDefault();}}>
                                        <Image
                                            src={RommView02}  
                                            alt="slide" 
                                            style={{width:'58px',objectFit: 'contain'}}
                                        />  
                                    </Box>
                                    <Box sx={roomView == 3? styles.roomViewSelectedtBox : styles.roomViewDefaultBox}  onClick={(e)=>{e.preventDefault();setRoomView(3);}}>
                                        <Image
                                            src={RommView03}  
                                            alt="slide" 
                                            style={{width:'58px',objectFit: 'contain'}}
                                        />  
                                    </Box>
                                    <Box sx={roomView == 4 ? styles.roomViewSelectedtBox : styles.roomViewDefaultBox}  onClick={(e)=>{e.preventDefault();setRoomView(4);}}>
                                        <Image
                                            src={RommView04}  
                                            alt="slide" 
                                            style={{width:'58px',objectFit: 'contain'}}
                                        />  
                                    </Box>
                                    <Box sx={roomView == 5 ? styles.roomViewSelectedtBox : styles.roomViewDefaultBox}  onClick={(e)=>{e.preventDefault();setRoomView(5);}}>
                                        <Image
                                            src={RommView05}  
                                            alt="slide" 
                                            style={{width:'58px',objectFit: 'contain'}}
                                        />  
                                    </Box>
                                </Box>
                                :
                                <Image
                                    src={MiniSmallSuite}  
                                    alt="slide" 
                                    style={{width:'100%', height:'100%',borderRadius:'10px',objectFit: 'cover',opacity: activeIndex == 1 ? 1 :  0.4}}
                                />  
                            }
                            {activeIndex == 2 ? 
                                <Box sx={styles.miniCurrentTitleBox}>
                                    <Typography variant="manrope" sx={styles.miniRoomText}>SUITE ROOM</Typography>
                                    <Typography variant="sourceHanSans" sx={styles.miniRoomSubText}>{t("sub.rooms_detail.room_type.suite_room")}</Typography>
                                </Box>
                            :
                                <Box sx={styles.miniTextWrapper}  onClick={()=> onClickChageIndex(2,elementRef.current)}>
                                    <Typography variant="manrope" sx={styles.miniRoomText}>SUITE ROOM</Typography>
                                    <Typography variant="sourceHanSans" sx={styles.miniRoomSubText}>{t("sub.rooms_detail.room_type.suite_room")}</Typography>
                                </Box>
                            }
                            {activeIndex == 2 && (
                                <Box sx={styles.miniCurrentDescBox}>
                                    <Box sx={styles.roomOptionWrapper}>
                                        <Image
                                            src={RommOptionDouble}  
                                            alt="slide" 
                                            style={{width:'50px',objectFit: 'contain'}}
                                        />  
                                        <Typography variant="sourceHanSans" sx={styles.miniRoomOptionText}>
                                        {t("sub.rooms_detail.room_desc.double")} or 2{t("sub.rooms_detail.room_desc.double")}
                                        </Typography>
                                    </Box>
                                    <Box sx={styles.roomOptionWrapper}>
                                        <Image
                                            src={RommOptionPersonal}  
                                            alt="slide" 
                                            style={{width:'50px',objectFit: 'contain'}}
                                        />  
                                        <Typography variant="sourceHanSans" sx={styles.miniRoomOptionText}>
                                        {t("sub.rooms_detail.room_desc.max")}6{t("sub.rooms_detail.room_desc.man")} 
                                        </Typography>
                                    </Box>
                                    <Box sx={styles.roomOptionWrapper}>
                                        <Image
                                            src={RommOptionView}  
                                            alt="slide" 
                                            style={{width:'50px',objectFit: 'contain'}}
                                        />  
                                        <Typography variant="sourceHanSans" sx={styles.miniRoomOptionText}>
                                        {t("sub.rooms_detail.room_desc.namsan")} or {t("sub.rooms_detail.room_desc.city")} 
                                        </Typography>
                                    </Box>
                                    <Box sx={styles.roomOptionWrapper}>
                                        <Image
                                            src={RommOptionRSZ}  
                                            alt="slide" 
                                            style={{width:'50px',objectFit: 'contain'}}
                                        />  
                                        <Typography variant="sourceHanSans" sx={styles.miniRoomOptionText}>46㎡~56㎡ </Typography>
                                    </Box>
                                </Box>
                            )}
                            {activeIndex == 2 && (
                                <Box sx={styles.progressBar}>
                                    <LinearProgress variant="determinate" value={progress} sx={{backgroundColor: 'transparent','& .MuiLinearProgress-bar': {backgroundColor:'#ffffff'}}} />
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
                            isAccess={"rooms"}
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
                            isAccess={"rooms"}
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
        display:'flex',flexDirection:'column',alignItems:'center',position:'absolute',left:0,top:"134px",minWidth:'1600px', width:'100%',height:'calc( 100% - 134px )'
    },
    mainTitleText : {
        textShadow: "0 0 16px rgba(0, 0, 0, 0.2)",
        fontSize: "78px",
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "1.49",
        letterSpacing: "0",
        color: "#fff",
    },
    mainTitleSubText : {
        textShadow: "0 0 16px rgba(0, 0, 0, 0.2)",
        fontSize: "20px",
        fontWeight: "normal",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "normal",
        letterSpacing: "-0.4px",
        color: "#fff",
    },
    miniRoomText :{ 
        fontSize: "20px",
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "30px",
        letterSpacing: "-0.4px",
        color: "#e6e6e6",
    },
    miniRoomSubText :{ 
        fontSize: "16px",
        fontWeight: "normal",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "normal",
        letterSpacing: "-0.4px",
        color: "#e6e6e6",
    },
    miniRoomOptionText : {
        fontSize: "13px",
        fontWeight: "normal",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "normal",
        letterSpacing: "-1px",
        color: "#fff",
        marginTop:"5px"
    },
    miniWrapper : {
        display:'flex',flexDirection:'colomn',alignItems:'center',justifyContent:'center',position:'absolute',left:0,bottom:'40px',minWidth:'1600px', width:'100%',height:'100px',
    },
    miniInsideWrapper : {
        display:'flex',flexDirection:'row',alignItems:'flex-end',justifyContent:'space-between',width:'1150px',height:'100%'
    },
    miniBoxWrapper : {
        position: 'relative',height:'96px',width:'224px',border:'1px solid #707070',borderRadius:'10px',cursor:"pointer",backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    roomViewWrapper : {
        position:'absolute',top:"-70px",left:0,width:"450px",height:"58px",display:'flex',flexDirection:'row',zIndex:5
    },
    roomViewDefaultBox : {
        display:'flex',width:"59px",height:"59px",marginRight:"10px",borderRadius:"29px",justifyContent:'center',alignItems:'center',border:"1px solid  #fff",
        backgroundColor: "rgba(0, 0, 0, 0.2)",filter:"brightness(60%)"
    },
    roomViewSelectedtBox : {
        display:'flex',width:"60px",height:"60px",marginRight:"10px",borderRadius:"29px",justifyContent:'center',alignItems:'center',border:"2px solid  #fff",zIndex:5
    },
    miniCurrentBoxWrapper : {
        position: 'relative',
        cursor:"pointer",
        width: '638px',
        height:'96px',
        borderRadius: "10px",
        backdropFilter: "blur(30px)",
        border: "solid 1px rgba(112, 112, 112, 0.16)",
        backgroundColor: "rgba(0, 0, 0, 0.16)"
    },
    miniCurrentTitleBox : {
        position:'absolute',left:"-1px",top:"-1px",height:"96px",width:"210px",borderBottomRightRadius: "56px",boxShadow: "3px 0 6px 0 rgba(0, 0, 0, 0.16)",backgroundColor: "#bb9b6a",display:'flex',flexDirection:'column',justifyContent:'center',paddingLeft:"24px",borderTopLeftRadius: "10px",borderBottomLeftRadius: "10px",
    },
    miniCurrentDescBox : {
        display:'flex',position:'absolute',top:"-1px",left:"211px",width:"420px",height:'96px',flexDirection:'row',alignItems:'center',justifyContent:'space-evenly'
    },
    roomOptionWrapper : {
        display:'flex',flex:1,flexDirection:'column',alignItems:'center',justifyContent:'center'
    },
    miniTextWrapper : {
        zIndex: 2,position: 'absolute',height: '100%',width: '224px',textAlign: 'center',top:0,left:0,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'
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