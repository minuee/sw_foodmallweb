import * as React from 'react';
import { useRouter } from "next/router";
import Image from "next/image";
import { Box, Zoom, Typography, stepButtonClasses } from "@mui/material";
import { useTranslation } from 'next-i18next';
import functions from '@utils/functions';
import ICON_POPUP_CLOSE from "@icons/popup-close.png";

import AgreeContent1 from "./AgreeContent1";
import AgreeContent2 from "./AgreeContent2";
import AgreeContent3 from "./AgreeContent3";

type PopLayerAgreeProps = {
    inputs?: any;
    isToggleOpen? : any;
    onHandleCloseToggle: () => void;
}

const PopLayerAgree: React.FC<PopLayerAgreeProps> = ({inputs,isToggleOpen,onHandleCloseToggle}) => {
    const router = useRouter()
    const { t } = useTranslation(['common','yakwan']);
    return (
        <Zoom 
            in={isToggleOpen > 0 ? true : false}
            style={{ 
                display : isToggleOpen > 0  ? 'flex' : 'none', 
                position:'absolute',
                right:0,
                bottom:0,
                width:isToggleOpen > 0 ? '100%' : 0,
                height:'442px',
                alignItems:'center',
                flexDirection:'column',
                zIndex:1300,
                transitionDelay: isToggleOpen > 0 ? '200ms' : '100ms' 
            }}
        > 
            <Box sx={styles.zoomOuterWrapper}>
                <Box sx={styles.zoomOuterDataWrapper}>
                    <Box sx={styles.zommTitleWrapper}>
                        <Typography variant="sourceHanSans" sx={styles.titleTextStyle}>
                           {
                            isToggleOpen == 2 
                            ?
                            t("reservation.room_settle.regist_custom_agree_2")
                            :
                            isToggleOpen == 3
                            ?
                            t("reservation.room_settle.regist_custom_agree_3")
                            :
                            t("reservation.room_settle.regist_custom_agree_1")
                           }
                        </Typography>
                        <Box 
                            sx={styles.closeBoxWrap}
                            onClick={() => onHandleCloseToggle()}
                        >
                            <Image 
                                alt={"sub"}
                                src={ICON_POPUP_CLOSE}
                                style={{width:'20px',height:'20px'}}
                            />
                        </Box>
                    </Box> 
                    {
                        isToggleOpen == 2 
                        ?
                        <AgreeContent2 />
                        :
                        isToggleOpen == 3 
                        ?
                        <AgreeContent3 />
                        :
                        <AgreeContent1 />
                    }
                    
                </Box>
            </Box>
        </Zoom>
    )
}

const styles = {
    wrapper : {
        display:'flex',width:'100%',height:'100%',zIndex:101,overflow:'hidden',flexDirection:'column'
    },
    closeBoxWrap : {
        position:'absolute',right:'10px',top:'15px',width:'30px',height:'30px',display:'flex',justifyContent:'center',alignItems:'center', zIndex:10,cursor:'pointer'
    },
    zoomOuterDataWrapper : {
        position:'absolute',right:0,bottom:0,display:'flex',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',width:"990px",height:'auto',minHeight:"442px",borderRadius:"10px",border:"1px solid #ccc",backgroundColor:'#fff'
    },
    zoomOuterWrapper : {
        display:'flex',flexDirection:'column',justifyContent:'flex-end',alignItems:'center',height:'100%',maxHeight:'442px',overFlow:'auto'
    },
    zommTitleWrapper : {
        display:'flex',width:'100%',height:'62px',alignItems:'center',paddingLeft:'20px',borderBottom:"1px solid #dcdcdc"
    },
    zommDataWrapper : {
        display:'flex',flexDirection:"column",width:'100%',height:'382px',padding:'15px',overflow:'scroll'
    },
    titleTextStyle : {
        fontSize: "18px",fontWeight: "bold",fontStretch: "normal",fontStyle: "normal",lineHeight: "2",letterSpacing: "-0.36px",color: "#22201f",
    },
    textStyle01 : {
        fontSize: "14px",fontWeight: "bold",fontStretch: "normal",fontStyle: "normal",lineHeight: "2",letterSpacing: "-0.28px",color: "#22201f",
    },
    textStyle02 : {
        fontSize: "14px",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "2",letterSpacing: "-0.28px",color: "#22201f",paddingLeft:"5px"
    },
    textStyle03 : {
        fontSize: "14px",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "1.71",letterSpacing: "-0.28px",color: "#707070",paddingLeft:"15px"
    }
}


export default PopLayerAgree;
