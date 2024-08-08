import * as React from 'react';
import { useRouter } from "next/router";
import Image from "next/image";
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from 'next-i18next';
import NoSsr from "@mui/material/NoSsr";
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

import ReservationConfirm from "components/popup/ReservationConfirm";

import DiningReservation from "./DiningReservation";
import GroupReservation from "./GroupReservation";
import RoomReservation from "./RoomReservation";
import RoomReservation2 from "./RoomReservation2";
import RoomStepHeader from  "./RoomStepHeader";

import { landscapeState } from "@stores/layoutStore";
import { useWindowSize } from "@utils/useWindowSize";
import { useRecoilState } from "recoil";

import ICON_POPUP_CLOSE from "@icons/popup-close.png";

type PopupReservationProps = {
    activeIndex? : any,
    isAccess? : any,
    setShowPopDetail: (open: number) => void;
}

const Reservation: React.FC<PopupReservationProps> = ({ activeIndex, isAccess, setShowPopDetail}) => {
    const router = useRouter()
    const { t } = useTranslation(['common','yakwan']);
    const isAccessDevice =  useWindowSize();
    // 화면 가로모드 여부 확인
    const [viewLandscape, setIsLandscape] = useRecoilState(landscapeState);
    const [isOpenPopGallery, setOpenPopGallery] = React.useState(false);
    const [activeStep, setActiveStep] = React.useState(activeIndex);
    const [isOpenReservationConfirm, setOpenReservationConfirm] = React.useState(false);
    const [sendData, setSendData] = React.useState(null);
    const [roomStep, setRoomStepHeader] = React.useState(1);

    
    React.useEffect(() => {
        console.log("activeStep",activeStep)
    }, [activeStep]);
    

    const setShowPopConfirm = (data:any) => {
        
        if ( data == null ) {
            setOpenReservationConfirm(false)
        }else{
            setOpenReservationConfirm(true)
        }
        setTimeout(() =>  setSendData(data), 300);
       
    }

    return (
        <NoSsr>
            <Box sx={{...styles.contentWrapper,filter:isOpenReservationConfirm? "brightness(5%)" : "brightness(100%)"}}>
                {
                    !isOpenPopGallery && (
                    <Box 
                        sx={styles.closeBoxWrap}
                        onClick={() => setShowPopDetail(0)}
                    >
                        <Image 
                            alt={"sub"}
                            src={ICON_POPUP_CLOSE}
                            style={{width:'20px',height:'20px'}}
                        />
                    </Box>
                    )
                }
                <Box sx={styles.popupDataWrap}>
                    {
                        activeStep == 3  
                        ? 
                        <Box sx={styles.popupHeaderWrap}>
                            <RoomStepHeader
                                stepMenu={roomStep}
                                setRoomStepHeader={setRoomStepHeader}
                            />
                        </Box>
                        :
                        (
                            <Box sx={styles.popupHeaderWrap}>
                                <Box sx={styles.headerTitleWrap}>
                                    <Box sx={activeStep == 1 ? styles.headerSelectTitleWrap : styles.headerDefaultTitleWrap} onClick={()=>setActiveStep(1)}>
                                        <Typography variant="sourceHanSans" sx={activeStep == 1 ? styles.textStyle3 : styles.textStyle3Non}>DINING {t("reservation.title_reservation")}</Typography>
                                    </Box>
                                    <Box sx={activeStep == 2 ? styles.headerSelectTitleWrap : styles.headerDefaultTitleWrap} onClick={()=>setActiveStep(2)}>
                                        <Typography variant="sourceHanSans" sx={activeStep == 2 ? styles.textStyle3 : styles.textStyle3Non}>{t("reservation.title_group_reservation")}</Typography>
                                    </Box>
                                    
                                </Box>
                            </Box>
                        )
                    }
                    <Box sx={styles.popupBodyWrap}>
                        {
                            activeStep == 1 
                            ?
                            <DiningReservation 
                                isOpenReservationConfirm={isOpenReservationConfirm}
                                setShowPopConfirm={setShowPopConfirm}
                            />
                            :
                            activeStep == 2
                            ?
                            <GroupReservation 
                                isOpenReservationConfirm={isOpenReservationConfirm}
                                setShowPopConfirm={setShowPopConfirm}
                            />
                            :
                            roomStep > 1 
                            ?
                            <RoomReservation2 
                                isOpenReservationConfirm={isOpenReservationConfirm}
                                setShowPopConfirm={setShowPopConfirm}
                                setOpenPopGallery={setOpenPopGallery}
                                isOpenPopGallery={isOpenPopGallery}
                                roomStep={roomStep}
                                setRoomStepHeader={setRoomStepHeader}
                            />
                            :
                            <RoomReservation 
                                isOpenReservationConfirm={isOpenReservationConfirm}
                                setShowPopConfirm={setShowPopConfirm}
                                setOpenPopGallery={setOpenPopGallery}
                                isOpenPopGallery={isOpenPopGallery}
                                roomStep={roomStep}
                                setRoomStepHeader={setRoomStepHeader}
                            />
                        }
                    </Box>
                </Box>
            </Box>
            {
                isOpenReservationConfirm  && (
                    <Box sx={styles.drawerWrapper}>
                        <Drawer
                            open={isOpenReservationConfirm}
                            onClose={() => {setOpenReservationConfirm(false);}}
                            lockBackgroundScroll={true}
                            enableOverlay={true} //toggle off == flase
                            direction='bottom'
                            className='bla bla bla'
                            size={"100vw"}
                            style={{
                                display:'flex',
                                justifyContent:'center',
                                alignItems:'center',
                                width:'100%',
                                height:'100vh',
                                backgroundColor:'transparent',
                                zIndex:10000
                            }}
                            zIndex={9999}
                        >
                            <ReservationConfirm
                                setShowPopDetail={setOpenReservationConfirm}
                                sendData={sendData}
                            />
                        </Drawer>
                    </Box>
                )
            }
        </NoSsr>
    )
}

