import * as React from 'react';
import { useRouter } from "next/router";
import Image from "next/image";
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from 'next-i18next';
import NoSsr from "@mui/material/NoSsr";
import Divider from '@mui/material/Divider';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useRecoilState } from 'recoil';
import { landscapeState,globalOpenReservation } from "@stores/layoutStore";
import { useWindowSize } from "@utils/useWindowSize";

import ICOM_TABLE_1 from "@images/banquet/table_1.png";
import ICOM_TABLE_2 from "@images/banquet/table_2.png";
import ICOM_TABLE_3 from "@images/banquet/table_3.png";
import ICOM_TABLE_4 from "@images/banquet/table_4.png";
import ICOM_OPTION_1 from "@images/banquet/option_1.png";
import ICOM_OPTION_2 from "@images/banquet/option_2.png";
import ICOM_OPTION_3 from "@images/banquet/option_3.png";
import ICOM_OPTION_4 from "@images/banquet/option_4.png";
import ICOM_OPTION_5 from "@images/banquet/option_5.png";
import ICOM_OPTION_6 from "@images/banquet/option_6.png";
import ICOM_OPTION_7 from "@images/banquet/option_7.png";
import ICOM_OPTION_8 from "@images/banquet/option_8.png";
import ICOM_OPTION_9 from "@images/banquet/option_9.png";
import ICOM_OPTION_10 from "@images/banquet/option_10.png";
import ICOM_OPTION_11 from "@images/banquet/option_11.png";
import ICOM_OPTION_12 from "@images/banquet/option_12.png";
import ICOM_OPTION_13 from "@images/banquet/option_13.png";
import ICOM_OPTION_14 from "@images/banquet/option_14.png";
import SAMPLE_IMG from "@images/banquet/sample_event.png";
import ICON_POPUP_CLOSE from "@icons/popup-close.png";

import ICON_ROOM_SERVICE_01 from "@images/rooms/room_service_01.png";
import ICON_ROOM_SERVICE_02 from "@images/rooms/room_service_02.png";
import ICON_ROOM_SERVICE_03 from "@images/rooms/room_service_03.png";
import ICON_ROOM_SERVICE_04 from "@images/rooms/room_service_04.png";
import ICON_ROOM_SERVICE_05 from "@images/rooms/room_service_05.png";
import ICON_ROOM_SERVICE_06 from "@images/rooms/room_service_06.png";
import ICON_ROOM_SERVICE_07 from "@images/rooms/room_service_07.png";
import ICON_ROOM_SERVICE_08 from "@images/rooms/room_service_08.png";

import ICON_ROOM_AMENITY_01 from "@images/rooms/room_amenity_01.png";
import ICON_ROOM_AMENITY_02 from "@images/rooms/room_amenity_02.png";
import ICON_ROOM_AMENITY_03 from "@images/rooms/room_amenity_03.png";
import ICON_ROOM_AMENITY_04 from "@images/rooms/room_amenity_04.png";
import ICON_ROOM_AMENITY_05 from "@images/rooms/room_amenity_05.png";
import ICON_ROOM_AMENITY_06 from "@images/rooms/room_amenity_06.png";
import ICON_ROOM_AMENITY_07 from "@images/rooms/room_amenity_07.png";
import ICON_ROOM_AMENITY_08 from "@images/rooms/room_amenity_08.png";

import IconInfo from "@images/sungwonjung/icon-sub-quick-info-on.png";
import IconEvent from "@images/sungwonjung/icon-sub-quick-event-on.png";
import IconReservation from "@images/sungwonjung/icon-sub-quick-reservation-on.png";

import SmallIconCall from "@images/sungwonjung/small-icon-call.png";
import SmallIconDate from "@images/sungwonjung/small-icon-date.png";
import SmallIconLocation from "@images/sungwonjung/small-icon-location.png";
import SmallIconMember from "@images/sungwonjung/small-icon-member.png";

import MenuSample01 from "@images/sungwonjung/menu-sample1.png";
import MenuSample02 from "@images/sungwonjung/menu-sample2.png";

type PopupQuickPopupProps = {
    activeIndex? : any,
    isAccess? : any,
    setShowPopDetail: (open: number) => void;
}

type tabComonnProps = {
    t? : any
}

