import * as React from 'react';
import Image from "next/image";
import classNames from 'classnames';
import { useRouter } from "next/router";
import { Box,Typography } from "@mui/material";
import { useTranslation } from 'next-i18next';
import NoSsr from "@mui/material/NoSsr";
import { mobileSelectBuildingType,mobileSelectFloorType } from 'types';
import MainBgImage from "@images/home/main-bg.png";
import LeftBuilding from "@images/foodmall.png";
import RightBuilding from "@images/stayrak.png";
import SAMPLE_IMG_01 from "@images/sample/sample_01.png";
import SAMPLE_IMG_02 from "@images/sample/sample_02.png";
import { OnBoarding } from 'components/layout/OnBoarding';
import { useStyles  } from 'styles/mobile/main';
import { rightFloor,leftFloor  } from '@utils/constants';
import mConst from '@utils/constants'
import FloorPopupDetail from "components/popup/mobile/FloorDetail";
import Copyright from 'components/home/Copyright';
import useLocaleTransfer from "services/locale/transfer";
import { landscapeState } from "@stores/layoutStore";
import { useRecoilState } from "recoil";
// import component 👇
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';

const slides = [
  {
    backgroundColor: 'transparent',
    src: SAMPLE_IMG_01,
  },
  {
    backgroundColor: 'transparent',
    src: SAMPLE_IMG_02,
  },
  {
    backgroundColor: 'transparent',
    src: SAMPLE_IMG_01,
  },
  {
    backgroundColor: 'transparent',
    src: SAMPLE_IMG_02,
  },
];

const AutoplaySlider = withAutoplay(AwesomeSlider);

const isHighLight= classNames({
  'shimmer-button': true,
  'shimmer_select': true
});
const shimmerClass = classNames({
  'shimmer': true
});
const shimmerButton = classNames({
  'shimmer-button': true,
});
const shimmerButtonActive = classNames({
  'shimmer-button': true,
  'active' : true
});
const shimmerText = classNames({
  'shimmer-text': true
});
const shimmerText2 = classNames({
  'shimmer-text2': true
});


type PostPageQuery = {
  menu: string;
};

