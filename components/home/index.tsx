import * as React from 'react';
import Image from "next/image";
import * as apiObject from '@utils/api';
import classNames from 'classnames';
import { Box, Button, Container, List, ListItem, Typography } from "@mui/material";
import { useTranslation } from 'next-i18next';
import { accessEnvirmentInfo,accessForceDesktop } from '@stores/envStore';
import { landscapeState,globalOpenReservation } from "@stores/layoutStore";
import { mobileSelectFloorType } from 'types';
import { useRecoilState } from "recoil";
import useLocaleTransfer from "services/locale/transfer";
import functions from '@utils/functions';
import mConst from "utils/constants";
import HomeMobile from './mobile';
import { rightFloor,leftFloor  } from '@utils/constants';
import MainBgImage from "@images/home/main-bg.png";
import MainBuildingImage from "@images/home/main-building.png";
import FloorPopupDetail from "components/popup/FloorDetail";
import Skeleton from '@mui/material/Skeleton';

import left1OverlayImage from "@images/home/overlay-foodmall-1.png";
import left2OverlayImage from "@images/home/overlay-foodmall-2.png";
import left3OverlayImage from "@images/home/overlay-foodmall-3-4.png";
import left4OverlayImage from "@images/home/overlay-foodmall-5.png";
import rigth11OverlayImage from "@images/home/overlay-hotel-11-12.png";
import rigth4verlayImage from "@images/home/overlay-hotel-4-10.png";
import rigth3OverlayImage from "@images/home/overlay-hotel-3.png";
import rigth2OverlayImage from "@images/home/overlay-hotel-2.png";

import iconEventMoreBtn from "@icons/main/event_btn.png";

import Copyright from "./Copyright";
import Information  from "./Information";
import MainSlide from "components/common/MultiCarousel"
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { EmblaOptionsType } from 'embla-carousel'
import { stat } from 'fs';

