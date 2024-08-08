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

import NienIcon from "@images/reservation/icon-nien.png";
import KeyboardArrowDownIcon from "@images/reservation/icon_arrow_down.png";
import KeyboardArrowUpIcon from "@images/reservation/icon_arrow_up.png";

type SettleOptionListProps = {
    sendData?: any;
    title? : string;
    optionOpenCount? : number;
    isOpen?: boolean;
    onHandleOpen: (bool: boolean) => void;
}

const SettleOptionList: React.FC<SettleOptionListProps> = ({sendData,title,optionOpenCount,isOpen,onHandleOpen}) => {
    const router = useRouter()
    const isAccessDevice =  useWindowSize();
    // 화면 가로모드 여부 확인
    const [viewLandscape, setIsLandscape] = useRecoilState(landscapeState);
    const { t } = useTranslation(['common','yakwan']);


    return (
        <NoSsr>
            <Box sx={styles.commonOuterWrapper}>
                <Box sx={styles.titleWrapper}>
                    <Typography variant="sourceHanSans" sx={styles.checkoutTextStyle}>
                        {title}
                    </Typography>
                </Box>
                <Box sx={styles.totalPriceWrapper}>
                    <Typography variant="sourceHanSans" sx={styles.checkoutTextStyle}>
                        200,000원
                    </Typography>
                </Box>
                <Box sx={styles.iconWrapper} onClick={()=> onHandleOpen(!isOpen)}>
                    {
                        isOpen
                        ?  
                        <Image 
                            src={KeyboardArrowUpIcon}  
                            alt="slide" 
                            style={{width:'16px',objectFit: 'contain'}}
                        />
                        :  
                        <Image 
                            src={KeyboardArrowDownIcon}  
                            alt="slide" 
                            style={{width:'16px',objectFit: 'contain'}}
                        />
                    } 
                </Box>
                
            </Box>
            { 
                isOpen && (
                    <Box sx={{...styles.toggleWrapper,maxHeight : optionOpenCount == 1 ? "160px" : optionOpenCount == 2 ? "120px" : "80px"}}>
                        <Box sx={styles.toggleCommonBox}>
                            <Box sx={styles.toggleCommonIconBox}>
                                <Image 
                                    src={NienIcon}  
                                    alt="slide" 
                                    style={{width:'16px',objectFit: 'contain'}}
                                />
                            </Box>
                            <Box sx={styles.toggleCommonDescBox}>
                                <Typography variant="sourceHanSans" sx={styles.moneyTextStyle}>
                                    스튜디오 룸 x 1박
                                </Typography>
                            </Box>
                            <Box sx={styles.toggleCommonPriceBox}>
                                <Typography variant="sourceHanSans" sx={styles.moneyTextStyle}>
                                    100,000원
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={styles.toggleCommonBox}>
                            <Box sx={styles.toggleCommonIconBox}>
                                <Image 
                                    src={NienIcon}  
                                    alt="slide" 
                                    style={{width:'16px',objectFit: 'contain'}}
                                />
                            </Box>
                            <Box sx={styles.toggleCommonDescBox}>
                                <Typography variant="sourceHanSans" sx={styles.moneyTextStyle}>
                                    스튜디오 룸 x 1박
                                </Typography>
                            </Box>
                            <Box sx={styles.toggleCommonPriceBox}>
                                <Typography variant="sourceHanSans" sx={styles.moneyTextStyle}>
                                    100,000원
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={styles.toggleCommonBox}>
                            <Box sx={styles.toggleCommonIconBox}>
                                <Image 
                                    src={NienIcon}  
                                    alt="slide" 
                                    style={{width:'16px',objectFit: 'contain'}}
                                />
                            </Box>
                            <Box sx={styles.toggleCommonDescBox}>
                                <Typography variant="sourceHanSans" sx={styles.moneyTextStyle}>
                                    스튜디오 룸 x 1박
                                </Typography>
                            </Box>
                            <Box sx={styles.toggleCommonPriceBox}>
                                <Typography variant="sourceHanSans" sx={styles.moneyTextStyle}>
                                    100,000원
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    
                )
            }
        </NoSsr>
    )
}

const styles = {
    commonOuterWrapper : {
        display:'flex',alignItems:'center',width:'100%',padding:"5px 15px",
    },
    iconWrapper : {
        display:'flex',flex:1, justifyContent:'center',alignItems:'center',cursor:'pointer'
    },
    totalPriceWrapper : {
        display:'flex',flex:3, justifyContent:'flex-end',alignItems:'center'
    },
    titleWrapper :{
        display:'flex',flex:4, alignItems:'center'
    },
    checkoutTextStyle : {
        fontSize: "15px",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.3px",color: "#22201f",
    },
    checkoutTextStyle2 : {
        fontSize: "18px",fontWeight: "bold",fontStretch: "normal",fontStyle: "normal",lineHeight: "30px",letterSpacing: "-0.36px",color: "#22201f",
    },
    toggleWrapper :{
        display:'flex',flexDirection:'column',alignItems:'center',width:'calc( 100% - 20px)',height:'auto',minHeight:'40px',margin:"5px 10px",backgroundColor:'#fafafa',borderRadius:"7px",maxHeight:"80px",overflow:'scroll',padding:"10px 0"
    },
    toggleCommonBox : {
        display:'flex',flexDirection:'row',alignItems:'center',width:'100%',height:'30px'
    },
    toggleCommonIconBox: {
        display:'flex',flex:1,justifyContent:'center'
    },
    toggleCommonDescBox :{
        display:'flex',flex:5,alignItems:'center'
    },
    toggleCommonPriceBox : {
        display:'flex',flex:3,justifyContent:'flex-end',alignItems:'center',paddingRight:"18px"
    },
    checkoutTextStyle3 : {
        fontSize: "15px",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.3px",color: "#22201f",
    },
    moneyTextStyle : {
        fontSize: "14px",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.3px",color: "#242424",
    }
}

export default SettleOptionList;