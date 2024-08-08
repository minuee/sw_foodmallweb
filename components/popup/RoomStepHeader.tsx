import * as React from 'react';
import { useRouter } from "next/router";
import Image from "next/image";
import { Box, Button, Typography, stepButtonClasses } from "@mui/material";
import { useTranslation } from 'next-i18next';
import NoSsr from "@mui/material/NoSsr";

import functions from '@utils/functions';
import { landscapeState } from "@stores/layoutStore";
import { useWindowSize } from "@utils/useWindowSize";
import { useRecoilState } from "recoil";

import ICON_CURRENT from "@images/reservation/icon-check-gold.png";
import ICON_DOT_GOLD from "@images/reservation/icon-dot-gold.png";
import ICON_DOT_GRAY from "@images/reservation/icon-dot-gray.png";

type RoomStepHeaderProps = {
    stepMenu?: any;
    setRoomStepHeader: (num: number) => void;
}

const RoomStepHeader: React.FC<RoomStepHeaderProps> = ({stepMenu = 1,setRoomStepHeader}) => {
    const router = useRouter()
    const isAccessDevice =  useWindowSize();
    // 화면 가로모드 여부 확인
    const [viewLandscape, setIsLandscape] = useRecoilState(landscapeState);
    const { t } = useTranslation(['common','yakwan']);


    return (
        <NoSsr>
            <Box sx={styles.commonOuterWrapper}>
                <Box sx={styles.commonBoxWrapperON} onClick={()=>setRoomStepHeader(1)}>
                    <Image 
                        alt={"sub"}
                        src={ICON_CURRENT}
                        style={{width:'16px',height:'28px'}}
                    />
                    <Typography variant="sourceHanSans" sx={styles.textStyleON }>
                        {t("reservation.room_step_title.step_1")}
                    </Typography>
                </Box>
                <Box sx={styles.commonBoxTerm}>
                    <Image 
                        alt={"sub"}
                        src={stepMenu > 1 ?  ICON_DOT_GOLD : ICON_DOT_GRAY}
                        style={{width:'6px',height:'6px'}}
                    />
                    <Image 
                        alt={"sub"}
                        src={stepMenu > 1 ?  ICON_DOT_GOLD : ICON_DOT_GRAY}
                        style={{width:'6px',height:'6px'}}
                    />
                </Box>
                <Box sx={stepMenu > 1 ? styles.commonBoxWrapperON: styles.commonBoxWrapperOFF} onClick={()=>setRoomStepHeader(2)}>
                    {
                        stepMenu > 1 
                        ?
                        <Image 
                            alt={"sub"}
                            src={ICON_CURRENT}
                            style={{width:'16px',height:'28px'}}
                        />
                        :
                        <Typography variant="sourceHanSans" sx={stepMenu > 1 ? styles.textStyle2ON : styles.textStyle2OFF }>
                            STEP 2
                        </Typography>
                    }
                    <Typography variant="sourceHanSans" sx={stepMenu > 1 ? styles.textStyleON : styles.textStyleOFF }>
                        {t("reservation.room_step_title.step_2")}
                    </Typography>
                </Box>
                <Box sx={styles.commonBoxTerm}>
                    <Image 
                        alt={"sub"}
                        src={stepMenu > 2 ?  ICON_DOT_GOLD : ICON_DOT_GRAY}
                        style={{width:'6px',height:'6px'}}
                    />
                    <Image 
                        alt={"sub"}
                        src={stepMenu > 2 ?  ICON_DOT_GOLD : ICON_DOT_GRAY}
                        style={{width:'6px',height:'6px'}}
                    />
                </Box>
                <Box sx={stepMenu > 2 ? styles.commonBoxWrapperON: styles.commonBoxWrapperOFF} onClick={()=>setRoomStepHeader(3)}>
                    {
                        stepMenu > 2 
                        ?
                        <Image 
                            alt={"sub"}
                            src={ICON_CURRENT}
                            style={{width:'16px',height:'28px'}}
                        />
                        :
                        <Typography variant="sourceHanSans" sx={stepMenu > 2 ? styles.textStyle2ON : styles.textStyle2OFF }>
                            STEP 3
                        </Typography>
                    }
                    <Typography variant="sourceHanSans" sx={stepMenu > 2 ? styles.textStyleON : styles.textStyleOFF }>
                        {t("reservation.room_step_title.step_3")}
                    </Typography>
                </Box>
            </Box>
        </NoSsr>
    )
}

const styles = {
    commonOuterWrapper : {
        display:'flex',alignItems:'center',justifyContent:'center',height:'49px'
    },
    commonBoxWrapperON : {
        display:'flex',width:'auto',minWidth:"145px",height:"44px",justifyContent:'center',alignItems:'center',borderRadius:"22px",border:"1px solid #bb9b6a",padding:"5px 20px",margin:"0 5px"
    },
    commonBoxWrapperOFF : {
        display:'flex',width:'auto',minWidth:"145px",height:"44px",justifyContent:'center',alignItems:'center',borderRadius:"22px",border:"1px solid #bcbcbc",padding:"5px 20px",margin:"0 5px"
    },
    commonBoxTerm : {
        display:'flex',minWidth:"20px",height:"44px",justifyContent:'space-evenly',alignItems:'center'
    },
    textStyleON: {
        fontSize: "18px",fontWeight: "bold",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.54px",color: "#bb9b6a",marginLeft:"5px"
    },
    textStyleOFF : {
        fontSize: "18px",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.54px",color: "#bcbcbc",marginLeft:"5px"
    },
    textStyle2ON: {
        fontSize: "14px",fontWeight: "800",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.28px",color: "#bb9b6a",marginLeft:"5px"
    },
    textStyle2OFF : {
        fontSize: "14px",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.28px",color: "#bcbcbc",marginLeft:"5px"
    },
}

export default RoomStepHeader;