import { makeStyles } from "@mui/styles";
//import localFont from 'next/font/local'
//const Manrope = localFont({ src: "../../public/fonts/Manrope-Regular.ttf"});
//const SourceHanSansK = localFont({ src: "../../public/fonts/SourceHanSansK-VF.ttf"})

export const useStyles = makeStyles((theme) => ({
  textStyle1 : {
    //fontFamily: `${Manrope}`,
    fontSize: "0.5em",
    fontWeight: "600",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "2em",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#22201f"
  },
  textStyle2 : {
    //fontFamily: `${Manrope}`,
    fontSize: "1em",
    fontWeight: "600",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#22201f",
  },
  textStyle3 : {
    //fontFamily: `${SourceHanSansK}`,
    fontSize: "0.4em",
    fontWeight: "600",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "-0.32px",
    textAlign: "left",
    color: "#777",
    '& > span' : {
      fontWeight: "bold",
      color: "#22201f",
    }
  },
  textStyle3_2 : {
    width:'5px',
    //fontFamily: `${SourceHanSansK}`,
    fontSize: "0.4em",
    fontWeight: "600",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "-0.32px",
    textAlign: "left",
    color: "#777",
  },
  textStyle4 : {
    //fontFamily: `${SourceHanSansK}`,
    fontSize: "0.4em",
    fontWeight: "600",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.1em",
    letterSpacing: "-0.28px",
    textAlign: "left",
    color: "#a1a1a1"
  },
  textCopyRight : {
    //fontFamily: `${SourceHanSansK}`,
    fontSize: "12px",
    fontWeight: "600",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.1em",
    letterSpacing: "-0.24px",
    textAlign: "left",
    color: "#cbcbcb"
  }
}));