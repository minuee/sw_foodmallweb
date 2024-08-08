import * as React from 'react';
import { useRouter } from "next/router";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'next-i18next';
import NoSsr from "@mui/material/NoSsr";
import * as apiObject from '@utils/api';
import functions from '@utils/functions';
import { landscapeState } from "@stores/layoutStore";
import { useWindowSize } from "@utils/useWindowSize";
import { useRecoilState } from "recoil";

import ICON_POPUP_CLOSE from "@icons/popup-close.png";
import ICON_CONFIRM from "@images/reservation/icon-confirm.png";

import IMG_TABLETYPE1 from "@images/reservation/table-confirm-01.png";
import IMG_TABLETYPE2 from "@images/reservation/table-confirm-02.png";
import IMG_TABLETYPE3 from "@images/reservation/table-confirm-03.png";
import IMG_TABLETYPE4 from "@images/reservation/table-confirm-04.png";

type PopupReservationConfirmProps = {
    sendData?: any;
    setShowPopDetail: (bool: boolean) => void;
}

const ReservationConfirm: React.FC<PopupReservationConfirmProps> = ({sendData,setShowPopDetail}) => {
    const router = useRouter()
    const isAccessDevice =  useWindowSize();
    const [isLoading, setLoading] = React.useState<boolean>(false);
    // 화면 가로모드 여부 확인
    const [viewLandscape, setIsLandscape] = useRecoilState(landscapeState);
    const { t } = useTranslation(['common','yakwan']);

    const onCallbackFailed = () => {
        functions.toastMessage(
            t("messages.info.reservation_failed"), 
            {
                position: "top-right"
            }
        );
        setTimeout(() => {
            setLoading(false);
        }
        , 1500);
    }

    const onCallbackSuccess = () => {
        functions.toastMessage(
            t("messages.info.reservation_success"), 
            {
                position: "top-right"
            }
        );
        setTimeout(() => {
            setLoading(false);
            setShowPopDetail(false)
        }
        , 1500);
    }

    if ( sendData?.isType == 'group') {

        const rendderTimeTerm = (data:any) => {

            if ( data?.reservation_time_hour > 0 && data?.reservation_time_term > 0 ) {
                let limitTimes = parseInt(data?.reservation_time_hour) + parseInt(data?.reservation_time_term);
                if ( limitTimes > 22 ) {
                    limitTimes = 22;
                } 
                return `${data.reservation_time_hour}:00~${limitTimes}:00(${data?.reservation_time_term}${t("reservation.title_step_3")})`
            }else{
                return null
            }
        }
        const renderDefaultOption = (inputs:any) => {
            let ret =  "";
            let addNumber = 0;
            if ( inputs?.reservation_default_option?.FFA01 ) {
                ret =  ret + t("reservation.gropu_default_option.screen") + ",";
                addNumber++;
            }
            if ( inputs?.reservation_default_option?.FFA02 ) {
                ret =  ret + t("reservation.gropu_default_option.projector") + ",";
                addNumber++;
            }
            if ( inputs?.reservation_default_option?.FFA03 ) {
                ret =  ret + t("reservation.gropu_default_option.wireless_mike") + ",";
                addNumber++;
            }
            if ( inputs?.reservation_default_option?.FFA04 ) {
                ret =  ret + t("reservation.gropu_default_option.pin_mike") + ",";
                addNumber++;
            }

            if ( inputs?.reservation_default_option?.FFI01 ) {
                ret =  ret + t("reservation.gropu_default_option.phase") + ",";
                addNumber++;
            }
            if ( inputs?.reservation_default_option?.FFI03 ) {
                ret =  ret + t("reservation.gropu_default_option.banner") + ",";
                addNumber++;
            }
            if ( inputs?.reservation_default_option?.FFI04 ) {
                ret =  ret + t("reservation.gropu_default_option.hanger") + ",";
                addNumber++;
            }
            if ( inputs?.reservation_default_option?.FFI05 ) {
                ret =  ret + t("reservation.gropu_default_option.blind") + ",";
                addNumber++;
            }
            if ( inputs?.reservation_default_option?.FFI06 ) {
                ret =  ret + t("reservation.gropu_default_option.partition") + ",";
                addNumber++;
            }
            if ( inputs?.reservation_default_option?.FFI02 ) {
                ret =  ret + t("reservation.gropu_default_option.parking") + ",";
                addNumber++;
            }

            const ret2 =  addNumber > 0 ? ret.substring(0,ret.length-1) + "" : ret + "";
            return ret2;
        }

        const renderAddOption = (inputs:any) => {
            let ret =  "";
            let addNumber = 0;
            if ( inputs?.reservation_add_option?.FSA01 ) {
                ret =  ret + t("reservation.gropu_add_option.karaoke") + ",";
                addNumber++;
            }
            if ( inputs?.reservation_add_option?.FSA02 ) {
                ret =  ret + t("reservation.gropu_add_option.amp") + ",";
                addNumber++;
            }
            if ( inputs?.reservation_add_option?.FSA03 ) {
                ret =  ret + t("reservation.gropu_add_option.television") + ",";
                addNumber++;
            }
            if ( inputs?.reservation_add_option?.FSA04 ) {
                ret =  ret + t("reservation.gropu_add_option.meal") + ",";
                addNumber++;
            }
            const ret2 =  addNumber > 0 ? ret.substring(0,ret.length-1) + "" : ret + "";
            return ret2;
        }

        const renderTableType = () => {
            return (
                <Image 
                    src={IMG_TABLETYPE2}  
                    alt="slide" 
                    style={{width:'60%',height:'60%',objectFit: 'contain'}}
                />
            )
        }

        const onHandleReservation = async() => {
            setLoading(true);
            console.log("onHandleReservation",sendData);

            const sub_facilities_af = {
                FFA01:sendData.reservation_default_option.FFA01,
                FFA02:sendData.reservation_default_option.FFA02,
                FFA03:sendData.reservation_default_option.FFA03,
                FFA04:sendData.reservation_default_option.FFA04
            };
            const sub_facilities_ie = {
                FFI01:sendData.reservation_default_option.FFI01,
                FFI02:sendData.reservation_default_option.FFI02,
                FFI03:sendData.reservation_default_option.FFI03,
                FFI04:sendData.reservation_default_option.FFI04,
                FFI05:sendData.reservation_default_option.FFI05,
                FFI06:sendData.reservation_default_option.FFI06
            };
            const sub_facilities_add = {
                FSA01:sendData.reservation_add_option.FSA01,
                FSA02:sendData.reservation_add_option.FSA02,
                FSA03:sendData.reservation_add_option.FSA03,
                FSA04:sendData.reservation_add_option.FSA04
            }

            try{
                const url = "/sr_system_api/reservation/fb.php?action=add";
                const payload = {
                    order_path : sendData.reservation_room,
                    mem_name : sendData.reservation_name,
                    mem_mobile : sendData.reservation_phone,
                    mem_email : sendData.reservation_email,
                    order_date : sendData.reservation_date,
                    start_order_time : sendData.reservation_time_hour + ":" + sendData.reservation_time_minutes,
                    end_order_time : sendData.reservation_time_hour + ":" + sendData.reservation_time_minutes,
                    adult_cnt : sendData.reservation_member_adult,
                    child_cnt : sendData.reservation_member_children,
                    host_com_name : sendData.reservation_organ,
                    event_name : sendData.reservation_festival,
                    fb_type : sendData.reservation_avenuType,
                    fb_table_type : sendData.reservation_tableType,
                    fb_sub_facilities_af :sub_facilities_af,
                    fb_sub_facilities_ie : sub_facilities_ie,
                    fb_sub_facilities_add : sub_facilities_add,
                    memo : "",
                    mem_id : ""
                };
                const res = await apiObject.post(url, payload);
                if ( res?.state == 'true') {
                    if ( !functions.isEmpty(res?.order_no)) {
                        onCallbackSuccess();
                    }else{
                        onCallbackFailed();
                    }
                }else{
                    onCallbackFailed();
                }
            }catch(e){
                onCallbackFailed();
            } 
        }

        return (
            <NoSsr>
                <Box sx={styles.contentGroupWrapper}>
                    <Box 
                        sx={styles.closeBoxWrap}
                        onClick={() => setShowPopDetail(false)}
                    >
                        <Image 
                            alt={"sub"}
                            src={ICON_POPUP_CLOSE}
                            style={{width:'20px',height:'20px'}}
                        />
                    </Box>
                    <Box sx={styles.popupDataWrap}>
                        <Box sx={styles.popupHeaderWrap}>
                            <Box sx={styles.headerTitleWrap}>
                                <Image 
                                    alt={"sub"}
                                    src={ICON_CONFIRM}
                                    style={{width:'24px',height:'24px'}}
                                />
                                <Typography variant="sourceHanSans" sx={styles.textStyle3}>{t("reservation.title_confirm")}</Typography>
                            </Box>
                        </Box>
                        <Box sx={styles.popupBodyWrap}>
                            <Box sx={styles.contentsWrap}>
                                <Box sx={styles.bodyTitleWrap}>
                                    <Typography variant="sourceHanSans" sx={styles.textStyle4}>{t("reservation.title_base_six")}</Typography>
                                </Box>
                                <Box sx={styles.bodyDataWrap}>
                                    <Box sx={styles.bodyDataBoxWrap}>
                                        <Box sx={styles.bodyDataBoxWrap1}>
                                            <Typography variant="sourceHanSans" sx={styles.titleTextStyle}>{t("reservation.user_name")}</Typography>
                                        </Box>
                                        <Box sx={styles.bodyDataBoxWrap2}></Box>
                                        <Box sx={styles.bodyDataBoxWrap3}>
                                            <Typography variant="sourceHanSans" sx={styles.titleTextStyle}>{sendData?.reservation_name}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={styles.bodyDataBoxWrap}>
                                    <Box sx={styles.bodyDataBoxWrap1}>
                                            <Typography variant="sourceHanSans" sx={styles.titleTextStyle}>{t("reservation.user_phone")}</Typography>
                                        </Box>
                                        <Box sx={styles.bodyDataBoxWrap2}></Box>
                                        <Box sx={styles.bodyDataBoxWrap3}>
                                            <Typography variant="sourceHanSans" sx={styles.titleTextStyle}>{sendData?.reservation_phone}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={styles.bodyDataBoxWrap}>
                                        <Box sx={styles.bodyDataBoxWrap1}>
                                            <Typography variant="sourceHanSans" sx={styles.titleTextStyle}>{t("reservation.user_email")}</Typography>
                                        </Box>
                                        <Box sx={styles.bodyDataBoxWrap2}></Box>
                                        <Box sx={styles.bodyDataBoxWrap3}>
                                            <Typography variant="sourceHanSans" sx={styles.titleTextStyle}>{sendData?.reservation_email}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={styles.bodyDataBoxWrap}>
                                        <Box sx={styles.bodyDataBoxWrap1}>
                                            <Typography variant="sourceHanSans" sx={styles.titleTextStyle}>{t("reservation.user_organ")}</Typography>
                                        </Box>
                                        <Box sx={styles.bodyDataBoxWrap2}></Box>
                                        <Box sx={styles.bodyDataBoxWrap3}>
                                            <Typography variant="sourceHanSans" sx={styles.titleTextStyle}>{t(sendData?.reservation_organ)}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={styles.bodyDataBoxWrap}>
                                        <Box sx={styles.bodyDataBoxWrap1}>
                                            <Typography variant="sourceHanSans" sx={styles.titleTextStyle}>{t("reservation.user_festival")}</Typography>
                                        </Box>
                                        <Box sx={styles.bodyDataBoxWrap2}></Box>
                                        <Box sx={styles.bodyDataBoxWrap3}>
                                        <Typography variant="sourceHanSans" sx={styles.titleTextStyle}>{t(sendData?.reservation_festival)}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={styles.bodyDataBoxWrap}>
                                        <Box sx={styles.bodyDataBoxWrap1}>
                                            <Typography variant="sourceHanSans" sx={styles.titleTextStyle}>F&B</Typography>
                                        </Box>
                                        <Box sx={styles.bodyDataBoxWrap2}></Box>
                                        <Box sx={styles.bodyDataBoxWrap3}>
                                            <Typography variant="sourceHanSans" sx={styles.titleTextStyle}>{t(sendData?.reservation_avenuTypeName)}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={styles.bodyDataBoxWrap}>
                                        <Box sx={styles.bodyDataBoxWrap1}>
                                            <Typography variant="sourceHanSans" sx={styles.titleTextStyle}>{t("reservation.title_step_2")}</Typography>
                                        </Box>
                                        <Box sx={styles.bodyDataBoxWrap2}></Box>
                                        <Box sx={styles.bodyDataBoxWrap3}>
                                            <Typography variant="sourceHanSans" sx={styles.titleTextStyle}>
                                                {sendData?.reservation_date}({sendData?.reservation_date != "" && functions.convertDatetoWeekday(sendData?.reservation_date,t)}) 
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={styles.bodyDataBoxWrap}>
                                        <Box sx={styles.bodyDataBoxWrap1}>
                                            <Typography variant="sourceHanSans" sx={styles.titleTextStyle}>{t("reservation.title_step_3")}</Typography>
                                        </Box>
                                        <Box sx={styles.bodyDataBoxWrap2}></Box>
                                        <Box sx={styles.bodyDataBoxWrap3}>
                                            <Typography variant="sourceHanSans" sx={styles.titleTextStyle}>
                                            {rendderTimeTerm(sendData)}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={styles.bodyDataBoxWrap}>
                                        <Box sx={styles.bodyDataBoxWrap1}>
                                            <Typography variant="sourceHanSans" sx={styles.titleTextStyle}>{t("reservation.title_step_4")}</Typography>
                                        </Box>
                                        <Box sx={styles.bodyDataBoxWrap2}></Box>
                                        <Box sx={styles.bodyDataBoxWrap3}>
                                            <Typography variant="sourceHanSans" sx={styles.titleTextStyle}>
                                                {t("reservation.title_step_4_1")} <span>{sendData?.reservation_member_adult}</span>{t("common.word.man")}/
                                                {t("reservation.title_step_4_2")} <span>{sendData?.reservation_member_children}</span>{t("common.word.man")}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{...styles.bodyDataBoxWrap,backgroundColor:'#ebecf0'}}>

                                    </Box>
                                </Box>
                              
                            </Box>
                            <Box sx={styles.contentsBaseOptionWrap}>
                                <Box sx={{display:'flex',flex:4,flexDirection:'column',backgroundColor:'#ebecf0',borderRadius:"5px",marginRight:"10px"}}>
                                    <Box sx={styles.optionBodyTitleWrap}>
                                        <Typography variant="sourceHanSans" sx={styles.textStyle4}>{t("reservation.gropu_part_title.base_supply")}</Typography>
                                    </Box>
                                    <Box sx={{display:'flex',backgroundColor:'#fff',borderRadius:'5px',width:"auto",minHeight:"105px",margin:"10px",padding:"10px"}}>
                                        <Typography variant="sourceHanSans" sx={styles.titleTextStyle}>
                                            {renderDefaultOption(sendData)}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{display:'flex',flex:1,flexDirection:'column',backgroundColor:'#ebecf0',borderRadius:"5px",}}>
                                    <Box sx={styles.optionBodyTitleWrap}>
                                        <Typography variant="sourceHanSans" sx={styles.textStyle4}>{t("reservation.gropu_part_title.table_type")}</Typography>
                                    </Box>
                                    <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:'#fff',borderRadius:'5px',width:"auto",minHeight:"105px",margin:"10px"}}>
                                        {renderTableType()}
                                        <Typography variant="sourceHanSans" sx={styles.titleTextStyle}>
                                            Circle
                                        </Typography>
                                    </Box>
                                </Box>
                               
                              
                            </Box>
                            <Box sx={styles.contentsAddOptionWrap}>
                                <Box sx={styles.optionBodyTitleWrap}>
                                    <Typography variant="sourceHanSans" sx={styles.textStyle4}>{t("reservation.option_input")}</Typography>
                                </Box>
                                <Box sx={{display:'flex',backgroundColor:'#fff',borderRadius:'5px',width:"calc( 100% - 20px)",minHeight:"40px",margin:"10px",padding:"10px"}}>
                                    {renderAddOption(sendData)}
                                </Box>
                              
                            </Box>
                            <Box sx={styles.bottonWrap}>
                                <Box sx={styles.cancleButtonWrap} onClick={() => setShowPopDetail(false)}>
                                    <Typography variant="sourceHanSans" sx={styles.textStyle1}>{t("common.word.prev")}</Typography>
                                </Box>
                                <Box sx={styles.submitButtonWrap} onClick={() => onHandleReservation()}>
                                    <Typography variant="sourceHanSans" sx={styles.textStyle2}>{t("common.word.confirm")}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </NoSsr>
        )
    }

    const onHandleReservation2 = async() => {
        setLoading(true);
        console.log("onHandleReservation",sendData);
        try{
            const url = "/sr_system_api/reservation/dining.php?action=add";
            const payload = {
                order_path : sendData.reservation_room,
                mem_name : sendData.reservation_name,
                mem_mobile : sendData.reservation_phone,
                mem_email : sendData.reservation_email,
                order_date : sendData.reservation_date,
                order_time : sendData.reservation_time_hour + ":" + sendData.reservation_time_minutes,
                adult_cnt : sendData.reservation_member_adult,
                child_cnt : sendData.reservation_member_children,
                memo : "",
                mem_id : ""
            };
            const res = await apiObject.post(url, payload);
            if ( res?.state == 'true') {
                if ( !functions.isEmpty(res?.order_no)) {
                    onCallbackSuccess();
                }else{
                    onCallbackFailed();
                }
            }else{
                onCallbackFailed();
            }
        }catch(e){
            onCallbackFailed();
        }
    }
    return (
        <NoSsr>
            { isLoading && (
                <Box 
                    sx={styles.loadingWrap}
                >
                    <CircularProgress />
                </Box>
            )
            }
            <Box sx={styles.contentWrapper}>
                <Box 
                    sx={styles.closeBoxWrap}
                    onClick={() => setShowPopDetail(false)}
                >
                    <Image 
                        alt={"sub"}
                        src={ICON_POPUP_CLOSE}
                        style={{width:'20px',height:'20px'}}
                    />
                </Box>
                <Box sx={styles.popupDataWrap}>
                    <Box sx={styles.popupHeaderWrap}>
                        <Box sx={styles.headerTitleWrap}>
                            <Image 
                                alt={"sub"}
                                src={ICON_CONFIRM}
                                style={{width:'24px',height:'24px'}}
                            />
                            <Typography variant="sourceHanSans" sx={styles.textStyle3}>{t("reservation.title_confirm")}</Typography>
                        </Box>
                    </Box>
                    <Box sx={styles.popupBodyWrap}>
                        <Box sx={styles.contentsWrap}>
                            <Box sx={styles.bodyTitleWrap}>
                                <Typography variant="sourceHanSans" sx={styles.textStyle4}>{t("reservation.title_base_four")}</Typography>
                            </Box>
                            <Box sx={styles.bodyDataWrap}>
                                <Box sx={styles.bodyDataBoxWrap}>
                                    <Box sx={styles.bodyDataBoxWrap1}>
                                        <Typography variant="sourceHanSans" sx={styles.titleTextStyle}>{t("reservation.user_name")}</Typography>
                                    </Box>
                                    <Box sx={styles.bodyDataBoxWrap2}></Box>
                                    <Box sx={styles.bodyDataBoxWrap3}>
                                        <Typography variant="sourceHanSans" sx={styles.titleTextStyle}>{sendData?.reservation_name}</Typography>
                                    </Box>
                                </Box>
                                <Box sx={styles.bodyDataBoxWrap}>
                                 <Box sx={styles.bodyDataBoxWrap1}>
                                        <Typography variant="sourceHanSans" sx={styles.titleTextStyle}>{t("reservation.user_phone")}</Typography>
                                    </Box>
                                    <Box sx={styles.bodyDataBoxWrap2}></Box>
                                    <Box sx={styles.bodyDataBoxWrap3}>
                                        <Typography variant="sourceHanSans" sx={styles.titleTextStyle}>{sendData?.reservation_phone}</Typography>
                                    </Box>
                                </Box>
                                <Box sx={styles.bodyDataBoxWrap}>
                                    <Box sx={styles.bodyDataBoxWrap1}>
                                        <Typography variant="sourceHanSans" sx={styles.titleTextStyle}>{t("reservation.user_email")}</Typography>
                                    </Box>
                                    <Box sx={styles.bodyDataBoxWrap2}></Box>
                                    <Box sx={styles.bodyDataBoxWrap3}>
                                        <Typography variant="sourceHanSans" sx={styles.titleTextStyle}>{sendData?.reservation_email}</Typography>
                                    </Box>
                                </Box>
                                <Box sx={styles.bodyDataBoxWrap}>
                                    <Box sx={styles.bodyDataBoxWrap1}>
                                        <Typography variant="sourceHanSans" sx={styles.titleTextStyle}>{t("reservation.title_step_1")}</Typography>
                                    </Box>
                                    <Box sx={styles.bodyDataBoxWrap2}></Box>
                                    <Box sx={styles.bodyDataBoxWrap3}>
                                        <Typography variant="sourceHanSans" sx={styles.titleTextStyle}>{t(sendData?.reservation_roomName)}</Typography>
                                    </Box>
                                </Box>
                                <Box sx={styles.bodyDataBoxWrap}>
                                    <Box sx={styles.bodyDataBoxWrap1}>
                                        <Typography variant="sourceHanSans" sx={styles.titleTextStyle}>{t("reservation.title_step_2")}</Typography>
                                    </Box>
                                    <Box sx={styles.bodyDataBoxWrap2}></Box>
                                    <Box sx={styles.bodyDataBoxWrap3}>
                                        <Typography variant="sourceHanSans" sx={styles.titleTextStyle}>
                                            {sendData?.reservation_date}({sendData?.reservation_date != "" && functions.convertDatetoWeekday(sendData?.reservation_date,t)}) 
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={styles.bodyDataBoxWrap}>
                                    <Box sx={styles.bodyDataBoxWrap1}>
                                        <Typography variant="sourceHanSans" sx={styles.titleTextStyle}>{t("reservation.title_step_3")}</Typography>
                                    </Box>
                                    <Box sx={styles.bodyDataBoxWrap2}></Box>
                                    <Box sx={styles.bodyDataBoxWrap3}>
                                        <Typography variant="sourceHanSans" sx={styles.titleTextStyle}>
                                        {sendData?.reservation_time_hour} : {sendData?.reservation_time_minutes}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={styles.bodyDataBoxWrap}>
                                    <Box sx={styles.bodyDataBoxWrap1}>
                                        <Typography variant="sourceHanSans" sx={styles.titleTextStyle}>{t("reservation.title_step_4")}</Typography>
                                    </Box>
                                    <Box sx={styles.bodyDataBoxWrap2}></Box>
                                    <Box sx={styles.bodyDataBoxWrap3}>
                                        <Typography variant="sourceHanSans" sx={styles.titleTextStyle}>
                                            {t("reservation.title_step_4_1")} <span>{sendData?.reservation_member_adult}</span>{t("common.word.man")}/
                                            {t("reservation.title_step_4_2")} <span>{sendData?.reservation_member_children}</span>{t("common.word.man")}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{...styles.bodyDataBoxWrap,backgroundColor:'#ebecf0'}}>

                                </Box>
                            </Box>
                        </Box>
                        <Box sx={styles.bottonWrap}>
                            <Box sx={styles.cancleButtonWrap} onClick={() => setShowPopDetail(false)}>
                                <Typography variant="sourceHanSans" sx={styles.textStyle1}>{t("common.word.prev")}</Typography>
                            </Box>
                            <Box sx={styles.submitButtonWrap} onClick={() => onHandleReservation2()}>
                                <Typography variant="sourceHanSans" sx={styles.textStyle2}>{t("common.word.confirm")}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </NoSsr>
    )
}