const QuickPopup: React.FC<PopupQuickPopupProps> = ({ activeIndex, isAccess, setShowPopDetail}) => {
    const router = useRouter();
    const { t } = useTranslation(['common','yakwan']);
    const isAccessDevice =  useWindowSize();
    const [isOpenReservation, setOpenReservation] = useRecoilState(globalOpenReservation);
    // 화면 가로모드 여부 확인
    const [viewLandscape, setIsLandscape] = useRecoilState(landscapeState);
    const [value, setValue] = React.useState(0);
    const [activeStep, setActiveStep] = React.useState(0);
    

    React.useEffect(() => {
        setValue(activeIndex-1)
    }, [activeIndex]);
    
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        if ( newValue == 2 ) {
            ///router.push({pathname : "reservation",query:{menu : 'fandb'}});
            
            if ( isAccess == 'sungwonjung') {
                setShowPopDetail(9);
                setOpenReservation(1);
            }else if ( isAccess == 'banquet') {
                setShowPopDetail(9);
                setOpenReservation(2);
            }else if ( isAccess == 'rooms') {
                setShowPopDetail(9);
                setOpenReservation(3);
            }else{
            
            }
            return;
        }
        if ( newValue != value ) {
            setValue(newValue);
            setActiveStep(0);
        }
    };

    const renderMenuText = () => {
        if ( isAccess == 'sungwonjung') {
          return t("sub.quickmenu.sungwonjung");
        }else if ( isAccess == 'banquet') {
          return t("sub.quickmenu.banquet");
        }else{
          return t("sub.quickmenu.room");
        }
      }

    return (
        <NoSsr>
            <Box sx={styles.contentWrapper}>
                <Box 
                    sx={styles.closeBoxWrap}
                    onClick={() => setShowPopDetail(9)}
                >
                    <Image 
                        alt={"sub"}
                        src={ICON_POPUP_CLOSE}
                        style={{width:'20px',height:'20px'}}
                    />
                </Box>
                <Box sx={styles.popupDataWrap}>
                    <Tabs 
                        value={value} 
                        onChange={handleChange} 
                        aria-label="icon label tabs example"
                        variant="fullWidth"
                        TabIndicatorProps={{
                            style: { background: "#f84040",}
                        }} // indicator color
                        style={{height: "80px",borderBottomWidth: 1, borderBottomColor: '#ccc' }}
                    >
                        <Tab icon={<Image src={IconInfo}  alt="slide" style={{width:'25px',objectFit: 'contain'}} /> } label={renderMenuText()} />
                        <Tab icon={<Image src={IconEvent}  alt="slide" style={{width:'25px',objectFit: 'contain'}} />} label={t("sub.quickmenu.event")} />
                        <Tab icon={<Image src={IconReservation}  alt="slide" style={{width:'25px',objectFit: 'contain'}} />} label={t("sub.quickmenu.reservation")}/>
                    </Tabs>
                    {
                        ( value == 0 && isAccess == "banquet" ) 
                        ?
                         <Tab_1_Screen 
                            t={t}
                        />
                        :
                        ( value == 0 && isAccess == "sungwonjung" )
                        ?
                        <Tab_1_Screen2 
                            t={t} 
                        />
                        :
                        ( value == 0 && isAccess == "rooms" )
                        ?
                        <Tab_1_Screen3 
                            t={t}
                        />
                        :
                        <Tab_2_Screen 
                            t={t}
                        />
                    }
                </Box>
            </Box>
        </NoSsr>
    )
}

const myArray = new Array(1, 2, 3, 4,5);

export const Tab_2_Screen :React.FC<tabComonnProps> = ({t}) => {
    return  (
        <Box sx={styles.tabsWrapper}>
            <Divider textAlign="left"><Typography sx={styles.popupSubTitle}>진행중 이벤트</Typography></Divider>
            <Box sx={styles.eventOuterWrap}>
                {   myArray.map((item:any,index:number) => {
                        return (
                            <Box sx={styles.eventWrapper} key={index}>
                                <Image 
                                    src={SAMPLE_IMG}  
                                    alt="table" 
                                    style={{width:'100%',height:'100%',objectFit: 'contain',marginBottom:'5px'}}
                                />
                                <Typography sx={styles.helpText2}>이벤트이벤트이벤트이벤트이벤트이벤트이벤트이벤트이벤트이벤트</Typography>
                                <Typography sx={styles.helpText2_2}>2024.01.01 ~ 2024.12.31</Typography>
                            </Box>
                        )
                    })
                }
            </Box>
            <Divider textAlign="left"><Typography sx={styles.popupSubTitle}>완료 이벤트</Typography></Divider>
            <Box sx={styles.eventOuterWrap}>
                {   myArray.map((item:any,index:number) => {
                        return (
                            <Box sx={styles.eventWrapper} key={index}>
                                <Image 
                                    src={SAMPLE_IMG}  
                                    alt="table" 
                                    style={{width:'100%',height:'100%',objectFit: 'contain',marginBottom:'5px'}}
                                />
                                <Typography sx={styles.helpText2}>이벤트이벤트이벤트이벤트이벤트이벤트이벤트이벤트이벤트이벤트</Typography>
                                <Typography sx={styles.helpText2_2}>2024.01.01 ~ 2024.12.31</Typography>
                            </Box>
                        )
                    })
                }
            </Box>
        </Box>
    )
}

