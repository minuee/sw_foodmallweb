import * as React from 'react';
import { useRouter } from "next/router";
import Image from "next/image";
import { Box, Zoom, Typography, stepButtonClasses } from "@mui/material";
import { useTranslation } from 'next-i18next';
import NoSsr from "@mui/material/NoSsr";

import functions from '@utils/functions';
import { landscapeState } from "@stores/layoutStore";
import { useWindowSize } from "@utils/useWindowSize";
import { useRecoilState } from "recoil";

import styles from './styles/PopLayerRecipt';

import SettleOptionList from "components/popup/SettleOptionList";
import KeyboardArrowDownIcon from "@images/reservation/icon_arrow_down.png";
import KeyboardArrowUpIcon from "@images/reservation/icon_arrow_up.png";

type PopLayerReceiptProps = {
    inputs?: any;
    isToggleOpen ? : boolean;
    onHandleCloseToggle: () => void;
}

const PopLayerReceipt: React.FC<PopLayerReceiptProps> = ({inputs,isToggleOpen,onHandleCloseToggle}) => {
    const router = useRouter()
    const { t } = useTranslation(['common','yakwan']);

    const [isZoomToggleShow1, setZoomToggleShow1] = React.useState(false);
    const [isZoomToggleShow2, setZoomToggleShow2] = React.useState(false);
    const [isZoomToggleShow3, setZoomToggleShow3] = React.useState(false);

    const optionOpenCount = React.useMemo(() => {
        let ret = 0;
        if ( isZoomToggleShow1 ) ret = ret + 1;
        if ( isZoomToggleShow2 ) ret = ret + 1;
        if ( isZoomToggleShow3 ) ret = ret + 1;
        return ret;
    }, [isZoomToggleShow1,isZoomToggleShow2,isZoomToggleShow3]);


    return (
        <Zoom 
            in={isToggleOpen}
            style={{ 
                display : isToggleOpen ? 'flex' : 'none', 
                position:'absolute',
                left:40,
                bottom:"-7px",
                width:isToggleOpen ? '100%' : 0,
                height:'auto',
                minHeight:"280px",
                maxHeight:"600px",
                alignItems:'center',
                flexDirection:'column',
                zIndex:1300,
                transitionDelay: isToggleOpen ? '200ms' : '100ms' 
            }}
        > 
            <Box sx={styles.zoomOuterWrapper}>
                <Box sx={styles.zoomOuterDataWrapper}>
                    <Box sx={styles.zommDateTermWrapper}>
                        <Box sx={styles.zommDateTemrDataWrapper}>
                            <Box sx={styles.zommDateFixedWrapper}>
                                <Box sx={styles.zommDateFixedBox}>
                                    <Typography variant="sourceHanSans" sx={{...styles.checkoutTextStyle,color:'#fff'}}>
                                        {functions.getDaysTerm(inputs.reservation_checkin_date,inputs.reservation_checkout_date)}{t("reservation.calendar_nights")}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={styles.zommDateTermCommonBox}>
                                <Box sx={styles.zommDateTermCommonTopBox}>
                                    <Typography variant="sourceHanSans" sx={styles.checkoutTextStyle}>
                                        {t("sub.popup.etc.checkin")}
                                    </Typography>
                                </Box>
                                <Box sx={styles.zommDateTermCommonBottomBox}>
                                    <Typography variant="sourceHanSans" sx={styles.checkoutTextStyle2}>
                                        {inputs.reservation_checkin_date}({functions.convertDatetoWeekday(inputs.reservation_checkin_date,t)})
                                    </Typography>
                                    <Typography variant="sourceHanSans" sx={styles.checkoutTextStyle3}>
                                        15:00
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={styles.zommDateTermCommonBox}>
                                <Box sx={styles.zommDateTermCommonTopBox}>
                                    <Typography variant="sourceHanSans" sx={styles.checkoutTextStyle}>
                                        {t("sub.popup.etc.checkout")}
                                    </Typography>
                                </Box>
                                <Box sx={styles.zommDateTermCommonBottomBox}>
                                    <Typography variant="sourceHanSans" sx={styles.checkoutTextStyle2}>
                                        {inputs.reservation_checkout_date}({functions.convertDatetoWeekday(inputs.reservation_checkout_date,t)})
                                    </Typography>
                                    <Typography variant="sourceHanSans" sx={styles.checkoutTextStyle3}>
                                        12:00
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={styles.zommOptionWrapper}>
                        <SettleOptionList
                            sendData={[]}
                            title={t("reservation.room_settle.room_price")}
                            isOpen={isZoomToggleShow1}
                            optionOpenCount={optionOpenCount}
                            onHandleOpen={setZoomToggleShow1}
                        />
                        <SettleOptionList
                            sendData={[]}
                            title={t("reservation.room_settle.breakfast_price")}
                            isOpen={isZoomToggleShow2}
                            optionOpenCount={optionOpenCount}
                            onHandleOpen={setZoomToggleShow2}
                        />
                        <SettleOptionList
                            sendData={[]}
                            title={t("reservation.room_settle.option_price")}
                            isOpen={isZoomToggleShow3}
                            optionOpenCount={optionOpenCount}
                            onHandleOpen={setZoomToggleShow3}
                        />
                        
                    </Box>
                    <Box sx={styles.zommSettleOuter}>
                        <Box sx={styles.settleWrapper}>
                            <Typography variant="sourceHanSans" sx={styles.settleTextStyle}>
                                {t("reservation.room_settle.total_price")}
                            </Typography>
                            <Typography variant="sourceHanSans" sx={styles.settleTextStyle2}>
                                {t("reservation.room_settle.include_tax")}
                            </Typography>
                            <Typography variant="sourceHanSans" sx={styles.settleTextStyle}>
                                <span>666,660</span>
                            </Typography>
                            <Typography variant="sourceHanSans" sx={styles.settleTextStyle}>
                                {t("common.word.won")}
                            </Typography>
                            <Box 
                                sx={styles.toggleButtonWrapper} 
                                onClick={() =>  onHandleCloseToggle()}
                            >
                                {
                                    isToggleOpen
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
                    </Box>
                </Box>
            </Box>
        </Zoom>
    )
}

export default PopLayerReceipt;
