
const styles = {
    wrapper : {
        display:'flex',width:'100%',height:'100%',zIndex:101,overflow:'hidden',flexDirection:'column'
    },

    optionTextBoxWrapper : {
        display:'flex',flexDirection:'column',width:'100%',minWidth:'100px',height:"32px",justifyContent:'center',borderRadius:"16px",border:"1px solid #bb9b6a",padding:"5px"
    },
    optionTextBoxSelectWrapper : {
        display:'flex',flexDirection:'column',width:'100%',minWidth:'100px',height:"32px",justifyContent:'center',borderRadius:"16px",border:"1px solid #bb9b6a",padding:"5px",backgroundColor:'#f2ebe3'
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
        display:'flex',flexDirection:'row',width:'calc(100% -50px)',height:"550px",margin:"20px 22px 20px 30px ",alignItems:'flex-start',justifyContent:'flex-start',position:'relative'
    },
    leftOuterWrapper : {
        display:'flex',flexDirection:'column',width:"598px",height:'100%',paddingRight : "20px",borderRight:"1px dotted #ccc",
    },
    leftTopTitleWrapper : {
        display:'flex',width:"100%",height:'30px',alignItems:'center'
    },
    leftTopTitleWrapper2 : {
        display:'flex',width:"100%",height:'30px',alignItems:'center',marginTop:"20px"
    },
    leftHiddenWrapper :{
        display:'flex',justifyContent:'center',alignItems:'center',maxWidth:'578px',marginTop:'10px',
    },
    leftInputWrapper : {
        display:'flex',flexDirection:'column',width:"100%",height:'auto',minHeight:'50px',alignItems:'center',marginTop:"10px"
    },
    leftInputCommonTitleWrapper : {
        display:'flex',width:"100%",height:'30px',alignItems:'center'
    },
    leftInputCommonTitleWrapper2 :{
        display:'flex',width:"100%",height:'auto',minHeight:"40px",alignItems:'center'
    },
    leftInputCommonTitleWrapper3 : {
        display:'flex',flexDirection:'column',width:"100%",height:'auto',minHeight:'50px',alignItems:'center',marginTop:"10px"
    },
    leftInputCommonLeftTitleWrapper : {
        display:'flex',width:"100%",height:'30px',alignItems:'center'
    },
    leftInputCommonRightTitleWrapper :{ 
        display:'flex',width:"100%",height:'auto',minHeight:"40px",alignItems:'center'
    },
    leftInputCommonTitleWrapper4 : {
        display:'flex',flexDirection:'column',width:"100%",height:'auto',minHeight:'50px',alignItems:'center',marginTop:"10px"
    },
    leftInputCommonTitleWrapper5 : {
        display:'flex',flexDirection:'column',width:"100%",height:'auto',minHeight:'50px',alignItems:'center',marginTop:"10px"
    },
    rightOuterWrapper : {
        display:'flex',flexDirection:'column',width:'980px',height:'100%',marginLeft:"30px",position:"relative"
    },
    rightFixedWrapper : {
        display:'flex',flexDirection:'row',width:"100%",height:'180px',justifyContent:'space-between',alignItems:'center',position:'absolute',left:0,bottom:0
    },
    fixedLeftWrapper :{
        display:'flex',flexDirection:'column',width:"480px",height:'100%',alignItems:'center',backgroundColor:'#f6f5f5',borderRadius:"10px",padding:"14px"
    },
    fixedRightWrapper : {
        display:'flex',flexDirection:'column',width:"480px",height:'100%',alignItems:'center',backgroundColor:'#fff',borderRadius:"10px",padding:"14px",border:"1px solid  #dcdcdc"
    },
    fixedLeftTtileWrapper : {
        display:'flex',alignItems:'center',width:'100%',borderBottom:'1px solid #c8c8c8',padding:"0 0 15px 0",marginBottom:"10px"
    },
    fixedRightTtileWrapper : {
        display:'flex',alignItems:'center',width:'100%',borderBottom:'1px solid #c8c8c8',padding:"0 0 15px 0",marginBottom:"5px"
    },
    fixedLeftDataWrapper : {
        display:'flex',justifyContent:'center',width:'100%',padding:"10px 0"
    },
    fixedLeftLeftWrapper : {
        display:'flex',alignItems:'center',width:'200px'
    },
    fixedLeftRightWrapper : {
        display:'flex',alignItems:'center',width:'calc( 100% - 220px)'
    },
    fixedRightLeftWrapper : {
        display:'flex',alignItems:'center',width:'calc( 100% - 120px)'
    },
    fixedRightRightWrapper : {
        display:'flex',alignItems:'center',justifyContent:'flex-end',width:'100px',cursor:'pointer'
    },
    rightSetlteWrapper : {
        display:'flex',flexDirection:'row',width:"100%",height:'auto',minHeight:'50px',alignItems:'center',marginTop:"10px"
    },
    rightSetlteBox1 : {
        display:'flex',flexDirection:'column',width:"320px",height:'auto',minHeight:'50px',alignItems:'center',marginRight:'10px'
    },
    rightSetlteBox2 :{
        display:'flex',flexDirection:'column',width:"150px",height:'auto',minHeight:'50px',alignItems:'center'
    },
    rightSetlteHelpWrapper :{
        display:'flex',flexDirection:'row',width:"100%",height:'auto',minHeight:'20px',alignItems:'center'
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
    inputInfoTextStyle : {
        fontSize: "14px",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.28px",color: "#bb9b6a",
    },
    inputInfoTextStyle2 : {
        fontSize: "16px",fontWeight: "bold",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.32px",color: "#22201f",
    },
    inputInfoTextStyle3 : {
        fontSize: "14px",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.28px",color: "#22201f",
    },
    inputInfoTextStyle4 : {
        fontSize: "14px",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.28px",color: "#707070",textDecoration: 'underline #707070'
    },
    inputInfoTextStyle5 : {
        fontSize: "14px",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.28px",color: "#707070",textDecoration: 'underline #707070'
    },
    textStyle6 : {
        fontSize: "14px",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.28px",color: "#707070",
    },
    textStyle6Select : {
        fontSize: "14px",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.28px",color: "#bb9b6a",
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
    step2TextStyle : {
        fontSize: "18px",fontWeight: "bold",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.36px",color: "#22201f",marginLeft:"5px"
    },
    step2TextStyle2 : {
        fontSize: "13px",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.26px",color: "#242424"
    },
    inputTitleTextStyle : {
        fontSize: "16px",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "normal",letterSpacing: "-0.32px",color: "#22201f",
        "& > span" : {
            color: "#f84040",
        }
    },
    leftArrowWrapper2 : {
        width: "33px",
        height: "40px",
        display:'flex',
        boxShadow: "0 0 6px 0 rgba(0, 0, 0, 0.3)",
        border: "solid 1px #b2b2b2",
        borderRadius:"4px",
        background: "linear-gradient(left, rgba(255, 255, 255, 0) 1%, #fff 75%)",
        alignItems:'center',
        justifyContent:'center',
    },
    rightArrowWrapper2 : {
        width: "33px",
        height: "40px",
        display:'flex',
        boxShadow: "0 0 6px 0 rgba(0, 0, 0, 0.3)",
        border: "solid 1px #b2b2b2",
        borderRadius:"4px",
        background: "linear-gradient(right, rgba(255, 255, 255, 0) 1%, #fff 75%)",
        alignItems:'center',
        justifyContent:'center',
    },
}

export default styles;