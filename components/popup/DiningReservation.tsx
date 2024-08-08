import * as React from 'react';
import { useRouter } from "next/router";
import Image from "next/image";
import { Box, TextField, Typography } from "@mui/material";
import moment from "moment";
import { useTranslation } from 'next-i18next';
import NoSsr from "@mui/material/NoSsr";
import { landscapeState } from "@stores/layoutStore";
import { useWindowSize } from "@utils/useWindowSize";
import { useRecoilState } from "recoil";

import SelectDining from "components/reservation/SelectDining";
import SelectTime from "components/reservation/SelectTime";
import CustomCalendar from "components/reservation/CustomCalendar";
import SelectMember from "components/reservation/SelectMember";

import functions from '@utils/functions';
import * as apiObject from '@utils/api';

import ICON_REQUIRE from "@images/reservation/icon-require.png";
import ICON_STEP_01 from "@images/reservation/icon_step1.png";
import ICON_STEP_02 from "@images/reservation/icon_step2.png";
import ICON_STEP_03 from "@images/reservation/icon_step3.png";
import ICON_STEP_04 from "@images/reservation/icon_step4.png";

import ICON_RESERVATION from "@images/sungwonjung/icon-pop-reser.png";
import ICON_RESERVATION2 from "@images/reservation/icon-main-quick-reservation.png";
import ICON_CHECK from "@images/reservation/icon_check.png";

type ValuePiece = any | Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
type PostPageQuery = {
    menu: string;
};

type PopupReservationProps = {
    isOpenReservationConfirm? :boolean;
    setShowPopConfirm: (data: any) => void;
}

