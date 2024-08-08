import * as React from 'react';
import { useRouter } from "next/router";
import Image from "next/image";
import { Box,TextField, Typography,Tabs,Tab,ButtonBase } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import 'react-modern-drawer/dist/index.css';
import { useTranslation } from 'next-i18next';
import NoSsr from "@mui/material/NoSsr";
import { landscapeState } from "@stores/layoutStore";
import { useWindowSize } from "@utils/useWindowSize";
import { useRecoilState } from "recoil";
import { makeStyles } from "@mui/styles";

import CountrySelect from "components/common/CountrySelect";

import styles from './styles/RoomReservation2';
import functions from '@utils/functions';
import * as mConst from "@utils/constants";
import PopLayerAgree from "./PopLayerAgree";
import PopLayerRecipt from "./PopLayerRecipt";
import KeyboardArrowDownIcon from "@images/reservation/icon_arrow_down.png";
import KeyboardArrowUpIcon from "@images/reservation/icon_arrow_up.png";

import ICON_CARD from "@images/reservation/icon-card.png";
import ICON_KEY from "@images/reservation/icon-pass.png";
import ICON_STEP_04 from "@images/reservation/icon_step4.png";

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';



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

type PopReservationProps = {
    isOpenPopGallery? :boolean;
    isOpenReservationConfirm? :boolean;
    roomStep? : number;
    setShowPopConfirm: (data: any) => void;
    setOpenPopGallery: (data: boolean) => void;
    setRoomStepHeader: (num: number) => void;
}