const OPTIONS: EmblaOptionsType = { loop:true };
const SLIDE_COUNT = 10;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const API_SERVER_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Home() {
  const { t } = useTranslation(['common','yakwan']);
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [isScrolling, setScrolling] = React.useState<boolean>(true);
  const [accessInfo, setAccessInfo] = useRecoilState(accessEnvirmentInfo);
  const [isOpenReservation, setOpenReservation] = useRecoilState(globalOpenReservation);
  const [forceDesktop, setForceDesktop] = useRecoilState(accessForceDesktop);
  const [viewLandscape, setIsLandscape] = useRecoilState(landscapeState);
  const isGlobalDesktop = React.useMemo(() => {
    return functions.isGlobalDesktop(accessInfo.isDesktop, accessInfo.isTablet,forceDesktop)
  }, [accessInfo,forceDesktop]);

  if ( !isGlobalDesktop ) {
    return (
        <HomeMobile />
    )
  }
  const [popLeftDetailOpen, setpopLeftDetailOpen] = React.useState(false);
  const [popRigthDetailOpen, setpopRightDetailOpen] = React.useState(false);

  const [selectFloor, setSelectFloor] = React.useState<mobileSelectFloorType>({
    selectData : null
  });
  const [isSeq, setDesktopSeq] = React.useState<number>(1);
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [startPoistion, setStartPoistion] = React.useState(0);
  const isBackDrop = React.useMemo(() => {
    return isSeq == 0 ? true : false
  }, [isSeq]);
  const [snsData, setSnsData] = React.useState<any>([]);

  React.useEffect(() => {
    const baseWidth= 1260;
    const deviceWidth = baseWidth/snsData.length;
    setStartPoistion(deviceWidth*activeSlide)
  }, [activeSlide]);
  const isBackDiectionDrop = React.useMemo(() => {
    let directionName = "left";
    switch( selectFloor?.selectData?.localeName ) {
      case "common.floor.stayrak_11f" : 
      case "common.floor.stayrak_4f" : 
      case "common.floor.stayrak_3f" : 
      case "common.floor.stayrak_2f" :  directionName = "right"; break;
      default :  directionName = "left"; break;
    }
    return directionName
  }, [selectFloor]);

  let timerUid:any = null;

  React.useEffect(() => {
    geSnstDataList();
  }, []);

  const geSnstDataList = async() => {
    const url = `${API_SERVER_BASE_URL}/sr_system_api/board/board.php?action=snsList`;
    const payload = {
    };
    const res = await apiObject.defaultFetch(url, payload);
    setTimeout(() => setLoading(false), 1000);
    if ( res.state == 'true') {
      const resultData = res?.row;
      setSnsData(resultData)
    }else{
      setSnsData([])
    }
}

  React.useEffect(() => {
    
    timerUid = setInterval(() => {
      // 타이머 숫자가 하나씩 줄어들도록
      //////console.log("setDesktopSeq",isSeq)
      if ( isSeq == 8) {
        setDesktopSeq(1)
      }else{
        setDesktopSeq(isSeq+1)
      }
    }, 3000);
    if ( isSeq == 0 ) {
      clearInterval(timerUid);
    }else{
      if ( !isOpenReservation ) {
        document.body.style.overflow = "auto";
      }
    }
    return () => clearInterval(timerUid);
  }, [isSeq,]);

  const onClickFloor = (sItem:any) => {

    if ( 
        sItem.localeName == "common.floor.stayrak_11f" 
        ||  sItem.localeName == "common.floor.stayrak_4f" 
        || sItem.localeName == "common.floor.stayrak_3f" 
        || sItem.localeName == "common.floor.stayrak_2f" 
    ) {
      if (  mConst.desktopMinWidth > viewLandscape?.width ) {
        setSelectFloor({selectData : sItem});
        setpopRightDetailOpen(false);
        setpopLeftDetailOpen(true);
        setDesktopSeq(0)
      }else{
        setSelectFloor({selectData : sItem});
        setpopRightDetailOpen(true);
        setpopLeftDetailOpen(false);
        setDesktopSeq(0)
      }
      
    }else{
      if (  mConst.desktopMinWidth > viewLandscape?.width ) {
        setSelectFloor({selectData : sItem});
        setpopRightDetailOpen(true);
        setpopLeftDetailOpen(false);
        setDesktopSeq(0)
      }else{
        setSelectFloor({selectData : sItem});
        setpopRightDetailOpen(false);
        setpopLeftDetailOpen(true);
        setDesktopSeq(0)
      }
    }
  }

  const isHighLight= classNames({
    'desktop-shimmer-button': true,
    'desktop-shimmer_select': true
  });
  const shimmerClass = classNames({
    'desktop-shimmer': true
  });
  const shimmerButton = classNames({
    'desktop-shimmer-button': true,
  });
  const shimmerButtonActive = classNames({
    'desktop-shimmer-button': true,
    'active' : true
  });
  const shimmerText = classNames({
    'desktop-shimmer-text': true
  });
  const shimmerText2 = classNames({
    'desktop-shimmer-text2': true
  });
  const shimmerLongText = classNames({
    'desktop-shimmer-text': true,
    'longtext' : true
  })


  const _renderOverLayImage = (selectItem:any) => {
    
    if ( !functions.isEmpty(selectItem)) {
      if ( selectItem?.selectData?.localeName == "common.floor.stayrak_11f" ) {
        return (
          <Box sx={{position:'absolute',right:"calc(50% - 355px)",top:188,width:"357px",height:"188px",zIndex:3,opacity: isBackDrop ? 1 : 0,}}>
            <Image 
              alt={"sub popup"}
              src={rigth11OverlayImage}
              placeholder="blur"
              style={{flex:1,objectFit: 'contain',zIndex:3,width:"357px",height:"188px",opacity: isBackDrop ? 1 : 0}}
            />
          </Box>
        )
      }else if ( selectItem?.selectData?.localeName == "common.floor.stayrak_4f" ) {
        return (
          <Box sx={{position:'absolute',right:"calc(50% - 355px)",top:300,width:"357px",height:"347px",zIndex:3,opacity: isBackDrop ? 1 : 0,}}>
            <Image 
              alt={"sub popup"}
              src={rigth4verlayImage}
              placeholder="blur"
              style={{flex:1,objectFit: 'contain',zIndex:3,width:"357px",height:"347px",opacity: isBackDrop ? 1 : 0}}
            />
          </Box>
        )
      }else if ( selectItem?.selectData?.localeName == "common.floor.stayrak_3f" ) {
        return (
          <Box sx={{position:'absolute',right:"calc(50% - 355px)",top:615,width:"357px",height:"81px",zIndex:3,opacity: isBackDrop ? 1 : 0,}}>
            <Image 
              alt={"sub popup"}
              src={rigth3OverlayImage}
              placeholder="blur"
              style={{flex:1,objectFit: 'contain',zIndex:3,width:"357px",height:"81px",opacity: isBackDrop ? 1 : 0}}
            />
          </Box>
        )
      }else if ( selectItem?.selectData?.localeName == "common.floor.stayrak_2f" ) {
        return (
          <Box sx={{position:'absolute',right:"calc(50% - 355px)",top:675,width:"357px",height:"85px",zIndex:3,opacity: isBackDrop ? 1 : 0,}}>
            <Image 
              alt={"sub popup"}
              src={rigth2OverlayImage}
              placeholder="blur"
              style={{flex:1,objectFit: 'contain',zIndex:3,width:"357px",height:"85px",opacity: isBackDrop ? 1 : 0}}
            />
          </Box>
        )
      }else if ( selectItem?.selectData?.localeName == "common.floor.foodmall_5f" ) {
        return (
          <Box sx={{position:'absolute',left:"calc(50% - 355px)",top:340,width:"344px",height:"135px",zIndex:3,opacity: isBackDrop ? 1 : 0,}}>
            <Image 
              alt={"sub popup"}
              src={left4OverlayImage}
              placeholder="blur"
              style={{flex:1,objectFit: 'contain',zIndex:3,width:"344px",height:"135px",opacity: isBackDrop ? 1 : 0}}
            />
          </Box>
        )
      }else if ( selectItem?.selectData?.localeName == "common.floor.foodmall_3f" ) {
        return (
          <Box sx={{position:'absolute',left:"calc(50% - 355px)",top:420,width:"344px",height:"216px",zIndex:3,opacity: isBackDrop ? 1 : 0,}}>
            <Image 
              alt={"sub popup"}
              src={left3OverlayImage}
              placeholder="blur"
              style={{flex:1,objectFit: 'contain',zIndex:3,width:"344px",height:"216px",opacity: isBackDrop ? 1 : 0}}
            />
          </Box>
        )
      }else if ( selectItem?.selectData?.localeName == "common.floor.foodmall_2f" ) {
        return (
          <Box sx={{position:'absolute',left:"calc(50% - 355px)",top:605,width:"344px",height:"110px",zIndex:3,opacity: isBackDrop ? 1 : 0,}}>
            <Image 
              alt={"sub popup"}
              src={left2OverlayImage}
              placeholder="blur"
              style={{flex:1,objectFit: 'contain',zIndex:3,width:"344px",height:"110px",opacity: isBackDrop ? 1 : 0}}
            />
          </Box>
        )
      }else if ( selectItem?.selectData?.localeName == "common.floor.foodmall_1f" ) {
        return (
          <Box sx={{position:'absolute',left:"calc(50% - 355px)",top:700,width:"344px",height:"128px",zIndex:3,opacity: isBackDrop ? 1 : 0,}}>
            <Image 
              alt={"sub popup"}
              src={left1OverlayImage}
              placeholder="blur"
              style={{flex:1,objectFit: 'contain',zIndex:3,width:"344px",height:"128px",opacity: isBackDrop ? 1 : 0}}
            />
          </Box>
        )
      }else{
        return (
          <Box sx={{}}>

          </Box>
        )
      }
    }
  }

  return (
    <Box sx={{display:'flex',flexDirection:'column',minWidth:'1600px',width:'100%',minHeight:"936px"}}>
      <Box sx={{display:'flex',minHeight:'100vh',backgroundColor:'transparent',minWidth:'1600px',width:'100%'}}>
        <Image 
          alt={"main"}
          src={MainBgImage}
          placeholder="blur"
          fill
          sizes="100%"
          style={{flex:1,objectFit: 'cover',zIndex: 1,minWidth:'1600px',width:'100%', backgroundColor: isBackDrop ?  "rgb(0,0,0,0.8)" : "transparent"}}
        />
        <Box sx={{position:'relative',display:'flex',height:'100%',minWidth:'1600px',width:'100%',top: "0px"}}>
          <Image 
            alt={"main"}
            src={MainBuildingImage}
            placeholder="blur"
            style={{flex:1,objectFit: 'contain',zIndex:1,width:"1300px",height:"926px",backgroundColor: isBackDrop ?  "rgb(0,0,0,0.8)" : "transparent",filter:isBackDrop? "brightness(50%)" : "brightness(100%)"}}
          />
          {
            _renderOverLayImage(selectFloor)
          }
          {
            rightFloor.map((item,index) => {
              return (
                <Box 
                  key={index}
                  onClick={() => onClickFloor(item)}
                  className={selectFloor?.selectData?.localeName == item.localeName ? isHighLight : isSeq == (index+1) ? shimmerButtonActive : shimmerButton } 
                  sx={index == 0 ? styles.fixedRigthFloor1Label : index == 1 ? styles.fixedRigthFloor2Label : index == 2 ? styles.fixedRigthFloor3Label : styles.fixedRigthFloor4Label }
                >
                  <span className={useLocaleTransfer(t,'common',item.localeName)?.length > 4 ? shimmerLongText : shimmerText}>{useLocaleTransfer(t,'common',item.localeName)}</span>
                  <span className={shimmerText2}>{item.floorName}</span>
                  <span className={shimmerClass}></span>
                </Box>
              )
            })
          }
          {
            leftFloor.map((item,index) => {
              return (
                <Box 
                  className={selectFloor?.selectData?.localeName == item.localeName ? isHighLight : isSeq == (index+5)  ? shimmerButtonActive : shimmerButton } 
                  sx={index == 0 ? styles.fixedLeftFloor1Label : index == 1 ? styles.fixedLeftFloor2Label : index == 2 ? styles.fixedLeftFloor3Label : styles.fixedLeftFloor4Label }
                  key={index}
                  onClick={() => onClickFloor(item)}
                >
                  <span className={useLocaleTransfer(t,'common',item.localeName)?.length > 4 ? shimmerLongText : shimmerText}>{useLocaleTransfer(t,'common',item.localeName)}</span>
                  <span className={shimmerText2}>{item.floorName}</span>
                  <span className={shimmerClass}></span>
                </Box>
              )
            })
          }
        </Box>
      </Box>
      <Box sx={[styles.eventOuterBox,{filter:isBackDrop? "brightness(50%)" : "brightness(100%)"}]}>
        <Box sx={styles.eventInDataBox}>
          <Box sx={styles.eventTitleBox}>
            <Typography variant="manrope" sx={styles.eventTitle}>
              EVENT NOTICE 
            </Typography>
            <Image src={iconEventMoreBtn} width={54} height={54} alt={'button'} />
          </Box>
          <Box sx={styles.eventDataBox}>
            <Box sx={styles.eventEachCommonBox}>
              <Box sx={styles.eventEachIconBox}>
                  <Typography variant="sourceHanSans" sx={styles.eventIconTitle}>NEW</Typography>
              </Box>
              <Box sx={styles.eventEachContentBox}>
                  <Typography variant="sourceHanSans" sx={styles.eventTermTitle}>[성원정]2024.02.16~2024.03.31</Typography>
                  <Typography variant="sourceHanSans" sx={styles.eventMainTitle}>[성원정]2024.02.16~2024.03.31</Typography>
              </Box>
            </Box>
            <Box sx={styles.eventEachCommonBox}>
              <Box sx={styles.eventEachIconBox}>
                  <Typography variant="sourceHanSans" sx={styles.eventIconTitle}>Event</Typography>
              </Box>
              <Box sx={styles.eventEachContentBox}>
                  <Typography variant="sourceHanSans" sx={styles.eventTermTitle}>[성원정]2024.02.16~2024.03.31</Typography>
                  <Typography variant="sourceHanSans" sx={styles.eventMainTitle}>[성원정]2024.02.16~2024.03.31</Typography>
              </Box>
            </Box>
            <Box sx={styles.eventEachCommonBox}>
              <Box sx={styles.eventEachIconBox}>
                  <Typography variant="sourceHanSans" sx={styles.eventIconTitle}>신제품</Typography>
              </Box>
              <Box sx={styles.eventEachContentBox}>
                  <Typography variant="sourceHanSans" sx={styles.eventTermTitle}>[성원정]2024.02.16~2024.03.31</Typography>
                  <Typography variant="sourceHanSans" sx={styles.eventMainTitle}>[성원정]2024.02.16~2024.03.31</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{display:'flex',flexDirection:'column',minHeight:'100vh',backgroundColor:'#fff',padding:"180px 0 0 0"}}>
        <Box sx={{display:'flex',flexDirection:'column',backgroundColor:'#fff'}}>
          <Box sx={{display:'flex',width:'100%', height:'40px',justifyContent:'center',alignItems:'center'}}>
            <Typography variant="sourceHanSans" sx={styles.nowSNSTitle}>NOW SNS</Typography>
          </Box>
          <Box sx={{display:'flex',width:'100%', height:'40px',justifyContent:'center',alignItems:'center',margin:"12px 0"}}>
            <Typography variant="manrope" sx={styles.nowSNSMainTitle}>인스타그램에 놀러오세요!</Typography>
          </Box>
          <Box sx={{display:'flex',width:'100%', height:'40px',justifyContent:'center',alignItems:'center'}}>
            <Typography variant="sourceHanSans" sx={styles.nowSNSurl}>@sungwon_foodmall</Typography>
          </Box>
        </Box>
        <Box 
          sx={styles.sildeWrapper}
          onMouseEnter={() => setScrolling(false)}
          onMouseLeave={() => setScrolling(true)}
        >
         {
          isLoading ?
          <Skeleton variant="rectangular" width={"100%"} height={400} /> 
          :
          <Box sx={{position:'relative',width:'100%',height:'400px'}}>
            <MainSlide 
              data={snsData}
              setParentActiveSlide={setActiveSlide}
            />
            <Box sx={{position:'absolute',left:0,bottom:0,display:'flex',width:'100%',height:"2px",zIndex:9,justifyContent:'center',alignItems:'center'}}>
              <Box sx={{position:'relative',width:'1260px',height:'2px',backgroundColor:'#dcdcdc'}}>
                <Box sx={{position:'absolute',bottom:0,left:startPoistion,width:1260/snsData.length,height:'3px',backgroundColor:'#f84040'}} /> 
              </Box>
            </Box>
          </Box>
         }
        </Box>
        <Box sx={{width:'100%',backgroundColor:"#f7f7f7"}}>
          <Information />
        </Box>
       
        <Box sx={{width:'100%',heigth:"210px",backgroundColor:"#f7f7f7"}}>
          <Copyright isMobile={false} />
        </Box>
      </Box>
      { 
        popLeftDetailOpen && (
        <Drawer
          open={popLeftDetailOpen}
          onClose={() => {
            setpopLeftDetailOpen(!popLeftDetailOpen);
            setSelectFloor({
              selectData:null
            })
            setDesktopSeq(1)
          }}
          lockBackgroundScroll={selectFloor?.selectData != null ? true : false}
          enableOverlay={true} //toggle off == flase
          overlayColor={"transparent"}
          overlayOpacity={1}
          direction={'left'}
          className='bla bla bla'
          size={"100vh"}
          style={styles.leftModal}
          zIndex={999}
        >
          <FloorPopupDetail 
            setPopDetailOpen={setpopLeftDetailOpen}
            setSelectFloor={setSelectFloor}
            setSeq={setDesktopSeq}
            selectFloor={selectFloor}
          />
        </Drawer>
        )
      }
      { 
        popRigthDetailOpen && (
        <Drawer
          open={popRigthDetailOpen}
          onClose={() => {
            setpopRightDetailOpen(!popRigthDetailOpen);
            setSelectFloor({
              selectData:null
            })
            setDesktopSeq(1)
          }}
          lockBackgroundScroll={selectFloor?.selectData != null ? true : false}
          enableOverlay={true} //toggle off == flase
          overlayColor={"transparent"}
          overlayOpacity={1}
          direction={'right'}
          className='bla bla bla'
          size={"100vh"}
          style={styles.rightModal}
          zIndex={999}
        >
          <FloorPopupDetail 
            setPopDetailOpen={setpopRightDetailOpen}
            setSelectFloor={setSelectFloor}
            setSeq={setDesktopSeq}
            selectFloor={selectFloor}
          />
        </Drawer>
        )
      }
    </Box>
  );
}