export const Tab_1_Screen :React.FC<tabComonnProps> = ({t}) => {
    return  (
        <Box sx={styles.tabsWrapper}>
            <Divider textAlign="left">
                <Typography sx={styles.popupSubTitle}>{t("reservation.gropu_part_title.gropu_menu_rent_price")}</Typography>
            </Divider>
            <Box sx={styles.miniWrapper2}>
                <Typography sx={{...styles.popupTitle,fontSize:'1.2em',color:'#f84040'}}>{t("reservation.gropu_part_title.gropu_menu_rent_price_add")} 500,000{t("common.word.won")}</Typography>
                <Typography sx={{...styles.popupSubTitle,color:'#b2b2b2',paddingLeft:"5px"}}>(* {t("reservation.gropu_part_title.gropu_menu_rent_price_add2")} ) </Typography>
            </Box>
            <Divider textAlign="left"><Typography sx={styles.popupSubTitle}>{t("reservation.gropu_part_title.gropu_menu_entry_max")}</Typography></Divider>
            <Box sx={styles.miniWrapper}>
                <Box sx={styles.tableWrapper}>
                    <Image 
                        src={ICOM_TABLE_1}  
                        alt="table" 
                        style={{width:'50px', height:'40px',objectFit: 'contain',marginBottom:'5px'}}
                    />
                    <Typography sx={styles.helpText}>Circle</Typography>
                    <Typography sx={styles.helpText}>110{t("reservation.gropu_part_title.gropu_menu_seat")}</Typography>
                </Box>
                <Box sx={styles.tableWrapper}>
                    <Image 
                        src={ICOM_TABLE_2}  
                        alt="table" 
                        style={{width:'50px', height:'40px',objectFit: 'contain',marginBottom:'5px'}}
                    />
                    <Typography sx={styles.helpText}>Theather</Typography>
                    <Typography sx={styles.helpText}>110{t("reservation.gropu_part_title.gropu_menu_seat")}</Typography>
                </Box>
                <Box sx={styles.tableWrapper}>
                    <Image 
                        src={ICOM_TABLE_3}  
                        alt="table" 
                        style={{ width:'auto', height:'40px',objectFit: 'contain',marginBottom:'5px'}}
                    />
                    <Typography sx={styles.helpText}>U Shape</Typography>
                    <Typography sx={styles.helpText}>110{t("reservation.gropu_part_title.gropu_menu_seat")}</Typography>
                </Box>
                <Box sx={styles.tableWrapper}>
                    <Image 
                        src={ICOM_TABLE_4}  
                        alt="table" 
                        style={{ width:'auto', height:'40px',objectFit: 'contain',marginBottom:'5px'}}
                    />
                    <Typography sx={styles.helpText}>Classroom</Typography>
                    <Typography sx={styles.helpText}>110{t("reservation.gropu_part_title.gropu_menu_seat")}</Typography>
                </Box>
            </Box>
            <Divider textAlign="left"><Typography sx={styles.popupSubTitle}>{t("reservation.gropu_part_title.gropu_menu_option_free")}</Typography></Divider>
            <Box sx={styles.miniWrapper2}>
                <Box sx={styles.tableWrapper}>
                    <Image 
                        src={ICOM_OPTION_1}  
                        alt="table" 
                        style={{width:'50px', height:'40px',objectFit: 'contain',marginBottom:'5px'}}
                    />
                    <Typography sx={styles.helpText2}>{t("reservation.gropu_default_option.screen")}</Typography>
                </Box>
                <Box sx={styles.tableWrapper}>
                    <Image 
                        src={ICOM_OPTION_2}  
                        alt="table" 
                        style={{width:'50px', height:'40px',objectFit: 'contain',marginBottom:'5px'}}
                    />
                    <Typography sx={styles.helpText2}>{t("reservation.gropu_default_option.projector")}</Typography>
                </Box>
                <Box sx={styles.tableWrapper}>
                    <Image 
                        src={ICOM_OPTION_3}  
                        alt="table" 
                        style={{width:'50px', height:'40px',objectFit: 'contain',marginBottom:'5px'}}
                    />
                    <Typography sx={styles.helpText2}>{t("reservation.gropu_default_option.wireless_mike")}</Typography>
                </Box>
                <Box sx={styles.tableWrapper}>
                    <Image 
                        src={ICOM_OPTION_4}  
                        alt="table" 
                        style={{width:'50px', height:'40px',objectFit: 'contain',marginBottom:'5px'}}
                    />
                    <Typography sx={styles.helpText2}>{t("reservation.gropu_default_option.screen")}</Typography>
                </Box>
                <Box sx={styles.tableWrapper}>
                    <Image 
                        src={ICOM_OPTION_5}  
                        alt="table" 
                        style={{width:'50px', height:'40px',objectFit: 'contain',marginBottom:'5px'}}
                    />
                    <Typography sx={styles.helpText2}>{t("reservation.gropu_default_option.pin_mike")}</Typography>
                </Box>
                <Box sx={styles.tableWrapper}>
                    <Image 
                        src={ICOM_OPTION_6}  
                        alt="table" 
                        style={{width:'50px', height:'40px',objectFit: 'contain',marginBottom:'5px'}}
                    />
                    <Typography sx={styles.helpText2}>{t("reservation.gropu_default_option.phase")}</Typography>
                </Box>
                <Box sx={styles.tableWrapper}>
                    <Image 
                        src={ICOM_OPTION_7}  
                        alt="table" 
                        style={{width:'50px', height:'40px',objectFit: 'contain',marginBottom:'5px'}}
                    />
                    <Typography sx={styles.helpText2}>{t("reservation.gropu_default_option.banner")}</Typography>
                </Box>
                <Box sx={styles.tableWrapper}>
                    <Image 
                        src={ICOM_OPTION_8}  
                        alt="table" 
                        style={{width:'50px', height:'40px',objectFit: 'contain',marginBottom:'5px'}}
                    />
                    <Typography sx={styles.helpText2}>{t("reservation.gropu_default_option.blind")}</Typography>
                </Box>
                <Box sx={styles.tableWrapper}>
                    <Image 
                        src={ICOM_OPTION_9}  
                        alt="table" 
                        style={{width:'50px', height:'40px',objectFit: 'contain',marginBottom:'5px'}}
                    />
                    <Typography sx={styles.helpText2}>{t("reservation.gropu_default_option.partition")}</Typography>
                </Box>
                <Box sx={styles.tableWrapper}>
                    <Image 
                        src={ICOM_OPTION_10}  
                        alt="table" 
                        style={{width:'50px', height:'40px',objectFit: 'contain',marginBottom:'5px'}}
                    />
                    <Typography sx={styles.helpText2}>{t("reservation.gropu_default_option.hanger")}</Typography>
                </Box>
            </Box>
            <Divider textAlign="left"><Typography sx={styles.popupSubTitle}>{t("reservation.gropu_part_title.gropu_menu_option_non_free")}</Typography></Divider>
            <Box sx={styles.miniWrapper2}>
                <Box sx={styles.tableWrapper}>
                    <Image 
                        src={ICOM_OPTION_11}  
                        alt="table" 
                        style={{width:'50px', height:'40px',objectFit: 'contain',marginBottom:'5px'}}
                    />
                    <Typography sx={styles.helpText2}>{t("reservation.gropu_add_option.karaoke")}</Typography>
                    <Typography sx={styles.helpText2_2}>{t("reservation.gropu_add_option.karaoke_price")}</Typography>
                </Box>
                <Box sx={styles.tableWrapper}>
                    <Image 
                        src={ICOM_OPTION_12}  
                        alt="table" 
                        style={{width:'50px', height:'40px',objectFit: 'contain',marginBottom:'5px'}}
                    />
                    <Typography sx={styles.helpText2}>{t("reservation.gropu_add_option.amp")}</Typography>
                    <Typography sx={styles.helpText2_2}>{t("reservation.gropu_add_option.amp_price")}</Typography>
                </Box>
                <Box sx={styles.tableWrapper}>
                    <Image 
                        src={ICOM_OPTION_13}  
                        alt="table" 
                        style={{width:'50px', height:'40px',objectFit: 'contain',marginBottom:'5px'}}
                    />
                    <Typography sx={styles.helpText2}>{t("reservation.gropu_add_option.television")}</Typography>
                    <Typography sx={styles.helpText2_2}>{t("reservation.gropu_add_option.television_price")}</Typography>
                </Box>
                <Box sx={styles.tableWrapper}>
                    <Image 
                        src={ICOM_OPTION_14}  
                        alt="table" 
                        style={{width:'50px', height:'40px',objectFit: 'contain',marginBottom:'5px'}}
                    />
                    <Typography sx={styles.helpText2}>{t("reservation.gropu_add_option.meal")}</Typography>
                    <Typography sx={styles.helpText2_2}>{t("reservation.gropu_add_option.meal_price")}</Typography>
                </Box>
            </Box>
            <Divider textAlign="left"><Typography sx={styles.popupSubTitle}>{t("reservation.gropu_part_title.gropu_menu_list")}</Typography></Divider>
            <Box sx={styles.miniWrapper2}>
                <Box sx={styles.typeWrapper}>
                    <Typography sx={styles.helpText}>{t("reservation.gropu_part_title.gropu_menu_type")} A</Typography>
                    <Typography sx={styles.helpTextRed}>40,000{t("common.word.won")}</Typography>
                </Box>
                <Box sx={styles.typeWrapper}>
                    <Typography sx={styles.helpText}>{t("reservation.gropu_part_title.gropu_menu_type")} B</Typography>
                    <Typography sx={styles.helpTextRed}>50,000{t("common.word.won")}</Typography>
                </Box>
                <Box sx={styles.typeWrapper}>
                    <Typography sx={styles.helpText}>{t("reservation.gropu_part_title.gropu_menu_type")} C</Typography>
                    <Typography sx={styles.helpTextRed}>60,000{t("common.word.won")}</Typography>
                </Box>
            </Box>
        </Box>
    )
}


