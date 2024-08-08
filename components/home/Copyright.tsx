import * as React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { Typography,Box } from "@mui/material";
import { useTranslation } from 'next-i18next';
import LogoImage from "@images/bi-color.png";

import MobileCopyRight from "./mobile/Copyright"

type PopupCopyRightProps = {
    isMobile? : boolean,
}

const Copyright: React.FC<PopupCopyRightProps> = ({ isMobile = false}) => {
    const { t } = useTranslation(['common','yakwan']);

    if ( isMobile ) {
        return (
            <MobileCopyRight />
        );
    }

    return (
        <Box sx={styles.wrapper}>
            <Box sx={styles.commonLeftDataWrap}>
                <Box sx={styles.logoWrapper} >
                    <Image src={LogoImage} width={118} height={72} alt={'logo'} />
                </Box>
                <Box sx={styles.telWrapper} >
                    <Typography  variant="manrope" sx={styles.textStyle1}>
                        CS CENTER
                    </Typography>
                    <Typography  variant="manrope" sx={styles.textStyle2}>
                        1811-1811
                    </Typography>
                    <Typography  variant="sourceHanSans" sx={styles.textStyle3}>
                        <span>CS 운영시간 :</span>오전10시~오후6시
                    </Typography>
                </Box>
            </Box>
            <Box sx={styles.dataOuterWrap}>
                <Box sx={styles.commonRightDataWrap}>
                    <Box sx={styles.linkWrapper}>
                        <Box sx={styles.linkFirstWrapper}>
                            <Typography  variant="sourceHanSans" sx={styles.textStyle3}>
                                {t('common.menu.footer_menu_1')}
                            </Typography>
                        </Box>
                        <Box sx={styles.linkCommonDivideBox}>
                            <Typography  variant="sourceHanSans" sx={styles.textStyle3_2}>|</Typography>
                        </Box>
                        <Box sx={styles.linkCommonBox}>
                            <Typography  variant="sourceHanSans" sx={styles.textStyle3}>
                                {t('common.menu.footer_menu_2')}
                            </Typography>
                        </Box>
                        <Box sx={styles.linkCommonDivideBox}>
                            <Typography  variant="sourceHanSans" sx={styles.textStyle3_2}>|</Typography>
                        </Box>
                        <Box sx={styles.linkCommonBox}>
                            <Typography  variant="sourceHanSans" sx={styles.textStyle3}>
                                {t('common.menu.footer_menu_3')}
                            </Typography>
                        </Box>
                        <Box sx={styles.linkCommonDivideBox}>
                            <Typography  variant="sourceHanSans" sx={styles.textStyle3_2}>|</Typography>
                        </Box>
                        <Box sx={styles.linkCommonBox}>
                            <Typography  variant="sourceHanSans" sx={styles.textStyle3}>
                                {t('common.menu.footer_menu_4')}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box sx={styles.commonInfoDataWrap}>
                    <Box sx={styles.infoWrapper}>
                        <Typography  variant="sourceHanSans" sx={styles.textStyle4}>
                            대표이사:정대원 
                        </Typography>
                        <Box sx={styles.infoCommonDivideBox}>
                            <Typography  variant="sourceHanSans" sx={styles.textStyle3_2}>|</Typography>
                        </Box>
                        <Typography  variant="sourceHanSans" sx={styles.textStyle4}>
                            사업자등록번호 : 01-85-39823 <a>사업자정보확인</a> <a>사업자등록증</a>
                        </Typography>
                       <Box sx={styles.infoCommonDivideBox}>
                            <Typography  variant="sourceHanSans" sx={styles.textStyle3_2}>|</Typography>
                        </Box>
                        <Typography  variant="sourceHanSans" sx={styles.textStyle4}>
                            통신판매업신고 : 제2018-서울중구-1731호
                        </Typography>
                    </Box>
                    <Box sx={styles.infoWrapper}>
                        <Typography  variant="sourceHanSans" sx={styles.textStyle4}>
                            주소:서울특별시 중구 퇴계로 211-5 성원푸드몰
                        </Typography>
                        <Box sx={styles.infoCommonDivideBox}>
                            <Typography  variant="sourceHanSans" sx={styles.textStyle3_2}>|</Typography>
                        </Box>
                        <Typography  variant="sourceHanSans" sx={styles.textStyle4}>
                            팩스:1811-1819
                        </Typography>
                        <Box sx={styles.infoCommonDivideBox}>
                            <Typography  variant="sourceHanSans" sx={styles.textStyle3_2}>|</Typography>
                        </Box>
                        <Typography  variant="sourceHanSans" sx={styles.textStyle4}>
                            문의메일:reservation@swfoodmall.com
                        </Typography>
                    </Box>
                </Box>
                <Box sx={styles.commonRightDataWrap}>
                    <Box sx={styles.infoWrapper}>
                        <Typography  variant="sourceHanSans" sx={styles.textCopyRight}>
                            {'Copyright © '}2024. FoodMall all rights reserved
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

const styles = {
    wrapper: {
        display:"flex",
        flexDirection:"row",
        justifyContent: "center",
        alignItems: "center",
        background: "#f7f7f7",
        width: "100%",
        minHeight:"219px"
    },
    logoWrapper : {
        display:'flex',flexDirection:'column',flex:1,justifyContent:'center',alignItems:'flex-end'
    },
    telWrapper : {
        display:'flex',flexDirection:'column',flex:1,justifyContent:'center',paddingLeft:"70px"
    },
    linkWrapper : {
        display:'flex',flex:1,flexDirection:'row',justifyContent:'flex-start',alignItems:'center',padding:"0 20px 0 0"
    },linkFirstWrapper : {
        display:'flex',width:"auto",justifyContent:'center',alignItems:'center',padding:"0 10px 0 0"
    },
    linkCommonDivideBox : {
        display:'flex',width:"10px",justifyContent:'center',alignItems:'center'
    },
    infoCommonDivideBox : {
        display:'flex',width:"20px",justifyContent:'center',alignItems:'center'
    },
    linkCommonBox : {
        display:'flex',width:"auto",justifyContent:'center',alignItems:'center',padding:"0 10px"
    },
    infoWrapper : {
        display:'flex',flex:1,flexDirection:'row',alignItems:'center',justifyContent:'flex-start'
    },
    dataOuterWrap : {
        display:"flex",
        flexDirection:"column",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "10px 50px",
        width: "100%",
        maxWidth:"1024px"
    },
    commonLeftDataWrap : {
        display:"flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "10px 0",
        width: "100%",
        maxWidth: "600px"
    },
    commonInfoDataWrap : {
        display:"flex",
        flexDirection:'column',
        justifyContent: "center",
        padding: "10px 0",
        width: "100%",
        maxWidth: "1024px"
    },
    commonRightDataWrap : {
        display:"flex",
        flex:"1",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "10px 0",
        width: "100%",
        maxWidth: "1024px"
    },
    textStyle1 : {
        fontSize: "20px",
        fontWeight: "600",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "2em",
        letterSpacing: "normal",
        color: "#22201f"
    },
    textStyle2 : {
        fontSize: "40px",
        fontWeight: "600",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "normal",
        letterSpacing: "normal",
        color: "#22201f",
    },
    textStyle3 : {
        fontSize: "16px",
        fontWeight: "600",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "normal",
        letterSpacing: "-0.28px",
        textAlign: "left",
        color: "#777",
        '& > span' : {
          fontWeight: "bold",
          color: "#22201f",
        }
    },
    textStyle3_2 : {
        width:'5px',
        fontSize: "14px",
        fontWeight: "500",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "normal",
        letterSpacing: "-0.32px",
        color: "#d9d9d9",
    },
    textStyle4 : {
        fontSize: "14px",
        fontWeight: "500",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "20px",
        letterSpacing: "-0.28px",
        color: "#a1a1a1",
        "& > a " : {
            padding:"0 5px",
            textDecoration:"underline",
            cursor:'pointer'
        }
    },
    textCopyRight : {
        fontSize: "12px",
        fontWeight: "600",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "normal",
        letterSpacing: "-0.24px",
        textAlign: "left",
        color: "#cbcbcb"
    }
}

export default Copyright;