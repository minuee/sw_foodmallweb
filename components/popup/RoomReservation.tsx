import * as React from 'react';
import { useRouter } from "next/router";
import Image from "next/image";
import { Box, Typography,Tabs,Tab,ButtonBase } from "@mui/material";
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { useTranslation } from 'next-i18next';
import NoSsr from "@mui/material/NoSsr";
import { landscapeState } from "@stores/layoutStore";
import { useWindowSize } from "@utils/useWindowSize";
import { useRecoilState } from "recoil";
import Popper, { PopperPlacementType } from '@mui/material/Popper';

import Skeleton from '@mui/material/Skeleton';
import { makeStyles } from "@mui/styles";
import styles from './styles/RoomReservation';

import PopLayerRecipt from "./PopLayerRecipt";
import SelectRoomType from "components/reservation/SelectRoomType";
import SelectNumber from "components/reservation/SelectNumber";
import RoomService from "components/popup/RoomService";
import SettleOptionList from "components/popup/SettleOptionList";
import CustomCalendar from "components/reservation/CustomMultiCalendar";

import functions from '@utils/functions';

import ICON_MEAL from "@images/reservation/icon_bracfast.png";
import ICON_Time from "@images/reservation/icon_time.png";
import ICON_Location from "@images/reservation/icon_location.png";


import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import ICON_STEP_01 from "@images/reservation/icon_step1.png";
import ICON_STEP_02 from "@images/reservation/icon_step2.png";
import ICON_STEP_03 from "@images/reservation/icon_step3.png";
import ICON_STEP_04 from "@images/reservation/icon_step4.png";
import ICON_STEP_05 from "@images/reservation/icon_step5.png";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import RoomGallery from "components/popup/RoomGallery";

import ICON_OPTIONS from "@images/reservation/icon_options.png";
import ICON_INFO from "@images/reservation/icon-info.png";
import KeyboardArrowDownIcon from "@images/reservation/icon_arrow_down.png";
import KeyboardArrowUpIcon from "@images/reservation/icon_arrow_up.png";


const useStyles = makeStyles((theme) => ({
    tab: {
      opacity: 1,
      minWidth: "100px",
      marginRight:"10px",
      padding: 0
    },
    tab2: {
        opacity: 1,
        width:'auto',
        minWidth: "100px",
        marginRight:"5px",
        padding: 0
      },
  }));

type ValuePiece = any | Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
type PostPageQuery = {
    menu: string;
};

type PopupReservationProps = {
    isOpenPopGallery? :boolean;
    isOpenReservationConfirm? :boolean;
    roomStep? : number;
    setShowPopConfirm: (data: any) => void;
    setOpenPopGallery: (data: boolean) => void;
    setRoomStepHeader: (num: number) => void;
}