export const Tab_1_Screen2 :React.FC<tabComonnProps> = ({t}) => {
    const [activeCategory, setActiveCategory] = React.useState(0);
    return  (
        <Box sx={styles.tabsWrapper}>
            <Divider textAlign="left"><Typography sx={styles.popupSubTitle}>{t("reservation.dinner_information.selling_time")}</Typography></Divider>
            <Box sx={styles.miniWrapper2}>
                <Typography sx={{...styles.popupTitle,fontSize:'30px',color:'#242424'}}>11:00 - 21:00</Typography>
            </Box>
            <Box sx={styles.salesInfoWrap}>
                <Box sx={styles.salesTitleWrap}>
                    <Image src={SmallIconDate}  alt="slide" style={{width:'18px',objectFit: 'contain'}}/>
                    <Typography variant="sourceHanSans" sx={styles.infoTitle}>{t("reservation.dinner_information.title_holiday")}</Typography>
                </Box>
                <Box sx={styles.salesDataWrap}>
                    <Typography variant="sourceHanSans" sx={styles.infoDataTitle}>{t("reservation.dinner_information.holiday")}</Typography>
                </Box>
            </Box>
            <Box sx={styles.salesInfoWrap}>
                <Box sx={styles.salesTitleWrap}>
                    <Image src={SmallIconCall}  alt="slide" style={{width:'18px',objectFit: 'contain'}}/>
                    <Typography variant="sourceHanSans" sx={styles.infoTitle}>{t("reservation.dinner_information.title_phone")}</Typography>
                </Box>
                <Box sx={styles.salesDataWrap}>
                    <Typography variant="sourceHanSans" sx={styles.infoDataTitle}>02-1811-1811</Typography>
                </Box>
            </Box>
            <Box sx={styles.salesInfoWrap}>
                <Box sx={styles.salesTitleWrap}>
                    <Image src={SmallIconLocation}  alt="slide" style={{width:'18px',objectFit: 'contain'}}/>
                    <Typography variant="sourceHanSans" sx={styles.infoTitle}>{t("reservation.dinner_information.title_position")}</Typography>
                </Box>
                <Box sx={styles.salesDataWrap}>
                    <Typography variant="sourceHanSans" sx={styles.infoDataTitle}>{t("common.floor.foodmall_3f")} 3F, 4F</Typography>
                </Box>
            </Box>
            <Box sx={styles.salesInfoWrap}>
                <Box sx={styles.salesTitleWrap}>
                    <Image src={SmallIconMember}  alt="slide" style={{width:'18px',objectFit: 'contain'}}/>
                    <Typography variant="sourceHanSans" sx={styles.infoTitle}>{t("reservation.dinner_information.title_entry_number")}</Typography>
                </Box>
                <Box sx={styles.salesDataWrap}>
                    <Typography variant="sourceHanSans" sx={styles.infoDataTitle}>{t("reservation.dinner_information.max_120")}</Typography>
                </Box>
            </Box>
            <Box sx={styles.salesInfoWrap}></Box>
            <Divider textAlign="left"><Typography sx={styles.popupSubTitle}>{t("reservation.dinner_information.menu")}</Typography></Divider>
            <Box sx={styles.miniWrapper}>
                <Box sx={{display:'flex',width:'100%',flexDirection:'row',alignItems:'flex-start'}}>
                    <Box sx={activeCategory == 0 ? styles.selectCategoryWrapper : styles.defalutCategoryWrapper} onClick={() =>  setActiveCategory(0)}>
                        <Typography variant="sourceHanSans" sx={activeCategory == 0 ? styles.selectCategoryText : styles.defaultCategoryText}>{t("reservation.dinner_information.all_menu")}</Typography>
                    </Box>
                    <Box sx={activeCategory == 1 ? styles.selectCategoryWrapper : styles.defalutCategoryWrapper} onClick={() =>  setActiveCategory(1)}>
                        <Typography variant="sourceHanSans" sx={activeCategory == 1 ? styles.selectCategoryText : styles.defaultCategoryText}>한식</Typography>
                    </Box>
                    <Box sx={activeCategory == 2 ? styles.selectCategoryWrapper : styles.defalutCategoryWrapper} onClick={() =>  setActiveCategory(2)}>
                        <Typography variant="sourceHanSans" sx={activeCategory == 2 ? styles.selectCategoryText : styles.defaultCategoryText}>정육</Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{...styles.menuOuterWrapper}}>
                <Box sx={styles.menuWrapper}>
                    <Image 
                        src={MenuSample01}  
                        alt="table" 
                        style={{width:'190px',objectFit: 'contain'}}
                    />
                </Box>
                <Box sx={styles.menuWrapper}>
                    <Image 
                        src={MenuSample02}  
                        alt="table" 
                        style={{width:'190px',objectFit: 'contain'}}
                    />
                   
                </Box>
            </Box>
        </Box>
    )
}