export default function HomeMobile() {
  
  const { t } = useTranslation(['common','yakwan']);
  const router =  useRouter();
  const query =  router.query as PostPageQuery;
  const [isLoading, setLoading] = React.useState<boolean>(true);
  // 화면 가로모드 여부 확인
  const [viewLandscape, setIsLandscape] = useRecoilState(landscapeState);
  const is_onboarding = !(window.localStorage.getItem("sdd_onboarding2") === "false");
  if ( is_onboarding ) {
    return (
      <OnBoarding />
    )
  }
  
  const classes = useStyles();
  const [isFocusBuilding, setFocusBuilding] = React.useState<mobileSelectBuildingType>({
    selectData : null
  });
  const [popDetailOpen, setPopDetailOpen] = React.useState(false);
  const [selectFloor, setSelectFloor] = React.useState<mobileSelectFloorType>({
    selectData : null
  });

  const [isSeq, setSeq] = React.useState<number>(1);

  React.useEffect(() => {
    if ( query?.menu != undefined && query?.menu != null ) {
      let menuIdx = 0;
      switch( query?.menu) {
        case "left_2" :
        case "right_2" : menuIdx = 1; break;
        case "left_3" :
        case "right_3" : menuIdx = 2; break;
        case "left_4" :
        case "right_4" : menuIdx = 3; break;
        default : menuIdx = 0;break;
      }
      if ( query?.menu == 'left_1' || query?.menu == 'left_2' || query?.menu == 'left_3' || query?.menu == 'left_4') {
        setSelectFloor({selectData : leftFloor[menuIdx]});
        setPopDetailOpen(true);
        setSeq(0)
      }else{
        setSelectFloor({selectData : rightFloor[menuIdx]});
        setPopDetailOpen(true);
        setSeq(0)
      }
    }
    return () => {
      setSelectFloor({selectData : null});
      setPopDetailOpen(false);
      setSeq(0)
    }
}, [query]);

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 300);
    const timerUid = setInterval(() => {
      // 타이머 숫자가 하나씩 줄어들도록
      if ( isSeq == 4) {
        setSeq(1)
      }else{
        setSeq(isSeq+1)
      }
    }, 3000);
    if ( isFocusBuilding.selectData == null || selectFloor.selectData != null  ) {
      clearInterval(timerUid)
    }
    return () => clearInterval(timerUid);
  }, [isFocusBuilding,selectFloor,isSeq]);

  
  const onClickFloor = (sItem:object) => {
    setSelectFloor({selectData : sItem});
    setPopDetailOpen(true);
    setSeq(0)
  }

  const renderSlides = () => {
    return slides.map((slide:any,index:number) => {
      return (
        <div
          key={index}
          style={{ backgroundColor: slide.backgroundColor}}
        >
          <Image 
              src={slide.src}  
              alt="slide" 
              style={{objectFit: "cover"}} 
            />
        </div>
      );
    });
  };
  if ( isLoading ) {
    return (
      null
    )
  }

  return (
    <NoSsr>
       <Box className={classes.mainWrap} height={viewLandscape.baseHeight+mConst.mobileHeaderHeight}>
          <Image 
            alt={"main"}
            src={MainBgImage}
            placeholder="blur"
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',zIndex:1
            }}
          />
          <Box className={classes.navBuildWrap}>
            <Box sx={{display: "flex",flex:1,flexDirection: "row",justifyContent: "center",alignItems: "center",width:'100%'}}>
              <Box 
                sx={{flex:1,justifyContent:'center',alignItems:'center',textAlign:'center'}}
                onClick={() => setFocusBuilding({selectData: isFocusBuilding.selectData != 'left' ? 'left' : 'right'})}
              >
                <Typography variant="h6" component="h6" color={"#fff"}>{t("common.floor.leftfloor")}</Typography>
              </Box>
              <Box 
                sx={{flex:1,justifyContent:'center',alignItems:'center',textAlign:'center'}} 
                onClick={() => setFocusBuilding({selectData: isFocusBuilding.selectData != 'right' ? 'right' : 'left'})}
              >
                <Typography variant="h6" component="h6" color={"#fff"}>{t("common.floor.rightfloor")}</Typography>
              </Box>
            </Box>
          </Box>

          <Box className={classes.buildWrapper}>
        
            {isFocusBuilding.selectData == 'left' && (
            <Box className={classes.leftBuildWrapper}>
              {
                leftFloor.map((item,index) => {
                  return (
                    <Box 
                      key={index}
                      className={selectFloor?.selectData?.name == item.name ? isHighLight : isSeq == (index+1) ? shimmerButtonActive : shimmerButton }  
                      onClick={() => onClickFloor(item)}
                    >
                      <span className={shimmerText}>{useLocaleTransfer(t,'common',item.localeName)}</span>
                      <span className={shimmerText2}>{item.floorName}</span>
                      <span className={shimmerClass}></span>
                    </Box>
                  )
                })
              }
            </Box>
            )}
            {isFocusBuilding.selectData == 'right' && (
            <Box className={classes.rightBuildWrapper}>
              {
                rightFloor.map((item,index) => {
                  return (
                    <Box 
                      key={index}
                      className={selectFloor?.selectData?.name == item.name ? isHighLight : isSeq == (index+1) ? shimmerButtonActive : shimmerButton }  
                      onClick={() => onClickFloor(item)}
                    >
                      <span className={shimmerText}>{useLocaleTransfer(t,'common',item.localeName)}</span>
                      <span className={shimmerText2}>{item.floorName}</span>
                      <span className={shimmerClass}></span>
                    </Box>
                  )
                })
              }
            </Box>
            )}
       
            <Box sx={{ position: "relative", width: "100%",height:'80vh'}}>
              <Box 
              sx={{
                zIndex:isFocusBuilding.selectData == 'left' ? 2:1,
                position: "absolute",left:'5%',bottom:"20%",
                width: isFocusBuilding.selectData == 'left' ? '60%' : "50%"
              }}
                onClick={() => setFocusBuilding({selectData: isFocusBuilding.selectData != 'left' ? 'left' : null})}
              >
                <Image 
                  src={LeftBuilding}  
                  alt="" 
                  sizes={'30vw'}  
                  style={{objectFit: "contain",width:isFocusBuilding.selectData == 'left' ? '130%' : '100%',height:'auto',maxHeight:'70vh'}} 
                />
              </Box>
              <Box
                sx={{ 
                  zIndex:isFocusBuilding.selectData == 'right' ? 2:1, 
                  position: "absolute",right:'5%',bottom:"20%",
                  width: isFocusBuilding.selectData == 'right' ? '60%' : "50%"}}
                onClick={() => setFocusBuilding({selectData: isFocusBuilding.selectData != 'right' ? 'right' : null})}
              >
                <Image src={RightBuilding}   alt="" sizes={'30vw'}  style={{objectFit: "contain",width:'100%',height:'auto',maxHeight:'70vh' }} />
              </Box>
            </Box>
            
        </Box>
      </Box>
      <Box className={classes.galleryTextWrap}>
        <Typography  component="h6" className={classes.textStyle1}>
            Event Notice
        </Typography>
      </Box>
      <Box className={classes.galleryWrap}>
        <AutoplaySlider
          play={true}
          cancelOnInteraction={false} // should stop playing on user interaction
          interval={3500}
          bullets={false}
          mobileTouch={true}
        >
          {renderSlides()}
        </AutoplaySlider>
      </Box>
      <Box className={classes.footerWrap}>
        <Copyright isMobile={true} />
      </Box>


      <Drawer
        open={popDetailOpen}
        onClose={() => {
          setPopDetailOpen(!popDetailOpen);
          setSelectFloor({
            selectData:null
          })
          setSeq(1)
        }}
        lockBackgroundScroll={true}
        enableOverlay={true} //toggle off == flase
        direction={isFocusBuilding?.selectData == "left" ? "right" : "left"}
        className='bla bla bla'
        size={"100vh"}
        //size={"400px"}
        style={{
          overflow: 'hidden',
          backgroundColor:'transparent',
          maxWidth:'350px'
        }}
        zIndex={999}
      >
        <FloorPopupDetail 
          setPopDetailOpen={setPopDetailOpen}
          setSelectFloor={setSelectFloor}
          setSeq={setSeq}
          selectFloor={selectFloor}
          direction={isFocusBuilding?.selectData == "left" ? "right" : "left"}
        />
      </Drawer>
    </NoSsr>
  );
}

