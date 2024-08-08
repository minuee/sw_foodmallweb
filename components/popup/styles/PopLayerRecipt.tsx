
const styles = {
    wrapper : {
        display:'flex',width:'100%',height:'100%',zIndex:101,overflow:'hidden',flexDirection:'column'
    },

    optionTextBoxWrapper : {
        display:'flex',flexDirection:'column',width:'100%',minWidth:'100px',height:"32px",justifyContent:'center',borderRadius:"6px",border:"1px solid #bb9b6a",padding:"10px"
    },
    
    topToggleCirle : {
        position:'absolute',right:40,top:99, width:'46px',height:'46px',borderRadius:"23px",border:"1px solid #c8c8c8",
        display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',zIndex:999
    },
    toggleCirle : {
        position:'absolute',right:"-30px",top:9, width:'46px',height:'46px',borderRadius:"23px",border:"1px solid #c8c8c8",
        display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',zIndex:999
    },
    
    inputWrapper : {
        display:'flex',flexDirection:'row',width:'100%',height:'120px',alignItems:'center',justifyContent:'center',position:'relative'
    },
    inputInsideTitleWrapper : {
        display:'flex',flexDirection:'row',width:'100%',height:'100%',alignItems:'center',justifyContent:'center',position:'relative'
    },
    inputButtonWrapper : {
        display:'flex',flexDirection:'row',width:'230px',height:'70px',alignItems:'center',justifyContent:'center',backgroundColor:'#c8c8c8',borderRadius: "10px",cursor:'pointer',marginLeft:"20px"
    },
    inputButtonWrapper2 : {
        display:'flex',flexDirection:'row',width:'230px',height:'70px',alignItems:'center',justifyContent:'center',backgroundColor:'#c8c8c8',borderRadius: "10px",marginLeft:"20px"
    },
    
    settleWrapper : {
        display:'flex',flex:1,flexDirection:'row',alignItems:'flex-end',justifyContent:'flex-end'
    },
    settleButtonWrapper : {
        display:'flex',flex:1,flexDirection:'row',alignItems:'flex-end',justifyContent:'flex-start'
    },
    zoomOuterWrapper : {
        display:'flex',flexDirection:'column',justifyContent:'flex-end',alignItems:'center',height:'100%',maxHeight:'600px',overFlow:'auto'
    },
    zoomOuterDataWrapper : {
        position:'absolute',left:380,bottom:30,display:'flex',flexDirection:'column',justifyContent:'flex-end',alignItems:'flex-start',width:"420px",height:'auto',minHeight:"350px",borderRadius:"10px",border:"1px solid #ccc",backgroundColor:'#fff'
    },
    zommDateFixedWrapper : {
        display:'flex',position:'absolute',left:0,top:75,width:'100%',height:"40px",justifyContent:'center',alignItems:'center'
    },
    zommDateFixedBox : {
        display:'flex',width:'auto',minWidth:"48px",height:"40px",justifyContent:'center',alignItems:'center',backgroundColor:'#a8aaab',borderRadius:"9px",padding:"0 5px"
    },
    zommDateTermCommonTopBox : {
        display:'flex',width:"100%",height:"46px",backgroundColor:'#f2f4f6',justifyContent:'center',alignItems:'center'
    },
    zommDateTermCommonBottomBox : {
        display:'flex',flexDirection:'column',width:"100%",height:"90px",backgroundColor:'#fff',justifyContent:'center',alignItems:'center'
    },
    zommDateTermCommonBox : {
        display:'flex',flexDirection:'column',justifyContent:'center',width:"192px",height : "126px",borderRadius: "6px",border: "solid 2px #f2f4f6",backgroundColor: "#fff"
    },
    checkoutTextStyle : {
        fontSize: "15px",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.3px",color: "#22201f",
    },
    checkoutTextStyle2 : {
        fontSize: "18px",fontWeight: "bold",fontStretch: "normal",fontStyle: "normal",lineHeight: "30px",letterSpacing: "-0.36px",color: "#22201f",
    },
    checkoutTextStyle3 : {
        fontSize: "15px",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.3px",color: "#a2a2a2",
    },
    zommSettleOuter : {
        display:'flex',height:'60px',width:'calc( 100% - 20px)',padding:"10px",backgroundColor:'#fff',justifyContent:'flex-end',borderBottomLeftRadius:'10px',borderBottomRightRadius:'10px',borderTop:"2px solid #000",margin:"10px"
    },
    zommDateTermWrapper : {
        display:'flex', height:'146px',width:'100%' , padding:"15px"
    },
    zommDateTemrDataWrapper : {
        display:'flex',flexDirection:'row',justifyContent:'space-between',width:'100%'
    },
    zommOptionWrapper :{
        display:'flex',flexDirection:'column',height:'auto',minHeight:'126px',width:'100%',borderTop:"1px solid #dcdcdc",marginTop:"10px",marginBottom:"10px",paddingTop:"10px"
    },
    toggleButtonWrapper : {
        display:'flex',width:'35px',height:'35px',borderRadius:"17.5px",border:"1px solid #c8c8c8",alignItems:'center',justifyContent:'center',cursor:'pointer',marginLeft:"10px",zIndex:100
    },
    menuTextStyle : {
        fontSize: "20px",fontWeight: "bold",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.4px",color: "#22201f",marginLeft:"5px",
        fontSizeAdjust:"auto"
    },
    menuHelpTextStyle : {
        fontSize: "20px",fontWeight: "normal",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.4px",color: "#a2a2a2",
        fontSizeAdjust:"auto"
    },
    infoText : {
        fontSize: "16px",fontWeight: "normal",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.32px",color: "#242424",
    },
    menuHelpTextStyle2 : {
        fontSize: "20px",fontWeight: "normal",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.4px",color: "#111111",
        fontSizeAdjust:"auto" ,width:'100%',
        "& > span" : {
            color: "#f84040",fontWeight:'bold'
        }
    },
    
    dottedGrayLine : {
        minWidth: "129px",width:'100%',height: "1px",margin: "0",border: "1px dotted #c8c8c8"
    },
    optionSelectWrapper : {
        display:'flex',flexDirection:'column',width:'calc(100% -140px)',height:"550px",margin:"0 70px",alignItems:'flex-start',justifyContent:'flex-start',position:'relative'
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
   
    textStyle6 : {
        fontSize: "14px",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.28px",color: "#707070",
    },
    textBreakfast01 : {
        fontSize: "18px",fontWeight: "bold",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.36px",color: "#22201f",
    },
    textBreakfast02 : {
        fontSize: "18px",fontWeight: "normal",fontStretch: "normal",fontStyle: "normal",lineHeight: "35px",letterSpacing: "-0.32px",color: "#22201f",
    },
    textBreakfast03 : {
        fontSize: "14px",fontWeight: "normal",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.28px",color: "#a2a2a2"
    },
    textBreakfast05 : {
        fontSize: "14px",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.28px",color: "#707070",marginLeft:"5px"
    },
    settleTextStyle : {
        fontSize: "16px",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.32px",color: "#22201f",marginLeft:"6px",
        "& > span" : {
            color: "#f84040",fontSize: "30px",fontWeight: "bold",letterSpacing: "-0.6px"
        }
    },
    settleTextStyle2 : {
        fontSize: "13px",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.32px",color: "#b2b2b2",marginLeft:"6px"
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
        fontSize: "26px",fontWeight: "bold",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.52px",color: "#fff",marginLeft:"10px"
    },
    miniTextStyle : {
        fontSize: "13px",fontWeight: "bold",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.26px",color: "#a2a2a2"
    },
    miniTextStyle2 : {
        fontSize: "17px",fontWeight: "bold",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.26px",color: "#22201f",
        "& > span" : {
            width: "10px",
        }
    },
    commonMiniBoxWrap : {
        display:'flex',flex:1,justifyContent:'center',alignItems:'center'
    },
    digitTextStyle : {
        fontSize: "16px",
        fontWeight: "500",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "normal",
        letterSpacing: "-0.32px",
        color: "#22201f",
    },
}

export default styles;