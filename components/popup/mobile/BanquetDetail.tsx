import * as React from 'react';
import { useRouter } from "next/router";
import Image from "next/image";
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from 'next-i18next';
import NoSsr from "@mui/material/NoSsr";
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
import Divider from '@mui/material/Divider';
import { landscapeState } from "@stores/layoutStore";
import { useWindowSize } from "@utils/useWindowSize";
import { useRecoilState } from "recoil";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import BalconyIcon from '@mui/icons-material/Balcony';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

type PopupBanquetDetailProps = {
    activeIndex? : any,
    setShowPopDetail: (open: number) => void;
}

const BanquetDetail: React.FC<PopupBanquetDetailProps> = ({ activeIndex, setShowPopDetail}) => {
    const router = useRouter()
    const isAccessDevice =  useWindowSize();
    // 화면 가로모드 여부 확인
    const [viewLandscape, setIsLandscape] = useRecoilState(landscapeState);
    const [value, setValue] = React.useState(0);
    const [activeStep, setActiveStep] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        if ( newValue == 2 ) {
            router.push({pathname : "reservation",query:{menu : 'fandb'}});
            return;
        }
        if ( newValue != value ) {
            setValue(newValue);
            setActiveStep(0);
        }
    };

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
                        variant="scrollable"
                        TabIndicatorProps={{
                            style: { background: "#f84040" }
                        }} // indicator color
                        style={{height: "80px"}}
                    >
                        <Tab icon={<BalconyIcon />} label="연회장안내" />
                        <Tab icon={<CardGiftcardIcon />} label="이벤트" />
                        <Tab icon={<BorderColorIcon />} label="바로예약" />
                    </Tabs>
                    {
                        value == 1 ?
                        <Tab_2_Screen />
                        :
                        <Tab_1_Screen />
                    }
                </Box>
            </Box>
        </NoSsr>
    )
}

const myArray = new Array(1, 2, 3, 4,5);

