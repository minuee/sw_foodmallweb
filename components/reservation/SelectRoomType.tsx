import * as React from 'react';
import { Box, Button, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { useTranslation } from 'next-i18next';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import IMAGE_ROOM_1 from "@images/reservation/select-room-studio.png";
import IMAGE_ROOM_2 from "@images/reservation/select-room-deluxe.png";
import IMAGE_ROOM_3 from "@images/reservation/select-room-suite.png";

import ICON_DISABLED from "@images/reservation/icon-disable-date.png";

import ICON_MORE from "@images/reservation/icon-image-more.png";

type SelectRoomTyperProps = {
    selectData:any;
    activeIndex:any;
    onClickSelectRoomType(data:any): void;
    onClickSelectMore(data:any): void;
};

const SelectRoomType: React.FC<SelectRoomTyperProps> = ({ selectData,activeIndex,onClickSelectRoomType,onClickSelectMore}) => {
  const { t } = useTranslation(['common','yakwan']);
  React.useEffect(() => {

  }, []);

  const rooms = [
    {
      code : 'studio',
      label: '스튜디오',
      localeLabel: 'sub.rooms_detail.room_type.studio_room',
      icon: IMAGE_ROOM_1
    },
    {
      code : 'deluxe',
      label: '디럭스',
      localeLabel: 'sub.rooms_detail.room_type.deluxe_room',
      icon: IMAGE_ROOM_2
    },
    {
      code : 'suite',
      label: '스위트',
      localeLabel: 'sub.rooms_detail.room_type.suite_room',
      icon: IMAGE_ROOM_3
    }
  ];

  return (
    <Box sx={styles.wrapper}>
      {
        rooms.map((item:any,index:number) => {
          return (
            <Box
              key={index}
              sx={styles.commonDataWrap}
            >
              { index == 1 && (
                <Box sx={styles.disableWrapper}>
                  <Image 
                    src={ICON_DISABLED}  
                    alt="slide" 
                    style={{width:'28px', height:'28px',objectFit: 'contain'}}
                  />
                  <Box sx={{display:'flex',alignItems:'center',marginTop:"10px"}}>
                    <Typography variant="sourceHanSans" sx={styles.infoTextStyle}>
                      {t("reservation.room_gallery.reservation_finished")}
                    </Typography>
                  </Box>
                  
                </Box>
                )
              }
              { index !== 1 && (
              <Box 
                sx={styles.fixedButtonWrap}
                onClick={()=>onClickSelectMore(item)}
              >
                <Image 
                  src={ICON_MORE}  
                  alt="slide" 
                  style={{width:'14px', height:'14px',objectFit: 'contain'}}
                />
                <span>
                  <Typography variant="sourceHanSans" sx={styles.helpTextStyle}>
                  {t("reservation.room_gallery.mini_title")}
                  </Typography>
                </span>
              </Box>
              )}
              <Image 
                onClick={()=>onClickSelectRoomType(item)}
                src={item.icon}  
                alt="slide" 
                style={{
                  width:'100%', height:'100%',
                  objectFit: 'cover',
                  opacity: index == 1  ? 0.3 : 1
                }}
              />
                <Box 
                  sx={{...styles.commonBoxWrap,backgroundColor:selectData?.reservation_room == item.code ?'#bb9b6a' : '#fff',border:selectData?.reservation_room == item.code ? '1px solid #bb9b6a' : '1px solid #c8c8c8', opacity: index == 1  ? 0.3 : 1}}
                  onClick={()=>onClickSelectRoomType(item)}
                >
                  <Box sx={styles.commonBoxLeftWrap}>
                    <Typography variant="sourceHanSans" sx={selectData?.reservation_room == item.code ? styles.selectTextStyle : styles.defautlTextStyle}>
                      {t(item.localeLabel)}
                    </Typography>
                  </Box>
                  <Box sx={styles.commonBoxRightWrap}>
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
                {/* {
                  selectData == item.code && (
                  <Box sx={styles.checkWrap}>
                    <Image 
                      src={CHECK_ICON}  
                      alt="slide" 
                      style={{
                        width:'47px', height:'47px',
                        objectFit: 'contain'
                      }}
                    />
                  </Box>
                  )
                } */}
            </Box>
          )
        })
      }
      </Box>
  );
}

const styles = {
  wrapper : {
    display:'flex',flexDirection:'row',alignItems:'space-evenly',flexWrap:'wrap',padding:"20px"
  },
  disableWrapper : {
    position:'absolute',rigth:0,top:0,width:"100%",height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',zIndex:2,backgroundColor: "rgba(230, 230, 230, 0.3)"
  },
  fixedButtonWrap : {
    position:'absolute',right:"5px",top:"5px",minWidth:"38px",width:"auto",height:"28px",opacity: "0.8",borderRadius: "14px",backgroundColor: "#242424",display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',zIndex:999,
    '& span' : {
      display:"none"
    },
    '&:hover': {
      minWidth:"150px",
      '&:nth-child(1)' : {
        '& span' : {
          display:"flex",paddingLeft:"10px", 
        },
      }
    },

  },
  commonDataWrap : {
    position:'relative',display:'flex',flexDirection:'column',width:'220px',justifyContent:'center',alignItems:'center',marginRight:"20px",marginBottom:"20px",cursor:'pointer'
  },
  commonBoxWrap :{
    border:'1px solid #dcdcdc',borderBottomLeftRadius:'5px',borderBottomRightRadius:'5px',width:'100%',minHeight:'44px',display:'flex',alignItems:'center',flexDirection:'row'
  },
  commonBoxLeftWrap : {
    display:'flex',flex:1.7,justifyContent:'center',alignItems:'center'
  },
  commonBoxRightWrap : {
    display:'flex',flexDirection:'row',flex:1,justifyContent:'center',alignItems:'center',border:"1px solid  #c8c8c8",margin:"5px",height:"34px",borderRadius:"6px",backgroundColor:'#fff'
  },
  commonTopBoxWrap :{
    borderTopLeftRadius:'5px',borderTopightRadius:'5px',width:'100%',minHeight:'80px',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',
  },
  commonBottomBoxWrap :{
    borderBottomLeftRadius:'5px',borderBottomRightRadius:'5px',width:'100%',minHeight:'35px',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',
  },
  commonMiniBoxWrap : {
    display:'flex',flex:1,justifyContent:'center',alignItems:'center'
  },
  checkWrap : {
    position:'absolute',left:0,top:0,width:'100%',height:'100%',display:'flex',justifyContent:'center',pt:'40px',zIndex:3,border:'2px solid #bb9b6a',borderRadius:'5px',
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
  helpTextStyle : {
    fontSize: "14px",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "-0.28px",
    color: "#fff",
  },
  defautlTextStyle : {
    fontSize: "16px",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "-1px",
    color: "#242424",
  },
  selectTextStyle : {
    fontSize: "16px",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "-1px",
    color: "#ffffff",
  },
  infoTextStyle : {
    fontSize: "16px",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "-0.32px",
    color: "#707070",
  }
}

export default SelectRoomType;