export const Tab_1_Screen3 :React.FC<tabComonnProps> = ({t}) => {
    const [activeCategory, setActiveCategory] = React.useState(0);
    return  (
        <Box sx={styles.tabsWrapper}>
            <Divider textAlign="left"><Typography sx={styles.popupSubTitle}>{t("sub.popup.rooms_title.use_info")}</Typography></Divider>
            <Box sx={styles.salesInfoWrap}>
                <Box sx={{...styles.salesDataWrap,flex:1}}>
                    <Typography variant="sourceHanSans" sx={styles.infoTitle}>{t("sub.popup.etc.checkin")}</Typography>
                    <Typography variant="sourceHanSans" sx={styles.infoDataTitle}>15:00</Typography>
                </Box>
                <Box sx={{...styles.salesDataWrap,flex:1}}>
                    <Typography variant="sourceHanSans" sx={styles.infoTitle}>{t("sub.popup.etc.checkout")}</Typography>
                    <Typography variant="sourceHanSans" sx={styles.infoDataTitle}>12:00</Typography>
                </Box>
            </Box>
            <Box sx={styles.roomsInfoWrap}></Box>
            <Divider textAlign="left"><Typography sx={styles.popupSubTitle}>{t("sub.popup.rooms_title.room_service")}</Typography></Divider>
            <Box sx={styles.roomServiceCommonWrapper}>
                <Box sx={styles.roomServiceCommonBox}>
                    <Box sx={styles.roomServiceCommonIconWrap}>
                        <Image 
                            src={ICON_ROOM_SERVICE_01}  
                            alt="table" 
                            style={{width:'58px', height:'58px',objectFit: 'contain',marginBottom:'5px'}}
                        />
                        
                    </Box>
                    <Typography sx={styles.roomHelpText}>{t("sub.popup.room_service.service_1")}</Typography>
                    <Typography sx={styles.roomHelpText}>{t("sub.popup.room_service.service_1_2")}</Typography>
                </Box>
                <Box sx={styles.roomServiceCommonBox}>
                    <Box sx={styles.roomServiceCommonIconWrap}>
                        <Image 
                            src={ICON_ROOM_SERVICE_02}  
                            alt="table" 
                            style={{width:'58px', height:'58px',objectFit: 'contain',marginBottom:'5px'}}
                        />
                        
                    </Box>
                    <Typography sx={styles.roomHelpText}>{t("sub.popup.room_service.service_2")}</Typography>
                    <Typography sx={styles.roomHelpText}>{t("sub.popup.room_service.service_2_2")}</Typography>
                </Box>
                <Box sx={styles.roomServiceCommonBox}>
                    <Box sx={styles.roomServiceCommonIconWrap}>
                        <Image 
                            src={ICON_ROOM_SERVICE_03}  
                            alt="table" 
                            style={{width:'58px', height:'58px',objectFit: 'contain',marginBottom:'5px'}}
                        />
                        
                    </Box>
                    <Typography sx={styles.roomHelpText}>{t("sub.popup.room_service.service_3")}</Typography>
                </Box>
                <Box sx={styles.roomServiceCommonBox}>
                    <Box sx={styles.roomServiceCommonIconWrap}>
                        <Image 
                            src={ICON_ROOM_SERVICE_04}  
                            alt="table" 
                            style={{width:'58px', height:'58px',objectFit: 'contain',marginBottom:'5px'}}
                        />
                        
                    </Box>
                    <Typography sx={styles.roomHelpText}>{t("sub.popup.room_service.service_4")}</Typography>
                </Box>
                <Box sx={styles.roomServiceCommonBox}>
                    <Box sx={styles.roomServiceCommonIconWrap}>
                        <Image 
                            src={ICON_ROOM_SERVICE_05}  
                            alt="table" 
                            style={{width:'58px', height:'58px',objectFit: 'contain',marginBottom:'5px'}}
                        />
                        
                    </Box>
                    <Typography sx={styles.roomHelpText}>{t("sub.popup.room_service.service_5")}</Typography>
                </Box>
                <Box sx={styles.roomServiceCommonBox}>
                    <Box sx={styles.roomServiceCommonIconWrap}>
                        <Image 
                            src={ICON_ROOM_SERVICE_06}  
                            alt="table" 
                            style={{width:'58px', height:'58px',objectFit: 'contain',marginBottom:'5px'}}
                        />
                        
                    </Box>
                    <Typography sx={styles.roomHelpText}>{t("sub.popup.room_service.service_6")}</Typography>
                </Box>
                <Box sx={styles.roomServiceCommonBox}>
                    <Box sx={styles.roomServiceCommonIconWrap}>
                        <Image 
                            src={ICON_ROOM_SERVICE_07}  
                            alt="table" 
                            style={{width:'58px', height:'58px',objectFit: 'contain',marginBottom:'5px'}}
                        />
                        
                    </Box>
                    <Typography sx={styles.roomHelpText}>{t("sub.popup.room_service.service_7")}</Typography>
                </Box>
                <Box sx={styles.roomServiceCommonBox}>
                    <Box sx={styles.roomServiceCommonIconWrap}>
                        <Image 
                            src={ICON_ROOM_SERVICE_08}  
                            alt="table" 
                            style={{width:'58px', height:'58px',objectFit: 'contain',marginBottom:'5px'}}
                        />
                        
                    </Box>
                    <Typography sx={styles.roomHelpText}>{t("sub.popup.room_service.service_8")}</Typography>
                </Box>
            </Box>
            <Box sx={styles.roomsInfoWrap}></Box>
            <Divider textAlign="left"><Typography sx={styles.popupSubTitle}>{t("sub.popup.rooms_title.amenity")}</Typography></Divider>
            <Box sx={styles.roomServiceCommonWrapper}>
                <Box sx={styles.roomServiceCommonBox}>
                    <Box sx={styles.roomServiceCommonIconWrap}>
                        <Image 
                            src={ICON_ROOM_AMENITY_01}  
                            alt="table" 
                            style={{width:'58px', height:'58px',objectFit: 'contain',marginBottom:'5px'}}
                        />
                        
                    </Box>
                    <Typography sx={styles.roomHelpText}>{t("sub.popup.amenity.amenity_1")}</Typography>
                    <Typography sx={styles.roomHelpText}>{t("sub.popup.amenity.amenity_1_2")}</Typography>
                </Box>
                <Box sx={styles.roomServiceCommonBox}>
                    <Box sx={styles.roomServiceCommonIconWrap}>
                        <Image 
                            src={ICON_ROOM_AMENITY_02}  
                            alt="table" 
                            style={{width:'58px', height:'58px',objectFit: 'contain',marginBottom:'5px'}}
                        />
                        
                    </Box>
                    <Typography sx={styles.roomHelpText}>{t("sub.popup.amenity.amenity_2_1")}</Typography>
                    <Typography sx={styles.roomHelpText}>{t("sub.popup.amenity.amenity_2_2")}</Typography>
                </Box>
                <Box sx={styles.roomServiceCommonBox}>
                    <Box sx={styles.roomServiceCommonIconWrap}>
                        <Image 
                            src={ICON_ROOM_AMENITY_03}  
                            alt="table" 
                            style={{width:'58px', height:'58px',objectFit: 'contain',marginBottom:'5px'}}
                        />
                        
                    </Box>
                    <Typography sx={styles.roomHelpText}>{t("sub.popup.amenity.amenity_3_1")}</Typography>
                    <Typography sx={styles.roomHelpText}>{t("sub.popup.amenity.amenity_3_2")}</Typography>
                </Box>
                <Box sx={styles.roomServiceCommonBox}>
                    <Box sx={styles.roomServiceCommonIconWrap}>
                        <Image 
                            src={ICON_ROOM_AMENITY_04}  
                            alt="table" 
                            style={{width:'58px', height:'58px',objectFit: 'contain',marginBottom:'5px'}}
                        />
                        
                    </Box>
                    <Typography sx={styles.roomHelpText}>{t("sub.popup.amenity.amenity_4_1")}</Typography>
                    <Typography sx={styles.roomHelpText}>{t("sub.popup.amenity.amenity_4_2")}</Typography>
                </Box>
                <Box sx={styles.roomServiceCommonBox}>
                    <Box sx={styles.roomServiceCommonIconWrap}>
                        <Image 
                            src={ICON_ROOM_AMENITY_05}  
                            alt="table" 
                            style={{width:'58px', height:'58px',objectFit: 'contain',marginBottom:'5px'}}
                        />
                        
                    </Box>
                    <Typography sx={styles.roomHelpText}>{t("sub.popup.amenity.amenity_5")}</Typography>
                </Box>
                <Box sx={styles.roomServiceCommonBox}>
                    <Box sx={styles.roomServiceCommonIconWrap}>
                        <Image 
                            src={ICON_ROOM_AMENITY_06}  
                            alt="table" 
                            style={{width:'58px', height:'58px',objectFit: 'contain',marginBottom:'5px'}}
                        />
                        
                    </Box>
                    <Typography sx={styles.roomHelpText}>{t("sub.popup.amenity.amenity_6_1")}</Typography>
                    <Typography sx={styles.roomHelpText}>{t("sub.popup.amenity.amenity_6_2")}</Typography>
                </Box>
                <Box sx={styles.roomServiceCommonBox}>
                    <Box sx={styles.roomServiceCommonIconWrap}>
                        <Image 
                            src={ICON_ROOM_AMENITY_07}  
                            alt="table" 
                            style={{width:'58px', height:'58px',objectFit: 'contain',marginBottom:'5px'}}
                        />
                        
                    </Box>
                    <Typography sx={styles.roomHelpText}>{t("sub.popup.amenity.amenity_7")}</Typography>
                </Box>
                <Box sx={styles.roomServiceCommonBox}>
                    <Box sx={styles.roomServiceCommonIconWrap}>
                        <Image 
                            src={ICON_ROOM_AMENITY_08}  
                            alt="table" 
                            style={{width:'58px', height:'58px',objectFit: 'contain',marginBottom:'5px'}}
                        />
                        
                    </Box>
                    <Typography sx={styles.roomHelpText}>{t("sub.popup.amenity.amenity_8")}</Typography>
                </Box>
            </Box>
            <Box sx={styles.roomsInfoWrap}></Box>
            <Divider textAlign="left"><Typography sx={styles.popupSubTitle}>{t("sub.popup.rooms_title.notice")}</Typography></Divider>
            <Box sx={styles.miniWrapper}>
                <Box sx={{display:'flex',width:'100%',flexDirection:'row',alignItems:'flex-start'}}>
                    <Typography variant="sourceHanSans" sx={styles.popupSubTitle}>
                    {t("sub.popup.etc.notice")}
                    </Typography>
                </Box>
            </Box>
            
        </Box>
    )
}


