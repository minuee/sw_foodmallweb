import { makeStyles } from "@mui/styles";
import localFont from 'next/font/local'

const Manrope = localFont({ src: "../../public/fonts/Manrope-Regular.ttf"});
const SourceHanSansK = localFont({ src: "../../public/fonts/SourceHanSansK-VF.ttf"})

export const useStyles = makeStyles((theme) => ({
    bgImg : {
      zIndex: -100,
    },
    mainWrap : {
      width:'100%',backgroundColor:'transparent',zIndex:9999999999
    },
    textStyle1 : {
      fontFamily: `${Manrope}`,
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
        position:'absolute',right:'5px',bottom:'210px',width:'30px',height:'30px',borderRadius:'15px',backgroundColor:'#f7f7f7',display:'flex',justifyContent:'center',alignItems:'center', zIndex:10
    },
    galleryWrap : {
      display:'flex',justifyContent:'center',alignItems:'center',height:'auto',width :'100vw',backgroundColor:'#fff'
    },
    galleryTextWrap : {
      display:'flex',justifyContent:'center',alignItems:'center',height:'auto',width :'100%',backgroundColor:'#fff'
    },
    footerWrap : {
        display:'flex',justifyContent:'center',alignItems:'center',height:'auto',width :'100',backgroundColor:'#fff'
    }
  }));