const Reservation: React.FC<PopupReservationProps> = ({isOpenReservationConfirm,setShowPopConfirm}) => {
    const { t } = useTranslation(['common','yakwan']);
    const router = useRouter()
    const isAccessDevice =  useWindowSize();
    // 화면 가로모드 여부 확인
    const [viewLandscape, setIsLandscape] = useRecoilState(landscapeState);
    const [isShowConfirm, setShowConfirm] = React.useState(isOpenReservationConfirm);
    const [rstep, setRStep] = React.useState(1);
    const [inputs, setInputs] = React.useState({
        reservation_room : '',
        reservation_roomName : '',
        reservation_date : '',
        reservation_time_hour : '',
        reservation_time_minutes :'',
        reservation_member_adult : 0,
        reservation_member_children : 0,
        reservation_name : '',
        reservation_email : '',
        reservation_phone : '',
    });

    const [dateValue, onDateChange] = React.useState<Value>(new Date());
    const disableDays = ["2024-03-19", "2024-03-28"]; // 이미 

    const isCanClcikSend = React.useMemo(() => {
        let ret = false;
        if (
            !functions.isEmpty(inputs?.reservation_room)
            && !functions.isEmpty(inputs?.reservation_date)
            && !functions.isEmpty(inputs?.reservation_time_minutes)
            && inputs?.reservation_member_adult > 0
            && inputs?.reservation_member_children > 0
            && !functions.isEmpty(inputs?.reservation_name)
            && !functions.isEmpty(inputs?.reservation_email)
            && !functions.isEmpty(inputs?.reservation_phone)
        ){
            ret = true; 
        }
        return ret;
      }, [inputs]);
    
    const onSelectDate = (date:any) => {
        if ( rstep < 2 ) return ;
        if ( disableDays.find((x:any) => x === moment(date).format("YYYY-MM-DD")) ) {
           
        }else{
            onDateChange(date);
            setInputs({
                ...inputs,
                reservation_date: moment(date).format("YYYY-MM-DD"),
                reservation_time_hour : '',
                reservation_time_minutes :'',
                reservation_member_adult : 0,
                reservation_member_children : 0,
            })
            setRStep(3);
        }   
    }

    const onClickSelectHour = ( data: any, mode : number ) => {
        if ( rstep < 3 ) return ;
        if ( mode ==  1 ) {// 시간
            setInputs({
                ...inputs,
                reservation_time_hour : data,
                reservation_time_minutes :'',
                reservation_member_adult : 0,
                reservation_member_children : 0,
            })
        }else if ( mode ==  2 ) {// 분
            setInputs({
                ...inputs,
                reservation_time_minutes :data,
                reservation_member_adult : 0,
                reservation_member_children : 0,
            })
            setRStep(4);
        }
    }


    const HandleOnChange = (e:any,type:string) => {
        setInputs({
            ...inputs,
            [type] : e.target.value.trim()
        })
    }

    return (
        <NoSsr>
            <Box sx={{...styles.wrapper,opacity:isShowConfirm ? 0 : 1}}>
                <Box sx={styles.stepWrapper}>
                    <Box sx={styles.commonStepOuter}>
                        <Box sx={styles.dottedGrayLine} />
                        {
                            ( !functions.isEmpty(inputs.reservation_room) && rstep > 1 ) ?
                            <Box sx={styles.stepSelected}>
                                <Image 
                                    alt={"sub"}
                                    src={ICON_CHECK}
                                    style={{width:'28px',height:'28px'}}
                                />
                            </Box>
                            :
                            <Box sx={rstep == 1 ? styles.stepBoxOn :  styles.stepBoxOff}>
                                <Typography variant="manrope" sx={rstep == 1 ? styles.textStyleOn : styles.textStyleOff}>step 1</Typography>
                            </Box>
                        }
                    </Box>
                    <Box sx={styles.commonStepOuter}>
                        <Box sx={styles.dottedGrayLine} />
                        {
                            (!functions.isEmpty(inputs.reservation_date) && rstep > 2 ) ?
                            <Box sx={styles.stepSelected}>
                                <Image 
                                    alt={"sub"}
                                    src={ICON_CHECK}
                                    style={{width:'28px',height:'28px'}}
                                />
                            </Box>
                            :
                            <Box sx={rstep == 2 ? styles.stepBoxOn :  styles.stepBoxOff}>
                                <Typography variant="manrope" sx={rstep == 2 ? styles.textStyleOn : styles.textStyleOff}>step 2</Typography>
                            </Box>
                        }
                    </Box>
                    <Box sx={styles.commonStepOuter}>
                        <Box sx={styles.dottedGrayLine} />
                        {
                            (!functions.isEmpty(inputs.reservation_date) && rstep > 3 ) ?
                            <Box sx={styles.stepSelected}>
                                <Image 
                                    alt={"sub"}
                                    src={ICON_CHECK}
                                    style={{width:'28px',height:'28px'}}
                                />
                            </Box>
                            :
                            <Box sx={rstep == 3 ? styles.stepBoxOn :  styles.stepBoxOff}>
                                <Typography variant="manrope" sx={rstep == 3 ? styles.textStyleOn : styles.textStyleOff}>step 3</Typography>
                            </Box>
                        }
                    </Box>
                    <Box sx={styles.commonStepOuter}>
                        {
                            (inputs.reservation_member_adult > 0 && rstep == 4 ) 
                            ?
                            <Box sx={styles.stepSelected}>
                                <Image 
                                    alt={"sub"}
                                    src={ICON_CHECK}
                                    style={{width:'28px',height:'28px'}}
                                />
                            </Box>
                            :
                            <Box sx={rstep == 4 ? styles.stepBoxOn :  styles.stepBoxOff}>
                                <Typography variant="manrope" sx={rstep == 4 ? styles.textStyleOn : styles.textStyleOff}>step 4</Typography>
                            </Box>
                        }
                    </Box>
                </Box>
                <Box sx={styles.selectWrapper}>
                    <Box sx={styles.commonSelectOuter}>
                        <Box sx={styles.commonSelectHeadWrapper}>
                            <Image 
                                alt={"sub"}
                                src={ICON_STEP_01}
                                style={{width:'29px',height:'24px'}}
                            />
                            <Typography variant="sourceHanSans" sx={styles.menuTextStyle}>{t("reservation.title_step_1")}</Typography>
                            {
                                ( !functions.isEmpty(inputs.reservation_room) && rstep > 1 ) 
                                ?
                                <Box sx={styles.headerSelectedTitleWrap }>
                                    <Typography variant="sourceHanSans" sx={styles.menuHelpTextStyle2}>{t(inputs.reservation_roomName)}</Typography>
                                </Box>
                                :
                                rstep == 1
                                ?
                                (
                                    <Box sx={styles.headerSelectTitleWrap }>
                                        <Typography variant="sourceHanSans" sx={styles.menuHelpTextStyle}>{t("reservation.msg_step_1")}</Typography>
                                    </Box>
                                )
                                :
                                null
                            }
                        </Box>
                        <Box sx={styles.commonSelectBodyWrapper}>
                            <SelectDining 
                                onClickSelectDining={(val)=> {
                                    setInputs({
                                        ...inputs,
                                        reservation_room : val.code,
                                        reservation_roomName : val.localeLabel,
                                        reservation_date : '',
                                        reservation_time_hour : '',
                                        reservation_time_minutes :'',
                                        reservation_member_adult : 0,
                                        reservation_member_children : 0,
                                    });
                                    setRStep(2);
                                    onDateChange(new Date());
                                }} 
                                selectData={inputs.reservation_room} 
                                activeIndex={0}
                            />
                        </Box>
                    </Box>
                    <Box sx={styles.commonSelectDevideOuter} />
                    <Box sx={{...styles.commonSelectOuter,opacity:rstep < 2 ? 0.3 : 1}}>
                        <Box sx={styles.commonSelectHeadWrapper}>
                            <Image 
                                alt={"sub"}
                                src={ICON_STEP_02}
                                style={{width:'21px',height:'24px'}}
                            />
                            <Typography variant="sourceHanSans" sx={styles.menuTextStyle}>{t("reservation.title_step_2")}</Typography>
                            {
                                ( !functions.isEmpty(inputs.reservation_date) && rstep > 2 ) 
                                ?
                                <Box sx={styles.headerSelectedTitleWrap }>
                                    <Typography variant="sourceHanSans" sx={styles.menuHelpTextStyle2}>
                                        {inputs.reservation_date}({functions.convertDatetoWeekday(inputs.reservation_date,t)})
                                    </Typography>
                                </Box>
                                :
                                rstep == 2
                                ?
                                (
                                    <Box sx={styles.headerSelectTitleWrap }>
                                        <Typography variant="sourceHanSans" sx={styles.menuHelpTextStyle}>{t("reservation.msg_step_2")}</Typography>
                                    </Box>
                                )
                                :
                                null
                            }
                        </Box>
                        <Box sx={styles.commonSelectBodyWrapper}>
                            <CustomCalendar 
                                onDateChange={onSelectDate} 
                                dateValue={dateValue} 
                                disableDays={disableDays}
                                isMode={"dining"}
                            />
                        </Box>
                    </Box>
                    <Box sx={styles.commonSelectDevideOuter} />
                    <Box sx={{...styles.commonSelectOuter,opacity:rstep < 3 ? 0.3 : 1}}>
                        <Box sx={styles.commonSelectHeadWrapper}>
                            <Image 
                                alt={"sub"}
                                src={ICON_STEP_03}
                                style={{width:'24px',height:'24px'}}
                            />
                            <Typography variant="sourceHanSans" sx={styles.menuTextStyle}>{t("reservation.title_step_3")}</Typography>
                            {
                                ( !functions.isEmpty(inputs.reservation_time_hour) &&  !functions.isEmpty(inputs.reservation_time_minutes) && rstep > 3 ) 
                                ?
                                <Box sx={styles.headerSelectedTitleWrap }>
                                    <Typography variant="sourceHanSans" sx={styles.menuHelpTextStyle2}>
                                        {inputs.reservation_time_hour}: {inputs.reservation_time_minutes}
                                    </Typography>
                                </Box>
                                :
                                rstep == 3  ? (
                                    <Box sx={styles.headerSelectTitleWrap }>
                                        <Typography variant="sourceHanSans" sx={styles.menuHelpTextStyle}>{t("reservation.msg_step_3")}</Typography>
                                    </Box>
                                )
                                :
                                null
                            }
                        </Box>
                        <Box sx={styles.commonSelectBodyWrapper}>
                            <SelectTime 
                                onClickSelectHour={(val)=> onClickSelectHour(val,1)} 
                                onClickSelectMinute={(val)=> onClickSelectHour(val,2)} 
                                selectHour={inputs.reservation_time_hour} 
                                selectMinute={inputs.reservation_time_minutes} 
                                ismode={"dining"}
                            />
                        </Box>
                    </Box>
                    <Box sx={styles.commonSelectDevideOuter} />
                    <Box sx={{...styles.commonSelectOuter,opacity:rstep < 4 ? 0.3 : 1}}>
                        <Box sx={styles.commonSelectHeadWrapper}>
                            <Image 
                                alt={"sub"}
                                src={ICON_STEP_04}
                                style={{width:'20px',height:'24px'}}
                            />
                            <Typography variant="sourceHanSans" sx={styles.menuTextStyle}>{t("reservation.title_step_4")}</Typography>
                            {
                                ( inputs.reservation_member_adult > 0 && rstep == 4 ) 
                                ?
                                <Box sx={styles.headerSelectedTitleWrap }>
                                    <Typography variant="sourceHanSans" sx={styles.menuHelpTextStyle2}>
                                        {t("reservation.title_step_4_1")} <span>{inputs.reservation_member_adult}</span>{t("common.word.man")},
                                        {t("reservation.title_step_4_2")} <span>{inputs.reservation_member_children}</span>{t("common.word.man")}
                                    </Typography>
                                </Box>
                                :
                                rstep == 4  ? (
                                    <Box sx={styles.headerSelectTitleWrap }>
                                        <Typography variant="sourceHanSans" sx={styles.menuHelpTextStyle}>{t("reservation.msg_step_4")}</Typography>
                                    </Box>
                                )
                                :
                                null
                            }
                        </Box>
                        <Box sx={styles.commonSelectBodyWrapper}>
                            <SelectMember 
                                onClickSelectAdult={(val)=> 
                                    {
                                        if ( rstep < 4 )return;
                                        setInputs({...inputs,reservation_member_adult : val})
                                    }
                                } 
                                onClickSelectChild={(val)=> {
                                    if ( rstep < 4 )return;
                                    setInputs({...inputs,reservation_member_children : val})
                                }} 
                                selectAdult={inputs.reservation_member_adult} 
                                selectChild={inputs.reservation_member_children} 
                            />
                        </Box>
                    </Box>
                </Box>
                <Box sx={styles.inputTermWrapper} />
                <Box sx={styles.inputWrapper}>
                    <Box sx={styles.inputInsideTitleWrapper}>
                        <Image src={ICON_REQUIRE} style={{width:'20px',height:'24px'}} alt={"sub"} />
                        <Typography variant="sourceHanSans" sx={styles.textStyle5}>
                            {t("reservation.force_input")}<span>*</span>
                        </Typography>
                    </Box>
                    <Box sx={styles.inputInsideWrapper}>
                        <Typography variant="sourceHanSans" sx={styles.textInputTitle}>
                            {t("reservation.user_name")}<span>*</span>
                        </Typography>
                        <Box
                            component="form"
                            sx={{
                                width: '70%',
                                padding:'5px 10px',
                                '& .MuiTextField-root': {  width: '100%' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                required
                                size="small"
                                id="inputs-name"
                                label={inputs?.reservation_name?.length  == 0 ? "Name" : ""}
                                onChange={(e) => HandleOnChange(e,'reservation_name')}
                                placeholder="예약자 이름 입력"
                            />
                        </Box>
                    </Box>
                    <Box sx={styles.inputInsideWrapper}>
                        <Typography variant="sourceHanSans" sx={styles.textInputTitle}>
                            {t("reservation.user_email")}<span>*</span>
                        </Typography>
                        <Box
                            component="form"
                            sx={{
                                width: '70%',
                                padding:'5px 10px',
                                '& .MuiTextField-root': {  width: '100%' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                required
                                size="small"
                                id="inputs-email"
                                label={inputs?.reservation_email?.length  == 0 ? t('login.input_email') : !functions.isEmail(inputs?.reservation_email) ?  t('reservation.user_email_helptext') : "" }
                                name="email"
                                autoComplete="email"
                                placeholder={t("reservation.user_email")}
                                onChange={(e) => HandleOnChange(e,'reservation_email')}
                                //helperText={inputs?.reservation_email?.length > 0 ? "정확한 이메일 주소를 입력해 주세요." : ""}
                            />
                        </Box>
                    </Box>
                    <Box sx={styles.inputInsideWrapper}>
                        <Typography variant="sourceHanSans" sx={styles.textInputTitle}>
                            {t("reservation.user_phone")}<span>*</span>
                        </Typography>
                        <Box
                            component="form"
                            sx={{
                                width: '70%',
                                padding:'5px 10px',
                                '& .MuiTextField-root': {  width: '100%' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                required
                                type='number'
                                size="small"
                                id="inputs-phone"
                                label={t("reservation.user_phone")}
                                placeholder={t('reservation.user_phone_helptext')}
                                onChange={(e) => HandleOnChange(e,'reservation_phone')}
                            />
                        </Box>
                    </Box>
                    <Box sx={isCanClcikSend ? styles.inputButtonWrapper : styles.inputButtonWrapper2} onClick={() =>{
                        if ( !isCanClcikSend ) return;
                        setShowPopConfirm({...inputs,isType:'dining'});
                    }}>
                        <Image 
                            alt={"sub"}
                            src={isCanClcikSend ? ICON_RESERVATION : ICON_RESERVATION2}
                            style={{width:'30px',height:'34px'}}
                        />
                        <Typography variant="sourceHanSans" sx={isCanClcikSend ? styles.inputButtonText : styles.inputButtonText2}>{t("common.navname.reservation")}</Typography>  
                    </Box>
                </Box>
            </Box>
        </NoSsr>
    )
}

const styles = {
    wrapper : {
        display:'flex',width:'100%',height:'100%',zIndex:101,overflow:'hidden',flexDirection:'column'
    },
    stepWrapper : {
        display:'flex',flexDirection:'row',width:'calc(100% -140px)',height:'70px',alignItems:'center',justifyContent:'center',
        margin:"0 70px"
    },
    selectWrapper : {
        display:'flex',flexDirection:'row',width:'calc(100% -140px)',height:'auto',minHeight:"400px",margin:"0 70px",alignItems:'flex-start',justifyContent:'flex-start',
    },
    inputWrapper : {
        display:'flex',flexDirection:'row',width:'calc(100% -140px)',height:'160px',alignItems:'center',justifyContent:'center',margin:"0 70px"
    },
    inputInsideTitleWrapper : {
        display:'flex',flexDirection:'row',width:'150px',height:'auto',minHeight:'30px',alignItems:'center',justifyContent:'center'
    },
    inputInsideWrapper : {
        display:'flex',flexDirection:'row',width:'380px',height:'auto',minHeight:'30px',alignItems:'center',justifyContent:'center'
    },
    inputButtonWrapper : {
        display:'flex',flexDirection:'row',width:'230px',height:'77px',alignItems:'center',justifyContent:'center',backgroundColor:'#f84040',borderRadius: "38px",cursor:'pointer'
    },
    inputButtonWrapper2 : {
        display:'flex',flexDirection:'row',width:'230px',height:'77px',alignItems:'center',justifyContent:'center',backgroundColor:'#f8f6f6',borderRadius: "38px"
    },
    commonStepOuter : {
        display:'flex',flex:1,height:'100%',alignItems:'center',position:'relative'
    },
    commonSelectOuter : {
        display:'flex',flexDirection:'column',flex:1,height:'auto',maxWidth:"380px",alignItems:'center',position:'relative',
    },
    commonSelectDevideOuter : {
        display:'flex',flexDirection:'column',height:'415px',width:"1px",alignItems:'center',position:'relative',backgroundColor:'#dcdcdc',margin:"0 20px"
    },
    commonSelectHeadWrapper : {
        display:'flex',flexDirection:'row',width:'100%',height:'60px',alignItems:'center'
    },
    commonSelectBodyWrapper : {
        display:'flex',flexDirection:'row',width:'100%',minHeight:'160px',alignItems:'center',maxWidth:"380px"
    },
    menuTextStyle : {
        fontSize: "20px",fontWeight: "bold",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.4px",color: "#22201f",marginLeft:"5px",
        fontSizeAdjust:"auto"
    },
    menuHelpTextStyle : {
        fontSize: "20px",fontWeight: "normal",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.4px",color: "#a2a2a2",
        fontSizeAdjust:"auto" ,width:'100%'
    },
    menuHelpTextStyle2 : {
        fontSize: "20px",fontWeight: "normal",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.4px",color: "#111111",
        fontSizeAdjust:"auto" ,width:'100%',
        "& > span" : {
            color: "#f84040",fontWeight:'bold'
        }
    },
    headerSelectTitleWrap : {
        display:'flex',alignItems:'center',justifyContent:'center',minWidth:'100px',height:'30px',borderBottom:"2px solid #f84040",cursor:"pointer",marginLeft:"10px"
    },
    headerSelectedTitleWrap : {
        display:'flex',alignItems:'center',justifyContent:'center',maxWidth:'200px',height:'30px',borderBottom:"1px solid #000",cursor:"pointer",marginLeft:"10px"
    },
    dottedGrayLine : {
        minWidth: "129px",width:'100%',height: "1px",margin: "0",border: "1px dotted #c8c8c8"
    },
    stepBoxOn : {
        width:"60px", height:"28px", display:'flex',alignItems:'center',justifyContent:'center',
        borderRadius: "8px",boxShadow: "0 3px 6px 0 rgba(38, 196, 106, 0.3)",border: "solid 2px #26c46a",backgroundColor: "#fff",
        position:'absolute',left:0
    },
    stepBoxOff : {
        width:"60px", height:"28px", display:'flex',alignItems:'center',justifyContent:'center',borderRadius: "8px",backgroundColor: "#f8f8f8",position:'absolute',left:0
    },
    stepSelected : {
        width:"60px", height:"28px", display:'flex',alignItems:'center',backgroundColor: "transparent",position:'absolute',left:0
    },
    inputTermWrapper : {
        display:'flex',alignItems:'center',justifyContent:'center',width:'100%',height:'5px',borderTop:"1px solid #dcdcdc",borderBottom:"1px solid #dcdcdc",backgroundColor:'#f8f8f8',
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
        fontSize: "26px",fontWeight: "bold",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.52px",color: "#c8c8c8",marginLeft:"10px"
    }
}

export default Reservation;