const styles = {
    
    contentWrapper : {
        position:'relative',display:'flex',width:'1668px',height:'766px',backgroundColor:'#fff',borderRadius:'15px'
    },
    drawerWrapper : {
        position:'absolute',left:0,top:0,width:'100%',height:'100vh',display:'flex',justifyContent:'center',alignItems:'center', backgroundColor:'transparent',zIndex:9999
    },
    closeBoxWrap : {
        position:'absolute',right:'30px',top:'30px',width:'30px',height:'30px',display:'flex',justifyContent:'center',alignItems:'center',
        zIndex:2,cursor:'pointer'
    },
    popupDataWrap : {
        display:'flex',width:'1668px',height:'766px',zIndex:1,overflow:'hidden',flexDirection:'column', borderRadius:'15px'
    },
    popupHeaderWrap : {
        display:'flex',alignItems:'center',justifyContent:'center',width:'100%',height:'88px',borderBottom:"1px solid #dcdcdc",backgroundColor:'#f8f8f8',
    },
    headerTitleWrap : {
        display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'auto',minWidth:'680px',height:'100%'
    },
    headerDefaultTitleWrap : {
        display:'flex',alignItems:'center',justifyContent:'center',minWidth:'160px',height:'100%',borderBottom:"3px solid #f8f8f8",cursor:"pointer",margin:"0 10px"
    },
    headerSelectTitleWrap : {
        display:'flex',alignItems:'center',justifyContent:'center',minWidth:'160px',height:'35px',borderBottom:"3px solid #f84040",cursor:"pointer",margin:"0 10px"
    },
    popupBodyWrap : {
        display:'flex',alignItems:'center',justifyContent:'center',minWidth:'100%',height:'678px',
    },
    textStyle3 : {
        fontSize: "26px",fontWeight: "bold",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.52px",color: "#22201f"
    },
    textStyle3Non : {
        fontSize: "26px",fontWeight: "bold",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.52px",color: "#a2a2a2"
    },
}

export default Reservation;