const Reservation: React.FC<PopupReservationProps> = ({isOpenReservationConfirm,setShowPopConfirm,isOpenPopGallery,setOpenPopGallery,roomStep,setRoomStepHeader}) => {
    const { t } = useTranslation(['common','yakwan']);
    const router = useRouter()
    const isAccessDevice =  useWindowSize();
    const { locale,locales,defaultLocale } = router;
    const classes = useStyles();
    // 화면 가로모드 여부 확인
    const [viewLandscape, setIsLandscape] = useRecoilState(landscapeState);
    const [isShowConfirm, setShowConfirm] = React.useState(isOpenReservationConfirm);
    const [isToggleTop, setToggleTop] = React.useState(true);
    const [isTogglereceipt, setTogglereceipt] = React.useState(false);
  
    const [isZoomToggleShow1, setZoomToggleShow1] = React.useState(false);
    const [isZoomToggleShow2, setZoomToggleShow2] = React.useState(false);
    const [isZoomToggleShow3, setZoomToggleShow3] = React.useState(false);

    
    const [sendData, setSendData] = React.useState(null);
    const [selectOptionArray, setSelectOptionArray] = React.useState([
        {
            code :1,
            label : "조식(3월 14일 x 2인)"
        },
        {
            code :2,
            label : "조식(3월 15일 x 2인)"
        },
        {
            code :3,
            label : "조식(3월 16일 x 2인)"
        },
        {
            code :4,
            label : "조식(3월 17일 x 2인)"
        },
        {
            code :4,
            label : "조식(3월 17일 x 2인)"
        },
        {
            code :4,
            label : "조식(3월 17일 x 2인)"
        },
        {
            code :4,
            label : "조식(3월 17일 x 2인)"
        },
        {
            code :4,
            label : "조식(3월 17일 x 2인)"
        },
        {
            code :4,
            label : "조식(3월 17일 x 2인)"
        },
        {
            code :4,
            label : "조식(3월 17일 x 2인)"
        }
    ]);
    const [inputs, setInputs] = React.useState({
        reservation_room : '',
        reservation_roomName : '',
        reservation_checkin_date: "",
        reservation_checkout_date: "",
        reservation_room_number : 0,
        reservation_member_count : 0
    });

    const [dateValue, onDateChange] = React.useState<Value>(new Date());
    const disableDays = ["2024-03-19", "2024-03-28"]; // 이미 

    const [selectDateArray, setSelectDateArray] = React.useState<any>([]);

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    
    const handleReceiptToggleClick =
        (newPlacement: PopperPlacementType) =>
        (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const optionOpenCount = React.useMemo(() => {
        let ret = 0;
        if ( isZoomToggleShow1 ) ret = ret + 1;
        if ( isZoomToggleShow2 ) ret = ret + 1;
        if ( isZoomToggleShow3 ) ret = ret + 1;
        return ret;
    }, [isZoomToggleShow1,isZoomToggleShow2,isZoomToggleShow3]);
    const isTermDays = React.useMemo(() => {
        let ret = 0;
        if (
            functions.convertDatetoWeekday(inputs.reservation_checkin_date) != "" && functions.convertDatetoWeekday(inputs.reservation_checkout_date) != "" && functions.getDaysTerm(inputs.reservation_checkin_date,inputs.reservation_checkout_date) > 0
        ){
            ret = functions.getDaysTerm(inputs.reservation_checkin_date,inputs.reservation_checkout_date); 
        }
        return ret;
    }, [inputs]);

    React.useEffect(() => {
        let arr = [];
        for( let i = 0; i < isTermDays; i++) {
            arr.push({
                key: i, 
                label: functions.dateToDateMMDD(functions.convertAddDays(inputs.reservation_checkin_date,i+1)),
                code : functions.dateToDate(functions.convertAddDays(inputs.reservation_checkin_date,i+1))
            })
        }
        setSelectDateArray(arr)
    }, [isTermDays]);

    const isCanClcikRoomType = React.useMemo(() => {
        let ret = false;
        if (
            functions.convertDatetoWeekday(inputs.reservation_checkin_date) != "" && functions.convertDatetoWeekday(inputs.reservation_checkout_date) != "" && functions.getDaysTerm(inputs.reservation_checkin_date,inputs.reservation_checkout_date) > 0
            && inputs.reservation_room_number > 0 
            && inputs.reservation_member_count > 0 
        ){
            ret = true; 
        }
        return ret;
    }, [inputs]);

    const isCanClcikTopToggle = React.useMemo(() => {
        let ret = false;
        if (
            functions.convertDatetoWeekday(inputs.reservation_checkin_date) != "" 
            && functions.convertDatetoWeekday(inputs.reservation_checkout_date) != "" 
            && functions.getDaysTerm(inputs.reservation_checkin_date,inputs.reservation_checkout_date) > 0
            && !functions.isEmpty(inputs?.reservation_room)
        ){
            ret = true; 
        }
        return ret;
      }, [inputs]);
    
    const isCanClcikSend = React.useMemo(() => {
        let ret = false;
        if (
            functions.convertDatetoWeekday(inputs.reservation_checkin_date) != "" 
            && functions.convertDatetoWeekday(inputs.reservation_checkout_date) != "" 
            && functions.getDaysTerm(inputs.reservation_checkin_date,inputs.reservation_checkout_date) > 0
            && !functions.isEmpty(inputs?.reservation_room)
        ){
            ret = true; 
        }
        return ret;
      }, [inputs]);
    
    const onSelectDate = (item:any) => {
        setInputs({
            ...inputs,
            reservation_checkin_date: item?.startDate,
            reservation_checkout_date: item?.endDate,
            reservation_room_number : 0,
            reservation_member_count : 0
        })
    }

    const onClickSelectRoomCount = (num:number) => {
        setInputs({...inputs,reservation_room_number: num})
    }
    const onClickSelectMemberCount = (num:number) => {
        setInputs({...inputs,reservation_member_count: num})
    }
   
    const onHandleClickTopToggle = () => {
        if ( !functions.isEmpty(inputs?.reservation_room)) {
            setToggleTop(!isToggleTop);
        }
    }

    const onHandleClickReceiptToggle = () => {
        setTogglereceipt(!isTogglereceipt);
    }

    const onClickSelectMore = (item:any) => {
        setOpenPopGallery(true);
        setSendData(item)
    }

    const renderOptionText = (item:any) => {
        return (
            <Box sx={styles.optionTextBoxWrapper}>
                <Typography variant="sourceHanSans" sx={styles.textStyle6}>
                    {item.label}
                </Typography>
            </Box>
        )
    }

    const renderAddMeal = (item:any) => {
        return (
            <Box sx={styles.addMealWrapper}>
                <Box sx={styles.addMealTopWrapper}>
                    <Typography variant="sourceHanSans" sx={styles.textStyle6}>
                        {functions.convertDayName(item.label,locale,t)}
                    </Typography>
                </Box>
                <Box sx={styles.addMealMiddleWrapper}>
                    <Typography variant="sourceHanSans" sx={styles.textStyle6}>
                        {t("reservation.title_step_4")}
                    </Typography>
                </Box>
                <Box sx={styles.addMealBottomWrapper}>
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
        )
    }
    const MyTabScrollButton = React.forwardRef((props, ref) => {
        const { direction, ...other } = props as any;
      
        return (
          <ButtonBase
            component="div"
            ref={ref}
            style={{ opacity: other.disabled ? 0 : 1 }}
            {...other}
          >
            {
                direction === "left" ? (
                    <Box sx={styles.leftArrowWrapper}>
                        <ArrowBackIosIcon fontSize="small" />
                    </Box>
                ) 
                : 
                (
                    <Box sx={styles.rightArrowWrapper}>
                        <ArrowForwardIosIcon fontSize="small" />
                    </Box>
                )
            }
          </ButtonBase>
        );
    });
    const MyTabScrollButton2 = React.forwardRef((props, ref) => {
        const { direction, ...other } = props as any;
      
        return (
          <ButtonBase
            component="div"
            ref={ref}
            style={{ opacity: other.disabled ? 0 : 1,height:"45px"}}
            {...other}
          >
            {
                direction === "left" ? (
                    <Box sx={styles.leftArrowWrapper2}>
                        <ArrowBackIosIcon fontSize="small" />
                    </Box>
                ) 
                : 
                (
                    <Box sx={styles.rightArrowWrapper2}>
                        <ArrowForwardIosIcon fontSize="small" />
                    </Box>
                )
            }
          </ButtonBase>
        );
      });


    return (
        <NoSsr>
            <Box sx={{...styles.wrapper,opacity:isShowConfirm ? 0 : 1}}>
                <Box sx={{...styles.stepWrapper,borderBottom: isToggleTop ? '1px solid #e6e6e6' :"1px solid #ffffff"}}>
                    <Box 
                        sx={styles.topToggleCirle} 
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
                    <Box sx={styles.commonSelectHeadWrapper}>
                        <Box sx={styles.stepHeadWrapper}>
                            <Typography variant="sourceHanSans" sx={styles.miniTextStyle}>{t("reservation.title_step_2")}</Typography>
                        </Box>
                        <Box sx={styles.stepBodyWrapper}>
                            <Image 
                                alt={"sub"}
                                src={ICON_STEP_02}
                                style={{width:'21px',height:'24px'}}
                            />
                            {
                               ( functions.convertDatetoWeekday(inputs.reservation_checkin_date) != "" && functions.convertDatetoWeekday(inputs.reservation_checkout_date) != "" && functions.getDaysTerm(inputs.reservation_checkin_date,inputs.reservation_checkout_date) > 0) 
                               ?
                               <Box sx={styles.headerSelectedTitleWrap }>
                                   <Typography variant="sourceHanSans" sx={styles.miniTextStyle2}>
                                       {inputs.reservation_checkin_date}({functions.convertDatetoWeekday(inputs.reservation_checkin_date,t)}){" "}~{" "}
                                       {inputs.reservation_checkout_date}({functions.convertDatetoWeekday(inputs.reservation_checkout_date,t)})
                                       {" "}{functions.getDaysTerm(inputs.reservation_checkin_date,inputs.reservation_checkout_date)}
                                       {t("reservation.calendar_nights")}
                                   </Typography>
                               </Box>
                               :
                                <Box sx={styles.headerSelectTitleWrap }>
                                    <Typography variant="sourceHanSans" sx={styles.menuHelpTextStyle}>{t("reservation.msg_step_2")}</Typography>
                                </Box>
                            }
                        </Box>
                        
                    </Box>
                    <Box sx={styles.commonSelectHeadWrapper}>
                        <Box sx={styles.stepHeadWrapper}>
                            <Typography variant="sourceHanSans" sx={styles.miniTextStyle}>{t("reservation.title_step_6")},{t("reservation.title_step_4")}</Typography>
                        </Box>
                        <Box sx={styles.stepBodyWrapper}>
                            <Image 
                                alt={"sub"}
                                src={ICON_STEP_04}
                                style={{width:'20px',height:'24px'}}
                            />
                            {
                                ( inputs.reservation_room_number > 0 &&  inputs.reservation_member_count > 0 ) 
                                ?
                                <Box sx={styles.headerSelectedTitleWrap }>
                                    <Typography variant="sourceHanSans" sx={styles.miniTextStyle2}>
                                        {t("reservation.title_step_6")} {inputs.reservation_room_number}
                                        {" "}
                                        {t("reservation.title_step_4")} {inputs.reservation_member_count}
                                    </Typography>
                                </Box>
                                :
                                <Box sx={styles.headerSelectTitleWrap }>
                                    <Typography variant="sourceHanSans" sx={styles.menuHelpTextStyle}>{t("reservation.msg_step_6")}</Typography>
                                </Box>
                            }
                        </Box>
                    </Box>
                    <Box sx={styles.commonSelectHeadWrapper}>
                        <Box sx={{...styles.stepHeadWrapper,paddingLeft:'50px'}}>
                            <Typography variant="sourceHanSans" sx={styles.miniTextStyle}>{t("reservation.title_step_6")} Type</Typography>
                        </Box>
                        <Box sx={styles.stepBodyWrapper}>
                            <Image 
                                alt={"sub"}
                                src={ICON_STEP_05}
                                style={{width:'38px',height:'24px'}}
                            />
                            {
                                !functions.isEmpty(inputs.reservation_room) 
                                ?
                                <Box sx={styles.headerSelectedTitleWrap }>
                                    <Typography variant="sourceHanSans" sx={styles.menuHelpTextStyle2}>
                                        {t(inputs.reservation_roomName)}
                                    </Typography>
                                </Box>
                                :
                               
                                <Box sx={styles.headerSelectTitleWrap }>
                                    <Typography variant="sourceHanSans" sx={styles.menuHelpTextStyle}>{t("reservation.msg_step_7")}</Typography>
                                </Box>
                            }
                        </Box>
                    </Box>
                </Box>
                <Box sx={{...styles.selectWrapper,height : isToggleTop ? "400px" : "0px", }}>
                    <Box sx={{...styles.commonSelectOuter,flex:2,maxWidth:"700px"}}>
                        <Box sx={{...styles.commonSelectBodyWrapper,maxWidth:"700px"}}>
                            <CustomCalendar 
                                onDateChange={onSelectDate} 
                                dateValue={dateValue} 
                                disableDays={disableDays}
                                ranges={[]}
                            />
                        </Box>
                    </Box>
                    <Box sx={{...styles.commonSelectDevideOuter,backgroundColor:isToggleTop ? '#dcdcdc' : "#fff"}} />
                    <Box sx={{...styles.commonSelectOuter,flex:2,maxWidth:"200px"}}>
                        <Box sx={styles.commonSelectBodyWrapper}>
                            <SelectNumber
                                selectRoomCount={inputs.reservation_room_number}
                                selectMemberCount={inputs.reservation_member_count}
                                onClickSelectRoomCount={onClickSelectRoomCount}
                                onClickSelectMemberCount={onClickSelectMemberCount}
                            />
                        </Box>
                    </Box>
                    <Box sx={{...styles.commonSelectDevideOuter,backgroundColor:isToggleTop ? '#dcdcdc' : "#fff"}} />
                    <Box sx={{...styles.commonSelectOuter,flex:1,maxWidth:"600px"}}>
                    { !isCanClcikRoomType && (
                            <Box sx={{position:'absolute',rigth:0,top:0,width:"100%",height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <Box sx={{display:'flex',flexDirection:'column',width:'320px',height:'110px',border:"1px solid #bb9b6a", borderRadius:"55px",backgroundColor:"#fff",zIndex:2}}>
                                    <Box sx={{display:'flex',flex:1,flexDirection:'row',justifyContent:'center',alignItems:'flex-end',paddingBottom:"10px"}}>
                                        <Image 
                                            alt={"sub"}
                                            src={ICON_INFO}
                                            style={{width:'129px',height:'24px'}}
                                        />
                                    </Box>
                                    <Box sx={{display:'flex',flex:1,flexDirection:'row',justifyContent:'center',paddingTop:"10px"}}>
                                        <Typography variant="sourceHanSans" sx={styles.infoText}>{t("reservation.information_text_1")}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        )}
                        <Box sx={{...styles.commonSelectBodyWrapper,maxWidth:"600px", opacity: isCanClcikRoomType ? 1 : 0.2 }}>
                            <SelectRoomType 
                                onClickSelectRoomType={(val)=> {
                                    setInputs({
                                        ...inputs,
                                        reservation_room : val.code,
                                        reservation_roomName : val.localeLabel
                                    });
                                }} 
                                onClickSelectMore={(val)=>onClickSelectMore(val)}
                                selectData={inputs} 
                                activeIndex={1}
                            />
                        </Box>
                    </Box>
                </Box>
                <Box sx={styles.inputTermWrapper} />
                <Box sx={{...styles.optionSelectWrapper,height : isToggleTop ? "70px" : "470px", }}>
                   
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
                    <Box sx={{...styles.commonSecondHeadWrapper,height:'60px'}}>
                        <Image src={ICON_OPTIONS} style={{width:'20px',height:'24px'}} alt={"sub"} />
                        <Typography variant="sourceHanSans" sx={styles.textStyle5}>{t("reservation.option_input")}</Typography>
                        <Typography variant="sourceHanSans" sx={{width:"10px"}}></Typography>
                        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',maxWidth:'1350px'}}>
                        {
                            !isToggleTop && selectOptionArray.length > 0
                            ?
                             <Tabs
                                variant="scrollable"
                                orientation="horizontal"
                                value={false}
                                scrollButtons="auto"
                                ScrollButtonComponent={MyTabScrollButton2}
                                aria-label="scrollable horizontal tabs example"
                            >
                                {
                                    selectOptionArray.map((item:any,index:number) => {
                                    return (
                                        <Tab
                                            key={index}
                                            className={classes.tab2}
                                            label={
                                                renderOptionText(item)
                                            }
                                        />
                                    )
                                    })
                                }
                            </Tabs>
                            :
                            <Typography variant="sourceHanSans" sx={styles.menuHelpTextStyle}>{t("reservation.option_input_desc2")}</Typography>
                        }
                        </Box>
                    </Box>
                    {
                    !isToggleTop &&
                    <Box sx={styles.commonoOtionSelectOuter}>
                        <Box sx={styles.commonOptionSelectDataWrapper}>
                            <Box sx={styles.commonOptionBreakFastWrapper}>
                                <Box sx={styles.commonOptionBreakFastImageBox}>
                                    <Image src={ICON_MEAL} style={{width:'240px',height:'180px'}} alt={"sub"} />
                                </Box>
                                <Box sx={styles.commonOptionBreakFastTextWrapper}>
                                    <Box sx={styles.commonOptionBreakFastTextPriceBox}>
                                        <Typography variant="sourceHanSans" sx={styles.textBreakfast01}>{t("reservation.room_add_option.breakfast")}</Typography>
                                        <Typography variant="sourceHanSans" sx={styles.textBreakfast02}>20,000{t("common.word.won")}</Typography>
                                        <Typography variant="sourceHanSans" sx={styles.textBreakfast03}>{t("reservation.room_add_option.per_breakfast")}</Typography>
                                    </Box>
                                    <Box sx={styles.commonOptionBreakFastTextDescBox}>
                                        <Image src={ICON_Time} style={{width:'18px',height:'18px'}} alt={"sub"} />
                                        <Typography variant="sourceHanSans" sx={styles.textBreakfast05}>{t("reservation.room_add_option.per_breakfast")}</Typography>
                                    </Box>
                                    <Box sx={styles.commonOptionBreakFastTextDescBox}>
                                        <Image src={ICON_Location} style={{width:'18px',height:'18px'}} alt={"sub"} />
                                        <Typography variant="sourceHanSans" sx={styles.textBreakfast05}>{t("reservation.room_add_option.location")}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={styles.commonOptionBreakFastDaysWrapper}>
                                <Box sx={styles.commonOptionBreakFastDaysTitleBox}>
                                    <Typography variant="sourceHanSans" sx={styles.textStyle6}>
                                    ·{t("reservation.room_add_option.msg_select_day_person")}
                                    </Typography>
                                </Box>
                                <Box sx={styles.commonOptionBreakFastDaysDataBox}>
                                    <Tabs
                                        variant="scrollable"
                                        orientation="horizontal"
                                        value={false}
                                        scrollButtons="auto"
                                        ScrollButtonComponent={MyTabScrollButton}
                                        aria-label="scrollable horizontal tabs example"
                                    >
                                        {
                                            selectDateArray.map((item:any,index:number) => {
                                            return (
                                                <Tab
                                                    key={index}
                                                    className={classes.tab}
                                                    label={
                                                        renderAddMeal(item)
                                                    }
                                                />
                                            )
                                            })
                                        }
                                    </Tabs>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{...styles.commonSelectDevideOuter,backgroundColor:'#e6e6e6'}} />
                        <RoomService 
                            sendData={inputs}
                        />
                    </Box>
                    }
                </Box>
                <Box sx={styles.inputTermWrapper} />
                <Box sx={styles.inputWrapper}>
                    <PopLayerRecipt
                        inputs={inputs}
                        isToggleOpen={isTogglereceipt}
                        onHandleCloseToggle={()=>onHandleClickReceiptToggle()}
                    />
                    <Box sx={styles.inputInsideTitleWrapper}>
                        <Box sx={{...styles.settleWrapper,paddingRight:"15px"}}>
                            <Typography variant="sourceHanSans" sx={styles.settleTextStyle}>
                            {t("reservation.room_settle.total_price")}
                            </Typography>
                            <Typography variant="sourceHanSans" sx={styles.settleTextStyle}>
                            <span>1,000,000</span>
                            </Typography>
                            <Typography variant="sourceHanSans" sx={styles.settleTextStyle}>
                            {t("common.word.won")}
                            </Typography>
                            <Box 
                                sx={styles.toggleButtonWrapper} 
                                onClick={() =>  onHandleClickReceiptToggle()}
                            >
                                {
                                    isTogglereceipt
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
                        <Box sx={styles.settleButtonWrapper}>
                        {
                            roomStep == 1 ?
                            <Box 
                                sx={isCanClcikSend ? styles.inputButtonWrapper : styles.inputButtonWrapper2} 
                                onClick={() =>{
                                    //if ( !isCanClcikSend ) return;
                                    setRoomStepHeader(2);
                                }}
                            >
                                <Typography variant="sourceHanSans" sx={isCanClcikSend ? styles.inputButtonText : styles.inputButtonText2}>
                                    {t("common.navname.reservation")}
                                </Typography>  
                            </Box>
                            :
                            <Box 
                                sx={isCanClcikSend ? styles.inputButtonWrapper : styles.inputButtonWrapper2} 
                                onClick={() =>{
                                    //if ( !isCanClcikSend ) return;
                                setShowPopConfirm({...inputs,isType:'group'});
                                }}
                            >
                                <Typography variant="sourceHanSans" sx={isCanClcikSend ? styles.inputButtonText : styles.inputButtonText2}>
                                    {t("common.navname.reservation")}완료
                                </Typography>  
                            </Box>
                        }
                        </Box>
                    </Box>
                </Box>
            </Box>
            {
                isOpenPopGallery  && (
                    <Box sx={styles.popGalleyWrapper}>
                    <Drawer
                        open={isOpenPopGallery}
                        onClose={() => {setOpenPopGallery(false);}}
                        lockBackgroundScroll={true}
                        enableOverlay={true} //toggle off == flase
                        direction='right'
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
                        <RoomGallery
                            setShowPopDetail={setOpenPopGallery}
                            sendData={sendData}
                        />
                    </Drawer>
                    </Box>
                )
            }
        </NoSsr>
    )
}

export default Reservation;