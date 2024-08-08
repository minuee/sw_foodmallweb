import * as React from 'react';
import { Box, Button, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { useTranslation } from 'next-i18next';


import IMG_ROOM1 from "@images/reservation/sungwon.png";
import IMG_ROOM2 from "@images/reservation/atlie.png";
import IMG_ROOM3 from "@images/reservation/restorant.png";
import IMG_ROOM4 from "@images/reservation/bupet.png";
import IMG_ROOM5 from "@images/reservation/susino.png";

import IMG_PARTYROOM1 from "@images/reservation/party_middle12.png";
import IMG_PARTYROOM2 from "@images/reservation/party_small11.png";
import IMG_PARTYROOM3 from "@images/reservation/party_small3.png";

import IMG_AVENETYPE1 from "@images/reservation/avene-type-01.png";
import IMG_AVENETYPE2 from "@images/reservation/avene-type-02.png";
import IMG_AVENETYPE3 from "@images/reservation/avene-type-03.png";

import IMG_TABLETYPE1 from "@images/reservation/table-type-01.png";
import IMG_TABLETYPE1_ON from "@images/reservation/table-type-01-on.png";
import IMG_TABLETYPE2 from "@images/reservation/table-type-02.png";
import IMG_TABLETYPE2_ON from "@images/reservation/table-type-02-on.png";
import IMG_TABLETYPE3 from "@images/reservation/table-type-03.png";
import IMG_TABLETYPE3_ON from "@images/reservation/table-type-03-on.png";
import IMG_TABLETYPE4 from "@images/reservation/table-type-04.png";
import IMG_TABLETYPE4_ON from "@images/reservation/table-type-04-on.png";

import CHECK_ICON from "@icons/check_white.png";

type SelectDiningrProps = {
    selectData:any;
    activeIndex:any;
    onClickSelectDining(data:any): void;
};

const SelectDining: React.FC<SelectDiningrProps> = ({ selectData,activeIndex,onClickSelectDining}) => {
  const { t } = useTranslation(['common','yakwan']);

  React.useEffect(() => {

  }, []);
  

  const rooms = [
    {
      code : 'ODP73',
      label: '성원정',
      localeLabel: 'common.floor.foodmall_3f',
      icon: IMG_ROOM1
    },
    {
      code : 'ODP71',
      label: '아뜰리에',
      localeLabel: 'common.floor.foodmall_1f',
      icon: IMG_ROOM2
    },
    {
      code : 'ODP95',
      label: '레스토랑',
      localeLabel: 'common.floor.stayrak_2f',
      icon: IMG_ROOM3
    },
    {
      code : 'ODP92',
      label: '뷔폐',
      localeLabel: 'common.floor.stayrak_3f',
      icon: IMG_ROOM4
    },
    {
      code : 'ODP83',
      label: '스시노칸도',
      localeLabel: 'common.floor.foodmall_2f',
      icon: IMG_ROOM5
    },
  ];

  const partyRooms = [
    {
      code : 'ODP96',
      label: '중규모연회장(12층)',
      floor:"12F",
      localeLabel: 'reservation.group_part.floor_12',
      icon: IMG_PARTYROOM1
    },
    {
      code : 'code2',
      label: '소규모연회장(11층)',
      floor:"12F",
      localeLabel: 'reservation.group_part.floor_11',
      icon: IMG_PARTYROOM2
    },
    {
      code : 'code3',
      label: '소규모연호장(3층)',
      floor:"3F",
      localeLabel: 'reservation.group_part.floor_3',
      icon: IMG_PARTYROOM3
    },
  ];

  const aveneTypes = [
    {
      code : 'FBT01',
      label: '비즈니스',
      localeLabel: 'reservation.avene_type.type_1',
      icon: IMG_AVENETYPE1
    },
    {
      code : 'FBT02',
      label: '연회',
      localeLabel: 'reservation.avene_type.type_2',
      icon: IMG_AVENETYPE2
    },
    {
      code : 'FBT03',
      label: '세미나',
      localeLabel: 'reservation.avene_type.type_3',
      icon: IMG_AVENETYPE3
    },
  ];

  const tableTypes = [
    {
      code : 'FTT01',
      label: 'Circle',
      icon: IMG_TABLETYPE1,
      iconOn : IMG_TABLETYPE1_ON
    },
    {
      code : 'FTT02',
      label: 'Classroom',
      icon: IMG_TABLETYPE2,
      iconOn : IMG_TABLETYPE2_ON
    },
    {
      code : 'FTT03',
      label: 'U Shape',
      icon: IMG_TABLETYPE3,
      iconOn : IMG_TABLETYPE3_ON
    },
    {
      code : 'FTT04',
      label: 'Theater',
      icon: IMG_TABLETYPE4,
      iconOn : IMG_TABLETYPE4_ON
    },
  ];

  return (
    <Box sx={styles.wrapper}>
      {
        activeIndex == 1 ?
        partyRooms.map((item:any,index:number) => {
          return (
            <Box
              key={index}
              sx={ selectData == item.code ? styles.selextCommonDataWrap : styles.commonDataWrap}
              onClick={()=>onClickSelectDining(item)}
            >
              <Image 
                src={item.icon}  
                alt="slide" 
                style={{
                  width:'100%', height:'100%',
                  objectFit: 'cover',
                  opacity:selectData == item.code ? 0.5 : 1
                }}
              />
                 <Box sx={{...styles.commonBoxWrap,backgroundColor:selectData == item.code ?'#f84040' : '#fff',border:selectData == item.code ? "0" :'1px solid #dcdcdc',}}>
                  <Typography variant="sourceHanSans" sx={{letterSpacing:-1,lineHeight:'12px',color:selectData == item.code?'#fff': '#242424'}}>
                    {item.floor}
                  </Typography>
                  <Typography variant="sourceHanSans" sx={{letterSpacing:-1,lineHeight:'12px',color:selectData == item.code?'#fff': '#242424'}}>
                    {t(item.localeLabel)}
                  </Typography>
                </Box>
                {
                  selectData == item.code && (
                  <Box sx={styles.checkWrap2}>
                    <Image 
                      src={CHECK_ICON}  
                      alt="slide" 
                      style={{
                        width:'40px', height:'40px',
                        objectFit: 'contain'
                      }}
                    />
                  </Box>
                  )
                }
            </Box>
          )
        })
        :
        activeIndex == 9 ?
        aveneTypes.map((item:any,index:number) => {
          return (
            <Box
              key={index}
              sx={ selectData == item.code ? styles.selextCommonDataWrap : styles.commonDataWrap}
              onClick={()=>onClickSelectDining(item)}
            >
              <Image 
                src={item.icon}  
                alt="slide" 
                style={{
                  width:'100%', height:'100%',
                  objectFit: 'cover',
                  opacity:selectData == item.code ? 0.5 : 1
                }}
              />
                <Box sx={{...styles.commonBoxWrap,backgroundColor:selectData == item.code ?'#f84040' : '#fff',border:selectData == item.code ? "0" :'1px solid #dcdcdc',}}>
                  <Typography variant="sourceHanSans" sx={selectData == item.code ? styles.selectTextStyle : styles.defautlTextStyle}>
                    {t(item.localeLabel)}
                  </Typography>
                </Box>
                {
                  selectData == item.code && (
                  <Box sx={styles.checkWrap2}>
                    <Image 
                      src={CHECK_ICON}  
                      alt="slide" 
                      style={{
                        width:'40px', height:'40px',
                        objectFit: 'contain'
                      }}
                    />
                  </Box>
                  )
                }
            </Box>
          )
        })
        :
        activeIndex == 10 ?
        tableTypes.map((item:any,index:number) => {
          return (
            <Box
              key={index}
              sx={styles.commonDataWrap2}
              onClick={()=>onClickSelectDining(item)}
            >
              <Box sx={{...styles.commonTopBoxWrap,backgroundColor:selectData == item.code ?'#f84040' : '#fff'}}>
                <Image 
                  src={selectData == item.code ? item.iconOn :item.icon}  
                  alt="slide" 
                  style={{width:'60%',height:'80%',objectFit: 'contain'}}
                />
              </Box>
              <Box sx={{...styles.commonBottomBoxWrap,backgroundColor:selectData == item.code ?'#f84040' : '#fff'}}>
                <Typography variant="sourceHanSans" sx={selectData == item.code ? styles.selectTextStyle : styles.defautlTextStyle}>
                  {t(item.label)}
                </Typography>
              </Box>
            </Box>
          )
        })
        :
        rooms.map((item:any,index:number) => {
          return (
            <Box
              key={index}
              sx={ selectData == item.code ? styles.selextCommonDataWrap : styles.commonDataWrap}
              onClick={()=>onClickSelectDining(item)}
            >
              <Image 
                src={item.icon}  
                alt="slide" 
                style={{
                  width:'100%', height:'100%',
                  objectFit: 'cover',
  
                  opacity: selectData == item.code ? 0.5 : 1
                }}
              />
                <Box sx={{...styles.commonBoxWrap,backgroundColor:selectData == item.code ?'#f84040' : '#fff',border:selectData == item.code ? "0" :'1px solid #dcdcdc',}}>
                  <Typography variant="sourceHanSans" sx={selectData == item.code ? styles.selectTextStyle : styles.defautlTextStyle}>
                    {t(item.localeLabel)}
                  </Typography>
                </Box>
                {
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
                }
            </Box>
          )
        })
      }
      </Box>
    );
  }

  const styles = {
    wrapper : {
      display:'flex',flexDirection:'row',alignItems:'space-evenly',flexWrap:'wrap'
    },
    commonDataWrap : {
      position:'relative',display:'flex',flexDirection:'column',width:'105px',justifyContent:'center',alignItems:'center',marginRight:"10px",marginBottom:"10px",cursor:'pointer'
    },
    selextCommonDataWrap : {
      position:'relative',display:'flex',flexDirection:'column',width:'105px',justifyContent:'center',alignItems:'center',marginRight:"10px",marginBottom:"10px",cursor:'pointer',backgroundColor : "rgba(248, 6, 64, 0.8)",borderRadius:'5px'
    },
    commonDataWrap2 : {
      position:'relative',display:'flex',flexDirection:'column',width:'105px',justifyContent:'center',alignItems:'center',marginRight:"10px",marginBottom:"10px",cursor:'pointer',border:'1px solid #dcdcdc',borderRadius:'5px'
    },
    commonBoxWrap :{
      borderBottomLeftRadius:'5px',borderBottomRightRadius:'5px',width:'100%',minHeight:'35px',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',
    },
    commonTopBoxWrap :{
      borderTopLeftRadius:'5px',borderTopightRadius:'5px',width:'100%',minHeight:'80px',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',
    },
    commonBottomBoxWrap :{
      borderBottomLeftRadius:'5px',borderBottomRightRadius:'5px',width:'100%',minHeight:'35px',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',
    },
    checkWrap : {
      position:'absolute',left:0,top:0,width:'100%',height:'100%',display:'flex',justifyContent:'center',pt:'20px',zIndex:3,border:'2px solid #f84040',borderRadius:'5px',
    },
    checkWrap2 : {
      position:'absolute',left:0,top:0,width:'100%',height:'100%',display:'flex',justifyContent:'center',pt:'30px',zIndex:3,border:'2px solid #f84040',borderRadius:'5px'
    },
    defautlTextStyle : {
      fontSize: "16px",
      fontWeight: "500",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "-0.32px",
      color: "#242424",
    },
    selectTextStyle : {
      fontSize: "16px",
      fontWeight: "500",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "-0.32px",
      color: "#ffffff",
    }
  }
  export default SelectDining;