export const Tab_2_Screen = () => {
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

export const Tab_1_Screen = () => {
    return  (
        <Box sx={styles.tabsWrapper}>
            <Divider textAlign="left"><Typography sx={styles.popupSubTitle}>연회장 대관료</Typography></Divider>
            <Box sx={styles.miniWrapper2}>
                <Typography sx={{...styles.popupTitle,fontSize:'1.2em',color:'#f84040'}}>기본 500,000</Typography>
                <Typography sx={{...styles.popupSubTitle,color:'#b2b2b2',paddingLeft:"5px"}}>(* 시간 사용별로 다름 ) </Typography>
            </Box>
            <Divider textAlign="left"><Typography sx={styles.popupSubTitle}>타입별 최대 수용 인원</Typography></Divider>
            <Box sx={styles.miniWrapper2}>
                <Box sx={styles.tableWrapper}>
                    <Image 
                        src={ICOM_TABLE_1}  
                        alt="table" 
                        style={{width:'50px', height:'40px',objectFit: 'contain',marginBottom:'5px'}}
                    />
                    <Typography sx={styles.helpText}>Circle</Typography>
                    <Typography sx={styles.helpText}>110석</Typography>
                </Box>
                <Box sx={styles.tableWrapper}>
                    <Image 
                        src={ICOM_TABLE_2}  
                        alt="table" 
                        style={{width:'50px', height:'40px',objectFit: 'contain',marginBottom:'5px'}}
                    />
                    <Typography sx={styles.helpText}>Theather</Typography>
                    <Typography sx={styles.helpText}>110석</Typography>
                </Box>
                <Box sx={styles.tableWrapper}>
                    <Image 
                        src={ICOM_TABLE_3}  
                        alt="table" 
                        style={{ width:'auto', height:'40px',objectFit: 'contain',marginBottom:'5px'}}
                    />
                    <Typography sx={styles.helpText}>U Shape</Typography>
                    <Typography sx={styles.helpText}>110석</Typography>
                </Box>
                <Box sx={styles.tableWrapper}>
                    <Image 
                        src={ICOM_TABLE_4}  
                        alt="table" 
                        style={{ width:'auto', height:'40px',objectFit: 'contain',marginBottom:'5px'}}
                    />
                    <Typography sx={styles.helpText}>Classroom</Typography>
                    <Typography sx={styles.helpText}>110석</Typography>
                </Box>
            </Box>
            <Divider textAlign="left"><Typography sx={styles.popupSubTitle}>부대시설(무료)</Typography></Divider>
            <Box sx={styles.miniWrapper2}>
                <Box sx={styles.tableWrapper}>
                    <Image 
                        src={ICOM_OPTION_1}  
                        alt="table" 
                        style={{width:'50px', height:'40px',objectFit: 'contain',marginBottom:'5px'}}
                    />
                    <Typography sx={styles.helpText2}>스크린</Typography>
                </Box>
                <Box sx={styles.tableWrapper}>
                    <Image 
                        src={ICOM_OPTION_2}  
                        alt="table" 
                        style={{width:'50px', height:'40px',objectFit: 'contain',marginBottom:'5px'}}
                    />
                    <Typography sx={styles.helpText2}>프로젝터</Typography>
                </Box>
                <Box sx={styles.tableWrapper}>
                    <Image 
                        src={ICOM_OPTION_3}  
                        alt="table" 
                        style={{width:'50px', height:'40px',objectFit: 'contain',marginBottom:'5px'}}
                    />
                    <Typography sx={styles.helpText2}>무선마이크</Typography>
                </Box>
                <Box sx={styles.tableWrapper}>
                    <Image 
                        src={ICOM_OPTION_4}  
                        alt="table" 
                        style={{width:'50px', height:'40px',objectFit: 'contain',marginBottom:'5px'}}
                    />
                    <Typography sx={styles.helpText2}>핀마이크</Typography>
                </Box>
                <Box sx={styles.tableWrapper}>
                    <Image 
                        src={ICOM_OPTION_5}  
                        alt="table" 
                        style={{width:'50px', height:'40px',objectFit: 'contain',marginBottom:'5px'}}
                    />
                    <Typography sx={styles.helpText2}>주차공간</Typography>
                </Box>
                <Box sx={styles.tableWrapper}>
                    <Image 
                        src={ICOM_OPTION_6}  
                        alt="table" 
                        style={{width:'50px', height:'40px',objectFit: 'contain',marginBottom:'5px'}}
                    />
                    <Typography sx={styles.helpText2}>단상</Typography>
                </Box>
                <Box sx={styles.tableWrapper}>
                    <Image 
                        src={ICOM_OPTION_7}  
                        alt="table" 
                        style={{width:'50px', height:'40px',objectFit: 'contain',marginBottom:'5px'}}
                    />
                    <Typography sx={styles.helpText2}>현수막</Typography>
                </Box>
                <Box sx={styles.tableWrapper}>
                    <Image 
                        src={ICOM_OPTION_8}  
                        alt="table" 
                        style={{width:'50px', height:'40px',objectFit: 'contain',marginBottom:'5px'}}
                    />
                    <Typography sx={styles.helpText2}>전동암막</Typography>
                    <Typography sx={styles.helpText2}>블라인더</Typography>
                </Box>
                <Box sx={styles.tableWrapper}>
                    <Image 
                        src={ICOM_OPTION_9}  
                        alt="table" 
                        style={{width:'50px', height:'40px',objectFit: 'contain',marginBottom:'5px'}}
                    />
                    <Typography sx={styles.helpText2}>이동파티션</Typography>
                </Box>
                <Box sx={styles.tableWrapper}>
                    <Image 
                        src={ICOM_OPTION_10}  
                        alt="table" 
                        style={{width:'50px', height:'40px',objectFit: 'contain',marginBottom:'5px'}}
                    />
                    <Typography sx={styles.helpText2}>행거</Typography>
                </Box>
            </Box>
            <Divider textAlign="left"><Typography sx={styles.popupSubTitle}>부대시설(유료)</Typography></Divider>
            <Box sx={styles.miniWrapper2}>
                <Box sx={styles.tableWrapper}>
                    <Image 
                        src={ICOM_OPTION_11}  
                        alt="table" 
                        style={{width:'50px', height:'40px',objectFit: 'contain',marginBottom:'5px'}}
                    />
                    <Typography sx={styles.helpText2}>노래방기기</Typography>
                    <Typography sx={styles.helpText2_2}>(30만원))</Typography>
                </Box>
                <Box sx={styles.tableWrapper}>
                    <Image 
                        src={ICOM_OPTION_12}  
                        alt="table" 
                        style={{width:'50px', height:'40px',objectFit: 'contain',marginBottom:'5px'}}
                    />
                    <Typography sx={styles.helpText2}>이동식앰프</Typography>
                    <Typography sx={styles.helpText2_2}>(10만원))</Typography>
                </Box>
                <Box sx={styles.tableWrapper}>
                    <Image 
                        src={ICOM_OPTION_13}  
                        alt="table" 
                        style={{width:'50px', height:'40px',objectFit: 'contain',marginBottom:'5px'}}
                    />
                    <Typography sx={styles.helpText2}>이동식TV</Typography>
                    <Typography sx={styles.helpText2_2}>(10만원))</Typography>
                </Box>
                <Box sx={styles.tableWrapper}>
                    <Image 
                        src={ICOM_OPTION_14}  
                        alt="table" 
                        style={{width:'50px', height:'40px',objectFit: 'contain',marginBottom:'5px'}}
                    />
                    <Typography sx={styles.helpText2}>식사제공</Typography>
                    <Typography sx={styles.helpText2_2}>(별도처리))</Typography>
                </Box>
            </Box>
            <Divider textAlign="left"><Typography sx={styles.popupSubTitle}>메뉴안내</Typography></Divider>
            <Box sx={styles.miniWrapper2}>
                <Box sx={styles.typeWrapper}>
                    <Typography sx={styles.helpText}>타입 A</Typography>
                    <Typography sx={styles.helpTextRed}>40,000원</Typography>
                </Box>
                <Box sx={styles.typeWrapper}>
                    <Typography sx={styles.helpText}>타입 B</Typography>
                    <Typography sx={styles.helpTextRed}>50,000원</Typography>
                </Box>
                <Box sx={styles.typeWrapper}>
                    <Typography sx={styles.helpText}>타입 C</Typography>
                    <Typography sx={styles.helpTextRed}>60,000원</Typography>
                </Box>
            </Box>
        </Box>
    )
}