const styles = {
  fixedLeftFloor1Label : {
    position:'absolute',left:"calc(50% - 480px)",top:400,width:'300px',height:'50px',zIndex:3
  },
  fixedLeftFloor2Label : {
    position:'absolute',left:"calc(50% - 480px)",top:500,width:'300px',height:'50px',zIndex:3
  },
  fixedLeftFloor3Label : {
    position:'absolute',left:"calc(50% - 480px)",top:600,width:'300px',height:'50px',zIndex:3
  },
  fixedLeftFloor4Label : {
    position:'absolute',left:"calc(50% - 480px)",top:700,width:'300px',height:'50px',zIndex:3
  },
  fixedRigthFloor1Label : {
    position:'absolute',right:"calc(50% - 480px)",top:220,width:'300px',height:'50px',zIndex:3
  },
  fixedRigthFloor2Label : {
    position:'absolute',right:"calc(50% - 480px)",top:420,width:'300px',height:'50px',zIndex:4
  },
  fixedRigthFloor3Label : {
    position:'absolute',right:"calc(50% - 480px)",top:610,width:'300px',height:'50px',zIndex:4
  },
  fixedRigthFloor4Label : {
    position:'absolute',right:"calc(50% - 480px)",top:710,width:'300px',height:'50px',zIndex:4
  },
  leftModal : {
    overflow: 'hidden',
    backgroundColor:'transparent',
    width:'430px'
  },
  rightModal : {
    overflow: 'hidden',
    backgroundColor:'transparent',
    width:'430px' 
  },
  sildeWrapper : {
    height:"400px",width:'100%',marginTop:'10px',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'
  },
  eventDataBox : {
    display:'flex',flex:1.5,flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'
  },
  eventOuterBox : {
    display:'flex',justifyContent:'center',alignItems:'center',height:'204px',position:'absolute', top:'865px', left:0, width :'100%',minWidth:'1600px',zIndex:2
  },
  eventInDataBox : {
    display:'flex',flexDirection:'column',height:'204px',backgroundColor:'#f7f7f7', minWidth:'1574px', borderRadius:'102px',justifyContent:'center',alignItems:'center'
  },
  eventTitleBox : {
    display:'flex',flex:1,justifyContent:'center',alignItems:'center'
  },
  eventEachCommonBox : {
    display:'flex',flexDirection:'row',justifyContent:'center',width:"442px",height:"78px",borderRadius:"39px",backgroundColor:'#ececec',border:"1px solid  #dcdcdc",padding:"6px",margin:"0 15px"
  },
  eventEachIconBox : {
    display:'flex',width:"66px",height:"66px",borderRadius:"33px",padding:"17px 7px 16px",backgroundColor:"#343434",alignItems:'center',justifyContent:'center',
  },
  eventEachContentBox : {
    display:'flex',flexDirection:'column',width:"380px",height:"66px",justifyContent:'center',padding:"0 0 0 10px"
  },
  bgImg : {
    zIndex: -10,
  },
  mainWrap : {
    width:'100%',backgroundColor:'transparent',zIndex:9999999999
  },
  textStyle1 : {
    fontXize: "0.5em",
    fontWeight: "600",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "2em",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#22201f"
  },
  shimmerText: {
    color: "transparent",
    backgroundClip: "text",
    backgroundCColor: "var(--bg)",
    backgroundImage: "linear-gradient(120deg, transparent, hsla(var(--glow-hue),100%,80%,0.66) 40%, hsla(var(--glow-hue),100%,90%,.9) 50%, transparent 52%)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    backgroundPosition: "center 100%",
  },
  navBuildWrap: {
    position:'absolute',top:'65px',height:'65px',left:0,width:'100%',display: "flex",flexDirection: "column",justifyContent: "center",alignItems: "center",zIndex:3
  },
  buildWrapper : {
    display: "flex",position:'relative',flexDirection: "column",justifyContent: "center",alignItems: "center",maxWidth:'100vw',top:'120px'
  },
  rightBuildWrapper : {
    position:'absolute',right:10,top:"15%",width:'auto',display: "flex",flexDirection:'column',justifyContent: "center",alignItems: "center",overflow: "hidden",paddingTop:5,paddingLeft:5,paddingRight:5
  },
  leftBuildWrapper : {
    position:'absolute',left:10,bottom:"20%",width:'auto',display: "flex",flexDirection:'column',justifyContent: "center",alignItems: "center",overflow: "hidden",
    maxWidth:'100vw',paddingTop:5,paddingLeft:5,paddingRight:5
  },
  popupDataWrap : {
    position:'relative',display:'flex',flex:1,flexDirection:'column',width:'100%',maxHeight:'250px',padding:"15px",backgroundColor:'#fff'
  },
  popupTitle : {
    fontSize: '2em',
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '-0.1px',
    color: '#22201f',
  },
  popupSubTitle : {
    flexDirection:"row",
    fontFamily: 'SourceHanSans',
    fontSize: '1em',
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: "2em",
    letterSpacing: '-0.32px',
    color: '#707070'
  },
  popupDescTitle : {
    fontFamily: 'SourceHanSans',
    fontSize: '0.8em',
    fontWeight: '500',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: "1.5em",
    letterSpacing: '-0.28px',
    color: '#707070'
  },
  popupButton : {
    width: '176px',
    height: '50px',
    marginTop: '14px',
    border:'0px solid #fff',
    padding: '12px 17px',
    borderRadius: '10px',
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.16)',
    backgroundColor: '#fff',
  },
  closeBoxWrap : {
      position:'absolute',right:'5px',bottom:'550px',width:'30px',height:'30px',borderRadius:'15px',backgroundColor:'#f7f7f7',display:'flex',justifyContent:'center',alignItems:'center', zIndex:10
  },
  galleryWrap : {
    display:'flex',justifyContent:'center',alignItems:'center',height:'auto',width :'100vw',backgroundColor:'#fff'
  },
  galleryTextWrap : {
    display:'flex',justifyContent:'center',alignItems:'center',height:'auto',width :'100%',backgroundColor:'#fff'
  },
  footerWrap : {
      display:'flex',justifyContent:'center',alignItems:'center',height:'auto',width :'100',backgroundColor:'#fff'
  },
  eventTitle : {
    fontSize: '30px',fontWeight: '500',fontStretch: 'normal',fontStyle: 'normal',lineHeight: 'normal',letterSpacing: 'normal',textAlign: 'center',color: '#22201f',
  },
  eventIconTitle : {
    fontSize: "18px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "-2px",
    textAlign: "center",
    color: "#ffffff"
  },
  eventTermTitle : {
    fontSize: "16px",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    llineHeight: "normal",
    letterSpacing: "-0.32px",
    color: "#888888",
  },
  eventMainTitle : {
    fontSize: "20px",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    llineHeight: "normal",
    letterSpacing: "-0.4px",
    color: "#22201f",
  },
  nowSNSTitle: {
    fontSize: "28px",
    fontWeight: "300",
    fontStretch: "normal",
    fontStyle: "normal",
    llineHeight: "normal",
    letterSpacing: "-0.56px",
    textAlign: "center",
    color: "#f84040",
  },
  nowSNSMainTitle : {
    fontSize: "48px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.06",
    letterSpacing: "-1.44px",
    color: "ActiveCaption#22201f",
  },
  nowSNSurl :{
    fontSize: "20px",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.4",
    letterSpacing: "-0.6px",
    color: "#b2b2b2",
  }

}