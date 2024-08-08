import * as React from 'react';
import { useRouter } from "next/router";
import Image from "next/image";
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from 'next-i18next';
import NoSsr from "@mui/material/NoSsr";

import functions from '@utils/functions';
import { landscapeState } from "@stores/layoutStore";
import { useWindowSize } from "@utils/useWindowSize";
import { useRecoilState } from "recoil";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import ICON_CAKE from "@images/reservation/icon_cake.png";
import ICON_FRUIT from "@images/reservation/icon_fruit.png";
import ICON_SNACK from "@images/reservation/icon_snack.png";
import ICON_WINE from "@images/reservation/icon_wine.png";

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

type PopipRoomServiceProps = {
    sendData?: any;
}

const RoomGallery: React.FC<PopipRoomServiceProps> = ({sendData}) => {
    const router = useRouter()
    const isAccessDevice =  useWindowSize();
    // 화면 가로모드 여부 확인
    const [viewLandscape, setIsLandscape] = useRecoilState(landscapeState);
    const { t } = useTranslation(['common','yakwan']);


    return (
        <NoSsr>
            <Box sx={styles.commonDesertOuterWrapper}>
                <Box sx={styles.commonTopWrapper}>
                    <Box sx={styles.commonEachBoxWrapper}>
                        <Box sx={styles.commonOptionDesertWrapper}>
                            <Box sx={styles.commonOptionDesertImageBox}>
                                <Image src={ICON_CAKE} style={{width:'100px',height:'100px'}} alt={"sub"} />
                            </Box>
                            <Box sx={styles.commonOptionDesertTextWrapper}>
                                <Box sx={styles.commonOptionDesertTextPriceBox}>
                                    <Typography variant="sourceHanSans" sx={styles.textBreakfast01}>{t("reservation.room_add_option.desert_cake")}</Typography>
                                    <Typography variant="sourceHanSans" sx={styles.textBreakfast02}>20,000{t("common.word.won")}</Typography>
                                </Box>
                                <Box sx={styles.commonOptionDesertTextDescBox}>
                                    <Box sx={styles.commonDesertTopWrapper}>
                                        <Typography variant="sourceHanSans" sx={styles.textBreakfast05}>{t("reservation.room_add_option.count")}</Typography>
                                    </Box>
                                    <Box sx={styles.commonDesertBottomWrapper}>
                                        <Box sx={styles.commonMiniBoxWrap}>
                                            <RemoveIcon fontSize='small' />
                                        </Box>
                                        <Box sx={styles.commonMiniBoxWrap}>
                                            <Typography variant="sourceHanSans" sx={styles.digitTextStyle}>
                                            0
                                            </Typography>
                                        </Box>
                                        <Box sx={styles.commonMiniBoxWrap}>
                                            <AddIcon fontSize='small' />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={styles.commonOptionBottomDescBox}>
                            <CheckCircleIcon fontSize="small" sx={{color:'#ccc',marginRight:'10px'}} />
                            <Typography variant="sourceHanSans" sx={styles.textBreakfast05}>{t("reservation.room_add_option.room_service")}</Typography>
                        </Box>
                    </Box>
                    <Box sx={styles.commonEachBoxWrapper}>
                        <Box sx={styles.commonOptionDesertWrapper}>
                            <Box sx={styles.commonOptionDesertImageBox}>
                                <Image src={ICON_FRUIT} style={{width:'100px',height:'100px'}} alt={"sub"} />
                            </Box>
                            <Box sx={styles.commonOptionDesertTextWrapper}>
                                <Box sx={styles.commonOptionDesertTextPriceBox}>
                                    <Typography variant="sourceHanSans" sx={styles.textBreakfast01}>{t("reservation.room_add_option.desert_fruit")}</Typography>
                                    <Typography variant="sourceHanSans" sx={styles.textBreakfast02}>20,000{t("common.word.won")}</Typography>
                                </Box>
                                <Box sx={styles.commonOptionDesertTextDescBox}>
                                    <Box sx={styles.commonDesertTopWrapper}>
                                        <Typography variant="sourceHanSans" sx={styles.textBreakfast05}>{t("reservation.room_add_option.count")}</Typography>
                                    </Box>
                                    <Box sx={styles.commonDesertBottomWrapper}>
                                        <Box sx={styles.commonMiniBoxWrap}>
                                            <RemoveIcon fontSize='small' />
                                        </Box>
                                        <Box sx={styles.commonMiniBoxWrap}>
                                            <Typography variant="sourceHanSans" sx={styles.digitTextStyle}>
                                            0
                                            </Typography>
                                        </Box>
                                        <Box sx={styles.commonMiniBoxWrap}>
                                            <AddIcon fontSize='small' />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={styles.commonOptionBottomDescBox}>
                            <CheckCircleIcon fontSize="small" sx={{color:'#ccc',marginRight:'10px'}} />
                            <Typography variant="sourceHanSans" sx={styles.textBreakfast05}>{t("reservation.room_add_option.room_service")}</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box sx={styles.commonBottomWrapper}>
                    <Box sx={styles.commonEachBoxWrapper}>
                        <Box sx={styles.commonOptionDesertWrapper}>
                            <Box sx={styles.commonOptionDesertImageBox}>
                                <Image src={ICON_SNACK} style={{width:'100px',height:'100px'}} alt={"sub"} />
                            </Box>
                            <Box sx={styles.commonOptionDesertTextWrapper}>
                                <Box sx={styles.commonOptionDesertTextPriceBox}>
                                    <Typography variant="sourceHanSans" sx={styles.textBreakfast01}>{t("reservation.room_add_option.desert_snack")}</Typography>
                                    <Typography variant="sourceHanSans" sx={styles.textBreakfast02}>20,000{t("common.word.won")}</Typography>
                                </Box>
                                <Box sx={styles.commonOptionDesertTextDescBox}>
                                    <Box sx={styles.commonDesertTopWrapper}>
                                        <Typography variant="sourceHanSans" sx={styles.textBreakfast05}>{t("reservation.room_add_option.count")}</Typography>
                                    </Box>
                                    <Box sx={styles.commonDesertBottomWrapper}>
                                        <Box sx={styles.commonMiniBoxWrap}>
                                            <RemoveIcon fontSize='small' />
                                        </Box>
                                        <Box sx={styles.commonMiniBoxWrap}>
                                            <Typography variant="sourceHanSans" sx={styles.digitTextStyle}>
                                            0
                                            </Typography>
                                        </Box>
                                        <Box sx={styles.commonMiniBoxWrap}>
                                            <AddIcon fontSize='small' />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={styles.commonOptionBottomDescBox}>
                            <CheckCircleIcon fontSize="small" sx={{color:'#ccc',marginRight:'10px'}} />
                            <Typography variant="sourceHanSans" sx={styles.textBreakfast05}>{t("reservation.room_add_option.room_service")}</Typography>
                        </Box>
                    </Box>
                    <Box sx={styles.commonEachBoxWrapper}>
                        <Box sx={styles.commonOptionDesertWrapper}>
                            <Box sx={styles.commonOptionDesertImageBox}>
                                <Image src={ICON_WINE} style={{width:'100px',height:'100px'}} alt={"sub"} />
                            </Box>
                            <Box sx={styles.commonOptionDesertTextWrapper}>
                                <Box sx={styles.commonOptionDesertTextPriceBox}>
                                    <Typography variant="sourceHanSans" sx={styles.textBreakfast01}>{t("reservation.room_add_option.desert_wine")}</Typography>
                                    <Typography variant="sourceHanSans" sx={styles.textBreakfast02}>20,000{t("common.word.won")}</Typography>
                                </Box>
                                <Box sx={styles.commonOptionDesertTextDescBox}>
                                    <Box sx={styles.commonDesertTopWrapper}>
                                        <Typography variant="sourceHanSans" sx={styles.textBreakfast05}>{t("reservation.room_add_option.count")}</Typography>
                                    </Box>
                                    <Box sx={styles.commonDesertBottomWrapper}>
                                        <Box sx={styles.commonMiniBoxWrap}>
                                            <RemoveIcon fontSize='small' />
                                        </Box>
                                        <Box sx={styles.commonMiniBoxWrap}>
                                            <Typography variant="sourceHanSans" sx={styles.digitTextStyle}>
                                            0
                                            </Typography>
                                        </Box>
                                        <Box sx={styles.commonMiniBoxWrap}>
                                            <AddIcon fontSize='small' />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={styles.commonOptionBottomDescBox}>
                            <CheckCircleIcon fontSize="small" sx={{color:'#ccc',marginRight:'10px'}} />
                            <Typography variant="sourceHanSans" sx={styles.textBreakfast05}>{t("reservation.room_add_option.room_service")}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </NoSsr>
    )
}