const styles = {
    contentWrapper : {
        display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',position:'absolute',left:0,bottom:0,width:'100%',maxWidth:'100vw'
        ,height:'calc( 100vh - 100px)',zIndex:100,overflow:'hidden'
    },
    closeBoxWrap : {
        position:'absolute',right:'10px',top:'15px',width:'30px',height:'30px',display:'flex',justifyContent:'center',alignItems:'center', zIndex:10
    },
    popupDataWrap : {
        display:'flex',flexDirection:'column',position:'absolute',bottom:0,left:0,width:'100%',height:'100%',padding:"5px 15px",backgroundColor:'#fff',borderTopLeftRadius:'15px',borderTopRightRadius:'15px'
    },
    tabsWrapper: {
        display:'flex',flexDirection:'column',widht:'100%',height:'100%',overflowY:'scroll',padding:'10px 0'
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
        fontFamily: 'SourceHanSans',
        fontSize: '0.8em',
        fontWeight: '500',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: "1.5em",
        color:'#22201f',
    },
    helpText2_2 : {
        fontFamily: 'SourceHanSans',
        fontSize: '0.7em',
        fontWeight: '500',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: "1em",
        color:'#b2b2b2',
    },
    miniWrapper : {
        display:'flex',flexDirection:'row', alignItems:'center',padding:'15px 10px'
    },
    miniWrapper2 : {
        display:'flex',flexDirection:'row',flexWrap:'wrap', alignItems:'center',padding:'15px 10px',width:'100%',maxWidth:'100vw'
    },
    tableWrapper : {
        display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'flex-start',minWidth:'60px',marginRight:'10px'
    },
    typeWrapper : {
        display:'flex',flexDirection:'row',minWidth:'60px',marginRight:'5px',marginBottom:'5px',backgroundColor:'#f6f5f5',borderRadius:'5px',padding:'5px 5px'
    },
    eventOuterWrap : {
        display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around',alignItems:'center'
    },
    eventWrapper: {
        display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'flex-start',minWidth:'100px',maxWidth:'300px',marginBottom:'10px',marginRight:'10px'
    }
}

export default BanquetDetail;