const PopReservation: React.FC<PopReservationProps> = ({isOpenReservationConfirm,setShowPopConfirm,isOpenPopGallery,setOpenPopGallery,roomStep,setRoomStepHeader}) => {
    const { t } = useTranslation(['common','yakwan']);
    const router = useRouter();
    const classes = useStyles();
    const isAccessDevice =  useWindowSize();
    const { locale } = router;
    // 화면 가로모드 여부 확인  
    const [viewLandscape, setIsLandscape] = useRecoilState(landscapeState);
    const [isShowConfirm, setShowConfirm] = React.useState(isOpenReservationConfirm);
    const [isTogglereceipt, setTogglereceipt] = React.useState(false);
    const [isToggleAgree, setToggleAgree] = React.useState<Number>(0);
    const [isAllAgree, setAllAgree] = React.useState(false);
    const [selectOptionArray, setSelectOptionArray] = React.useState([
        {
            code :1,
            label : "스튜디오",
            reservation_name_first : "",
            reservation_name_second :"",
            reservation_phone_country : {code: 'KR', label: '대한민국', phone: '82'},
            reservation_phone :"",
            reservation_email :"",
            reservation_add_comment :"",
        },
        {
            code :2,
            label : "스튜디오",
            reservation_name_first : "",
            reservation_name_second :"",
            reservation_phone_country : {code: '',label: '',phone: ''},
            reservation_phone :"",
            reservation_email :"",
            reservation_add_comment :""
        },
        {
            code :3,
            label : "스튜디오",
            reservation_name_first : "",
            reservation_name_second :"",
            reservation_phone_country : {code: '',label: '',phone: ''},
            reservation_phone :"",
            reservation_email :"",
            reservation_add_comment :""
        },
        {
            code :4,
            label : "스튜디오",
            reservation_name_first : "",
            reservation_name_second :"",
            reservation_phone_country : {code: '',label: '',phone: ''},
            reservation_phone :"",
            reservation_email :"",
            reservation_add_comment :""
        },
        {
            code :5,
            label : "스튜디오",
            reservation_name_first : "",
            reservation_name_second :"",
            reservation_phone_country : {code: '',label: '',phone: ''},
            reservation_phone :"",
            reservation_email :"",
            reservation_add_comment :""
        },
        {
            code :6,
            label : "스튜디오",
            reservation_name_first : "",
            reservation_name_second :"",
            reservation_phone_country : {code: '',label: '',phone: ''},
            reservation_phone :"",
            reservation_email :"",
            reservation_add_comment :""
        },
    ]);

    React.useEffect(() => {
        console.log("dddd",selectOptionArray)
    }, [selectOptionArray]);


    const [inputs, setInputs] = React.useState({
        reservation_room : '',
        reservation_roomName : '',
        reservation_checkin_date: "",
        reservation_checkout_date: "",
        reservation_room_number : 0,
        reservation_member_count : 0,
        isEachRoom : false,
        eachRoomNo : 0,
        reservation_card_number : "",
        reservation_card_year : "",
        reservation_nonmber_passwrod : "",
        reservation_nonmber_passwrod2 : "",
        agree_1 : false,
        agree_2 : false,
        agree_3 : false,
    });

  
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

        if ( inputs.agree_1 && inputs.agree_2 && inputs.agree_3 ) {
            setAllAgree(true)
        }else{
            setAllAgree(false)
        }
        return ret;
    }, [inputs]);

    const onHandleClickReceiptToggle = () => {
        setTogglereceipt(!isTogglereceipt);
    }

    const HandleOnChange = (e:any,type:string) => {
        setInputs({
            ...inputs,
            [type] : e.target.value.trim()
        })
    }

    const onClickAllAgree = (bool:boolean) => {
        setAllAgree(bool)
        if ( bool ) {
            setInputs({...inputs,agree_1 : true,agree_2 : true,agree_3 : true,})
        }else{
            setInputs({...inputs,agree_1 : false,agree_2 : false,agree_3 : false,})
        }
    }

    const onClickAllAgree2 = (bool:boolean,type :string) => {
        setInputs({...inputs,[type] : bool})
    }
    
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

    const renderOptionText = (item:any,index:number) => {
        return (
            <Box 
                sx={inputs.eachRoomNo == index ? styles.optionTextBoxSelectWrapper : styles.optionTextBoxWrapper} 
                onClick={()=> setInputs({...inputs,eachRoomNo:index})}
            >
                <Typography variant="sourceHanSans" sx={inputs.eachRoomNo == index ? styles.textStyle6Select : styles.textStyle6}>
                    {item.label}
                </Typography>
            </Box>
        )
    }

    return (
        <NoSsr>
            <Box sx={{...styles.wrapper,opacity:isShowConfirm ? 0 : 1}}>
                <Box sx={{...styles.optionSelectWrapper}}>
                    <Box sx={styles.leftOuterWrapper}>
                        <Box sx={styles.leftTopTitleWrapper}>
                            <Image 
                                alt={"sub"}
                                src={ICON_STEP_04}
                                style={{width:'20px',height:'24px'}}
                            />
                            <Typography variant="sourceHanSans" sx={styles.step2TextStyle}>
                                {t("reservation.room_settle.regist_custom_info")}
                            </Typography>
                            <CheckCircleIcon 
                                fontSize="small" sx={{color: inputs.isEachRoom ? '#bb9b6a': '#ccc',marginLeft:"20px",marginRight:'5px',cursor:'pointer'}} 
                                onClick={()=>setInputs({...inputs,isEachRoom:!inputs.isEachRoom,eachRoomNo: !inputs.isEachRoom ? inputs.eachRoomNo : 0})}
                            />
                            <Typography variant="sourceHanSans" sx={styles.step2TextStyle2}>
                            {t("reservation.room_settle.regist_custom_info_msg")}
                            </Typography>
                        </Box>
                        { inputs.isEachRoom && (
                            <Box sx={styles.leftHiddenWrapper}>
                            {
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
                                                    renderOptionText(item,index)
                                                }
                                            />
                                        )
                                        })
                                    }
                                </Tabs>

                            }
                            </Box>
                        )}
                        <Box sx={styles.leftInputWrapper}>
                            <Box sx={styles.leftInputCommonTitleWrapper}>
                                <Typography variant="sourceHanSans" sx={styles.inputTitleTextStyle}>
                                {t("reservation.room_settle.regist_custom_name")} <span>*</span>
                                </Typography>
                            </Box>
                            <Box sx={styles.leftInputCommonTitleWrapper2}>
                                <Box
                                    component="form"
                                    sx={{flex:1, padding:'5px 0','& .MuiTextField-root': {  width: '98%' } }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField
                                        required
                                        size="small"
                                        value={selectOptionArray[inputs.eachRoomNo].reservation_name_first}
                                        id="reservation_name_first"
                                        label={t("reservation.room_settle.regist_custom_first_name")}
                                        onChange={(e) => {
                                            let copiedItems = [...selectOptionArray];
                                            copiedItems[inputs.eachRoomNo].reservation_name_first = e.target.value.trim();
                                            setSelectOptionArray(copiedItems)
                                        }}
                                        placeholder={t("reservation.room_settle.regist_custom_first_name")}
                                    />
                                </Box>
                                <Box
                                    component="form"
                                    sx={{flex:1,padding:'5px 0','& .MuiTextField-root': {  width: '98%' },}}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField
                                        required
                                        size="small"
                                        id="reservation_name_second"
                                        value={selectOptionArray[inputs.eachRoomNo].reservation_name_second}
                                        label={t("reservation.room_settle.regist_custom_second_name")}
                                        onChange={(e) => {
                                            let copiedItems = [...selectOptionArray];
                                            copiedItems[inputs.eachRoomNo].reservation_name_second = e.target.value.trim();
                                            setSelectOptionArray(copiedItems)
                                        }}
                                        placeholder={t("reservation.room_settle.regist_custom_second_name")}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={styles.leftInputCommonTitleWrapper3}>
                            <Box sx={styles.leftInputCommonLeftTitleWrapper}>
                                <Typography variant="sourceHanSans" sx={styles.inputTitleTextStyle}>
                                    {t("reservation.room_settle.regist_custom_phone")} <span>*</span>
                                </Typography>
                            </Box>
                            <Box sx={styles.leftInputCommonRightTitleWrapper}>
                                <Box
                                    component="form"
                                    sx={{flex:1,padding:'5px 0','& .MuiTextField-root': {  width: '98%' },}}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <CountrySelect
                                        defaultVal={selectOptionArray[inputs.eachRoomNo].reservation_phone_country}
                                        onHandleChange={(e) => {
                                            let copiedItems = [...selectOptionArray];
                                            copiedItems[inputs.eachRoomNo].reservation_phone_country = e as any;
                                            setSelectOptionArray(copiedItems)
                                        }}
                                    />
                                    {/* <FormControl sx={{width: "98%"}} size="small">
                                        <InputLabel id="demo-select-small-label">{t("reservation.room_settle.regist_custom_phone_country")}</InputLabel>
                                        <Select
                                            labelId="demo-select-small-label"
                                            id="demo-select-small"
                                            value={selectOptionArray[inputs.eachRoomNo].reservation_phone_country}
                                            label={t("reservation.room_settle.regist_custom_phone_country")}
                                            onChange={(e) => {
                                                let copiedItems = [...selectOptionArray];
                                                copiedItems[inputs.eachRoomNo].reservation_phone_country = e.target.value as any;
                                                setSelectOptionArray(copiedItems)
                                            }}
                                        >
                                            {
                                                mConst.nationPhoneCode.map((element:any,index:number)=> {
                                                    return (
                                                        <MenuItem value={element.code} key={index}>{element.label}</MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </FormControl> */}
                                </Box>
                                <Box
                                    component="form"
                                    sx={{flex:1,padding:'5px 0', '& .MuiTextField-root': {  width: '98%' },}}
                                    noValidate
                                    autoComplete="off"
                                >
                                   <TextField
                                        required
                                        type='number'
                                        value={selectOptionArray[inputs.eachRoomNo].reservation_phone}
                                        size="small"
                                        id="reservation_phone"
                                        //label={t("reservation.user_phone")}
                                        placeholder={t('reservation.user_phone_helptext')}
                                        onChange={(e) => {
                                            let copiedItems = [...selectOptionArray];
                                            copiedItems[inputs.eachRoomNo].reservation_phone = e.target.value as any;
                                            setSelectOptionArray(copiedItems)
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={styles.leftInputCommonTitleWrapper4}>
                            <Box sx={styles.leftInputCommonLeftTitleWrapper}>
                                <Typography variant="sourceHanSans" sx={styles.inputTitleTextStyle}>
                                {t("reservation.room_settle.regist_custom_email")} <span>*</span>
                                </Typography>
                            </Box>
                            <Box sx={styles.leftInputCommonRightTitleWrapper}>
                                <Box
                                    component="form"
                                    sx={{width: '99%',padding:'5px 0', '& .MuiTextField-root': {  width: '99%' }, }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField
                                        required
                                        size="small"
                                        id="reservation_email"
                                        value={selectOptionArray[inputs.eachRoomNo].reservation_email}
                                        name="reservation_email"
                                        autoComplete="email"
                                        placeholder={t("reservation.user_email")}
                                        onChange={(e) => {
                                            let copiedItems = [...selectOptionArray];
                                            copiedItems[inputs.eachRoomNo].reservation_email = e.target.value.trim();
                                            setSelectOptionArray(copiedItems)
                                        }}
                                        //helperText={inputs?.reservation_email?.length > 0 ? "정확한 이메일 주소를 입력해 주세요." : ""}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={styles.leftInputCommonTitleWrapper5}>
                            <Box sx={styles.leftInputCommonLeftTitleWrapper}>
                                <Typography variant="sourceHanSans" sx={styles.inputTitleTextStyle}>
                                {t("reservation.room_settle.regist_custom_add_servie")}
                                </Typography>
                            </Box>
                            <Box sx={styles.leftInputCommonRightTitleWrapper}>
                                <Box
                                    component="form"
                                    sx={{width:'99%',height:"120px",padding:'5px 0', '& .MuiTextField-root': {  width: '99%',height:"120px", },}}
                                >
                                    <TextField
                                        id="reservation_add_comment"
                                        label=""
                                        multiline
                                        rows={3}
                                        value={selectOptionArray[inputs.eachRoomNo].reservation_add_comment}
                                        onChange={(e) => {
                                            let copiedItems = [...selectOptionArray];
                                            copiedItems[inputs.eachRoomNo].reservation_add_comment = e.target.value;
                                            setSelectOptionArray(copiedItems)
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>    
                    <Box sx={styles.rightOuterWrapper}>
                        <Box sx={styles.leftTopTitleWrapper}>
                            <Image 
                                alt={"sub"}
                                src={ICON_CARD}
                                style={{width:'22px',height:'24px'}}
                            />
                            <Typography variant="sourceHanSans" sx={styles.step2TextStyle}>
                            {t("reservation.room_settle.regist_custom_settle_info")}
                            </Typography>
                        </Box>
                        <Box sx={styles.rightSetlteWrapper}>
                            <Box sx={styles.rightSetlteBox1}>
                                <Box sx={styles.leftInputCommonLeftTitleWrapper}>
                                    <Typography variant="sourceHanSans" sx={styles.inputTitleTextStyle}>{t("reservation.room_settle.regist_custom_card_no")} <span>*</span></Typography>
                                </Box>
                                <Box sx={styles.leftInputCommonRightTitleWrapper}>
                                    <Box
                                        component="form"
                                        sx={{width: '100%',padding:'5px 0', '& .MuiTextField-root': {  width: '100%' }, }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <TextField
                                            size="small"
                                            id="reservation_card_number"
                                            label={"0000-0000-0000-0000"}
                                            name="reservation_card_number"
                                            value={functions.cardFormat(inputs.reservation_card_number)}
                                            placeholder={"0000-0000-0000-0000"}
                                            onChange={(e) => HandleOnChange(e,'reservation_card_number')}
                                            //helperText={inputs?.reservation_email?.length > 0 ? "정확한 이메일 주소를 입력해 주세요." : ""}
                                        />
                                    </Box>
                                </Box>  
                            </Box>
                            <Box sx={styles.rightSetlteBox2}>
                                <Box sx={styles.leftInputCommonLeftTitleWrapper}>
                                    <Typography variant="sourceHanSans" sx={styles.inputTitleTextStyle}>
                                        {t("reservation.room_settle.regist_custom_card_limit")} <span>*</span>
                                    </Typography>
                                </Box>
                                <Box sx={styles.leftInputCommonRightTitleWrapper}>
                                    <Box
                                        component="form"
                                        sx={{width: '100%',padding:'5px 0', '& .MuiTextField-root': {  width: '100%' }, }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <TextField
                                            size="small"
                                            id="reservation_card_year"
                                            label={"MM/YY"}
                                            name="reservation_card_year"
                                            value={functions.cardLimitYearFormat(inputs.reservation_card_year)}
                                            placeholder={"MM/YY"}
                                            onChange={(e) => HandleOnChange(e,'reservation_card_year')}
                                            //helperText={inputs?.reservation_email?.length > 0 ? "정확한 이메일 주소를 입력해 주세요." : ""}
                                        />
                                    </Box>
                                </Box>  
                            </Box>
                        </Box>
                        <Box sx={styles.rightSetlteHelpWrapper}>
                            <Typography variant="sourceHanSans" sx={styles.inputInfoTextStyle}>
                            {t("reservation.room_settle.regist_custom_cancel_rule_msg")}
                            </Typography>
                        </Box>
                        <Box sx={styles.leftTopTitleWrapper2}>
                            <Image 
                                alt={"sub"}
                                src={ICON_KEY}
                                style={{width:'16px',height:'24px'}}
                            />
                            <Typography variant="sourceHanSans" sx={styles.step2TextStyle}>
                                {t("reservation.room_settle.regist_custom_settle_password",{ foreword: t("reservation.room_settle.regist_custom_settle_search") + " ",aftreword: ""})}
                            </Typography>
                        </Box>
                        <Box sx={styles.rightSetlteWrapper}>
                            <Box sx={styles.rightSetlteBox1}>
                                <Box sx={styles.leftInputCommonLeftTitleWrapper}>
                                    <Typography variant="sourceHanSans" sx={styles.inputTitleTextStyle}>
                                    {t("reservation.room_settle.regist_custom_settle_password",{ foreword: "",aftreword: ""})} <span>*</span>
                                    </Typography>
                                </Box>
                                <Box sx={styles.leftInputCommonRightTitleWrapper}>
                                    <Box
                                        component="form"
                                        sx={{width: '100%',padding:'5px 0', '& .MuiTextField-root': {  width: '100%' }, }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <TextField
                                            type='password'
                                            size="small"
                                            id="reservation_nonmber_passwrod"
                                            label={""}
                                            name="reservation_nonmber_passwrod"
                                            value={inputs.reservation_nonmber_passwrod}
                                            placeholder={t("reservation.room_settle.regist_custom_settle_password_msg")}
                                            onChange={(e) => HandleOnChange(e,'reservation_nonmber_passwrod')}
                                            //helperText={inputs?.reservation_email?.length > 0 ? "정확한 이메일 주소를 입력해 주세요." : ""}
                                        />
                                    </Box>
                                </Box>  
                            </Box>
                            <Box sx={styles.rightSetlteBox1}>
                                <Box sx={styles.leftInputCommonLeftTitleWrapper}>
                                    <Typography variant="sourceHanSans" sx={styles.inputTitleTextStyle}>
                                    {t("reservation.room_settle.regist_custom_settle_password",{ foreword: "",aftreword: ""})} {t("reservation.room_settle.regist_custom_settle_confirm")}<span>*</span>
                                    </Typography>
                                </Box>
                                <Box sx={styles.leftInputCommonRightTitleWrapper}>
                                    <Box
                                        component="form"
                                        sx={{width: '100%',padding:'5px 0', '& .MuiTextField-root': {  width: '100%' }, }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <TextField
                                            type='password'
                                            size="small"
                                            id="reservation_nonmber_passwrod2"
                                            label={""}
                                            name="reservation_nonmber_passwrod2"
                                            value={inputs.reservation_nonmber_passwrod2}
                                            placeholder={t("reservation.room_settle.regist_custom_settle_confirm_msg")}
                                            onChange={(e) => HandleOnChange(e,'reservation_nonmber_passwrod2')}
                                            //helperText={inputs?.reservation_email?.length > 0 ? "정확한 이메일 주소를 입력해 주세요." : ""}
                                        />
                                    </Box>
                                </Box>  
                            </Box>
                        </Box>
                        
                        <Box sx={{...styles.rightFixedWrapper,height: locale == 'en' ? '230px' :'180px'}}>
                            <Box sx={styles.fixedLeftWrapper}>
                                <Box sx={styles.fixedLeftTtileWrapper}>
                                    <Typography variant="sourceHanSans" sx={styles.inputInfoTextStyle2}>
                                    {t("reservation.room_settle.regist_custom_cancel_rule")}
                                    </Typography>
                                </Box>
                                <Box sx={styles.fixedLeftDataWrapper}>
                                    <Box sx={styles.fixedLeftLeftWrapper}>
                                        <Typography variant="sourceHanSans" sx={styles.inputInfoTextStyle3}>
                                            ·{t("reservation.room_settle.regist_custom_cancle_eight")}
                                        </Typography>
                                    </Box>
                                    <Box sx={styles.fixedLeftRightWrapper}>
                                        <Typography variant="sourceHanSans" sx={styles.inputInfoTextStyle4}>
                                        {t("reservation.room_settle.regist_custom_penalty_no")}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={styles.fixedLeftDataWrapper}>
                                    <Box sx={styles.fixedLeftLeftWrapper}>
                                        <Typography variant="sourceHanSans" sx={styles.inputInfoTextStyle3}>
                                            ·{t("reservation.room_settle.regist_custom_cancle_three")}
                                        </Typography>
                                    </Box>
                                    <Box sx={styles.fixedLeftRightWrapper}>
                                        <Typography variant="sourceHanSans" sx={styles.inputInfoTextStyle4}>
                                        {t("reservation.room_settle.regist_custom_penalty_30")}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={styles.fixedLeftDataWrapper}>
                                    <Box sx={styles.fixedLeftLeftWrapper}>
                                        <Typography variant="sourceHanSans" sx={styles.inputInfoTextStyle3}>
                                            ·{t("reservation.room_settle.regist_custom_cancle_two")}
                                        </Typography>
                                    </Box>
                                    <Box sx={styles.fixedLeftRightWrapper}>
                                        <Typography variant="sourceHanSans" sx={styles.inputInfoTextStyle4}>
                                        {t("reservation.room_settle.regist_custom_penalty_100")}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={styles.fixedRightWrapper}>
                                <Box sx={styles.fixedRightTtileWrapper}>
                                    <CheckCircleIcon 
                                        fontSize="small" sx={{color: isAllAgree ? '#bb9b6a': '#ccc',marginRight:'5px',cursor:'pointer'}} 
                                        onClick={()=>onClickAllAgree(!isAllAgree)}
                                    />
                                    <Typography variant="sourceHanSans" sx={styles.inputInfoTextStyle2}>
                                    {t("reservation.room_settle.regist_custom_agree_all")}
                                    </Typography>
                                </Box>
                                <Box sx={styles.fixedLeftDataWrapper}>
                                    <Box sx={styles.fixedRightLeftWrapper}>
                                        <CheckCircleIcon 
                                            fontSize="small" sx={{color:  inputs.agree_1 ? '#bb9b6a': '#ccc',marginRight:'5px',cursor:'pointer'}} 
                                            onClick={()=>onClickAllAgree2(!inputs.agree_1,'agree_1')}
                                        />
                                        <Typography variant="sourceHanSans" sx={styles.inputInfoTextStyle3}>
                                        {t("reservation.room_settle.regist_custom_agree_1")}{t("reservation.room_settle.regist_custom_must")}
                                        </Typography>
                                    </Box>
                                    <Box sx={styles.fixedRightRightWrapper} onClick={()=>setToggleAgree(1)}>
                                        <Typography variant="sourceHanSans" sx={styles.inputInfoTextStyle5}>
                                        {t("reservation.room_settle.regist_custom_read_view")}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={styles.fixedLeftDataWrapper}>
                                    <Box sx={styles.fixedRightLeftWrapper}>
                                        <CheckCircleIcon 
                                            fontSize="small" sx={{color:  inputs.agree_2 ? '#bb9b6a': '#ccc',marginRight:'5px',cursor:'pointer'}} 
                                            onClick={()=>onClickAllAgree2(!inputs.agree_2,'agree_2')}
                                        />
                                        <Typography variant="sourceHanSans" sx={styles.inputInfoTextStyle3}>
                                        {t("reservation.room_settle.regist_custom_agree_2")}{t("reservation.room_settle.regist_custom_must")}
                                        </Typography>
                                    </Box>
                                    <Box sx={styles.fixedRightRightWrapper} onClick={()=>setToggleAgree(2)}>
                                        <Typography variant="sourceHanSans" sx={styles.inputInfoTextStyle5}>
                                        {t("reservation.room_settle.regist_custom_read_view")}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={styles.fixedLeftDataWrapper}>
                                    <Box sx={styles.fixedRightLeftWrapper}>
                                        <CheckCircleIcon 
                                            fontSize="small" sx={{color:  inputs.agree_3 ? '#bb9b6a': '#ccc',marginRight:'5px',cursor:'pointer'}} 
                                            onClick={()=>onClickAllAgree2(!inputs.agree_3,'agree_3')}
                                        />
                                        <Typography variant="sourceHanSans" sx={styles.inputInfoTextStyle3}>
                                        {t("reservation.room_settle.regist_custom_agree_3")}{t("reservation.room_settle.regist_custom_must")}
                                        </Typography>
                                    </Box>
                                    <Box sx={styles.fixedRightRightWrapper}  onClick={()=>setToggleAgree(3)}>
                                        <Typography variant="sourceHanSans" sx={styles.inputInfoTextStyle5}>
                                        {t("reservation.room_settle.regist_custom_read_view")}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <PopLayerAgree
                        inputs={inputs}
                        isToggleOpen={isToggleAgree}
                        onHandleCloseToggle={()=>setToggleAgree(0)}
                    />
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
                            <Box sx={styles.toggleButtonWrapper} onClick={() => onHandleClickReceiptToggle()}>
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
                            roomStep == 2 ?
                            <Box 
                                sx={isCanClcikSend ? styles.inputButtonWrapper : styles.inputButtonWrapper2} 
                                onClick={() =>{
                                    //if ( !isCanClcikSend ) return;
                                    setRoomStepHeader(3);
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
        </NoSsr>
    )
}

export default PopReservation;