const styles = {
    contentWrapper : {
        position:'relative',display:'flex',width:'897px',height:'456px',backgroundColor:'#fff',borderRadius:'15px'
    },
    contentGroupWrapper : {
        position:'relative',display:'flex',width:'897px',height:'726px',backgroundColor:'#fff',borderRadius:'15px'
    },
    loadingWrap : {
        position:'absolute',left:0,top:0,width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center', zIndex:111,
    },
    closeBoxWrap : {
        position:'absolute',right:'15px',top:'15px',width:'30px',height:'30px',display:'flex',justifyContent:'center',alignItems:'center', zIndex:111,cursor:'pointer'
    },
    popupDataWrap : {
        display:'flex',width:'100%',height:'766px',zIndex:100,overflow:'hidden',flexDirection:'column', borderRadius:'15px'
    },
    popupHeaderWrap : {
        display:'flex',alignItems:'center',justifyContent:'center',width:'100%',height:'90px'
    },
    headerTitleWrap : {
        display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',width:'100%',height:'90px',
    },
    textStyle1 : {
        fontSize: "20px",fontWeight: "bold",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.4px",color: "#a2a2a2",
    },
    textStyle2 : {
        fontSize: "20px",fontWeight: "bold",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.4px",color: "#fff",
    },
    textStyle3 : {
        fontSize: "26px",fontWeight: "bold",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.52px",color: "#22201f",marginLeft:"10px"
    },
    textStyle4 : {
        fontSize: "18px",fontWeight: "bold",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "normal",color: "#242424"
    },
    titleTextStyle : {
        fontSize: "15px",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.36px",color: "#707070"
    },
    popupBodyWrap : {
        display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'100%',minHeight:'363px'
    },
    contentsWrap : {
        display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'837px',minHeight:'226px',backgroundColor:'#ebecf0',borderRadius:"5px"
    },
    contentsBaseOptionWrap : {
        display:'flex',flexDirection:'row',justifyContent:'center',width:'837px',minHeight:'100px',marginTop:"10px"
    },
    contentsAddOptionWrap : {
        display:'flex',flexDirection:'column',alignItems:'center',width:'837px',minHeight:'80px',backgroundColor:'#ebecf0',borderRadius:"5px",marginTop:"10px"
    },
    bottonWrap : {
        display:'flex',alignItems:'center',justifyContent:'center',width:'100%',height:'133px',padding:"0 243px",
    },
    optionBodyTitleWrap : {
        display:'flex',alignItems:'flex-end',width:'100%',height:'30px',padding:"0 15px",
    },
    bodyTitleWrap : {
        display:'flex',alignItems:'flex-end',width:'100%',height:'40px',padding:"0 15px",
    },
    bodyDataWrap : {
        display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around',width:'100%',minHeight:"190px",padding:"12px",flexWrap:'wrap'
    },
    bodyDataBoxWrap : {
        display:'flex',alignItems:'center',width:'400px',height:'35px',backgroundColor:'#fff',padding:"5px",borderRadius:"5px",marginBottom:"5px"
    },
    bodyDataBoxWrap1 : {
        display:'flex',justifyContent:'center',flex:1,
    },
    bodyDataBoxWrap2 : {
        display:'flex',backgroundColor:'#ebecf0',width:'3px',height:"25px"
    },
    bodyDataBoxWrap3 : {
        display:'flex',alignItems:'center',flex:2.5,paddingLeft:"10px",oveflow:'hidden'
    },
    cancleButtonWrap : {
        display:'flex',alignItems:'center',justifyContent:'center',width:'196px',height:'53px',backgroundColor:'#dcdcdc',borderRadius:"10px",marginRight:"10px",cursor:'pointer'
    },
    submitButtonWrap : {
        display:'flex',alignItems:'center',justifyContent:'center',width:'196px',height:'53px',backgroundColor:'#f84040',borderRadius:"10px",marginLeft:"10px",cursor:'pointer'
    }
}

export default ReservationConfirm;