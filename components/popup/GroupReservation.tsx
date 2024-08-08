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
import * as localStorage from '@utils/localStorage';
import SelectDining from "components/reservation/SelectDining";
import SelectTime from "components/reservation/SelectTime";
import CustomCalendar from "components/reservation/CustomCalendar";
import SelectMember from "components/reservation/SelectMember";

import OptionDefault from "components/reservation/OptionDefault"
import OptionAdd from "components/reservation/OptionAdd"

import functions from '@utils/functions';
import * as apiObject from '@utils/api';
import ICON_STEP_01 from "@images/reservation/icon_step1.png";
import ICON_STEP_02 from "@images/reservation/icon_step2.png";
import ICON_STEP_03 from "@images/reservation/icon_step3.png";
import ICON_STEP_04 from "@images/reservation/icon_step4.png";

import ICON_RESERVATION from "@images/sungwonjung/icon-pop-reser.png";
import ICON_RESERVATION2 from "@images/reservation/icon-main-quick-reservation.png";
import ICON_CHECK from "@images/reservation/icon_check.png";
import ICON_OPTIONS from "@images/reservation/icon_options.png";
import ICON_REQUIRE from "@images/reservation/icon-require.png";
import KeyboardArrowDownIcon from "@images/reservation/icon_arrow_down.png";
import KeyboardArrowUpIcon from "@images/reservation/icon_arrow_up.png";

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
    const [isToggleTop, setToggleTop] = React.useState(true);
    const [codeRow, setCodeRow] = React.useState([]);
    const [rstep, setRStep] = React.useState(1);
    const [inputs, setInputs] = React.useState({
        reservation_room : '',
        reservation_roomName : '',
        reservation_date : '',
        reservation_time_hour : '',
        reservation_time_term :'',
        reservation_member_adult : 0,
        reservation_member_children : 0,
        reservation_name : '',
        reservation_email : '',
        reservation_phone : '',
        reservation_organ : "",
        reservation_festival : "",
        reservation_avenuType : "",
        reservation_avenuTypeName : "",
        reservation_tableType : "",
        reservation_tableTypeName : "",
        reservation_add_option : {
            FSA01 : false,
            FSA02 : false,
            FSA03: false,
            FSA04 : false
        },
        reservation_default_option : {
            FFA01 : true,
            FFA02 : true,
            FFA03 : true,
            FFA04 : true,
            FFI01 : true,
            FFI03 : true,
            FFI04 : true,
            FFI05 : true,
            FFI06 : true,
            FFI02 : true,
        }
    });

    const [dateValue, onDateChange] = React.useState<Value>(new Date());
    const disableDays = ["2024-03-19", "2024-03-28"]; // 이미 

    const isCanClcikTopToggle = React.useMemo(() => {
        let ret = false;
        if (
            !functions.isEmpty(inputs?.reservation_room)
            && !functions.isEmpty(inputs?.reservation_date)
            && !functions.isEmpty(inputs?.reservation_time_hour)
            && !functions.isEmpty(inputs?.reservation_time_term)
            && inputs?.reservation_member_adult > 0
        ){
            ret = true; 
        }
        return ret;
      }, [inputs]);
    
    const isCanClcikSend = React.useMemo(() => {
        let ret = false;
        if (
            !functions.isEmpty(inputs?.reservation_room)
            && !functions.isEmpty(inputs?.reservation_date)
            && !functions.isEmpty(inputs?.reservation_time_hour)
            && !functions.isEmpty(inputs?.reservation_time_term)
            && inputs?.reservation_member_adult > 0
            && !functions.isEmpty(inputs?.reservation_name)
            && !functions.isEmpty(inputs?.reservation_email)
            && !functions.isEmpty(inputs?.reservation_phone)
            && !functions.isEmpty(inputs?.reservation_organ)
            && !functions.isEmpty(inputs?.reservation_festival)
        ){
            ret = true; 
        }
        return ret;
    }, [inputs]);

    React.useEffect(() => {
        async function getCommonCode() {
          const localCommonCode:any = await localStorage.getItem("commonCode");
          if ( functions.isEmpty(JSON.parse(localCommonCode))) {
            setupCommonCode();
          }else{
            setCodeRow(JSON.parse(localCommonCode))
          }
        }
        getCommonCode()
    }, []);

    const setupCommonCode = async() => {
        try {
          const url = '/sr_system_api/common/init.php?action=getCodeInfo';
          const res = await apiObject.get(url);
          if (res.state == 'true') {
              localStorage.setItem("commonCode", JSON.stringify(res?.row));
              setCodeRow(JSON.parse(res?.row))
          }
      }catch (error:any) {
          console.log('config error', error);
          if (error) {
    
          }
      }
      }
    
    const onSelectDate = (date:any) => {
        if ( rstep < 2 ) return ;
        if ( disableDays.find((x:any) => x === moment(date).format("YYYY-MM-DD")) ) {
           
        }else{
            onDateChange(date);
            setInputs({
                ...inputs,
                reservation_date: moment(date).format("YYYY-MM-DD"),
                reservation_time_hour : '',
                reservation_time_term :'',
                reservation_room : ""
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
                reservation_time_term :'',
                reservation_room : "",
            })
        }else if ( mode ==  2 ) {// 분
            setInputs({
                ...inputs,
                reservation_time_term : data,
                reservation_room : "",
            })
            setRStep(4);
        }
    }

    const renderAddOption = () => {
        let ret =  " /"+t("reservation.option_input")+"( ";
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
        const ret2 =  addNumber > 0 ? ret.substring(0,ret.length-1) + " )" : ret + " )";
        return ret2;
    }

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


    const HandleOnChange = (e:any,type:string) => {
        setInputs({
            ...inputs,
            [type] : e.target.value.trim()
        })
    }

    const onHandleClickTopToggle = () => {
        if ( !functions.isEmpty(inputs?.reservation_room)) {
            setToggleTop(!isToggleTop);
        }
    }

    return (
        <NoSsr>
            <Box sx={{...styles.wrapper,opacity:isShowConfirm ? 0 : 1}}>
                <Box sx={styles.stepWrapper}>
                    <Box sx={styles.commonStepOuter}>
                        <Box sx={styles.dottedGrayLine} />
                        {
                            inputs.reservation_member_adult > 0 ?
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
                            <Box sx={{...styles.stepSelected,paddingLeft:"5px"}}>
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
                            <Box sx={{...styles.stepSelected,paddingLeft:"20px"}}>
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
                        <Box sx={{...styles.dottedGrayLine,width:'50px',minWidth:'50px'}} />
                        {
                            ( !functions.isEmpty(inputs.reservation_room) && rstep == 4 ) 
                            ?
                            <Box sx={{...styles.stepSelected,paddingLeft:"30px"}}>
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
                        <Box 
                            sx={styles.toggleCirle} 
                            onClick={() =>  {
                                if ( isCanClcikTopToggle ) {
                                    onHandleClickTopToggle();
                                }else{
                                    functions.toastMessage(
                                        t("messages.info.reservation_1"), 
                                        {
                                            position: "top-right"
                                        }
                                    );
                                }
                            }}
                        >
                            {
                            isToggleTop
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
                <Box sx={{...styles.selectWrapper,height : isToggleTop ? "400px" : "60px", }}>
                    <Box sx={styles.commonSelectOuter}>
                        <Box sx={styles.commonSelectHeadWrapper}>
                            <Image 
                                alt={"sub"}
                                src={ICON_STEP_04}
                                style={{width:'20px',height:'24px'}}
                            />
                            <Typography variant="sourceHanSans" sx={styles.menuTextStyle}>{t("reservation.title_step_4")}</Typography>
                            {
                                ( inputs.reservation_member_adult > 0  ) 
                                ?
                                <Box sx={styles.headerSelectedTitleWrap }>
                                    <Typography variant="sourceHanSans" sx={styles.menuHelpTextStyle2}>
                                        {t("reservation.title_step_4_1")} <span>{inputs.reservation_member_adult}</span>{t("common.word.man")},
                                        {t("reservation.title_step_4_2")} <span>{inputs.reservation_member_children}</span>{t("common.word.man")}
                                    </Typography>
                                </Box>
                                :
                                rstep == 1 ? (
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
                                        setInputs({
                                            ...inputs,reservation_member_adult : val,
                                            reservation_room : val.code,
                                            reservation_roomName : val.localeLabel,
                                            reservation_date : '',
                                            reservation_time_hour : '',
                                            reservation_time_term :'',
                                        });
                                        onDateChange(new Date());
                                        if ( val == 0 ) {
                                            setRStep(1);
                                        }else{
                                            setRStep(2);
                                        }
                                       
                                    }
                                } 
                                onClickSelectChild={(val)=> {
                                    setInputs({...inputs,reservation_member_children : val})
                                }} 
                                selectAdult={inputs.reservation_member_adult} 
                                selectChild={inputs.reservation_member_children} 
                            />
                        </Box>
                        
                    </Box>
                    <Box sx={{...styles.commonSelectDevideOuter,backgroundColor:isToggleTop ? '#dcdcdc' : "#fff"}} />
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
                                isMode={"group"}
                            />
                        </Box>
                    </Box>
                    <Box sx={{...styles.commonSelectDevideOuter,backgroundColor:isToggleTop ? '#dcdcdc' : "#fff"}} />
                    <Box sx={{...styles.commonSelectOuter,opacity:rstep < 3 ? 0.3 : 1}}>
                        <Box sx={styles.commonSelectHeadWrapper}>
                            <Image 
                                alt={"sub"}
                                src={ICON_STEP_03}
                                style={{width:'24px',height:'24px'}}
                            />
                            <Typography variant="sourceHanSans" sx={styles.menuTextStyle}>{t("reservation.title_step_3")}</Typography>
                            {
                                ( !functions.isEmpty(inputs.reservation_time_hour) &&  !functions.isEmpty(inputs.reservation_time_term) && rstep > 3 ) 
                                ?
                                <Box sx={styles.headerSelectedTitleWrap }>
                                    <Typography variant="sourceHanSans" sx={styles.menuHelpTextStyle2}>
                                        {rendderTimeTerm(inputs)}
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
                                selectMinute={inputs.reservation_time_term} 
                                ismode={"group"}
                            />
                        </Box>
                    </Box>
                    <Box sx={{...styles.commonSelectDevideOuter,backgroundColor:isToggleTop ? '#dcdcdc' : "#fff"}} />
                    <Box sx={{...styles.commonSelectOuter,opacity:rstep < 4 ? 0.3 : 1}}>
                        <Box sx={styles.commonSelectHeadWrapper}>
                            <Image 
                                alt={"sub"}
                                src={ICON_STEP_01}
                                style={{width:'29px',height:'24px'}}
                            />
                            <Typography variant="sourceHanSans" sx={styles.menuTextStyle}>{t("reservation.title_step_5")}</Typography>
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
                                        <Typography variant="sourceHanSans" sx={styles.menuHelpTextStyle}>{t("reservation.msg_step_5")}</Typography>
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
                                        reservation_roomName : val.localeLabel
                                    });
                                    
                                }} 
                                selectData={inputs.reservation_room} 
                                activeIndex={1}
                            />
                        </Box>
                    </Box>
                </Box>
                <Box sx={styles.inputTermWrapper} />
                <Box sx={{...styles.optionSelectWrapper,height : isToggleTop ? "70px" : "410px", }}>
                    {isCanClcikTopToggle && (
                    <Box 
                        sx={styles.toggleCirle} 
                        onClick={() =>  {
                            if ( isCanClcikTopToggle ) {
                                onHandleClickTopToggle();
                            }else{
                                functions.toastMessage(
                                    t("messages.info.reservation_1"), 
                                    {
                                        position: "top-right"
                                    }
                                );
                            }
                        }}
                    >
                        {
                        !isToggleTop
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
                    )}
                    <Box sx={{...styles.commonSecondHeadWrapper,height:'60px',paddingTop:"5px"}}>
                        <Image src={ICON_OPTIONS} style={{width:'20px',height:'24px'}} alt={"sub"} />
                        <Typography variant="sourceHanSans" sx={styles.textStyle5}>{t("reservation.option_input")}</Typography>
                        {
                            ( !functions.isEmpty(inputs?.reservation_avenuType) 
                            ||
                            !functions.isEmpty(inputs?.reservation_tableType)
                            )
                            ?
                            <Box sx={styles.headerSelectTitleWrap2}>
                                <Typography variant="sourceHanSans" sx={styles.menuHelpTextStyle2}>
                                    {t(inputs?.reservation_avenuTypeName)} TYPE
                                    / {t(inputs?.reservation_tableTypeName)} TYPE
                                    {renderAddOption()}
                                </Typography>
                            </Box>
                            : 
                            <Box sx={styles.headerSelectTitleWrap }>
                                <Typography variant="sourceHanSans" sx={styles.menuHelpTextStyle}>{t("reservation.option_input_desc")}</Typography>
                            </Box>
                        }
                    </Box>
                {
                    !isToggleTop &&
                    <Box sx={styles.commonoOtionSelectOuter}>
                        <Box sx={{...styles.commonoOtionSelectWrap,maxWidth:'250px'}}>
                            <Box sx={styles.commonOptionSelectHeadWrapper}>
                                <Typography variant="sourceHanSans" sx={styles.menuTextStyle}>{t("reservation.gropu_part_title.fandb")}</Typography>
                            </Box>
                            <Box sx={styles.commonOptionSelectBodyWrapper}>
                                <SelectDining 
                                    onClickSelectDining={(val)=> {
                                        setInputs({
                                            ...inputs,
                                            reservation_avenuType : val.code,
                                            reservation_avenuTypeName : val.localeLabel
                                        });
                                    }} 
                                    selectData={inputs.reservation_avenuType} 
                                    activeIndex={9}
                                />
                            </Box>
                        </Box>
                        <Box sx={styles.commonOptionSelectDevideOuter} />
                        <Box sx={{...styles.commonoOtionSelectWrap,maxWidth:'250px'}}>
                            <Box sx={{...styles.commonOptionSelectHeadWrapper,paddingLeft:"5px"}}>
                                <Typography variant="sourceHanSans" sx={styles.menuTextStyle}>{t("reservation.gropu_part_title.table_type")}</Typography>
                            </Box>
                            <Box sx={{...styles.commonOptionSelectBodyWrapper,padding:"0 0 0 15px"}}>
                                <SelectDining 
                                    onClickSelectDining={(val)=> {
                                        setInputs({
                                            ...inputs,
                                            reservation_tableType : val.code,
                                            reservation_tableTypeName : val.label
                                        });
                                    }} 
                                    selectData={inputs.reservation_tableType} 
                                    activeIndex={10}
                                />
                            </Box>
                        </Box>
                        <Box sx={styles.commonOptionSelectDevideOuter} />
                        <Box sx={styles.commonoOtionSelectWrap}>
                            <Box sx={{...styles.commonOptionSelectHeadWrapper,paddingLeft:"5px"}}>
                                <Typography variant="sourceHanSans" sx={styles.menuTextStyle}>{t("reservation.gropu_part_title.base_supply")}</Typography>
                            </Box>
                            <Box sx={styles.commonOptionSelectBodyWrapper}>
                                <OptionDefault 
                                    onClickSelectDining={(val)=> {
                                        setInputs({
                                            ...inputs,
                                            reservation_default_option : val
                                        });
                                    }} 
                                    selectData={inputs.reservation_default_option} 
                                />
                            </Box>
                        </Box>
                        <Box sx={styles.commonOptionSelectDevideOuter} />
                        <Box sx={{...styles.commonoOtionSelectWrap,maxWidth:'350px'}}>
                            <Box sx={{...styles.commonOptionSelectHeadWrapper,paddingLeft:"5px"}}>
                                <Typography variant="sourceHanSans" sx={styles.menuTextStyle}>{t("reservation.gropu_part_title.add_supply")}</Typography>
                            </Box>
                            <Box sx={styles.commonOptionSelectBodyWrapper}>
                                <OptionAdd 
                                    onClickSelectDining={(val)=> {
                                        setInputs({
                                            ...inputs,
                                            reservation_add_option : val
                                        });
                                    }} 
                                    selectData={inputs.reservation_add_option} 
                                />
                            </Box>
                        </Box>
                    </Box>
                }
                </Box>
                <Box sx={styles.inputTermWrapper} />
                <Box sx={styles.inputWrapper}>
                    <Box sx={styles.inputInsideTitleWrapper}>
                        <Image src={ICON_REQUIRE} style={{width:'20px',height:'24px'}} alt={"sub"} />
                        <Typography variant="sourceHanSans" sx={styles.textStyle5}>
                            {t("reservation.force_input")}<span>*</span>
                        </Typography>
                    </Box>
                    <Box sx={styles.inputInsideOuterWrapper}>
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
                                    placeholder={t("reservation.user_name")}
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
                        <Box sx={styles.inputInsideWrapper}>
                            <Typography variant="sourceHanSans" sx={styles.textInputTitle}>
                                {t("reservation.user_organ")}<span>*</span>
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
                                    id="inputs-organ"
                                    label={inputs?.reservation_organ?.length  == 0 ?t("reservation.user_organ") : ""}
                                    onChange={(e) => HandleOnChange(e,'reservation_organ')}
                                    placeholder={t("reservation.user_organ")}
                                />
                            </Box>
                        </Box>
                        <Box sx={styles.inputInsideWrapper}>
                            <Typography variant="sourceHanSans" sx={styles.textInputTitle}>
                                {t("reservation.user_festival")}<span>*</span>
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
                                    id="inputs-festval"
                                    label={inputs?.reservation_festival?.length  == 0 ? t("reservation.user_festival") : ""}
                                    onChange={(e) => HandleOnChange(e,'reservation_festival')}
                                    placeholder={t("reservation.user_festival")}
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={styles.inputInsideTitleWrapper}>
                        <Box sx={isCanClcikSend ? styles.inputButtonWrapper : styles.inputButtonWrapper2} onClick={() =>{
                            //if ( !isCanClcikSend ) return;
                            setShowPopConfirm({...inputs,isType:'group'});
                        }}>
                            <Image 
                                alt={"sub"}
                                src={isCanClcikSend ? ICON_RESERVATION : ICON_RESERVATION2}
                                style={{width:'30px',height:'34px'}}
                            />
                            <Typography variant="sourceHanSans" sx={isCanClcikSend ? styles.inputButtonText : styles.inputButtonText2}>
                                {t("common.navname.reservation")}
                            </Typography>  
                        </Box>
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
    toggleCirle : {
        position:'absolute',right:"-40px",top:9, width:'46px',height:'46px',borderRadius:"23px",border:"1px solid #c8c8c8",
        display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',zIndex:999
    },
    stepWrapper : {
        display:'flex',flexDirection:'row',width:'calc(100% -140px)',height:'60px',alignItems:'center',justifyContent:'center',
        margin:"0 70px"
    },
    selectWrapper : {
        display:'flex',flexDirection:'row',width:'calc(100% -140px)',height:"400px",margin:"0 70px",alignItems:'flex-start',justifyContent:'flex-start',overflow:'hidden'
    },
    inputWrapper : {
        position:'absolute',left:0,bottom:0, display:'flex',flexDirection:'row',width:'calc(100% -140px)',height:'140px',alignItems:'center',justifyContent:'center',margin:"0 70px",
    },
    inputInsideTitleWrapper : {
        display:'flex',flexDirection:'row',width:'240px',height:'auto',minHeight:'30px',alignItems:'center'
    },
    inputInsideOuterWrapper : {
        display:'flex',flexDirection:'row',flexWrap:'wrap',
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
        display:'flex',flexDirection:'column',height:'390px',width:"1px",alignItems:'center',position:'relative',backgroundColor:'#dcdcdc',margin:"0 20px"
    },
    commonSelectHeadWrapper : {
        display:'flex',flexDirection:'row',width:'100%',height:'50px',alignItems:'center',marginBottom:'10px'
    },
    commonSelectBodyWrapper : {
        display:'flex',flexDirection:'row',width:'100%',minHeight:'160px',alignItems:'center',maxWidth:"380px"
    },
    commonSecondHeadWrapper : {
        display:'flex',flexDirection:'row',width:'100%',height:'70px',alignItems:'center',marginBottom:'10px'
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
    headerSelectTitleWrap2 : {
        display:'flex',alignItems:'center',justifyContent:'center',minWidth:'100px',height:'30px',marginLeft:"10px",borderBottom:"1px solid #22201f",
    },
    headerSelectedTitleWrap : {
        display:'flex',alignItems:'center',justifyContent:'center',maxWidth:'200px',height:'30px',borderBottom:"1px solid #000",cursor:"pointer",marginLeft:"10px"
    },
    dottedGrayLine : {
        minWidth: "129px",width:'100%',height: "1px",margin: "0",border: "1px dotted #c8c8c8"
    },
    optionSelectWrapper : {
        display:'flex',flexDirection:'column',width:'calc(100% -140px)',height:"400px",margin:"0 70px",alignItems:'flex-start',justifyContent:'flex-start',position:'relative'
    },
    commonOptionSelectDevideOuter : {
        display:'flex',flexDirection:'column',height:'330px',width:"1px",alignItems:'center',position:'relative',backgroundColor:'#dcdcdc',margin:"0 10px"
    },
    commonoOtionSelectOuter : {
        display:'flex',flexDirection:'row',width:'100%',height:'auto',maxHeight:"340px",alignItems:'flex-start',position:'relative',overFlow:'hidden'
    },
    commonoOtionSelectWrap : {
        display:'flex',flexDirection:'column',flex:1,height:'auto',minWidth:'200px'
    },
    commonOptionSelectHeadWrapper : {
        display:'flex',flexDirection:'row',width:'100%',height:'40px',alignItems:'flex-start'
    },
    commonOptionSelectBodyWrapper : {
        display:'flex',flexDirection:'row',width:'100%',height:'100%',minHeight:'200px',alignItems:'flex-start',
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