const styles = {
    commonDesertOuterWrapper : {
        display:'flex',flexDirection:'column',width:"680px",height:"396px"
    },
    commonTopWrapper : {
        display:'flex',flexDirection:'row',width:"100%",height:"186px",marginBottom:"21px",justifyContent:'space-between'
    },
    commonBottomWrapper : {
        display:'flex',flexDirection:'row',width:"100%",height:"186px",justifyContent:'space-between'
    },
    commonDesertTopWrapper : {
        display:'flex',flex:1,flexDirection:'row',alignItems:'center',height:"40px",backgroundColor:'#fff',borderRadius:"6px"
    },
    commonEachBoxWrapper : {
        display:'flex',flexDirection:'column',width:"330px",height:"186px",borderRadius:"14px",border:'1px solid #c8c8c8'
    },
    commonDesertBottomWrapper : {
        display:'flex',flex:2,flexDirection:'row',alignItems:'center',justifyContent:'center',height:"40px",backgroundColor:'#fff',borderRadius:"6px",
        border: "solid 1px #c8c8c8"
    },
    commonOptionDesertWrapper : {
        display:'flex',flexDirection:'row',width:"330px",height:"140px",justifyContent:'space-between',padding:"10px"
    },
    commonOptionDesertImageBox: {
        display:'flex',width:"120px",height:"100px"
    },
    commonOptionDesertTextWrapper : {
        display:'flex',flexDirection:'column',width:"200px",height:"130px",padding:'5px'
    },
    commonOptionDesertTextPriceBox : {
        display:'flex',flex:1,flexDirection:'column',justifyContent:'center'
    },
    commonOptionDesertTextDescBox : {
        display:'flex',flex:1,alignItems:'center'
    },
    commonOptionBottomDescBox : {
        display:'flex',flex:1,alignItems:'center',justifyContent:'center',borderTop:"1px dotted #ccc"
    },
    commonOptionBreakFastDaysWrapper : {
        display:'flex',flexDirection:'column',width:"454px",height:"160px",marginTop:'30px'
    },
    commonOptionBreakFastDaysTitleBox : {
        display:'flex',width:"100%",height:"30px",alignItems:'center'
    },
    commonOptionBreakFastDaysDataBox:{
        display:'flex',width:"100%",height:"130px",alignItems:'center'
    },
    textStyleOn : {
        fontSize: "14px",fontWeight: "bold",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.28px",color: "#22201f",
    },
    textStyleOff : {
        fontSize: "14px",fontWeight: "bold",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.28px",color: "#c8c8c8",
    },
    textStyle5 : {
        fontSize: "20px",fontWeight: "bold",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.4px",color: "#22201f",marginLeft:"6px",
        "& > span" : {
            color: "#f84040",
        }
    },
   
    textStyle6 : {
        fontSize: "14px",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.28px",color: "#707070",
    },
    textBreakfast01 : {
        fontSize: "18px",fontWeight: "bold",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.36px",color: "#22201f",
    },
    textBreakfast02 : {
        fontSize: "18px",fontWeight: "normal",fontStretch: "normal",fontStyle: "normal",lineHeight: "35px",letterSpacing: "-0.32px",color: "#22201f",
    },
    textBreakfast03 : {
        fontSize: "14px",fontWeight: "normal",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.28px",color: "#a2a2a2"
    },
    textBreakfast05 : {
        fontSize: "14px",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.28px",color: "#707070",marginLeft:"5px"
    },
    settleStyle : {
        fontSize: "16px",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.32px",color: "#22201f",marginLeft:"6px",
        "& > span" : {
            color: "#f84040",fontSize: "30px",fontWeight: "bold",letterSpacing: "-0.6px"
        }
    },
    textInputTitle : {
        fontSize: "18px",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.36px",color: "#22201f",
        "& > span" : {
            color: "#f84040",
        }
    },
    inputButtonText : {
        fontSize: "26px",fontWeight: "bold",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.52px",color: "#fff",marginLeft:"10px"
    },
    inputButtonText2 : {
        fontSize: "26px",fontWeight: "bold",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.52px",color: "#fff",marginLeft:"10px"
    },
    miniTextStyle : {
        fontSize: "13px",fontWeight: "bold",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.26px",color: "#a2a2a2"
    },
    miniTextStyle2 : {
        fontSize: "17px",fontWeight: "bold",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.26px",color: "#22201f",
        "& > span" : {
            width: "10px",
        }
    },
    commonMiniBoxWrap : {
        display:'flex',flex:1,justifyContent:'center',alignItems:'center'
    },
    digitTextStyle : {
        fontSize: "16px",
        fontWeight: "500",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "normal",
        letterSpacing: "-0.32px",
        color: "#22201f",
    },
}

export default RoomGallery;