const styles = {
    contentWrapper : {
        display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',position:'absolute',right:0,bottom:0,width:'100%',maxWidth:'470px'
        ,height:'100vh',zIndex:100,overflow:'hidden'
    },
    closeBoxWrap : {
        position:'absolute',right:'10px',top:'15px',width:'30px',height:'30px',display:'flex',justifyContent:'center',alignItems:'center', zIndex:10
    },
    popupDataWrap : {
        display:'flex',flexDirection:'column',position:'absolute',bottom:0,left:0,width:'100%',height:'100%',padding:"5px 15px",backgroundColor:'#fff',borderTopLeftRadius:'15px',borderBottomLeftRadius:'15px'
    },
    tabsWrapper: {
        display:'flex',flexDirection:'column',widht:'100%',height:'100%',overflowY:'scroll',padding:'10px 0'
    },
    salesInfoWrap : {
        display:'flex',flexDirection:'row',widht:'100%',height:'24px',padding:"10px",margin:"5px"
    },
    salesTitleWrap : {
        display:'flex',flex:1,alignItems : 'center',flexDirection:'row'
    },
    salesDataWrap : {
        display:'flex',flex:2,alignItems : 'center'
    },
    menuOuterWrapper : {
        display:'flex',flexDirection:'row', alignItems:'center',justifyContent:'space-around'
    },
    menuWrapper : {
        display:'flex',flex:1,flexDirection:'column',alignItems:'center',justifyContent:'flex-start',marginBottom:'5px',maxHeight:"250px"
    },
    roomsInfoWrap : {
        display:'flex',flexDirection:'row',widht:'100%',height:'12px',
    },
    roomServiceCommonWrapper : {
        display:'flex',flexDirection:'row', alignItems:'flex-start',padding:'10px',justifyContent:'flex-start',width:'100%',
        flexWrap:"wrap"
    },
    roomServiceCommonBox  :{ 
        display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'flex-start',width:'auto',minWidth:"80px",height:"auto",marginBottom:"10px"
    },
    roomServiceCommonIconWrap : {
        display:'flex',width:"58px",height:'58px',justifyContent:'center',backgroundColor:'#efefef',borderRadius:"10px",marginBottom:"5px"
    },
    selectCategoryWrapper : {
        minWidth: "96px",
        height: "34px",
        padding: "7px 21px",
        borderRadius: "17px",
        border: "solid 1px #f84040",
        backgroundColor: "#ffebeb",
        display:'flex',alignItems:'center',justifyContent:'center',
        marginRight:"5px",
        cursor:'pointer'
    },
    selectCategoryText : {
        fontSize: "14px",
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "normal",
        letterSpacing: "-0.28px",
        color: "#f84040",
    },
    defalutCategoryWrapper : {
        minWidth: "96px",
        height: "34px",
        padding: "7px 21px",
        borderRadius: "17px",
        border: "solid 1px #c8c8c8",
        backgroundColor: "#fff",
        display:'flex',alignItems:'center',justifyContent:'center',
        marginRight:"5px",
        cursor:'pointer'
    },
    defaultCategoryText : {
        fontSize: "14px",
        fontWeight: "500",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "normal",
        letterSpacing: "-0.28px",
        color: "#22201f",
    },
    infoTitle : {
        color:'#474747',
        fontSize:'16px',
        fontWeight: "500",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "normal",
        letterSpacing: "-0.32px",
        marginLeft:"5px"
    },
    infoDataTitle : {
        color:'#474747',
        fontSize:'16px',
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "normal",
        letterSpacing: "-0.32px",
        marginLeft:"5px"
    },
    popupTitle : {
        fontSize: '1.5em',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: '-0.1px',
        color: '#22201f',
    },
    popupSubTitle : {
        fontFamily: 'SourceHanSans',
        fontSize: '0.9em',
        fontWeight: '500',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: "2em",
        color: '#22201f'
    },
    helpText : {
        fontFamily: 'SourceHanSans',
        fontSize: '0.8em',
        fontWeight: '500',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: "1.5em",
        color:'#b2b2b2'
    },
    helpTextRed : {
        fontFamily: 'SourceHanSans',
        fontSize: '0.8em',
        fontWeight: '500',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: "1.5em",
        color:'#f84040',
        paddingLeft:'4px'
    },
    helpText2 : {
        fontSize: '0.8em',
        fontWeight: '500',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: "1.5em",
        color:'#22201f',
    },
    helpText2_2 : {
        fontSize: '0.7em',
        fontWeight: '500',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: "1em",
        color:'#b2b2b2',
    },
    roomHelpText : {
        fontSize: '13px',
        fontWeight: '500',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: "1.23",
        letterSpacing: "-0.26px",
        color:'#22201f'
    },
    miniWrapper : {
        display:'flex',flexDirection:'row', alignItems:'center',padding:'15px 10px',justifyContent:'space-around'
    },
    miniWrapper2 : {
        display:'flex',flexDirection:'row',flexWrap:'wrap', alignItems:'center',padding:'15px 10px',width:'100%',maxWidth:'100vw'
    },
    tableWrapper : {
        display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'flex-start',minWidth:'70px',marginRight:'10px',marginBottom:'5px'
    },
    typeWrapper : {
        display:'flex',flexDirection:'row',minWidth:'60px',marginRight:'5px',marginBottom:'5px',backgroundColor:'#f6f5f5',borderRadius:'5px',padding:'5px 5px'
    },
    eventOuterWrap : {
        display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around',alignItems:'center'
    },
    eventWrapper: {
        display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'flex-start',minWidth:'100px',maxWidth:'300px',marginBottom:'10px',marginRight:'10px'
    },

}

export default QuickPopup;
